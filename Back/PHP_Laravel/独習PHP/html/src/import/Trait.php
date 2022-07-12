<?php
trait MachineTrait
{
  private string $starting = 'Starting...Run!<br />';

  public function run(): void
  {
    print $this->starting;
  }
}

trait AccessorTrait
{
  public function __set(string $name, mixed $value): void
  {
    if ($this->props[$name]) {
      $this->props[$name] = $value;
    } else {
      throw new Exception("{$name} property does not exist.");
    }
  }

  public function __get(string $name): mixed
  {
    if ($this->props[$name]) {
      return $this->props[$name];
    } else {
      throw new Exception("{$name} property does not exist.");
    }
  }
}
