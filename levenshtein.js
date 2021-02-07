getEditDistance = function (a, b) {
  if (a.length == 0) return b.length;
  if (b.length == 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

// Reports what names are within cutoff distance of similarity to the target name
getCloseNames = function (targetName, cutoff) {
  const names = require('./all-names');
  let results = [];
  for (let i = 0; i < names.names.length; i++) {
    let currentName = names.names[i];
    // console.log(`Name: ${currentName}`);
    let distance = getEditDistance(currentName, targetName);

    if (distance < cutoff) {
      results.push(currentName);
    }
  }
  return results;
}

module.exports = { getCloseNames, getEditDistance }