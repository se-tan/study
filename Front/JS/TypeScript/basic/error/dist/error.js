"use strict";
class InvalidDateFormatError extends RangeError {
}
class DateIsInTheFutureError extends RangeError {
}
function parse(birthday) {
    let date = new Date(birthday);
    if (!isValid(date)) {
        return new InvalidDateFormatError("Enter a date in the form YYYY/MM/DD");
    }
    if (date.getTime() > Date.now()) {
        return new DateIsInTheFutureError("Are you a timeload?");
    }
    return date;
}
function ask() {
    return prompt("When is your birthday?");
}
function isValid(date) {
    return Object.prototype.toString.call(date) === "[object Date]" && !Number.isNaN(date.getTime());
}
try {
    let result = parse(ask());
    if (result instanceof Error) {
        console.error(result.message);
    }
    else {
        console.info("Date is", result.toISOString());
    }
}
catch (e) {
    if (e instanceof InvalidDateFormatError || e instanceof DateIsInTheFutureError) {
        console.error(e.message);
    }
    else {
        throw e;
    }
}
