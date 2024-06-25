import * as fs from 'fs'

const data: string = fs.readFileSync('task.txt', 'utf8');
let lines: string[] = data.split('\n');

const numbersCalled: number[] = lines[0].split(',').map(num => parseInt(num));

let boards: number[][][] = [];
lines = lines.slice(2);

let i = 0;
let bi = -1;
while (i < lines.length) {
    boards.push([]);
    bi += 1;
    while(lines[i].trim() != '')
    {
        const line = lines[i];
        const row = line.split(' ').
                filter(Boolean).
                map(num => parseInt(num));
        boards[bi].push(row);
        i+=1;
    }
    i+=1;
}

const bingoArr: number[] = [];

function checkRows(board: number[][]): boolean {
    for (const row of board) {
        let result: boolean = row.every(e => bingoArr.includes(e));
        if (result) {
            return true;
        }
    };
    return false;
}

function checkColumns(board: number[][]): boolean {
    for (let i = 0; i < board[0].length; i++) {
        let column: number[] = [];
        board.forEach(row => column.push(row[i]));
        let result: boolean = column.every(e => bingoArr.includes(e));
        if (result) {
            return true;
        }
    }
    return false;
}

function computeScore(board: number[][]): number {
    let score: number = 0;
    board.forEach(row => {
        row.forEach(e => {
            if (!bingoArr.includes(e)) {
                score += e;
            }
        });
    });
    score *= bingoArr[bingoArr.length - 1];
    return score;
}


function findResult(): void {
    for (const call of numbersCalled) {
        let newBoards: number[][][] = [];
        bingoArr.push(call);
        for (const board of boards) {
            if (!checkColumns(board) && !checkRows(board)) {
                newBoards.push(board);
            }
        }
        if (newBoards.length == 0) {
            console.log(computeScore(boards[0]));
            return;
        }
        boards = newBoards;
    }
}

findResult();
