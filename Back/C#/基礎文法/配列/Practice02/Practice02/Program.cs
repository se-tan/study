using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice02
{
	class Program
	{
		static void Main(string[] args)
		{
			// 変数初期化
			Random rnd = new Random();
			int[] n = new int[10];

			// 乱数の代入と表示
			for (int i = 0; i < n.Length; i++) 
			{
				int num = rnd.Next(1, 101);
				n[i] = num;
				Console.Write("{0} ", num);
			}
			Console.WriteLine();

			// 偶数と奇数の振り分け
			string[] names = { "偶数：", "奇数：" };
			for (int i = 0; i <= 1; i++) 
			{
				Console.Write(names[i]);
				for (int j = 0; j < n.Length; j++) 
				{
					if (n[j] % 2 == i)
					{
						Console.Write("{0} ", n[j]);
					}
				}
				Console.WriteLine();				
			}
		}
	}
}
