import { Component, OnInit } from '@angular/core';
import { FriendsService } from './shared/services/friends.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable } from 'rxjs';
import { User } from 'src/store/models/user.model';
import { loadUsers } from '../store/actions/user.actions';
import { LoadCurrentUser, LoadCurrentUserSuccess, ClearCurrentUser } from '../store/actions/currentUser.actions';
import { SocketService } from './shared/services/socket.service';
import { Message } from 'src/store/models/message.model';
import { addMessage } from 'src/store/actions/message.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  alertMessage; 
  currentUser$: Observable<User>;
  message$: Observable<Message>;
  constructor(private friendsService: FriendsService,
    private router: Router,
    private store: Store<AppState>,
    private socketService: SocketService){

  }

  ngOnInit(){

    /*   
    setTimeout(() => {
      this.socketService.trackRequest('vamsikrishna', 'ganapathi');
    }, 5000);
    */

    if(localStorage.getItem('currentUser')){
      this.socketService.init();
      this.store.dispatch(new LoadCurrentUser());
      this.store.dispatch(loadUsers());
    }
 
    this.currentUser$ = this.store.select('currentUser');
    this.message$ = this.store.select('message');
    
    this.alertMessage = {
      type : 'warning',
      message: 'Your friend wants to track you.'
    } 
    
  }

  clearMessage(){
    this.store.dispatch(addMessage({ message : { message: '', type: '' } }))
  }

  logout(event: Event){
    event.preventDefault();
    this.store.dispatch(new ClearCurrentUser());
    this.friendsService.clearCurrentUser();
    this.router.navigateByUrl('/login');
  }

}
