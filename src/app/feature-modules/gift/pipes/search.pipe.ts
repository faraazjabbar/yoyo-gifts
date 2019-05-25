import { Gift } from 'src/app/shared/models/gift.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(gifts: Gift[], searchText: string): any[] {
    if (!gifts) { return []; }
    if (!searchText) { return gifts; }
    searchText = searchText.toLowerCase();
    return gifts.filter( gift => {
          return gift.giftName.toLowerCase().includes(searchText);
        });
    }
}
