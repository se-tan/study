// クラススコープのジェネリック型をバインド
class MyMap<K, V> {
  // ジェネリック型を宣言不可の為、クラスの宣言に引き上げる
  constructor(initialKey: K, initialValue: V) {}

  // クラススコープのジェネリック型はどこでも使用可能
  get(key: K): void {

  }

  set(key: K, value: V): void {}

  // インスタンスメソッドはクラスレベルのジェネリックにアクセス可能
  // また、独自ジェネリックを宣言可能
  merge<K1, V1>(map: MyMap<K1, V1>): /* MyMap<K | K1, V | V1> */ void {
  }

  // 静的メソッドは、値レベルでクラスのインスタンス変数にアクセスは不可能
  // クラスのジェネリックも同様にアクセス不可能
  // 代わりに独自のジェネリックを宣言する
  static of<K, V>(k: K, v: V): /* MyMap<K, V> */ void {
  }
}

/* Mixin */
// 任意のコンストラクターを表す
type ClassConstructor<T> = new (...args: any[]) => T;

// extends節を使用し、Cを ClassConstrustor とする
// 戻り値は型推論させ、Cと新しい匿名クラスとの交差になる
function withEZDebug<
  C extends ClassConstructor<{
    getDebugValue(): object;
  }>
>(Class: C) {
  // mixin は、コンストラクターを取り、コンストラクターを返す関数
  return class extends Class {
    constructor(...args: any[]) {
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
  constructor(
    private id: number,
    private firstName: string,
    private lastName: string
  ) {}
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
