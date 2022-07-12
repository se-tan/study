using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Class_Object
{
    class Person2
    {
        // 自動実装プロパティ
        public string Name 
        {
            // 読み取り専用(setterはprivate)
            private set;get;
        }

        public int Age 
        {
            set;get;
        }

        public void SetAge_Name(string name, int age) 
        {
            Name = name;
            Age = age;
        }
    }
}
