
class Account {
    holder: string;
    balance: number;
    transactions: Transaction[];
    constructor(name: string) {
        this.holder = name;
        this.balance = 0;
    }

    addTransaction(transaction: Transaction) {
        if (transaction.to == this.holder) {
            this.balance += transaction.amount;
        } else {
            this.balance -= this.balance + transaction.amount;
        }
        this.transactions.push(transaction);
    }
}