using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inheritance
{
    abstract class VectorBase
    {
        public abstract double X
        {
            set;
            get;
        }

        public abstract double Y
        {
            set;
            get;
        }
    }
}
