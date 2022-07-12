"use strict";
class API {
    constructor(options) {
        this.options = options;
    }
}
new API({
    baseURL: 'https://api.mysite.com',
    tier: 'prod',
});
let units = ['cm', 'px', '%'];
function parseUnit(value) {
    for (let i = 0; i < units.length; i++) {
        if (value.endsWith(units[i])) {
            return units[i];
        }
    }
    return null;
}
function parseWidth(width) {
    if (width == null) {
        return null;
    }
    if (typeof width == 'number') {
        return { unit: 'px', value: width };
    }
    let unit = parseUnit(width);
    if (unit) {
        return { unit, value: parseFloat(width) };
    }
    return null;
}
function handle(event) {
    if (event.type === 'TextEvent') {
        event.value;
        event.target;
        return;
    }
    event.value;
    event.target;
}
let nextDay = {
    Mon: 'Tue',
    Tue: 'Wed',
    Wed: 'Thu',
    Thu: 'Fri',
    Fri: 'Sat',
};
