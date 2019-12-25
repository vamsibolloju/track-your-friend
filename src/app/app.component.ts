import { Component, OnInit } from '@angular/core';
import { FriendsService } from './shared/services/friends.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shreya-project';
  alertMessage; 
  currentUser: object | boolean;

  constructor(private friendsService: FriendsService,
    private router: Router){

  }

  ngOnInit(){
    this.currentUser = this.friendsService.getCurrentUser();
    this.alertMessage = {
      type : 'warning',
      message: 'Your friend wants to track you.'
    } 
    /*
    setTimeout(() => {
      this.alertMessage = {
        type : 'info',
        message: 'Changed aaaa.'
      }; 
    }, 2000);
    */
  }

  logout(event: Event){
    event.preventDefault();
    this.friendsService.clearCurrentUser();
    this.currentUser = false;
    this.router.navigateByUrl('/login');
  }

}
