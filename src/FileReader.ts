import * as fs from 'fs';
import {CSVParser} from './CSVParser';
import {Transaction} from './Transaction';

export class FileReader {
    csv_parser: CSVParser;

    constructor() {
        this.csv_parser = new CSVParser();
    }

    importTransactions(name: string) : Transaction[] {
        let data: string = fs.readFileSync(name, 'utf8');
        let extension: string = name.split('.')[1].toLowerCase();

        if (extension == 'csv') {
            return this.csv_parser.parseCSV(data);
        }
        else if (extension == 'json') {
            // return json_parser.parseJSON(data);
        }
    }
}