"use strict";
function map(array, f) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result[i] = f(array[i]);
    }
    return result;
}
map(['a', 'b', 'c'], (_) => _ === 'a');
function mapNode(node, f) {
    return Object.assign(Object.assign({}, node), { value: f(node.value) });
}
function logPerimeter(s) {
    console.log(s.numberOfSides * s.numberOfSides);
    return s;
}
let square = { numberOfSides: 4, sideLength: 3 };
logPerimeter(square);
