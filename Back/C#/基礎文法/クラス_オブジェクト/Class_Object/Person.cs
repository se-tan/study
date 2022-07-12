using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Class_Object
{
    class Person
    {
        // フィールド
        private string name ="";
        private int age = 0;

        // メソッド
        public void ShowAgeAndName() 
        {
            Console.WriteLine("名前：{0}　年齢：{1}", name, age);
        }

        public void SetAgeAndName(string name, int age) 
        {
            this.name = name;
            this.age = age;
        }

        // プロパティ
        public string Name
        {
            set { name = value; }   // setアクセサ
            get { return name; }    // getアクセサ
        }

        public int Age
        {
            set { age = value; }
            get { return age; }
        }
    }
}
