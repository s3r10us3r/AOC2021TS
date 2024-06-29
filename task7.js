const fs = require('node:fs');
const data = fs.readFileSync('task.txt', 'utf8').trim();
const nums = data.split(',').map(Number);

function findSumOfDiffs(x) {
    let res = 0;
    for (num of nums) {
        let n = Math.abs(num - x);
        res += (n * (n + 1)) / 2;
    }
    return res;
}

let result = Infinity;

for (let i = Math.min(...nums); i <= Math.max(...nums); i++) {
    if (result > findSumOfDiffs(i)) {
        result = findSumOfDiffs(i);
    }
}

console.log(result);
