const fs = require('node:fs');

const data = fs.readFileSync('task.txt', 'utf8').trim();
const splits = data.split('\n');
const horizontalLines = [];
const verticalLines = [];
const diagonalLines = [];

for (const splitted of splits) {
    const cords = splitted.split(' -> ');
    const left = cords[0].split(',');
    const right = cords[1].split(',');
    const x1 = Number(left[0]);
    const y1 = Number(left[1]);
    const x2 = Number(right[0]);
    const y2 = Number(right[1]);
    var line = {x1: x1, y1 :y1, x2: x2, y2: y2}; 
    if (line.x1 === line.x2)
        verticalLines.push(line);
    else if (line.y1 === line.y2)
        horizontalLines.push(line);
    else
        diagonalLines.push(line);
}

const size = 1000;
let map = new Array(size);
for (let i = 0; i < size; i++) {
    map[i]= new Array(size).fill(0);
}


for (const vertical of verticalLines) {
    for (let i = Math.min(vertical.y1, vertical.y2); i <= Math.max(vertical.y1, vertical.y2); i++) {
        map[i][vertical.x1] += 1;
    }
}

for (const horizontal of horizontalLines) {
    for (let i = Math.min(horizontal.x1, horizontal.x2); i <= Math.max(horizontal.x1, horizontal.x2); i++) {
        map[horizontal.y1][i] += 1;
    }
}

for (const diagonal of diagonalLines) {
    let xIncrement = Math.sign(diagonal.x2 - diagonal.x1);
    let yIncrement = Math.sign(diagonal.y2 - diagonal.y1);

    let x = diagonal.x1;
    let y = diagonal.y1;

    while(x != diagonal.x2 + xIncrement || y != diagonal.y2 + yIncrement)
    {
        map[y][x] += 1;
        x += xIncrement;
        y += yIncrement;
    }
}

let result = 0;
for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        if (map[i][j] >= 2) {
            result++;
        }
    }
}

function displayMap()
{
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let num = map[i][j];
            if (num === 0)
                process.stdout.write('.');
            else 
                process.stdout.write(num.toString());
        }
        process.stdout.write('\n');
    }
}
console.log(result);
