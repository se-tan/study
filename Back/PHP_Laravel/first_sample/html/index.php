<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="stylesheet" href="css/style.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <title>String Literal</title>
</head>

<body>
  <header>
    <nav>
      <ul>
        <li class="nav-bar">
          <a href="/">Top</a>
        </li>
        <li class="nav-bar">
          <a href="basic/syntax.php">Syntax</a>
        </li>
        <li class="nav-bar">
          <a href="basic/function.php">Function</a>
        </li>
        <li class="nav-bar">
          <a href="basic/authorization.php">Authorization</a>
        </li>
        <li class="nav-bar">
          <a href="basic/session.php">Session</a>
        </li>
      </ul>
    </nav>
  </header>

  <div class="main-container">
    <?php
    if (strpos($_SERVER["HTTP_USER_AGENT"], "MSIE") !== true) {
    ?>
      <center>
        <h3>strpos returned false.</h3>
      </center>
      <center><b>You don't use Internet Explorer.</b></center>
    <?php
    } else {
    ?>
      <center>
        <h3>strpos returned true.</h3>
      </center>
      <center><b>You use Internet Explorer.</b></center>
    <?php
    };
    ?>
    <hr />
    <form action="action.php" method="post">
      Name: <input type="text" name="name" />
      Age: <input type="text" name="age" />
      <input type="submit" />
    </form>

    <textarea>
      Hi, <?php echo htmlspecialchars($_POST['name']); ?>.
      You are <?php echo (int)$_POST['age']; ?> years old.
    </textarea>
    <hr />

    <p>
      <?php
      $data = [1, 2, 3, 4, 5];
      [$_, $a, $_, $b, $c] = $data;
      print ($_) . "<br />";
      print($a);
      ?>
    </p>
    <pre>
      <?php
      $arry1 = ['Apple' => 'Red', 'Orange' => 'Yellow', 'Melon' => 'Green'];
      $arry2 = ['Grape' => 'Purple', 'Apple' => 'Green', 'Strawberry' => 'Red'];
      $result = $arry1 + $arry2;
      print_r($result);
      ?>
    </pre>
  </div>
  <footer>
    <?php
    define("COPYRIGHT", "Copyright (C) 2021 XXX. All Rights Reserved.");
    print COPYRIGHT;
    ?>
  </footer>
</body>

</html>