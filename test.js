const { getEditDistance } = require('./levenshtein');
const names = require('./all-names');

let results = [];
for (let i = 0; i < names.names.length; i++) {
  let currentName = names.names[i];
  // console.log(`Name: ${currentName}`);
  let distance = getEditDistance(currentName, 'smith');

  if (distance < 3) {
    results.push(currentName);
  }
}
console.log(results);


