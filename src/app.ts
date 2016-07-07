import {Account} from './Account';
import {Transaction} from './Transaction';

let first_account: Account = new Account("me");

console.log(first_account);

let first_transaction: Transaction = new Transaction("07/07/2016", "me", "you", "to test this program", 10);

console.log(first_transaction);

first_account.addTransaction(first_transaction);

console.log(first_account);

process.exit();