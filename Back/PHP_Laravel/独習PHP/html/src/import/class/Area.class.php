<?php
class Area
{
  public static float $pi = 3.14;
  // Class constance
  public const PI = 3.14;

  public static function circle(float $radius): float
  {
    return pow($radius, 2) * self::$pi;
  }
}
