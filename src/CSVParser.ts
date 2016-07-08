import {Transaction} from './Transaction';

export class CSVParser {
    constructor() {}

    parseCSV(data: string) : Transaction[] {
        let split1: string[] = data.split('\r\n');
        let data_array: string[] = [];
        for (var i = 0; i < split1.length; i++) {
            let split2: string[] = split1[i].split(',');
            for (var j = 0; j < split2.length; j++) {
                data_array.push(split2[j]);
            }
        }
        // get rid of empty entry at end of array
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
}