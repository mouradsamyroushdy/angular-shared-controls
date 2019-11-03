import { Pipe, PipeTransform } from '@angular/core';
import { AsYouType } from 'libphonenumber-js';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(ani: string): any {
    let phone: any;
    if (new RegExp('^(\\+)?1?\\d+$').test(ani) && ani) {
      phone = new AsYouType('US').input(ani);
    }
    return phone ? phone : '-';
  }
}
