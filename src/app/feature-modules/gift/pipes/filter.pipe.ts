import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], brandValue: string, pointsValue: number): any[] {
  console.log(brandValue);
  console.log(pointsValue);
  if (!items) { return []; }
  if (brandValue === '' && pointsValue === 0) { return items; }

  let newArray = [];
  if (brandValue !== '') {
    newArray = items.filter( it => {
        return it.brandName.toLowerCase() === brandValue ;
  });
  }
  if (pointsValue !== 0 && brandValue !== '') {
    newArray = newArray.filter( it => {
        return it.cost <= pointsValue ;
  });
  }
  if (pointsValue !== 0 && brandValue === '') {
    newArray = items.filter( it => {
        return it.cost <= pointsValue ;
  });
  }
  return newArray;
 }
}
