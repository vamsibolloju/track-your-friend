import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private friends: Array<object> = [{ 
    name : 'friend 1',
    mobile: '9876875432',
    status: 'never',
    toggle: true 
  }, {
    name : 'friend 2',
    mobile: '9876875432',
    status: 'current'
  }, {
    name: 'friend 3',
    mobile: '9876875432',
    status: 'pending'    
  },
  {
    name: 'friend 4',
    mobile: '9876875432',
    status: 'past'
  }];

  constructor() { }
  
  getAllFriends() {
    return this.friends;
  }

  addFriend(friend: object){
    this.friends.push(friend);
  }

  removeFriend(friend: object){
    this.friends = this.friends.filter( f => f['name'] !== friend['name'] );
  }

}
