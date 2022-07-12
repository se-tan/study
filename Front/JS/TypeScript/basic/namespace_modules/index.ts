import { MyInterface, MyClass } from "./module/mylib";

const obj: MyInterface = new MyClass("Foo");
console.log(obj.name);
