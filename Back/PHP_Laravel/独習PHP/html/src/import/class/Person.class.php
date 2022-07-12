<?php
class Person
{
  protected string $Name;
  protected int $Age;

  // 追加のメソッド群を格納する配列
  private array $methods = [];

  public function __construct(string $firstName, string $lastName, int $age)
  {
    $this->setName($firstName, $lastName);
    $this->setAge($age);
  }
  public function __destruct()
  {
    // print "<p>" . __CLASS__ . " object has been deleted.</p>";
  }

  // 指定のメソッドを登録
  public function __set(string $name, Closure $method): void
  {
    $this->methods[$name] = $method->bindTo($this, self::class);
  }

  public function __call(string $name, array $args): mixed
  {
    if (!array_key_exists($name, $this->methods)) {
      throw new Exception("${name} method is not existed.");
    }
    return $this->methods[$name](...$args);
  }

  public function getName(): string
  {
    return $this->Name;
  }
  public function setName(string $firstName, string $lastName): void
  {
    if (mb_strlen($firstName) == 0 || mb_strlen($lastName) == 0) {
      throw new Exception('引数は自然数で指定します。');
    }
    $this->Name = $firstName . ' ' . $lastName;
  }
  public function getAge(): int
  {
    return $this->Age;
  }
  public function setAge(int $age): void
  {
    if ($age < 0) {
      throw new Exception('Invalid argument.');
    }
    $this->Age = $age;
  }

  public function show(): void
  {
    print "function: I'm {$this->Name}({$this->Age}).<br />";
  }
}

class Foreigner extends Person
{
  public string $middleName;

  public function __construct(string $firstName, string $middleName, string $lastName, int $age)
  {
    parent::__construct($firstName, $lastName, $age);
    $this->Name = str_replace(' ', ' ' . $middleName . ' ', $this->Name);
  }
}

class BusinessPerson extends Person
{
  public /* final */ function work(): void
  {
    print "{$this->Name}({$this->Age}) is working.<br />";
  }
}


class EliteBusinessPerson extends BusinessPerson
{
  public function work(): void
  {
    print "{$this->Name}({$this->Age}) works hard.<br />";
  }
}


class IdleBusinessPerson extends BusinessPerson
{
  public function work(): void
  {
    parent::work();
    print 'But, he is lazy fellow...';
  }
}
