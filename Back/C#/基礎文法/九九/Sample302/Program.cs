using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample302
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("九九の表示");
			for (int i = 1; i <= 9; i++) 
			{
				for (int m = 1; m <= 9; m++) 
				{
					Console.Write("{0} × {1} = {2,2:d} ",
						i, m, i * m);
				}
				Console.WriteLine();
			}
		}
	}
}
