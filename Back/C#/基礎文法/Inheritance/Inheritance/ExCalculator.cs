using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inheritance
{
    class ExCalculator : Calculator
    {
        public void mul()
        {
            Console.WriteLine("{0} * {1} = {2}",
                num_1, num_2, num_1 * num_2);
        }

        public void div()
        {
            Console.WriteLine("{0} / {1} = {2}",
                num_1, num_2, num_1 / num_2);
        }
    }
}
