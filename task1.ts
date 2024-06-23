import * as fs from 'fs';

const data: string = fs.readFileSync('task1.txt', 'utf8');
const lines: string[] = data.split('\n');
const ints: number[] = lines.map((str: string) => parseInt(str, 10));
let result: number = 0;

for (let i = 0; i < ints.length - 2; i++) {
    if (ints.slice(i, i + 3).reduce((acc, cv) => acc + cv, 0) < ints.slice(i + 1, i + 4).reduce((acc, cv) => acc + cv, 0)) {
        result++;
    }
}

console.log(result);
