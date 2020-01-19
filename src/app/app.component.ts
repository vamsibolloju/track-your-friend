import { Component, OnInit } from '@angular/core';
import { FriendsService } from './shared/services/friends.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable } from 'rxjs';
import { User } from 'src/store/models/user.model';
import { loadUsers } from '../store/actions/user.actions';
import { LoadCurrentUser, LoadCurrentUserSuccess } from '../store/actions/currentUser.actions';
import { SocketService } from './shared/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  alertMessage; 
  currentUser$: Observable<User>;
  constructor(private friendsService: FriendsService,
    private router: Router,
    private store: Store<AppState>,
    private socketService: SocketService){

  }

  ngOnInit(){
    this.store.dispatch(loadUsers());
    if(localStorage.getItem('currentUser')){
      //this.socketService.init();
      this.store.dispatch(new LoadCurrentUser());
    }
 
    this.currentUser$ = this.store.select('currentUser');
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
    this.router.navigateByUrl('/login');
  }

}
