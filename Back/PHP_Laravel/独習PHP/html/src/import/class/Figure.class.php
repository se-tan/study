<?php
require_once __DIR__ . '/interface/IFigure.php';

class Triangle implements IFigure
{
  
  private float $width;
  private float $height;

  public function __construct(float $width, float $height)
  {
    $this->width = $width;
    $this->height = $height;
  }

  public function getArea(): float
  {
    return $this->width * $this->height / 2;
  }
}

class Squere implements IFigure
{
  private float $width;
  private float $height;

  public function __construct(float $width, float $height)
  {
    $this->width = $width;
    $this->height = $height;
  }

  public function getArea(): float
  {
    return $this->width * $this->height;
  }
}
