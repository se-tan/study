using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inheritance
{
    class Sub : Super
    {
        public Sub()
        {
            Console.WriteLine("Subクラスのコンストラクタ(引数無し)");
        }

        public Sub(int param) : base(param)
        {
            Console.WriteLine("Subクラスのコンストラクタ(引数：param={0})",
                param);
        }

        ~Sub()
        {
            Console.WriteLine("Subクラスのデストラクタ");
        }
    }
}
