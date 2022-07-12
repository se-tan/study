<?php
require_once __DIR__.'import/include.php';
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

    .card {
      max-width: 100%;
      background: lightgrey;
      margin-bottom: 10px;
    }
  </style>
</head>

<body>
  <div class="container-fluid my-3">
    <div class="row">
      <div class="col">

        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Recursive function</h3>
            <p class="card-text">
              <?php
              print factorial(6)
              ?>
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Variable fucntion</h3>
            <p class="card-text">
              The triangle area is
              <?php
              $name = 'getTriangleArea';
              $area = $name(10, 5);
              print "{$area}㎠.";
              ?>
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Higher-order function</h3>
            <p class="card-text">
              <?php
              $data = ['杉山', '長田', '杉沼', '和田', '土井'];
              myArrayWalk($data, 'showItem');
              ?>
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Lambda function</h3>
            <p class="card-text">
              <?php
              myArrayWalk(
                $data,
                function (mixed $value,  int | string $key): void {
                  print "{$key} : {$value}<br />";
                }
              )
              ?>
            </p>
          </div>
        </div>

      </div>

      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">use sentence</h3>
            <p class="card-text">
              <?php
              $val = [100, 50, 10, 5];
              $results = 0;
              // Inherits variable $results from parent scope.
              myArrayWalk($val, function ($value, $key) use (&$results) {
                $results += $value;
              });
              print "Total : {$results}";
              ?>
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Arrow function</h3>
            <p class="card-text">
              <?php
              $keys = ['十', '百', '千', '万', '億', '兆', '京', '垓', '杼', '穣', '溝', '潤', '正', '載', '極'];
              $datas = ['億', '穣', '極'];

              // アロー関数は、親スコープの変数を暗黙的に利用可能(値渡し)
              print usort($datas, fn ($a, $b) => array_search($a, $keys) <=> array_search($b, $keys));
              ?>
            </p>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h3 class="card-title">Generator</h3>
            <p class="card-text">
              <?php
              foreach (myGen() as $value) {
                print $value . "<br>";
              }
              ?>
            </p>
            <hr>
            <p>
              <?php
              $gen = readLines('data/sample.dat');
              foreach ($gen as $line) {
                print $line . "<br>";
              }
              print "{$gen->getReturn()} 行ありました。"
              ?>
            </p>
          </div>
        </div>

      </div>

      <div class="col">

        <div class="card">
          <div class="card-body">
            <h3 class="card-title"></h3>
            <p class="card-text">

            </p>
          </div>
        </div>

      </div>

    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>