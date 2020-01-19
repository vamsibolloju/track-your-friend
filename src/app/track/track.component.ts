import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../shared/services/friends.service';
import { Store } from '@ngrx/store';
import { User } from '../../store/models/user.model';
import { AppState } from '../app.state'; 
import { Observable } from 'rxjs';
import { selectAll } from 'src/store/reducers/users.reducer';
import { onQueryChange } from '../../store/actions/user.actions';
import { SocketService } from '../shared/services/socket.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  friends;
  currentUser$: Observable<User>;
  selected: User;
  searchQuery:string;
  users$ : Observable<User[]>;
  loading$: Observable<Boolean>;
  query$: Observable<string>;

  lon = 7.37448169999999;
  lat = 17.421397799999998;

  constructor(private router: Router,
    private friendsService: FriendsService,
    private store: Store<AppState>,
    private socketService: SocketService ) { 
    }

  ngOnInit() {
    this.currentUser$ = this.store.select('currentUser');
    this.query$ = this.store.select( state => state.users.query ) 

    this.currentUser$.subscribe(currentUser => {
      if(currentUser){
        this.query$.subscribe(query => {
          this.users$ = this.store.select( state => selectAll(state.users)
          .filter( user => user.id !== currentUser.id 
                            && currentUser['friends'].includes(user.id)
                            && ( query ?  ( (user.name.includes(query) || user.mobile.toString().includes(query))  ) : true )
                  ) 
          );
        });
      }
      this.loading$ = this.store.select(state => state.users.loading);
    });
}

  addAFriend() {
    this.router.navigateByUrl('/add-a-friend')
  }

  removeFriend(friend: object){
    this.friendsService.removeFriend(friend);
    this.ngOnInit();
  }

  unlinkFriend(friend: object){
    //this.friendsService.unlinkFriend(this.currentUser, friend);
    //this.ngOnInit();
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

  selectFriend(friend: User){
    this.selected = friend;
    this.socketService.fetchLocation(friend);
  }

  refreshLocation(event: Event, friend: object){
    event.stopPropagation();
  }

  onQuery(event: Event){
    this.store.dispatch(onQueryChange({ query: event.target['value'] }));
  }
}
