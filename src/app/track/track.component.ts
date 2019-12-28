import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../shared/services/friends.service';
import { Observable, from } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../../store/models/user.model';
import { AppState } from '../app.state'; 

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  friends;
  currentUser: object | boolean;
  selected: object;
  searchQuery:string;
  users : Observable<User[]>;

  lon = 7.37448169999999;
  lat = 17.421397799999998;

  constructor(private router: Router,
    private friendsService: FriendsService,
    private store: Store<AppState> ) { 
      this.users = this.store.select('user');
    }

  ngOnInit() {
    this.currentUser = this.friendsService.getCurrentUser();
    this.friends = this.friendsService.getUserFriends(this.currentUser);
    this.selected = this.friends[0];
  }

  addAFriend() {
    this.router.navigateByUrl('/add-a-friend')
  }

  removeFriend(friend: object){
    this.friendsService.removeFriend(friend);
    this.ngOnInit();
  }

  unlinkFriend(friend: object){
    this.friendsService.unlinkFriend(this.currentUser, friend);
    this.ngOnInit();
  }


  trackFriend(friend: object){
    friend['toggle'] = !friend['toggle'];
    if(friend['toggle']){
      this.updateAddressOfFriend(friend);
    }  
  }

  updateAddressOfFriend(friend: object){
    try{
      window.navigator.geolocation.getCurrentPosition((position) => {
        friend['address'] = {
          'latitude': position.coords.latitude,
          'longitude': position.coords.longitude
        };
      });
    }catch(e){

    }
  }

  selectFriend(friend: object){
    this.selected = friend;
  }

  refreshLocation(event: Event, friend: object){
    event.stopPropagation();
  }

  onQuery(event: Event){
    this.searchQuery = event.target['value'];
  }
}
