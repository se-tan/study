<?php
session_start();
?>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="stylesheet" href="style.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <title>PHP Logout</title>
</head>

<body>
  <?php
  print('Check the Session ID.<br>');
  if (!isset($_SESSION["visited"])) {
    print('Unregistered: Cannot read property of "visited".<br>');
  } else {
    print($_SESSION["visited"] . '<br>');
  }

  print('Check the Session ID.<br>');
  if (!isset($_COOKIE["PHPSESSID"])) {
    print('Does not register the session.<br>');
  } else {
    print($_COOKIE["PHPSESSID"] . '<br>');
  }
  ?>
</body>

</html>