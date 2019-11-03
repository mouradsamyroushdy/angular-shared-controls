import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apn'
})
export class ApnPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    if (value != null && value != undefined){
        value = value.replace(/-/g, '');
        let re = /^(.{3})(.{3})(.{2})(.{2})$/gi;
        return value.replace(re, '$1-$2-$3-$4');
    }
    return value;
  }
}
