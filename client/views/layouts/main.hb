<!doctype html>

<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>{{title}}</title>
    <link rel="stylesheet" href="../components/bootstrap/dist/css/bootstrap.min.css">
  </head>

  <body>

    {{#if user}}
      {{> navbar}}
    {{/if}}
    
    <script src="../components/jquery/dist/jquery.min.js"></script>
    <script src="../components/bootstrap/dist/js/bootstrap.min.js"></script>

    {{{body}}}

  </body>

</html>
