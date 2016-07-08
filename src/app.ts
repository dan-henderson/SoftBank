import fs = require('fs');
import * as readline from 'readline';
import {CSVParser} from './CSVParser';
import {Transaction} from './Transaction';
import {Account} from './Account';

let data = fs.readFileSync('Transactions2014.csv', 'utf8');
//console.log(data);

let parser = new CSVParser();

let transactions = parser.parseCSV(data);
console.log(transactions);

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
        // N.B. doesn't care about upper/lower case
        if (accounts[i].holder.toLowerCase() == name.toLowerCase()) {
            return i;
        }
    }
    return -1;
}

function executeCommand(input: string) {
    let command: string[] = input.split(" ");

    if (command[0].toLowerCase() == "list") {
        let arg: string = command[1];

        // to deal with spaces between first name and surname
        if (command.length > 2) {
            arg = command.slice(1, command.length).join(" ");
        }
        let index: number = lookupAccount(arg, accounts);
        if (index < 0) {
            if (arg.toLowerCase() == "all") {
                printAll();
            }
        } else {
            printStatement(index);
        }
    } else {
        console.log("Command not recognised");
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