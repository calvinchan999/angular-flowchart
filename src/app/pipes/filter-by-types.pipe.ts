import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTypes'
})
export class FilterByTypesPipe implements PipeTransform {
  transform(items: any[], types: string[]): any[] {
    if (!items || !types) return items;
    return items.filter(item => types.includes(item.type));
  }
} 