import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../shared/services/friends.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  friends;

  latitude = -28.68352;
  longitude = -147.20785;
  mapType = 'satellite';

  constructor(private router: Router,
    private friendsService: FriendsService ) { }

  ngOnInit() {
    this.friends = this.friendsService.getAllFriends();
  }

  addAFriend() {
    this.router.navigateByUrl('/add-a-friend')
  }

  removeFriend(friend: object){
    this.friendsService.removeFriend(friend);
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
        console.log(friend);
      });
    }catch(e){

    }
  }

}
