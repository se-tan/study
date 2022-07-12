using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practice01
{
	class Program
	{
		static void Main(string[] args)
		{
			int[] a = new int[5];

			// 数値の入力
			for (int i = 0; i < a.Length; i++) 
			{
				Console.Write("{0}つ目の数値：", i + 1);
				int n = int.Parse(Console.ReadLine());
				a[i] = n;
			}

			// 入力した数値を表示
			for (int i = 0; i < a.Length; i++)
			{
				Console.Write(a[i] + " ");
			}
			Console.WriteLine();

			int max = a[0];
			int min = a[0];

			for (int i = 1; i < a.Length; i++) 
			{
				if (a[i] > max) 
				{
					max = a[i];
				}
				if (a[i] < min) 
				{
					min = a[i];
				}
			}
			Console.WriteLine("最大値：{0}", max);
			Console.WriteLine("最小値：{0}", min);
		}
	}
}
