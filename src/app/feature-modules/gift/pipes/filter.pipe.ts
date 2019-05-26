import { Gift } from './../../../shared/models/gift.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Gift[], brandArray: string[], pointsValue: number, categoryValue: string): any[] {
  console.log(brandArray);
  console.log(pointsValue);
  if (!items) { return []; }
  if (!categoryValue && !brandArray.length && pointsValue === 0) { return items; }

  let newArray = [];
  if (categoryValue) {
    newArray = items.filter( it => it.categoryId === categoryValue);
  } else {
      newArray = items;
  }
  if (brandArray.length) {
    newArray = newArray.filter( it => {
        return brandArray.includes(it.brandName.toLowerCase());
  });
  }
  if (pointsValue !== 0 && brandArray.length) {
    newArray = newArray.filter( it => {
        return it.cost <= pointsValue ;
  });
  }
  if (pointsValue !== 0 && !brandArray.length) {
    newArray = newArray.filter( it => {
        return it.cost <= pointsValue ;
  });
  }
  return newArray;
 }
}
