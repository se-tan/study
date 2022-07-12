<?php
require __DIR__ . '/vendor/autoload.php';
require_once '../Encode.php';
session_start();

// Force download file.
// header('Content-Type: application/octet-stream');
// header('Content-Disposition: attachment; filename = "flower.jpg"');
// print file_get_contents('./doc/flower.jpg');
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

  <title>独習PHP</title>
</head>

<body>
  <div class="container-fluid my-3">
    <div class="card-group">

      <div class="card bg-light h-100">
        <div class="card-body">
          <h3 class="card-title">DateTime</h3>
          <p class="card-text">
            <?php
            $now = new DateTime("", new DateTimeZone('Asia/Tokyo'));
            print $now->format('Y年m月d日 H:i:s') . "<br>";

            $now->setTimestamp(time());
            print $now->format('Y年m月d日 H:i:s');
            ?>
          </p>
          <h3>createFromFormat</h3>
          <p>
            <?php
            $fmt = 'Y年m月d日 H時i分s秒';
            $time = '2021年12月21日 13時57分40秒';
            $dt = DateTime::createFromFormat($fmt, $time);
            print $dt->format('Y-m-d H:i:s');
            ?>
          </p>
          <h3>DirectoryIterator</h3>
          <p><a href="data/dir.php" class="text-decoration-none">Link</a></p>
        </div>
      </div>

      <div class="card bg-light h-100">
        <div class="card-body">
          <h3 class="card-title">HTTP</h3>

          <form class="form-control" method="POST" action="import/post.php">

            <div class="mb-3">
              <label class="form-label" for="name">Name : </label>
              <input id="name" class="form-control" type="text" name="name" size="15" />
            </div>

            <div class="mb-3">
              <input type="submit" class="btn btn-primary" value="送信" />
            </div>
          </form>
        </div>
      </div>

      <div class="card bg-light h-100">
        <div class="card-body">
          <form class="form-control" method="POST" action="import/check.php">
            <div class="mb-3">
              <p>What language do you often use?</p>
              <input id="php" type="checkbox" name="lang[]" value="PHP" />
              <label for="php" class="form-label">PHP</label>
              <input id="java" type="checkbox" name="lang[]" value="Java" />
              <label for="java" class="form-label">Java</label>
              <input id="python" type="checkbox" name="lang[]" value="Python" />
              <label for="python" class="form-label">Python</label>
            </div>
            <div class="mb-3">
              <input class="btn btn-primary" type="submit" value="COMMIT" />
            </div>
          </form>
        </div>
      </div>

    </div>

    <div class="table-responsive border mt-3 p-3">
      <p class="display-6">$_SERVER</p>
      <table class="table table-hover">
        <?php
        foreach ($_SERVER as $key => $value) {
          if (str_starts_with($key, 'HTTP_')) {
        ?>
            <tr valign="top">
              <th><?= e($key) ?></th>
              <td class="text-break"><?= e($value) ?></td>
            </tr>
        <?php
          }
        }
        ?>
      </table>
    </div>

    <div class="row">
      <div class="col">
        <div class="border my-3 p-3">
          <p class="display-6">$_ENV</p>
          <?php
          print $_ENV['PATH'];
          ?>
        </div>
      </div>

      <div class="col">
        <div class="border my-3 p-3">
          <p class="display-6">$_SERVER</p>
          <p>HTTP_HOST ： <?php print $_SERVER['HTTP_HOST']; ?></p>
          <p>PHP_SELF ： <?php print $_SERVER['PHP_SELF']; ?></p>
        </div>
      </div>

      <div class="col">
        <div class="border my-3 p-3">
          <?php
          // Cookie 
          // クライアント側に保存可能な小さなテキスト
          // HTTPはステートレス(状態を保存しない)プロトコルなので
          // 前回のリクエストを参照したりレスポンスを返すことができない
          ?>
          <p class="display-6">$_COOKIE</p>
          <form method="POST" action="import/cookie.php">
            <div class="mb-3">
              <label class="form-label" for="email">E-mail</label>
              <input class="form-control" id="email" type="text" name="email" size="40" value="<?= e($_COOKIE['email'] ?? '') ?>" />
            </div>
            <input class="btn btn-primary" type="submit" value="POST" />
          </form>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">

        <div class="card text-dark bg-light mb-3" style="max-width: 100%;">
          <div class="card-header">$_SESSION</div>
          <div class="card-body">
            <div class="card-text">
              <form method="POST" action="import/session.php">
                <div class="mb-3">
                  <label class="form-label" for="email">E-mail</label>
                  <input class="form-control" type="text" id="email" name="email" size="40" value="<?= e($_SESSION['email'] ?? '') ?>" />
                </div>
                <input class="btn btn-primary" type="submit" value="POST" />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card text-dark bg-light mb-3" style="max-width: 100%;">
          <div class="card-header">$_FILES</div>
          <div class="card-body">
            <div class="card-text">
              <form method="POST" action="import/file.php" enctype="multipart/form-data">
                <div class="mb-3">
                  <label class="form-label" for="upfile">File path :</label>
                  <input class="form-control" type="hidden" name="max_file_size" value="1000000" />
                  <input class="form-control" id="upfile" type="file" name="upfile" size="40" />
                </div>
                <input class="btn btn-primary" type="submit" value="Upload" />
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>


  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>