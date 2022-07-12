using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inheritance
{
    abstract class Bird
    {
        private string name;
        public Bird(string name)
        {
            this.name = name;
        }

        public string Name
        {
            get { return name; }
        }

        public abstract void Sing();
    }
}
