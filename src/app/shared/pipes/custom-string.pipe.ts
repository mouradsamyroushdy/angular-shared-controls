import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customString'
})
export class CustomStringPipe implements PipeTransform {

  transform(value: any, format:string = '-'): any {
    if(!value  || value == "" || value == 0 )
      return format;
    return value;
  }

}
