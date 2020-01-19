import { Injectable } from '@angular/core';
import { User } from '../../../store/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private friends: Array<User> = [{ 
    id: '1',
    name : 'vamsikrishna',
    mobile: 9876875432,
    password: 'test123',
    status: 'never',
    toggle: false,
    lon: 5,
    lat: 5,
    friends: [ '2' ] 
  }, {
    id: '2',
    name : 'ganapathi',
    mobile: 9876875432,
    password: 'test123',
    toggle: false,
    status: 'current',
    lon: 6,
    lat: 6,
    friends: [ ] 

  }];

  private friendLinks = { 'vamsikrishna' : [ 'ganapathi', 'suguna' ] }

  constructor() { }
  
  getAllFriends() {
    return this.friends;
  }

  getUserFriends(currentUser){
    const friends = this.friendLinks[currentUser['name']];
    return this.friends.filter( f => friends.includes(f['name']) );
  }

  getUserNonFriends(currentUser){
    const friends = [ ...this.friendLinks[currentUser['name']] ];
    friends.push(currentUser.name);
    return this.friends.filter( f => !friends.includes(f['name']) );
  }

  addFriend(friend: User){
    this.friends.push(friend);
  }
  
  addAFriend(currentUser: object | boolean, friend: object){
    this.friendLinks[currentUser['name']].push(friend['name']);  
  }

  unlinkFriend(currentUser: object | boolean, friend: object){
    this.friendLinks[currentUser['name']] = this.friendLinks[currentUser['name']]
                                                .filter( f =>  f !== friend['name'] );  
  }

  removeFriend(friend: object){
    this.friends = this.friends.filter( f => f['name'] !== friend['name'] );
  }

  checkUser(credentials: Object){
    return this.friends.find(f => ( f['mobile'] === credentials['mobile'] && f['password'] === credentials['password']  ))
  }

  getCurrentUser(){
    const currentUser = localStorage.getItem('currentUser');
    if(currentUser){
      return this.friends.find( f => f['name'] === currentUser);
    }
    return false;
  }

  clearCurrentUser(){
    localStorage.removeItem('currentUser');
  }

}
