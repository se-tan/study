using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exception
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                for(int i = 0; i <= 5; i++)
                {
                    int a = getNum(i);
                    int b = 5;
                    Console.Write(a + " / " + b + " = ");
                    Console.WriteLine(calc(a, b));
                }
            }
            catch (DivideByZeroException e)
            {
                Console.WriteLine();
                Console.WriteLine("0による割り算発生");
            }
            catch (IndexOutOfRangeException e)
            {
                Console.WriteLine("配列の範囲外にアクセスしました");
            }
            finally
            {
                Console.WriteLine("終了");
            }
        }

        private static int calc(int a,int b)
        {
            return a / b;
        }

        public static int getNum(int index)
        {
            int[] num = { 1, 2, 3, 4 };
            return num[index];
        }
    }
}
