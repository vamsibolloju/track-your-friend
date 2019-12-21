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

  constructor(private router: Router,
    private _friendsService:FriendsService) { }

  ngOnInit() {
  }

  addFriend(event: Event) {
    event.preventDefault();
    this._friendsService.addFriend({
      name : this.friendName,
      mobile: this.friendMobile
    });
    this.router.navigateByUrl('/')
  }

}
