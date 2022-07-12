<?php
class Mysingleton
{
  private static self $instance;

  private function __construct()
  {
  }

  public static function getInstance(): self
  {
    if (!isset(self::$instance)) {
      self::$instance = new Mysingleton();
    }
    return self::$instance;
  }
}
