"use strict";
var data = undefined;
data = 150;
data = 'hoge';
var sample;
sample = 10.5;
console.log(sample.toFixed(0));
sample = 'foo';
console.log(sample.charAt(0));
var mail = 'admin@sample.com';
var msg = "\u30EC\u30D3\u30E5\u30A2\u30FC\u52DF\u96C6\u4E2D\uFF01\n\n\u66F8\u7C4D\u306E\u3054\u611F\u60F3\u3092\u305C\u3072\u304A\u805E\u304B\u305B\u304F\u3060\u3055\u3044\u3002\n\u5F0A\u793E\u30B5\u30DD\u30FC\u30C8\u30B5\u30A4\u30C8\u3001SNS\u306A\u3069\u3067\u3054\u7D39\u4ECB\u3055\u305B\u3066\u3044\u305F\u3060\u304D\u307E\u3059\u3002(\u9001\u4ED8\u5148" + mail + ")";
var triangle = function (base, height) {
    return base * height / 2;
};
// アロー関数(Lambda式)    
var squere = function (base, height) { return base * height; };
console.log(triangle(10, 5) + '\n' + squere(20, 5));
// 従来の関数リテラル
/*
    thisはインスタンス自身を指す。
    setIntervalメソッドの配下ではthisは変化してしまい、
    インスタンスを参照しない(ブラウザ環境ならWindowsオブジェクト)
    そこで_thisに退避させてsetIntervalメソッドでも
    _this経由でcountプロパティを参照している
*/
var Counter = function () {
    // 現在のthisを退避
    var _this = this;
    _this.count = 0;
    // 1000ミリ秒間隔でcountプロパティをインクリメント
    setInterval(function () {
        _this.count++;
    }, 1000);
};
// アロー関数
/*
    アロー関数自身が宣言された場所によって決まる。
    以下はコンストラクターが示すthisを指すので、
    _thisへの退避が不要
*/
var Counter_a = function () {
    var _this_1 = this;
    this.count = 0;
    setInterval(function () { _this_1.count++; }, 1000);
};
console.log(Counter);
console.log(Counter_a);
//# sourceMappingURL=sample.js.map