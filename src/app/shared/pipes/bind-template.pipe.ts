import { Pipe, PipeTransform } from '@angular/core';
import { forEach } from 'lodash';
import _ from 'lodash';

@Pipe({
  name: 'bindTemplate'
})
export class BindTemplatePipe implements PipeTransform {
  transform(template: string, ...fields: Field[]): string {
    _.forEach(fields, field => {
      let pattern = new RegExp('#{' + field.key + '}#', 'g');
      template = template.replace(pattern, field.value);
    });
    return template;
  }
}

export class Field {
  key: string;
  value: any
}