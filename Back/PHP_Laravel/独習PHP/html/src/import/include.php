<?php
function getTriangleArea(float $base, float $height): float
{
  return $base * $height / 2;
};

function diamond(float $diagonal1, float $diagonal2): float
{
  return $diagonal1 * $diagonal2 / 2;
}

// Varidic arguments
function replaceContents(string $path, string ...$args): string
{
  // Reading from designated path.
  $data = file_get_contents($path);
  // Process variadic arguments in sequence and replace
  for ($i = 0; $i < count($args); $i++) {
    $data = str_replace('{' . ($i) . '}', $args[$i], $data);
  }
  return $data;
}

function total(float $init, float ...$args): float
{
  $result = $init;
  for ($i = 0; $i < count($args); $i++) {
    $result += $args[$i];
  }
  return $result;
}

function max_min(float ...$args): array
{
  return [max($args), min($args)];
}

// Recursive function
function factorial(int $num): int
{
  if ($num !== 0) {
    return $num * factorial($num - 1);
  }
  return 1;
}

// Higher-order function
function myArrayWalk(array $arr, callable $func): void
{
  // process $arr in sequence.
  foreach ($arr as $key => $value) {
    $func($value, $key);
  }
}
// User-defined function to process array
function showItem(mixed $value, int | string $key): void
{
  print "{$key} : {$value}<br />";
}

// Generator
function myGen()
{
  // yield は処理を一時停止し、
  // 再度呼び出されたときは、その時点から処理を再開する
  yield 'あいうえお';
  yield 'かきくけこ';
  yield 'さしすせそ';
}
function readLines(string $path)
{
  $i = 0;
  $file = fopen($path, 'rb') or die('Not Found file.');

  while ($line = fgets($file, 1024)) {
    $i++;
    yield $line;
  }
  fclose($file);
  return $i;
}

function Authentication()
{
  if (!isset($_SERVER['PHP_AUTH_USER'])) {
    header('HTTP/1.1 401 Unauthorized.');
    header('WWW-Authenticate: Basic realm="SelfPHP"');
    print 'この画面へのアクセスは認められませんでした';
    die();
  } else {
    if (
      $_SERVER['PHP_AUTH_USER'] === 'admin_usr' &&
      $_SERVER['PHP_AUTH_PW'] === 'admin_pass'
    ) {
      print '正しく認証が行われました';
    } else {
      print 'ユーザー名またはパスワードが間違っています';
      $_SERVER['PHP_AUTH_USER'] = '';
      $_SERVER['PHP_AUTH_PW'] = '';
    }
  }
}
