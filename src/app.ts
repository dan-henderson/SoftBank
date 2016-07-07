import fs = require('fs');
import * as readline from 'readline';
import {Transaction} from './Transaction';
import {Account} from './Account';

let data = fs.readFileSync('Transactions2014.csv', 'utf8');
//console.log(data);

let transactions = parseCSV(data);
//console.log(transactions);

let accounts: Account[] = workOutAccounts(transactions);
//console.log(accounts);

const rl = readline.createInterface(process.stdin, process.stdout);
rl.question('Input command: ', handleCommand);

function handleCommand(input: string) {
    if (input == "exit") {
        rl.close();
        process.exit();
    } else {
        executeCommand(input);
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
    // N.B. starts at 1 to miss out header row
    for (var i = 1; i < data_array.length/5; i++) {
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
    let accounts: Account[] = [];
    for (var i = 0; i < transactions.length; i++) {
        processTransaction(transactions[i].from, transactions[i], accounts);
        processTransaction(transactions[i].to, transactions[i], accounts);
    }
    return accounts;
}

function processTransaction(name: string, transaction: Transaction, accounts: Account[]) {
    let index: number = lookupAccount(name, accounts);
    if (index < 0) {
        index = accounts.push(new Account(name)) - 1;
    }
    accounts[index].addTransaction(transaction);
}

// returns -1 if account does not exist in that name
function lookupAccount(name: string, accounts: Account[]) : number {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].holder == name) {
            return i;
        }
    }
    return -1;
}

function executeCommand(input: string) {
    let command: string[] = input.split(" ");

    if (command[0] == "List" || command[0] == "list") {
        let arg: string = command[1];
        if (command.length > 2) {
            arg = command.slice(1, command.length).join(" ");
        }
        let index: number = lookupAccount(arg, accounts);
        if (index < 0) {
            if (arg == "All" || arg == "all") {
                printAll();
            }
        } else {
            printStatement(index);
        }
    } else {
        console.log("Command not recognised, enter 'List <Account holder>', 'List All', or 'exit'");
    }
}

function printAll() {
    for (var i = 0; i < accounts.length; i++) {
        printBalance(i);
    }
}

function printBalance(index: number) {
    console.log("Name: " + accounts[index].holder + ". Balance: " + accounts[index].balance.toString());
}

function printStatement(index: number) {
    printBalance(index);
    printTransactions(accounts[index].transactions);
}

function printTransactions(transactions: Transaction[]) {
    console.log("Transactions: ");
    for (var i = 0; i < transactions.length; i++) {
        printTransaction(transactions[i]);
    }
}

function printTransaction(transaction: Transaction) {
    console.log(transaction.date + "," + transaction.from + "," + transaction.to + "," +
        transaction.narrative + "," + transaction.amount.toString())
}