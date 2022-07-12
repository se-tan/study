using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Class_Object
{
    class Program
    {
        static void Main(string[] args)
        {
            // Personクラス
            Person p1, p2;
            p1 = new Person();
            p2 = new Person();
            p1.Name = "山田太郎";
            p1.Age = 19;
            p2.SetAgeAndName("佐藤花子", 23);

            p1.ShowAgeAndName();
            p2.ShowAgeAndName();
            Console.WriteLine("名前：{0} 年齢：{1}", p2.Name, p2.Age);
            // ----- Personクラスここまで -----

            // Rectangleクラス
            Rectangle rec = new Rectangle();
            Console.Write("幅(cm)：");
            rec.width = double.Parse(Console.ReadLine());
            Console.Write("高さ(cm)：");
            rec.height = double.Parse(Console.ReadLine());
            
            Console.WriteLine("面積：{0}cm^2", rec.GetArea());
            Console.WriteLine("周の長さ：{0}cm", rec.GetPerimeter());
            // ----- Rectangleクラスここまで -----
            
            // Bingoクラス
            Console.Write("ビンゴのマスの縦・横のサイズを入力");
            int size = int.Parse(Console.ReadLine());
            Bingo card = new Bingo(size);
            card.Show();
            // ----- Bingoクラスここまで -----

            // Preson2クラス
            Person2 p = new Person2();
            p.SetAge_Name("鈴木太郎", 26);
            p.Age = 32;
            // p.Name = 36;
            Console.WriteLine("名前：{0} 年齢：{1}", p.Name, p.Age);
            // ----- Person2クラスここまで -----

            // Studentクラス
            Student[] students = new Student[3];
            students[0] = new Student("John", 3, 18);
            students[1] = new Student("Elly", 2, 17);
            students[2] = new Student("Alex", 1, 16);

            foreach(Student s in students) 
            {
                s.ShowInfomation();
            }
            // ----- Studentクラスここまで -----

            // StaticMemberクラス
            StaticMember[] mem = new StaticMember[2];
            StaticMember.ShowNumber();
            for(int i = 0; i < mem.Length; i++)
            {
                mem[i] = new StaticMember(i * 100);
                StaticMember.ShowNumber();
            }
        }
    }
}
