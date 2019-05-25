import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], brandArray: string[], pointsValue: number): any[] {
  console.log(brandArray);
  console.log(pointsValue);
  if (!items) { return []; }
  if (!brandArray.length && pointsValue === 0) { return items; }

  let newArray = [];
  if (brandArray.length) {
    newArray = items.filter( it => {
        return brandArray.includes(it.brandName.toLowerCase());
  });
  }
  if (pointsValue !== 0 && brandArray.length) {
    newArray = newArray.filter( it => {
        return it.cost <= pointsValue ;
  });
  }
  if (pointsValue !== 0 && !brandArray.length) {
    newArray = items.filter( it => {
        return it.cost <= pointsValue ;
  });
  }
  return newArray;
 }
}
