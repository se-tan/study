using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Constructor
{
    class Program
    {
        static void Main(string[] args)
        {
            Person per1, per2;
            per1 = new Person();
            per2 = new Person("太田 隆", 29);

            per1.Name = "斎藤花子";
            per1.Age = 18;
            per1.ShowStatus();
            per2.ShowStatus();
        }
    }
}
