import * as fs from 'fs';

const data: string = fs.readFileSync('task.txt', 'utf8');
const lines: string[] = data.split('\n');

let oxygenArr: string[] = lines.slice();
let co2Arr: string[] = lines.slice();


for(let i = 0; i < lines[0].length; i++){
    let oxgSum: number = 0;
    let co2Sum: number = 0;
    oxygenArr.forEach(line => {
        if (line.charAt(i) === '1') {
            oxgSum += 1;
        }
    });

    co2Arr.forEach(line => {
        if (line.charAt(i) === '1') {
            co2Sum += 1;
        }
    });
    
    let oxgFilter: string = '0';
    let co2Filter: string = '0';


    if (oxgSum >= oxygenArr.length / 2) {
        oxgFilter = '1';
    } 
    if (co2Sum < co2Arr.length / 2) {
        co2Filter = '1';
    }

    if (oxygenArr.length > 1) {
        oxygenArr = oxygenArr.filter(o => o.charAt(i) === oxgFilter);
    }
    if (co2Arr.length > 1) {
        co2Arr = co2Arr.filter(c => c.charAt(i) === co2Filter);
    }
}

let oxg: number = parseInt(oxygenArr[0], 2);
let co2: number = parseInt(co2Arr[0], 2);
console.log(oxg * co2);
