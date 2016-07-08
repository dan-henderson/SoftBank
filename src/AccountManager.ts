import {Account} from './Account';
import {Transaction} from './Transaction';

export class AccountManager {
    accounts: Account[];

    constructor() {
        this.accounts = [];
    }

    processTransactions(transactions: Transaction[]) {
        for (var i = 0; i < transactions.length; i++) {
            this.processTransaction(transactions[i].from, transactions[i]);
            this.processTransaction(transactions[i].to, transactions[i]);
        }
    }

    private processTransaction(name: string, transaction: Transaction) {
        let index: number = this.lookupAccount(name);
        if (index < 0) {
            index = this.accounts.push(new Account(name)) - 1;
        }
        this.accounts[index].addTransaction(transaction);
    }

    // returns -1 if account does not exist in that name
    lookupAccount(name: string) : number {
        for (var i = 0; i < this.accounts.length; i++) {
            // N.B. doesn't care about upper/lower case
            if (this.accounts[i].holder.toLowerCase() == name.toLowerCase()) {
                return i;
            }
        }
        return -1;
    }

    printAll() {
        for (var i = 0; i < this.accounts.length; i++) {
            this.printBalance(i);
        }
    }

    printStatement(index: number) {
        this.printBalance(index);
        this.printTransactions(this.accounts[index].transactions);
    }

    private printBalance(index: number) {
        console.log("Name: " + this.accounts[index].holder + ". Balance: " + 
            this.accounts[index].balance.toString());
    }

    private printTransactions(transactions: Transaction[]) {
        console.log("Transactions: ");
        for (var i = 0; i < transactions.length; i++) {
            this.printTransaction(transactions[i]);
        }
    }

    private printTransaction(transaction: Transaction) {
        console.log(transaction.date + "," + transaction.from + "," + transaction.to + "," +
            transaction.narrative + "," + transaction.amount.toString())
    }
}