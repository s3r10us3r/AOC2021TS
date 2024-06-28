const fs = require('node:fs');
const data = fs.readFileSync('task.txt', 'utf8').trim();
const fish = data.split(',').map(Number);

let resultSum = 0;

let results_dict = {};

function calcFishes(fi, daysLeft){
    let key = `${fi} ${daysLeft}`;
    if (key in results_dict) {
        return results_dict[key];
    }
    let result = 1;
    while (true) {
        daysLeft -= (fi + 1);
        if (daysLeft < 0)
            break;
        fi = 6;
        result += calcFishes(8, daysLeft);
    }
    results_dict[key] = result;
    return result;
}

for(const fi of fish) {
    resultSum += calcFishes(fi, 256);
}

console.log(resultSum);

