<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="stylesheet" href="../css/style.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <title>Function & Class</title>
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
      <h1>Usage of function</h1>
      <p>
        <?php
        function check($kamoku, $score)
        {
          print $kamoku . 'の結果 : ';
          if ($score > 75) {
            print 'You passed.';
          } else {
            print 'You failed.';
          }
          print '<br />';
        }

        $math = 84;
        $english = 62;
        $japanese = 78;
        check('数学', $math);
        check('英語', $english);
        check('国語', $japanese);
        ?>
      </p>
      <hr />
      <h1>Arguments</h1>
      <p>
        <?php
        function avarage($num1, $num2)
        {
          $result = ($num1 + $num2) / 2;
          print $num1 . 'と' . $num2 . 'の平均は' . $result . 'です<br />';
        }

        avarage(10, 8);
        avarage(3, 23);
        ?>
      </p>
      <hr />
      <h1>Return value</h1>
      <p>
        <?php
        function plus($num1, $num2)
        {
          $sum = $num1 + $num2;
          return $sum;
        }

        $sum = plus(10, 8);
        print '10 + 8の結果は' . $sum . 'です<br />';

        print '7 + 14の結果は' . plus(7, 14) . 'です';
        ?>
      </p>
    </section>
    <div class="border_line"></div>
    <section>
      <h1>Class</h1>
      <p>
        <?php
        $tv = new Television();
        // $tv->setChannel(11);
        $tv->dispChannel();

        class Television
        {
          /* Acess modifier */
          // public    : the property or method can be accessed from everywhere.
          // privete   : the property or method can ONLY be accessed within the class.
          // protected : the property or method can be accessed 
          //             within the class and by classes derived from that class.
          private $channelNo;

          const MAX_CHANNEL = 12;
          const MIN_CHANNEL = 1;
          const ERROR_MSG = 'please set the channel between 1 and 12.' . '<br />';

          function __construct()
          {
            $this->channelNo = 8;
          }

          function dispChannel()
          {
            if($this->channelNo != null){
              print('Current channel is ' . $this->channelNo . '.');
            }
          }
          // function setChannel($channel)
          // {
          //   if (($channel >= self::MIN_CHANNEL) and
          //     ($channel <= self::MAX_CHANNEL)
          //   ) {
          //     $this->channelNo = $channel;
          //   } else {
          //     print '<span class="err">'.self::ERROR_MSG.'</span>';
          //   }
          // }
        }
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