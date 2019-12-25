import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../shared/services/friends.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: object = { mobile : '', password: '' };
  errorMessages: Array<string> = [];

  constructor(private router: Router,
    private friendsService: FriendsService) { }

  ngOnInit() {
  }

  login(formValue){
    const user = this.friendsService.checkUser(formValue);
    if(user){
      localStorage.setItem('currentUser', user['name']);
      this.router.navigateByUrl('/');
    }else{
      this.errorMessages.push('Incorrect credentials, Please try with correct data!');
    }
  }

}
