using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace 配列
{
	class Program
	{
		static void Main(string[] args)
		{
			// 配列の初期化
			double[] d = new double[3];
			d[0] = 1.2;
			d[1] = 3.7;
			d[2] = 4.1;

			double sum, avg;
			sum = 0.0;
			
			for (int i = 0; i < d.Length; i++) 
			{
				Console.Write(d[i] + " ");
				sum += d[i];
			}
			
			Console.WriteLine();
			
			avg = sum / d.Length;
			Console.WriteLine("合計値：{0}", sum);
			Console.WriteLine("平均値：{0}", avg);

			// foreach文
			int[] m = { 1, 2, 3, 4, 5 };
			foreach (int i in m) 
			{
				Console.Write("{0} ", i);
			}
			Console.WriteLine();

			// 多次元配列
			int[,] a = new int[3, 4];
			int j, k;
			for (j = 0; j < 3; j++) 
			{
				for (k = 0; k < 4; k++) 
				{
					a[j, k] = j + k;
				}
			}
			for (j = 0; j < 3; j++) 
			{
				for (k = 0; k < 4; k++) 
				{
					Console.Write("a[{0},{1}]={2} ",
						j, k, a[j, k]);
				}
				Console.WriteLine();
			}
		}
	}
}
