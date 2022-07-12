using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample301
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("数当てゲーム");
			Console.WriteLine("0から10の数値を入力してください｡");
			Random rnd = new Random();

			int n = rnd.Next(1, 11);
			int i = 1;
			while (i <= 3) 
			{
				Console.Write("{0}回目", i);
				int ans = int.Parse(Console.ReadLine());
				if (ans < n)
				{
					Console.WriteLine("小さすぎます");
				}
				else if (ans > n)
				{
					Console.WriteLine("大きすぎます");
				}
				else 
				{
					Console.WriteLine("正解！");
					break;
				}
				i++;
			}
			if (i == 4) 
			{
				Console.WriteLine("GAME OVER!");
				Console.WriteLine("正解は{0}", n);
			}

			Random rnd2 = new Random();
			int max = 0;
			int min = 101;

			for (int j = 1; j <= 10; j++) 
			{
				int m = rnd2.Next(1, 101);
				Console.Write("{0} ", m);
				if (m > max) 
				{
					max = m;
				}
				if (m < min) 
				{
					min = m;
				}
			}
			Console.WriteLine();

			Console.WriteLine("最大値：{0}", max);
			Console.WriteLine("最小値：{0}", min);

		}
	}
}
