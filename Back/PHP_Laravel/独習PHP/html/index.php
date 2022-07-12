<?php
require __DIR__ . '/src/import/include.php';

// Authentication();

/* $_SERVER['HTTP_HOST'] : Server's hostname. */
/* $_SERVER['PHP_SELF']  : Path of running script. */
// header('Location: http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']) . 'src/library.php');
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

  <title>独習PHP</title>

  <style>
    * {
      font-family: 'Roboto Slab', serif;
    }
  </style>
</head>

<body>
  <div class="container-fluid my-3">
    <div class="row">
      <div class="col">
        <h1>foreach sentence</h1>
        <?php
        $data = ['Barry', 'Albert', 'Chris', 'Jill', 'Loen'];
        foreach ($data as $val) {
          print "<p>Name: " . $val . "</p>";
        }
        print "<hr />";
        ?>
      </div>

      <div class="col">
        <h1>ByRef</h1>
        <?php
        print_r($data);
        ?>

        <br />

        <?php
        foreach ($data as &$val) {
          $val = "New" . $val;
        }
        print_r($data);
        ?>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>