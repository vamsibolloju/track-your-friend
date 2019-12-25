import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { FriendsService } from '../services/friends.service';

@Injectable()
export class CurrentUserResolver implements Resolve<object> {
  constructor(private friendsService: FriendsService) {}

  resolve(
  ): Observable<any>|Promise<any>|any {
    return this.friendsService.getCurrentUser();
  }
}