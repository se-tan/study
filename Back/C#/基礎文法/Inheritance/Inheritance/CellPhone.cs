using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inheritance
{
    class CellPhone : IPhone, IEmail
    {
        private string mailAddress;
        private string number;

        public CellPhone(string mailAddress, string number)
        {
            this.mailAddress = mailAddress;
            this.number = number;
        }

        public void SendMail(string address)
        {
            Console.WriteLine(address + "に、" + this.mailAddress +
                "からメールを出します。");
        }
        
        public void Call(string number)
        {
            Console.WriteLine(number + "に、" + this.number +
                "から電話をかけます。");
        }
    }
}
