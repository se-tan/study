using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inheritance
{
    class Program
    {
        static void Main(string[] args)
        {
            Calculator c1 = new Calculator();
            c1.Num_1 = 10;
            c1.Num_2 = 3;
            c1.add();
            c1.sub();

            ExCalculator c2 = new ExCalculator();
            c2.Num_1 = 10;
            c2.Num_2 = 3;
            c2.add();
            c2.sub();
            c2.mul();
            c2.sub();

            // Super/Sub
            Sub s1 = new Sub();
            s1.showParam();
            Sub s2 = new Sub(100);
            s2.showParam();

            // Parent-Child
            Parent p = new Parent();
            p.Foo();
            Child c = new Child();
            c.Foo();

            // Crow-Sparrow
            Bird[] b = new Bird[2];
            b[0] = new Crow();
            b[1] = new Sparrow();
            for(int i = 0; i < b.Length; i++)
            {
                Console.Write(b[i].Name + " : ");
                b[i].Sing();
            }

            // VectorBase-Vector
            Vector v = new Vector();
            v.X = 0.2;
            v.Y = 0.1;
            Console.WriteLine("v=({0},{1})", v.X, v.Y);

            // CellPhone
            CellPhone cp = new CellPhone("hoge@example.com",
                "090-134-5678");
            cp.Call("011-123-4567");
            cp.SendMail("fuge@example.com");

            // 電話I/Fでインスタンスにアクセス
            IPhone phone = (IPhone)cp;
            phone.Call("011-789-4568");
            // phone.SendMailはできない

            IEmail mail = (IEmail)cp;
            mail.SendMail("bar@email.com");
            // mail.Callはできない
        }
    }
}