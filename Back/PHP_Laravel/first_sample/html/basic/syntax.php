<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="stylesheet" href="../css/style.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <title>Control Syntax</title>
</head>

<body>
  <header>
    <nav>
      <ul>
        <li class="nav-bar">
          <a href="/">Top</a>
        </li>
        <li class="nav-bar">
          <a href="syntax.php">Syntax</a>
        </li>
        <li class="nav-bar">
          <a href="function.php">Function</a>
        </li>
        <li class="nav-bar">
          <a href="authorization.php">Authorization</a>
        </li>
        <li class="nav-bar">
          <a href="session.php">Session</a>
        </li>
      </ul>
    </nav>
  </header>
  <div class="container">
    <section>
      <h1>if sentence</h1>
      <p>
        <?php
        $old = 30;
        if ($old >= 20) {
          print 'Your age is more than 20 years.';
        }
        ?>
      </p>
      <hr />
      <h1>Switch sentence</h1>
      <p>
        <?php
        $pref = '千葉';
        switch ($pref) {
          case '東京':
            break;
          case '大阪':
            break;
          case '京都':
            break;
          default:
            print $pref;
        }
        ?>
      </p>
      <hr />
      <h1>Ternary oparator</h1>
      <p>
        <?php
        $lang = 'Jp';
        $msg = $lang == 'Jp' ? 'こんにちは' : 'Hello';
        print $msg . '<br />';
        $lang = 'En';
        print $lang == 'Jp' ? 'こんにちは' : 'Hello';
        ?>
      </p>
    </section>
    <div class="border_line"></div>
    <section>
      <h1>foreach sentence</h1>
      <p>
        <?php
        $preflists = array('Tokyo', 'Osaka', 'Chiba');

        foreach ($preflists as $pref_) {
          print $pref_ . '<br />';
        }
        ?>
      </p>
      <p>
        <?php
        $preflist = array('Tokyo' => '東京', 'Osaka' => '大阪');

        foreach ($preflist as $key => $value) {
          print $key . ' => ' . $value . '<br />';
        }
        ?>
      </p>
      <p>
        <?php
        $pricelist = array(80, 100, 120);

        foreach ($pricelist as &$value) {
          $value *= 1.08;
        }
        unset($value);

        foreach ($pricelist as $value) {
          print $value . ' ';
        }
        ?>
      </p>
      <hr />
      <h1>Array</h1>
      <p>
      <pre>
        <?php
        $result[0] = 85;
        $result[1] = 92;
        $result[2] = 68;

        print_r($result);
        ?>
      </pre>
      </p>
      <p>
        <?php
        $maker = array('富士通', 'NEC', 'Sony', 'Sharp');
        $type = array('Note', 'Desktop');

        $pc = array($maker, $type);

        print $pc[0][1];
        print '<br />';
        print $pc[1][0];
        ?>
      </p>
    </section>
  </div>
  <footer>
    <?php
    define("COPYRIGHT", "Copyright (C) 2021 XXX. All Rights Reserved.");
    print COPYRIGHT;
    ?>
  </footer>
</body>

</html>