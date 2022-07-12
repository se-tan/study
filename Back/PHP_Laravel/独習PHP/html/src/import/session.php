<?php
session_start();
$_SESSION['email'] = $_POST['email'];
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
  <link rel="stylesheet" href="../css/style.css">

  <title>独習PHP</title>
</head>

<body>
  <div class="container fluid my-2">
    <header class="sticky-top">
      <p><a href="../library.php" class="text-decoration-none">Back</a></p>
    </header>
    <section class="t-2">
      <p class="display-6 my-3">Saved session.</p>
      <p><a href="session_destroy.php" class="text-decoration-none">Destroy session.</a></p>
    </section>
    <section>

    </section>
  </div>
</body>

</html>