import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'friendsSearch',
    pure: false
})
export class FriendsSearchPipe implements PipeTransform {
    transform(items: any[], query: string): any {
        if (!items || !query) {
            return items;
        }
        return items.filter(item => (item.name.includes(query) || item.mobile.toString().includes(query)) );
    }
}