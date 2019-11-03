import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {

  transform(value: any, format: string = 'M/d/yyyy'): any {
    if (value != null) {
      return super.transform(value, format);
    }
    return '-';
  }

}
