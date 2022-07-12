/* named function */
function greet(name: string) {
  return 'Hello ' + name;
}

/* function */
let greet2 = function (name: string) {
  return name;
};

/* arrow function */
let greet3 = (name: string) => {
  return name + ', TypeScript.';
};

/* arrow function (omit) */
let greet4 = (name: string) => 'hello, ' + name;

/* function constructor */
let greet5 = new Function('name', 'return "Hello World! and " + name');

/* option parameters */
function log(message: string, userId?: string) {
  let time = new Date().toLocaleTimeString();
  console.log(time, message, userId || 'Not signed in');
}
log('Page loaded');
log('User signed in', 'da763be');

/* rest parameters */
function sumVariadicSafe(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
// console.log(sumVariadicSafe(1, 2, 3));

/* apply, call, bind */
function add(a: number, b: number): number {
  return a + b;
}
// console.log(add(10, 20));
// console.log(add.apply(null, [10, 20]));
// console.log(add.call(null, 10, 20));
// console.log(add.bind(null, 10, 20)());

/* this */
let x = {
  a() {
    return this;
  },
};
// console.log(x.a()); /* { a: [Function: a] } */

let a = x.a;
// console.log(a()); /* undifined */

function funcyDate(this: Date) {
  return `${this.getMonth() + 1}/${this.getDate()}/${this.getFullYear()}`;
}
// console.log(funcyDate.call(new Date()));
// console.log(funcyDate());    /* TypeError: Cannot read property 'getMonth' of undefined */

/* iterator */
let numbers = {
  *[Symbol.iterator]() {
    for (let n = 1; n <= 10; n++) {
      yield n;
    }
  },
};

/* function signature */
type Log = (message: string, userId?: string) => void;
let log_: Log = (message, userId = 'Not signed in') => {
  let time = new Date().toISOString();
  console.log(time, message, userId);
};

function times(f: (index: number) => void, n: number) {
  for (let i = 0; i < n; i++) {
    f(i);
  }
}
times((n) => console.log(n), 4);