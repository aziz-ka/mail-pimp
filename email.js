var chalk = require("chalk"),
    util = require("util"),
    base64url = require("base64-url"),
    gmail = require("googleapis").gmail("v1"),
    fs = require("fs-extra"),
    nodemailer = require("nodemailer"),
    xoauth2 = require("xoauth2");

module.exports = function() {
  this.sendMessage = function(user, email, tokens) {
    var authCredentials = xoauth2.createXOAuth2Generator({
      user: user.email,
      clientId: tokens.clientId_,
      clientSecret: tokens.clientSecret_,
      accessToken: tokens.credentials.access_token,
      refreshToken: tokens.credentials.referesh_token
    });

    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: authCredentials
    });

    var mailOptions = {
      from: user.email,
      to: email.address,
      subject: email.subject,
      text: email.message,
      html: email.message
    };

    transporter.sendMail(mailOptions, function(err, info) {
      if(err) return err;
      console.log(info);
    });
  };



  this.encodeMessage = function(user, email, file, tokens) {
    var message = "";
    message += "From: <" + user.email + ">\r\n";
    message += "To: <" + email.address + ">\r\n";
    message += "Subject: " + email.subject + "\r\n";
    message += "MIME-Version: 1.0\r\n";

    if(!file) {
      message += "Content-Type: text/html; charset='utf-8'\r\n\r\n";
      message += email.message;
      sendEmail(message, tokens);
    } else {
      message += "Content-Type: message/rfc822; boundary='the_end'\r\n\r\n";

      message += "--the_end\r\n";
      message += "MIME-Version: 1.0\r\n";
      message += "Content-Transfer-Encoding: 7bit\r\n";
      message += "Content-Type: text/html; charset='utf-8'\r\n\r\n";
      message += email.message + "\r\n\r\n";

      message += "--the_end\r\n";
      message += "MIME-Version: 1.0\r\n";
      message += "Content-Type: " + file.mimetype + "\r\n";
      message += "Content-Transfer-Encoding: base64\r\n";
      message += "Content-Disposition: attachment; filename='" + file.filename + "'\r\n\r\n";

      fs.readFile(file.path, function(err, fileData) {
        fileData = base64url.encode(fileData);
        message += fileData + "\r\n";
        message += "--the_end--";
        sendEmail(message, tokens, file, fileData);
      });
    }
  };

  function sendEmail(message, tokens, file, fileData) {
    var msgEncoded = base64url.encode(message);

    console.log(chalk.bgYellow(message));
    console.log(chalk.bgCyan(msgEncoded));

    gmail.users.messages.send({
      "auth": tokens,
      "userId": "me",
      "resource": {
        "raw": msgEncoded
      }
    }, processEmail);
  }

  function processEmail(err, result) {
    if(err) return err;
    console.log(result);
  }
};