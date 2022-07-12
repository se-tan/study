using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Class_Object
{
    class Bingo
    {
        private int[,] data;
        private int size;

        public Bingo() : this(5)
        {
        }

        public Bingo(int size)
        {
            Init(size);
        }

        private void clear()
        {
            for(int i = 0; i < size; i++)
            {
                for(int j = 0; j < size; j++)
                {
                    data[i, j] = 0;
                }
            }
        }

        private void shuffle()
        {
            Random rnd = new Random();
            int num = 1;
            while (num <= size * size)
            {
                while (true)
                {
                    int m = rnd.Next(size);
                    int n = rnd.Next(size);

                    if (data[m, n] == 0)
                    {
                        data[m, n] = num;
                        num++;
                        break;
                    }
                }
            }
        }

        public void Init(int size)
        {
            this.size = size;
            data = new int[size, size];
            clear();
            shuffle();
        }

        public void Show() 
        { 
            for(int i = 0; i < data.GetLength(0); i++) 
            { 
                for(int j = 0; j < data.GetLength(1); j++) 
                {
                    Console.Write("{0,2:d}|", data[i, j]);
                }
                Console.WriteLine();

                for (int j = 0; j < data.GetLength(1); j++) 
                {
                    Console.Write("---");
                }
                Console.WriteLine();
            }
        }
    }
}
