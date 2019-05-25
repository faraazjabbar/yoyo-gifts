import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: any, param: any, direction?: string): any {
    if (!array) { return []; }
    if (!param) { return array; }
    if (direction === 'asc') {
      array.sort((a: any, b: any) => {
        if (a[param] < b[param]) {
          return -1;
        } else if (a[param] > b[param]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    if (direction === 'desc') {
      array.sort((a: any, b: any) => {
        if (a[param] < b[param]) {
          return 1;
        } else if (a[param] > b[param]) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    return array;
  }
}
