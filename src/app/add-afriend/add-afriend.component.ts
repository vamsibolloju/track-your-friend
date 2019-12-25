import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../shared/services/friends.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-afriend',
  templateUrl: './add-afriend.component.html',
  styleUrls: ['./add-afriend.component.css']
})
export class AddAFriendComponent implements OnInit {

  friendName: string;
  friendMobile: number;
  query: string = '';
  list: Array<object>;
  currentUser:object | boolean;
  searchQuery:string;

  constructor(private router: Router,
    private _friendsService:FriendsService) { }

  ngOnInit() {
    this.currentUser = this._friendsService.getCurrentUser();
    this.list = this._friendsService.getUserNonFriends(this.currentUser);
  }

  onSearch(eve : Event){
    this.searchQuery = eve.target['value'];
  }

  addFriend(event: Event) {
    event.preventDefault();
    this._friendsService.addFriend({
      name : this.friendName,
      mobile: this.friendMobile
    });
    this.router.navigateByUrl('/')
  }

  addFriendFromList(friend: object){
    this._friendsService.addAFriend(this.currentUser, friend);
    this.router.navigateByUrl('/');
  }

}
