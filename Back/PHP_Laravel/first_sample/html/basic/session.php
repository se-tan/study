<?php
session_name("phpsession");
session_start();
$old_id = session_id();

session_regenerate_id();
$new_id = session_id();
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
      <?php
      if (!isset($_COOKIE["PHPSESSID"])) {
        print('This is your first visit. Start session.');
      } else {
        print('Already started session.<br />');
        print('Your session ID is ' . $_COOKIE["PHPSESSID"] . '.');
      }
      ?>
      <hr />
      <?php
      if (!isset($_SESSION["visited"])) {
        print('This is your first visit. Start session.');

        $_SESSION["visited"] = 1;
        $_SESSION["date"] = date('c');
      } else {
        $visited = $_SESSION["visited"];
        $visited++;

        print('You have visited for ' . $visited . ' times.<br />');

        $_SESSION["visited"] = $visited;

        if (isset($_SESSION["date"])) {
          print('Last visit date is ' . $_SESSION["date"] . '.<br />');
        }

        $_SESSION["date"] = date('c');
      }
      ?>
      <p>
        <a class="logout" href="./session_2.php">Log Out</a>
      </p>
    </section>
    <div class="border_line"></div>
    <section>
      <h1>Get Session name</h1>
      <p>
        <?php
        print('Current Session name is ' . session_name() . '.');
        ?>
      </p>
      <hr>
      <h1>Get Session ID</h1>
      <p>
        <?php
        if (!isset($_COOKIE[session_name()])) {
          print('This is first visit.Starting session...');
        } else {
          print('Already started session.<br>');
          print('Cookie is ' . $_COOKIE[session_name()] . '<br>.');
          print('session_id() is ' . session_id() . '.<br>');
        }
        ?>
      </p>
      <hr>
      <h1>Regenerate session ID</h1>
      <p>
        <?php
        if (!isset($_COOKIE[session_name()])) {
          print('This is first visit.Starting session...');
        } else {
          print('Last session ID is ' . $old_id . '.<br>');
          print('Current session ID is ' . $new_id . '.<br>');
        }
        ?>
      </p>
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