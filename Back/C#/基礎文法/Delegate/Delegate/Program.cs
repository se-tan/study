using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delegate
{
    // デリゲート：他のクラスのメソッドを参照するオブジェクト
    delegate void Operation(int a, int b);
    class Calc
    {
        public void sub(int a, int b)
        {
            Console.WriteLine("{0} - {1} = {2}", a, b, a - b);
        }
    }

    class Program
    {
        delegate void Action(int a);

        static void Func1(int a)
        {
            Console.WriteLine("a={0}", a);
        }

        static void Func2(int b)
        {
            Console.WriteLine("b={0}", b * 2);
        }

        static void Func3(int c)
        {
            Console.WriteLine("c={0}", c * 3);
        }

        static void Add(int a, int b)
        {
            Console.WriteLine("{0} + {1} = {2}", a, b, a + b);
        }
        static void Main(string[] args)
        {
            Calc c = new Calc();
            // デリゲートの設定
            Operation o1 = new Operation(Add);
            Operation o2 = new Operation(c.sub);

            // デリゲートで設定したメソッドの呼び出し
            o1(2, 1);
            o2(2, 1);

            Action a = new Action(Func1);
            a += new Action(Func2);
            a += new Action(Func3);
            a(3);
        }
    }
}
