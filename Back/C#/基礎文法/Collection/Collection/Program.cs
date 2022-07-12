using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Collection
{
    class Program
    {
        static void Main(string[] args)
        {
            Program p = new Program();
            p.Lists();
            p.Hash();
            p.HashSets();
            
        }

        private void Lists()
        {
            List<int> a = new List<int>();
            a.Add(3); a.Add(2); a.Add(1); a.Add(1);
            // 1番目に4を挿入
            a.Insert(1, 4);
            for (int i = 0; i < a.Count; i++)
            {
                Console.WriteLine("a[{0}]={1} ", i, a[i]);
            }
        }
        private void Hash()
        {
            Dictionary<string, string> capital = 
                new Dictionary<string, string>();

            capital["日本"] = "東京";
            capital["イギリス"] = "ロンドン";
            capital["フランス"] = "パリ";
            capital["中国"] = "北京";
            Console.WriteLine("世界の首都");
            foreach(string s in capital.Keys)
            {
                Console.WriteLine("{0}の首都は{1}です", s, capital[s]);
            }
        }

        // 重複したデータは無視されるHashSet
        private void HashSets()
        {
            HashSet<int> t = new HashSet<int>();
            t.Add(1); t.Add(2); t.Add(3);
            foreach(int i in t)
            {
                Console.WriteLine("{0}", i);
            }
        }
    }
}
