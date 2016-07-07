import {Transaction} from './Transaction';

export class Account {
    holder: string;
    balance: number;
    transactions: Transaction[];
    constructor(name: string) {
        this.holder = name;
        this.balance = 0;
        this.transactions = [];
    }

    addTransaction(transaction: Transaction) {
        if (transaction.to == this.holder) {
            this.balance += transaction.amount;
        } else {
            this.balance -= transaction.amount;
        }
        this.transactions.push(transaction);
    }
}