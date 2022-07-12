"use strict";
let a = {
    name: 'Ashley',
    age: 30,
};
class Cat {
    constructor() {
        this.name = 'Whiskers';
    }
    eat(food) {
        console.info('Ate some', food, '. Mmm!');
    }
    sleep(hours) {
        console.info('Slept for', hours, 'hours.');
    }
    meow() {
        console.info('Meow');
    }
}
class Zebra {
    trot() {
        console.log('zebra');
    }
}
class Poodle {
    trot() {
        console.log("It's OK.");
    }
}
function ambleAround(animal) {
    animal.trot();
}
let zebra = new Zebra();
let poodle = new Poodle();
ambleAround(zebra);
ambleAround(poodle);
class C {
}
let c;
c = new C();
var E;
(function (E) {
    E[E["F"] = 0] = "F";
    E[E["G"] = 1] = "G";
})(E || (E = {}));
let e;
e = E.F;
class StringDatabase {
    constructor(state = {}) {
        this.state = state;
    }
    get(key) {
        return key in this.state ? this.state[key] : null;
    }
    set(key, value) {
        this.state[key] = value;
    }
    static from(state) {
        let db = new StringDatabase();
        for (let key in state) {
            db.set(key, state[key]);
        }
        return db;
    }
}
