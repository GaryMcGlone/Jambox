import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringConvert'
})
export class StringConvertPipe implements PipeTransform {

  transform(string: string, args?: any): any {
    var value: string;

    if(string.length > 9){
      var trimmedString = string.substring(0, 7);
      value = trimmedString + '..';
    }
    else {
      value = string;
    }
    
    return value;
  }
}
