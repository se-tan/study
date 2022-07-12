<?php require_once '../../Encode.php'; ?>
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
  <div class="container fluid">
    <section>
      <h1 class="display-5">Hi、<?= e($_POST['name']) ?>！</h1>
    </section>
    <section>
      <h3><a class="text-decoration-none" href="link.php?keyword=<?= urlencode('クエリ情報 (&%)') ?>">Comfirm result.</a></h3>
    </section>
  </div>
</body>

</html>