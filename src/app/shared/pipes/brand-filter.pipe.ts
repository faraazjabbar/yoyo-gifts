import { Brand } from '../models/gift.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {
    transform(brands: Brand[], categoryKey: string): Brand[] {
        if (!brands) {
            return [];
        }
        if (!categoryKey) {
            return brands;
        }
        return brands.filter(brand => {
            return brand.categoryId === categoryKey;
        });
    }
}
