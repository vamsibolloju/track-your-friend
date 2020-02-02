import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../shared/services/friends.service';
import { User } from 'src/store/models/user.model';
import { RestService } from '../shared/services/rest.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: object = { name: '', mobile: '',  email:'', password: '' } 
  constructor(private router: Router,
    private friendsService: FriendsService,
    private restService: RestService) { }

  ngOnInit() {
  }

  signUp(user: User){
    //this.friendsService.addFriend(user);
    this.restService.signUp(user).subscribe( (data) => {
      console.log(data);
      //this.router.navigateByUrl('/');
    });
    
  }

}
