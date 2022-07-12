using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inheritance
{
    class Super
    {
        private int param = 0;

        public Super()
        {
            Console.WriteLine("Superクラスのコンストラクタ(引数無し)");
        }

        public Super(int param)
        {
            Console.WriteLine(
                "Superクラスのコンストラクタ(引数：param={0})",
                param);
            this.param = param;
        }

        // デストラクタ
        ~Super()
        {
            Console.WriteLine("Superクラスのデストラクタ");
        }

        public void showParam()
        {
            Console.WriteLine("param = {0}", param);
        }
    }
}
