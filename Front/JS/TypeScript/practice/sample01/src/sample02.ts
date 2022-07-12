function show(result: string) {
    return `結果は${result}です。`
}

// console.log(show(100));          /* エラー */ 
// console.log(show(<any>100));     /* any型に変換 */
// console.log(show('100' as any));

function toInt(value: number) {
    return value.toFixed(0);
}

/* 実行時エラーを起こす
console.log(toInt(<any>'hoge'));
*/

/*
    readonlyがチェックするのは一次元目のみ
*/
let arr_data: readonly number[][] = [[10, 20], [30, 40], [50, 80]];
arr_data[1][1] = 5;
console.log(arr_data);

let arr: readonly string[] = ['Java', 'Python', 'PHP', 'Ruby', 'C#'];
/*  
    Index signature in type 'readonly string[]' only permits reading.
    というエラーをビルド時に出す
    
    arr[1] = 'Python 3';
*/

// 連想配列
let obj: { [index: string]: string; } = {
    'hoge': 'ほげ',
    'foo': 'ふぅ',
    'bar': 'ばぁ',
};

console.log(obj.hoge);
console.log(obj['hoge']);

enum Gender {
    MALE = 1,
    FEMALE = 2,
    UNKNOWN = 4,
};

let m: Gender = Gender.MALE;
console.log(m);
console.log(Gender[m]);

let tuple:[string, number, boolean] = ['hoge', 10.335, false];
console.log(tuple[0].substring(2));
console.log(tuple[1].toFixed(1));
console.log(tuple[2] === false);