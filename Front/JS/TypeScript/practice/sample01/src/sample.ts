let data = undefined;
data = 150;
data = 'hoge';

let sample;
sample = 10.5;
console.log(sample.toFixed(0));

sample = 'foo';
console.log(sample.charAt(0));

let mail: string = 'admin@sample.com';
let msg = `レビュアー募集中！

書籍のご感想をぜひお聞かせください。
弊社サポートサイト、SNSなどでご紹介させていただきます。(送付先${mail})`;


let triangle:(base: number, height: number) => number =
    function(base:number, height: number): number {
        return base * height / 2;
    };

// アロー関数(Lambda式)    
let squere =
    (base: number, height: number): number => base * height;
console.log(triangle(10, 5) + '\n' + squere(20, 5));

// 従来の関数リテラル
/*
    thisはインスタンス自身を指す。
    setIntervalメソッドの配下ではthisは変化してしまい、
    インスタンスを参照しない(ブラウザ環境ならWindowsオブジェクト)
    そこで_thisに退避させてsetIntervalメソッドでも
    _this経由でcountプロパティを参照している
*/
let Counter = function(this:any) {
    // 現在のthisを退避
    let _this = this;
    _this.count = 0;
    // 1000ミリ秒間隔でcountプロパティをインクリメント
    setInterval(function() {
        _this.count++;
    }, 1000);
};

// アロー関数
/*
    アロー関数自身が宣言された場所によって決まる。
    以下はコンストラクターが示すthisを指すので、
    _thisへの退避が不要
*/
let Counter_a = function(this:any) {
    this.count = 0;
    setInterval(() => { this.count++; }, 1000);
};

console.log(Counter);
console.log(Counter_a);