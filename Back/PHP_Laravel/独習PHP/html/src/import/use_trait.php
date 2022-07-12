<?php
require_once 'Trait.php';

class Fax
{
  use MachineTrait;

  public function send(): void
  {
    print 'sending Fax...sended!<br />';
  }
}

class MyTriangle
{
  use AccessorTrait;

  private $props = [
    'base' => 1,
    'height' => 1
  ];

  public function getArea(): float
  {
    return $this->base * $this->height / 2;
  }
}