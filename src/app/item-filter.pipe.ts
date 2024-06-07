import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './home/home';

@Pipe({
  name: 'itemFilter',
  standalone: true,
  pure:false,
})
export class ItemFilterPipe implements PipeTransform {
  transform(items: Item[], categoryFilter: string, nameFilter: string, codeFilter: string, priceFilter: number | null): Item[] {
    if (!items) return [];
    
    return items.filter(item => {
      // Check category
      if (categoryFilter && !item.category.toLowerCase().includes(categoryFilter.toLowerCase())) {
        return false;
      }
      
      // Check name
      if (nameFilter && !item.name.toLowerCase().includes(nameFilter.toLowerCase())) {
        return false;
      }
      
      // Check code
      if (codeFilter && !item.code.toLowerCase().includes(codeFilter.toLowerCase())) {
        return false;
      }
      
      // Check price
      if (priceFilter !== null && item.price !== priceFilter) {
        return false;
      }
      
      return true;
    });
  }
}
