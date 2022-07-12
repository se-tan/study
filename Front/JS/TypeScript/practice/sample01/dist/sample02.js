"use strict";
function show(result) {
    return "\u7D50\u679C\u306F" + result + "\u3067\u3059\u3002";
}
// console.log(show(100));          /* エラー */ 
// console.log(show(<any>100));     /* any型に変換 */
// console.log(show('100' as any));
function toInt(value) {
    return value.toFixed(0);
}
/* 実行時エラーを起こす
console.log(toInt(<any>'hoge'));
*/
/*
    readonlyがチェックするのは一次元目のみ
*/
var arr_data = [[10, 20], [30, 40], [50, 80]];
arr_data[1][1] = 5;
console.log(arr_data);
var arr = ['Java', 'Python', 'PHP', 'Ruby', 'C#'];
/*
    Index signature in type 'readonly string[]' only permits reading.
    というエラーをビルド時に出す
    
    arr[1] = 'Python 3';
*/
// 連想配列
var obj = {
    'hoge': 'ほげ',
    'foo': 'ふぅ',
    'bar': 'ばぁ',
};
console.log(obj.hoge);
console.log(obj['hoge']);
var Gender;
(function (Gender) {
    Gender[Gender["MALE"] = 1] = "MALE";
    Gender[Gender["FEMALE"] = 2] = "FEMALE";
    Gender[Gender["UNKNOWN"] = 4] = "UNKNOWN";
})(Gender || (Gender = {}));
;
var m = Gender.MALE;
console.log(m);
console.log(Gender[m]);
var tuple = ['hoge', 10.335, false];
console.log(tuple[0].substring(2));
console.log(tuple[1].toFixed(1));
console.log(tuple[2] === false);
//# sourceMappingURL=sample02.js.map