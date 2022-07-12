/* companion object pattern */
type Country = "EUR" | "GBP" | "JPY" | "USD";

type Currency = {
  country: Country;
  value: number;
};

let Currency = {
  from(value: number, country: Country): Currency {
    return {
      country: country,
      value,
    };
  },
};

type CompanyID = string & { readonly brand: unique symbol };
type OrderID = string & { readonly brand: unique symbol };
type UserID = string & { readonly brand: unique symbol };
type ID = CompanyID | OrderID | UserID;

function CompanyID(id: string) {
  return id as CompanyID;
}
function OrderID(id: string) {
  return id as OrderID;
}
function UserID(id: string) {
  return id as UserID;
}

function queryForUser(id: UserID) {
  console.log(id);
}

let companyID = CompanyID("8a6076cf");
let orderID = OrderID("9994acc1");
let userID = UserID("d21b1dbf");
queryForUser(userID);

interface Array<T> {
  zip<U>(list: U[]): [T, U][];
}

Array.prototype.zip = function (list) {
  return this.map((v, k) => [v, list[k]]);
};
