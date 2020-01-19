import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../shared/services/friends.service';
import { User } from 'src/store/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: object = { name: '', mobile: '', password: '' } 
  constructor(private router: Router,
    private friendsService: FriendsService) { }

  ngOnInit() {
  }

  signUp(user: User){
    this.friendsService.addFriend(user);
    this.router.navigateByUrl('/');
  }

}
