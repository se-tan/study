using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inheritance
{
    class Calculator
    {
        // 以下フィールドはサブクラスExCalculatorからはアクセスできる
        protected int num_1;
        protected int num_2;

        public int Num_1
        {
            set { num_1 = value; }
            get { return num_1; }
        }

        public int Num_2
        {
            set { num_2 = value; }
            get { return num_2; }
        }

        public void add()
        {
            Console.WriteLine("{0} + {1} = {2}",
                num_1, num_2, num_1 + num_2);
        }

        public void sub()
        {
            Console.WriteLine("{0} - {1} = {2}",
                num_1, num_2, num_1 - num_2);
        }
    }
}
