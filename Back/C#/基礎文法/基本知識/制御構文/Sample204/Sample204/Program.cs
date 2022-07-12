using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample204
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.Write("さいころの目(1~6):");

			int dice = int.Parse(Console.ReadLine());

			if (1 <= dice && dice <= 6)
			{
				if (dice == 2 || dice == 4 || dice == 6)
				{
					Console.WriteLine("丁");
				}
				else
				{
					Console.WriteLine("半");

				}
			}
			else
			{
				Console.WriteLine("Invalid Value.");
			}

			Console.Write("Type number 1 to 3.");
			int num = int.Parse(Console.ReadLine());
			switch (num) 
			{
				case 1:
					Console.WriteLine("one");
					break;
				case 2:
					Console.WriteLine("two");
					break;
				case 3:
					Console.WriteLine("three");
					break;
				default:
					Console.WriteLine("Invalid value.");
					break;
			}
		}
	}
}
