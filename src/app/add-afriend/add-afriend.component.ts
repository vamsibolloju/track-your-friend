import { Component, OnInit, ɵConsole } from '@angular/core';
import { FriendsService } from '../shared/services/friends.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/store/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { map } from 'rxjs/operators';
import { AddAsAFriend} from '../../store/actions/currentUser.actions'
import { selectAll } from 'src/store/reducers/users.reducer';

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
  currentUser$:Observable<User>;
  searchQuery:string;
  users$: Observable<User[]>;
  loading$: Observable<boolean>;

  constructor(private router: Router,
    private _friendsService:FriendsService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.currentUser$ = this.store.select('currentUser');
    this.currentUser$.subscribe(currentUser => {
      if(currentUser){
        this.users$ = this.store.select( state => selectAll(state.users)
        .filter(u => u.id !== currentUser.id && !currentUser['friends'].includes(u.id) ) );
      }
    });
    this.loading$ = this.store.select(state => state.users.loading);    
  }

  onSearch(eve : Event){
    this.searchQuery = eve.target['value'];
  }

  addFriend(event: Event) {
    event.preventDefault();
    /*
    this._friendsService.addFriend({
      name : this.friendName,
      mobile: this.friendMobile
    });
    this.router.navigateByUrl('/');
    */
  }

  addFriendFromList(friend: User){
    this.store.dispatch(new AddAsAFriend(friend));
    //this._friendsService.addAFriend(this.currentUser, friend);
    //this.router.navigateByUrl('/');
  }

}
