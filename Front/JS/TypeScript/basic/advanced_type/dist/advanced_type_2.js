"use strict";
let Currency = {
    from(value, country) {
        return {
            country: country,
            value,
        };
    },
};
function CompanyID(id) {
    return id;
}
function OrderID(id) {
    return id;
}
function UserID(id) {
    return id;
}
function queryForUser(id) {
    console.log(id);
}
let companyID = CompanyID("8a6076cf");
let orderID = OrderID("9994acc1");
let userID = UserID("d21b1dbf");
queryForUser(userID);
