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
        $sum = 0;
        for ($i = 1; $i <= 100; $i++) {
          $sum += $i;
          if ($sum > 1000) {
            break;
          }
        }
        print "合計が1,000を超えるのは、1~{$i}を加算したとき。<br />";

        for ($i = 1; $i <= 100; $i++) {
          if ($i % 2 !== 0) {
            continue;
          }
          $sum += $i;
        }
        $sum = number_format($sum);
        print "合計値は{$sum}。<br /><hr />";

        for ($i = 1; $i < 10; $i++) {
          for ($j = 1; $j < 10; $j++) {
            $result = $i * $j;
            print "$result &nbsp;";
          }
          print '<br />';
        }
        ?>
      </div>

      <div class="col">

      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>