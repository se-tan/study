<?php
$user = 'admin';
$password = 'pass';

if (!isset($_SERVER['PHP_AUTH_USER'])) {
  header('WWW-Authenticate: Basic real="Private Page."');
  header('HTTP/1.0 401 Unauthorized.');

  die('You need to log in to show this page.');
} else {
  if ($_SERVER['PHP_AUTH_USER'] != $user || $_SERVER['PHP_AUTH_PW'] != $password) {
    header('WWW-AUthenticate: Basic realm="Private Page."');
    header('HTTP/1.0 401 Unauthorized.');

    die('You need to log in to show this page.');
  }
}

if (isset($_COOKIE["visited"])) {
  $count = $_COOKIE["visited"] + 1;
} else {
  $count = 1;
}

if ($count > 4) {
  $flag = setcookie("visited", $count, time() - 100);
} else {
  $flag = setcookie("visited", $count, time() + 180);
}

setcookie("buy[1]", "Television");
setcookie("buy[2]", "Video");
setcookie("buy[3]", "Audio");
?>

<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="stylesheet" href="../css/style.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <title>Function & Class</title>
</head>

<body>
  <header>
    <nav>
      <ul>
        <li class="nav-bar">
          <a href="/">Top</a>
        </li>
        <li class="nav-bar">
          <a href="syntax.php">Syntax</a>
        </li>
        <li class="nav-bar">
          <a href="function.php">Function</a>
        </li>
        <li class="nav-bar">
          <a href="authorization.php">Authorization</a>
        </li>
        <li class="nav-bar">
          <a href="session.php">Session</a>
        </li>
      </ul>
    </nav>
  </header>
  <div class="container">
    <section>
      <h1>Welcome to mypage.</h1>
      <?php
      if ($flag) {
        print('<p>Wrote cookie.</p>');
        print('<p>You have visited ' . $count . ' times.</p>');
      } else {
        print('<p>Failed to write cookie.</p>');
      }
      ?>
    </section>
    <div class="border_line"></div>
    <section>
      <h1>Array cookie</h1>
      <?php
      if (isset($_COOKIE["buy"])) {
        $val = $_COOKIE["buy"];
        print('<p>');
        print('The those you purchased are as follows.<br />');
        print($val[1] . '<br />');
        print($val[2] . '<br />');
        print($val[3] . '<br />');
        print('</p>');
      } else {
        print('<p>Setted the value.</p>');
      }
      ?>
    </section>
  </div>
  <footer>
    <?php
    define("COPYRIGHT", "Copyright (C) 2021 XXX. All Rights Reserved.");
    print COPYRIGHT;
    ?>
  </footer>
</body>

</html>