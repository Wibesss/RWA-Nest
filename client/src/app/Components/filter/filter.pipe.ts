import { Pipe, PipeTransform } from '@angular/core';
import { GameModel } from 'src/app/Store/types/game.module';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: GameModel[] | null, searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((item) =>
      item.title?.toLowerCase().includes(searchText)
    );
  }
}