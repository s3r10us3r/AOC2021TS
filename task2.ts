import * as fs from 'fs';

const data: string = fs.readFileSync('task.txt', 'utf8');
const lines: string[] = data.split('\n');

let aim: number = 0;
let depth: number = 0;
let horizontal: number = 0;

lines.forEach((line: string) => {
    const words: string[] = line.split(' ');
    let command = words[0];
    let num = parseInt(words[1], 10);

    switch(command) {
        case 'forward':
            horizontal += num;
            depth += num * aim;
            break;
        case 'up':
            aim -= num;
            break;
        case 'down':
            aim += num;
            break;
    }
});

console.log(depth * horizontal);
