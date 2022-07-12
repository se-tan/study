"use strict";
class MyMap {
    constructor(initialKey, initialValue) { }
    get(key) {
    }
    set(key, value) { }
    merge(map) {
    }
    static of(k, v) {
    }
}
function withEZDebug(Class) {
    return class extends Class {
        constructor(...args) {
            super(...args);
        }
        debug() {
            let Name = this.constructor.name;
            let value = this.getDebugValue();
            return Name + JSON.stringify(value);
        }
    };
}
class HardToDebugUser {
    constructor(id, firstName, lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getDebugValue() {
        return {
            id: this.id,
            name: this.firstName + ' ' + this.lastName,
        };
    }
}
let User = withEZDebug(HardToDebugUser);
let user = new User(3, 'Emma', 'Gluzman');
console.log(user.debug());
