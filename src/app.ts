import * as readline from 'readline';
import {FileReader} from './FileReader';
import {AccountManager} from './AccountManager';
import {Transaction} from './Transaction';

let file_reader = new FileReader();
let accountant = new AccountManager();

let transactions: Transaction[] = file_reader.importTransactions('Transactions2014.csv')
accountant.processTransactions(transactions);

const rl = readline.createInterface(process.stdin, process.stdout);
rl.question('Input command: ', handleCommand);

function handleCommand(input: string) {
    if (input.toLowerCase() == "exit") {
        rl.close();
        process.exit();
    } else {
        executeCommand(input);
        rl.question('Input command: ', handleCommand);
    }
};

function executeCommand(input: string) {
    let command: string[] = input.split(" ");

    if (command[0].toLowerCase() == "list") {
        let arg: string = command[1];

        // to deal with spaces between first name and surname
        if (command.length > 2) {
            arg = command.slice(1, command.length).join(" ");
        }
        let index: number = accountant.lookupAccount(arg);
        if (index < 0) {
            if (arg.toLowerCase() == "all") {
                accountant.printAll();
            }
        } else {
            accountant.printStatement(index);
        }
    } else {
        console.log("Command not recognised");
    }
}