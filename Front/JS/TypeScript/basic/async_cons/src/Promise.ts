/* callback hell */
// console.log("start");
// loadJSONSync("../test.json", (data, err) => {
//   if (err === null) {
//     console.log(`works: name: ${data.name}, age :${data.age}`);
//   } else {
//     console.log(`Message: ${err}`);
//   }
// });
// console.log("end");

// Promise.resolve(100)
//   .then((res) => {
//     console.log(`the 1st value is ${res}`);
//     return 123;
//   })
//   .then((res) => {
//     console.log(`the 2nd value is ${res}`);
//     throw new Error("error happend from 2nd.");
//   })
//   .then((res) => {
//     console.log(`the 3rd value is ${res}`);
//     return 456;
//   })
//   .catch((err) => {
//     console.log(`Message: ${err}!!!`);
//     return 789;
//   });

import * as fs from "fs";

function readFileAsync(filename: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

function loadJSON(filename: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, function (err, data) {
      if (err) {
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data.toString()));
        } catch (err) {
          reject(err);
        }
      }
    });
  });
}

/* refactoring loadJSON() */
function loadJSONAsync(filename: string): Promise<any> {
  return readFileAsync(filename).then(function (res) {
    return JSON.parse(res);
  });
}

console.log("start");
// if rename file, error occurs
loadJSONAsync("../test.json")
  .then((data) => {
    console.log(`works-name: ${data.name}, age: ${data.age}`);
  })
  .catch((err) => {
    console.log(`Message: ${err}`);
  });
console.log("end");
