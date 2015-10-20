<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>{{title }}</title>
  <link rel="stylesheet" href="../components/bootstrap/dist/css/bootstrap.min.css">
  <!-- <link rel="stylesheet" href="css/style.css"> -->
  {{#if ENV_DEVELOPMENT}}
    <script src="http://localhost:35729/livereload.js"></script>
  {{/if}}
  <script src="../components/jquery/dist/jquery.min.js"></script>
  <script src="../components/bootstrap/dist/js/bootstrap.min.js"></script>
</head>
<body>

  {{#if user}}
    {{> navbar}}
  {{/if}}

  {{{body}}}

</body>
</html>
