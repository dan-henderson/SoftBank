import fs = require('fs');
import * as readline from 'readline';
import {Transaction} from './Transaction';
import {Account} from './Account';

let data = fs.readFileSync('Transactions2014.csv', 'utf8');
//console.log(data);

let transactions = parseCSV(data);
console.log(transactions);

let accounts: Account[] = workOutAccounts(transactions);

const rl = readline.createInterface(process.stdin, process.stdout);
rl.question('Input command: ', handleCommand);

function handleCommand(input: string) {
    if (input == "exit") {
        rl.close();
        process.exit();
    } else {
        // code to handle command
        rl.question('Input command: ', handleCommand);
    }
};

function parseCSV(data: string) : Transaction[] {
    let split1: string[] = data.split('\r\n');
    let data_array: string[] = [];
    for (var i = 0; i < split1.length; i++) {
        let split2: string[] = split1[i].split(',');
        for (var j = 0; j < split2.length; j++) {
            data_array.push(split2[j]);
        }
    }
    data_array.pop();
    //console.log(data_array);

    let transactions: Transaction[] = [];
    for (var i = 0; i < data_array.length/5; i++) {
        transactions.push(new Transaction(
            data_array[5*i],
            data_array[5*i+1],
            data_array[5*i+2],
            data_array[5*i+3],
            parseFloat(data_array[5*i+4])
            ))
    }
    return transactions;
}

function workOutAccounts(transactions: Transaction[]) : Account[] {
    return[];
}

/*
import {Account} from './Account';
import {Transaction} from './Transaction';

let first_account: Account = new Account("me");

console.log(first_account);

let first_transaction: Transaction = new Transaction("07/07/2016", "me", "you", "to test this program", 10);

console.log(first_transaction);

first_account.addTransaction(first_transaction);

console.log(first_account);

process.exit();
*/