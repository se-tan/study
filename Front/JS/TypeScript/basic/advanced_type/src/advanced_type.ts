/* excess property checking */
type Options = {
  baseURL: string;
  cacheSize?: number;
  tier?: 'prod' | 'dev';
};
class API {
  constructor(private options: Options) {}
}

new API({
  baseURL: 'https://api.mysite.com',
  /* 
    型 '{ baseURL: string; tierr: string; }' の引数を
    型 'Options' のパラメーターに割り当てることはできません。
    オブジェクト リテラルで指定できるのは既知のプロパティのみですが、
    'tierr' は型 'Options' に存在しません。書こうとしたのは 'tier' ですか?ts(2345)
  */
  // tierr: 'prod',
  tier: 'prod',
});

/* refinement */
// express CSS property unit
type Unit = 'cm' | 'px' | '%';
// list units
let units: Unit[] = ['cm', 'px', '%'];

// check each units and if not match, return null
function parseUnit(value: string): Unit | null {
  for (let i = 0; i < units.length; i++) {
    if (value.endsWith(units[i])) {
      return units[i];
    }
  }
  return null;
}

type Width = {
  unit: Unit;
  value: number;
};

function parseWidth(width: number | string | null | undefined): Width | null {
  if (width == null) {
    return null;
  }

  // if width's type is number, px is defined as default unit.
  if (typeof width == 'number') {
    return { unit: 'px', value: width };
  }

  let unit = parseUnit(width);
  if (unit) {
    return { unit, value: parseFloat(width) };
  }
  return null;
}

/* Tagged union */
type UserTextEvent = {
  type: 'TextEvent';
  value: string;
  target: HTMLInputElement;
};
type UserMouseEvent = {
  type: 'MouseEvent';
  value: [number, number];
  target: HTMLElement;
};

type UserEvent = UserTextEvent | UserMouseEvent;

function handle(event: UserEvent) {
  if (event.type === 'TextEvent') {
    event.value; // string
    event.target; // HTMLInputElement
    return;
  }
  event.value; // [number, number]
  event.target; // HTMLElement
}

/* totality ( exhaustiveness checking) */
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
type Day = Weekday | 'Sat' | 'Sun';

/* 
  関数に終了の return ステートメントがないため、
  戻り値の型には 'undefined' が含まれません。ts(2366)
*/
// function getNextDay(w: Weekday): Day {
//   switch (w) {
//     case 'Mon':
//       return 'Tue';
//   }
// }

/* 一部のコード パスは値を返しません。ts(7030) */
// function isBig(n: number): true | undefined {
//   if (n >= 100) {
//     return true;
//   }
// }

/* look-up type */
interface Person {
  name: string;
  age?: number;
}
type TypeofName = Person['name']; // string
type TypeofAge = Person['age']; // number | undefined

interface User {
  user1: { name: string; age: number };
  user2: { name: string; age: number };
}

type A = User['user1']; // { name: string, age: number }
type B = User['user1']['name']; // string
type C = User['user1']['age']; // number

/* keyof */
interface Animal {
  name: string;
  age: number;
}
type PropAnimal = keyof Animal; // 'name' | 'age'

interface Obj {
  person: { name: string; age: number };
  book: { name: string; price: number };
}

type PropUser = keyof Obj; // 'user1' | 'user2'
type PropUser1 = keyof Obj['person']; // 'name' | 'age'
type PropUser3 = keyof Obj['book']; // 'name' | 'price'

/* record type */
let nextDay: Record<Weekday, Day> = {
  Mon: 'Tue',
  Tue: 'Wed',
  Wed: 'Thu',
  Thu: 'Fri',
  Fri: 'Sat',
};

/* mapped type */
type Account = {
  id: number;
  isEmployee: boolean;
  notes: string[];
};

// All fields is Optional
type OptionalAccount = {
  [K in keyof Account]?: Account[K];
};

//  All fields allowed null
type NullableAccount = {
  [K in keyof Account]: Account[K] | null;
};

// All fields got readonly
type ReadonlyAccount = {
  readonly [K in keyof Account]: Account[K];
};

// All fields enable to writing
type Accoun2 = {
  -readonly [K in keyof ReadonlyAccount]: Account[K];
};

// All fields required
type Account3 = {
  [K in keyof OptionalAccount]-?: Account[K];
};
