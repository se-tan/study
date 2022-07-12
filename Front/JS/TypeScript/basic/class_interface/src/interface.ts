interface Food {
  calories: number;
  tasty: boolean;
}
interface Sushi extends Food {
  salty: boolean;
}
interface Cake extends Food {
  sweet: boolean;
}

/* marge */
interface User {
  name: string;
}
interface User {
  age: number;
}
let a: User = {
  name: 'Ashley',
  age: 30,
};

/* implements */
interface Animal {
  readonly name: string;
  eat(food: string): void;
  sleep(hours: number): void;
}
interface Feline {
  meow(): void;
}
class Cat implements Animal, Feline {
  name = 'Whiskers';
  eat(food: string) {
    console.info('Ate some', food, '. Mmm!');
  }
  sleep(hours: number) {
    console.info('Slept for', hours, 'hours.');
  }
  meow() {
    console.info('Meow');
  }
}

/* Structual typing */
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
function ambleAround(animal: Zebra) {
  animal.trot();
}
let zebra = new Zebra();
let poodle = new Poodle();
ambleAround(zebra);
ambleAround(poodle);

/* Class declares both value and type */
class C {}
let c: C; /* instance type */
c = new C(); /* value type */

enum E {
  F,
  G,
}
let e: E; /* Enum type */
e = E.F; /* value type */

type State = {
  [key: string]: string;
};
interface StringDatabaseConstructor {
  new (state?: State): StringDatabase;
  from(state: State): StringDatabase;
}
class StringDatabase {
  constructor(public state: State = {}) {}
  get(key: string): string | null {
    return key in this.state ? this.state[key] : null;
  }
  set(key: string, value: string): void {
    this.state[key] = value;
  }
  static from(state: State) {
    let db = new StringDatabase();
    for (let key in state) {
      db.set(key, state[key]);
    }
    return db;
  }
}
