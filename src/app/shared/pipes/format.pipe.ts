import { Pipe } from "@angular/core";
import { FieldType } from "@shared/enums";
import { DatePipe, CurrencyPipe, DecimalPipe } from "@angular/common";
import _ from "lodash";

@Pipe({ name: 'format', pure: true })
export class FormatPipe {

    constructor(
        private datePipe: DatePipe,
        private decimalPipe: DecimalPipe,
        private currencyPipe: CurrencyPipe) { }

    transform(value: any, type?: FieldType, options?: any): any {
        if (!value || !type) return value;

        let result = value;
        switch (type) {
            // ---------------------------------- Currency
            case FieldType.Currency:
                {
                    let digitsInfo = '1.0-0';
                    if (options) {
                        digitsInfo = options.digitsInfo ? options.digitsInfo : digitsInfo;
                    }
                    result = this.currencyPipe.transform(value, '', '', digitsInfo); break;
                }
            // ---------------------------------- Date
            case FieldType.Date:
                {
                    let format = 'MM/dd/yyyy';
                    if (options) {
                        format = options.format ? options.format : format;
                    }
                    result = this.datePipe.transform(value, format); break;
                }
            // ---------------------------------- Number
            case FieldType.Number:
                let digitsInfo = '1.0-3';
                if (options) {
                    digitsInfo = options.digitsInfo ? options.digitsInfo : digitsInfo;
                }
                result = _.isNumber(value) ? this.decimalPipe.transform(value, digitsInfo) : value; break;
            // ---------------------------------- Phone
            case FieldType.Phone:
            // ---------------------------------- JSON
            case FieldType.JSON:
            // ---------------------------------- String
            case FieldType.String:
            default:
                break;
        }
        return result;
    }
}

