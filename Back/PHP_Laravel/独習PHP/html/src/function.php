<?php
require_once __DIR__ . '/import/include.php'
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
        <?php
        $data = 'WINGSproject.';
        $str = mb_strlen($data);
        print "String length : {$str}<br />";
        ?>
        <ur>
          <?php
          print "<li>" . mb_substr($data, 5, 2) . "</li>";  // 5文字目から2文字
          print "<li>" . mb_substr($data, 5) . "</li>";     // 先頭から5文字
          print "<li>" . mb_substr($data, 5, -4) . "</li>"; // 5文字目以降で、末尾4文字をカットしたもの
          print "<li>" . mb_substr($data, -6, 2) . "</li>"; // 後方6文字目から2文字を取得
          ?>
        </ur>

        <?php
        $arr = ['PHP is good language.', ' PHP is good for environment of execution server.'];
        $src = ['PHP', 'good'];
        $rep = ['PHP 8', 'wonderful'];
        print_r(str_replace($src, $rep, $arr, $cnt));
        print "<br /><i>We made {$cnt} times of replacement.</i>";
        ?>
        <hr />
        <?php
        $area = getTriangleArea(8, 10);
        print getTriangleArea(...[10, 5]) . "<br />";
        print "三角形の面積は{$area}㎠です<hr />";

        print checkStatic() . "<br />";
        print checkStatic();
        ?>

      </div>

      <div class="col">
        <?php
        // Reading from data.dat and output.
        print replaceContents('data.dat', '鈴木太郎', '2021年12月21日') . "<hr />";

        print total(3, 1, 2, 3, 4,) . "<hr />";

        $result = max_min(10, -2.12, 98, -9, 100);
        print_r($result);
        [$max, $min] = max_min(30, 1, 84, -5, 3, -2);
        print "<br />最大値 : {$max}、最小値 : {$min}<hr />";
        ?>
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
  </script>
</body>

</html>