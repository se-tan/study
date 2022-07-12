using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample205
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.Write("Type word:");
			string str = Console.ReadLine();

			if (str.Equals("Hello",
					StringComparison.OrdinalIgnoreCase))
			{
				Console.WriteLine("Helloが入力されました");
			}
			else 
			{
				Console.WriteLine("Helloと入力してください");
			}

			// 繰り返し構文(Javaとおんなじ)
			for (int i = 1; i <= 5; i++) 
			{
				Console.Write(i + " ");
			}
			Console.WriteLine();

			// 無限ループ
			Random rnd = new Random();
			Console.WriteLine("6が出たら終了");
			while (true) 
			{
				int dice = rnd.Next(1, 7);
				Console.WriteLine(dice);
				if (dice == 6) 
				{
					break;
				}
			}
			Console.WriteLine("End.");
		}
	}
}
