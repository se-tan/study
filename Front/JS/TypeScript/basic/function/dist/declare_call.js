"use strict";
function greet(name) {
    return 'Hello ' + name;
}
let greet2 = function (name) {
    return name;
};
let greet3 = (name) => {
    return name + ', TypeScript.';
};
let greet4 = (name) => 'hello, ' + name;
let greet5 = new Function('name', 'return "Hello World! and " + name');
function log(message, userId) {
    let time = new Date().toLocaleTimeString();
    console.log(time, message, userId || 'Not signed in');
}
log('Page loaded');
log('User signed in', 'da763be');
function sumVariadicSafe(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
function add(a, b) {
    return a + b;
}
let x = {
    a() {
        return this;
    },
};
let a = x.a;
function funcyDate() {
    return `${this.getMonth() + 1}/${this.getDate()}/${this.getFullYear()}`;
}
let numbers = {
    *[Symbol.iterator]() {
        for (let n = 1; n <= 10; n++) {
            yield n;
        }
    },
};
let log_ = (message, userId = 'Not signed in') => {
    let time = new Date().toISOString();
    console.log(time, message, userId);
};
function times(f, n) {
    for (let i = 0; i < n; i++) {
        f(i);
    }
}
times((n) => console.log(n), 4);
