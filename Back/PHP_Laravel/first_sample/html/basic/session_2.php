<?php
session_start()
?>

<!DOCTYPE html>
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
  print('Show list of session variable.');
  print_r($_SESSION);
  print('<br />');

  print('Show session ID.<br />');
  print($_COOKIE["PHPSESSID"] . '<br />');

  print('<p>Log out.</p>');

  $_SESSION = array();

  if (isset($_COOKIE["PHPSESSID"])) {
    setcookie("PHPSESSID", '', time() - 1800, '/');
  }

  session_destroy();
  ?>

  <p><a class="logout" href="session_3.php">Check logout.</a></p>
</body>

</html>