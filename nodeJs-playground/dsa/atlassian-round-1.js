function find(words, note1) {
  let charMap = {};

  for (let char of note1) {
    console.log("charMap[char]", charMap[char] === undefined);

    if (charMap[char]) {
        charMap[char] += 1;
    } else {
      charMap[char] = 1;
    }
  }

  let result;
  console.log("charMap", charMap);

  for (let i = 0; i < words.length; i++) {
    let localMap = Object.assign({}, charMap);

    if (checkIfCharMatches(localMap, words[i]) === true) {
      result = words[i];
      break;
    } else {
      continue;
    }
  }

  return result;
}

function checkIfCharMatches(map, word) {
  let checkFlag = true;

  for (let c of word) {
    if (map[c] && map[c] !== 0) {
      map[c]--;
    } else {
      // skip this word
      checkFlag = false;
      break;
    }
  }

  return checkFlag;
}

console.log(find(words, note1));