export interface MyInterface {
  name: string;
}

export class MyClass implements MyInterface {
  constructor(public name: string) {}
}
