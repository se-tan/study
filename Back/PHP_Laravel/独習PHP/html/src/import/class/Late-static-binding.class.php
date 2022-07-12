<?php
class MyParent
{
  public static function show()
  {
    print __CLASS__ . "<br />";
  }

  public static function staticTest()
  {
    // 定義時に解決される
    self::show();
    // 実行時、「直近にコールされたクラス」を参照する
    // 遅延的に評価され、主に静的メソッドで利用される(遅延静的束縛)
    static::show();
  }
}

class MyChild extends MyParent
{
  public static function show()
  {
    print __CLASS__;
  }
}
