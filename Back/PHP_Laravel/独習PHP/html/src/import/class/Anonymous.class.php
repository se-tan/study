<?php

use Runnable as GlobalRunnable;

interface Runnable
{
  function run();
}

class MyClass
{
  public function __construct()
  {
  }
  public function execute(Runnable $rc): void
  {
    print 'start...';
    $rc->run();
    print 'end...<br />';
  }
}
