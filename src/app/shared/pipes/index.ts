import { ApnPipe } from './apn.pipe';
import { CustomDatePipe } from './custom-date.pipe';
import { CustomStringPipe } from './custom-string.pipe';
import { BindTemplatePipe } from './bind-template.pipe';
import { DefaultPipe } from './default.pipe';
import { FormatPipe } from './format.pipe';
import { DatePipe, CurrencyPipe, DecimalPipe, JsonPipe } from '@angular/common';
import { PhonePipe } from './phone.pipe';

export const ALL = [
    ApnPipe,
    BindTemplatePipe,
    CustomDatePipe,
    CustomStringPipe,
    DefaultPipe,
    FormatPipe,
    
    PhonePipe
];

export {
    ApnPipe,
    BindTemplatePipe,
    CustomDatePipe,
    CustomStringPipe,
    DefaultPipe,
    FormatPipe,
};


export const Providers = [
    DatePipe,
    DecimalPipe,
    CurrencyPipe,
    JsonPipe,
];