<?php
require __DIR__ . '/vendor/autoload.php';
?>
<!doctype html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">

  <title>DB連携</title>
</head>

<body>
  <div class="container fluid my-2">
    <p class="display-5">
      <?php
      phpinfo();
      ?>
    </p>
    <div class="border-bottom my-3"></div>
    <p class="display-5 text-center">
      <?php
      $dsn = 'mysqli:dbname=selfphp;host=localhost;charset=utf8';
      $usr = 'root';
      $passwd = 'root';

      try {
        $db = new PDO($dsn, $usr, $passwd);
        print 'Connect success.';
      } catch (PDOException $e) {
        die("Connection error: {$e->getMessage()}");
      } finally {
        $db = null;
      }
      ?>
    </p>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>