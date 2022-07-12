using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Class_Object
{
    class Rectangle
    {
        public double width = 0;
        public double height = 0;

        public double GetArea() 
        {
            return width * height;
        }

        public double GetPerimeter() 
        {
            return (width * 2) + (height * 2);
        }
    }
}
