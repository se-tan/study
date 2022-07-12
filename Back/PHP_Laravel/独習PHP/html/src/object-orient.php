<?php
require __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/import/use_trait.php';
require_once __DIR__ . '/import/class/include.php';
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

  <title>オブジェクト指向構文</title>
</head>

<body>
  <div class="container fluid my-2 pt-2">

    <div class="row">
      <h5 class="col lh-base border-end">
        <?php
        $p = new Person('山田', '太郎', 25);
        // print "私は{$p->firstName} {$p->lastName}({$p->age})です。<br />";
        $p->show();

        $person = new Person('Ada', 'Wong', 23);
        $person->bye = function (): void {
          print "Good Bye, {$this->Name}({$this->Age}).";
        };
        $person->bye();
        ?>
      </h5>

      <h5 class="col lh-base ps-3">
        <?php
        print 'The circle\'s area is ' . Area::circle(10) . ' ㎠.<br />';
        print 'Pi : ' . Area::$pi . "<br />";
        ?>
      </h5>
    </div>

    <hr />

    <div class="row">
      <h5 class="col lh-base border-end">
        <?php
        // シングルトンパターン
        // あるクラスのインスタンスを1つしか作成したくない時の定石
        $s1 = Mysingleton::getInstance();
        $s2 = Mysingleton::getInstance();
        print var_dump($s1 === $s2);
        ?>
      </h5>
      <h5 class="col lh-base ps-3 border-end">
        <?php
        $bp = new BusinessPerson('Chris', 'Redfield', 30);
        $bp->work();
        $bp->show();

        $f = new Foreigner('William', 'G', 'Marryblood', 18);
        $f->show();
        ?>
      </h5>
      <h5 class="col lh-base ps-3">
        <?php
        $eb = new EliteBusinessPerson('Jill', 'Valentine', 26);
        $eb->work();

        $ib = new IdleBusinessPerson('Albert', 'Wesker', 33);
        $ib->work();
        ?>
      </h5>
    </div>

    <hr />

    <div class="row">
      <h5 class="col lh-base border-end">
        <?php
        MyChild::staticTest();
        ?>
      </h5>
      <h5 class="col lh-base ps-3 border-end">
        <?php
        $figs = [];
        $figs[] = new Triangle(20, 3);
        $figs[] = new Squere(10, 2);
        $figs[] = new Triangle(13, 7);

        foreach ($figs as $fig) {
          if ($fig instanceof IFigure) {
            print get_class($fig) . ' : ' . $fig->getArea() . "㎠.<br />";
          }
        }
        ?>
      </h5>
      <h5 class="col lh-base ps-3">
        <?php
        $cls = new MyClass();
        $cls->execute(new class implements Runnable
        {
          public function run(): void
          {
            print 'process...';
          }
        });

        $fx = new Fax();
        $fx->run();
        $fx->send();
        ?>
      </h5>
    </div>

    <hr />

    <div class="row">
      <h5 class="col lh-base border-end">
        <?php
        $fp = new FaxPrinter();
        $fp->send();
        $fp->print();
        ?>
      </h5>
      <h5 class="col lh-base ps-3 border-end">
        <?php
        $cls = new MyTriangle();
        $cls->base = 10;
        $cls->height = 5;

        print $cls->getArea() . "㎠.<br />";
        ?>
      </h5>
      <h5 class="col lh-base ps-3">
        <?php
        $list = new FriendList();
        $list->add(new Person('Leon', 'Kenedy', 29));
        $list->add(new Person('Michel', 'Myard', 40));
        $list->add(new Person('Barry', 'Birton', 46));

        foreach ($list as $value) {
          print $value->show();
        }
        ?>
      </h5>
    </div>

    <hr />

    <div class="row">
      <h5 class="col lh-base border-end">
        <?php
        $pr = new PrimeIterator(100);
        foreach($pr as $p){
          print "{$p}<br />";
        }
        ?>
      </h5>
    </div>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>

</html>