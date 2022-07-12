<?php
interface IFax
{
  function send();
}

interface IPrinter
{
  function print();
}

trait FaxTrait
{
  public function send(): void
  {
    print 'sending Fax...sended!<br />';
  }
}

trait PrinterTrait
{
  public function print(): void
  {
    print 'printing...completed!<br />';
  }
}

class FaxPrinter implements IFax, IPrinter
{
  use FaxTrait, PrinterTrait;
}
