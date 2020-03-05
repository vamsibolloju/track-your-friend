import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../shared/services/friends.service';
import { Store } from '@ngrx/store';
import { User } from '../../store/models/user.model';
import { AppState } from '../app.state'; 
import { Observable } from 'rxjs';
import { selectAll } from 'src/store/reducers/users.reducer';
import { onQueryChange, updateUser } from '../../store/actions/user.actions';
import { SocketService } from '../shared/services/socket.service';
import { HereGeoService } from '../shared/services/here-geo.service';
import { Update } from '@ngrx/entity';

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

  selectedAddressMode: string = 'map';
  selectedTrackMode: string = 'refresh';   
  
  addressModes: Array<string> = [ 'map', 'address-card' ];
  trackModes: Array<string> = ['refresh', 'eye']; // , 'hand-pointer-o'

  trackInterval: any;

  friendAddress: any;
  usersStatus: Array<string> = []; 

  constructor(private router: Router,
    private friendsService: FriendsService,
    private store: Store<AppState>,
    private socketService: SocketService,
    private hereGeoService:HereGeoService ) { 
    }

  ngOnInit() {

    this.socketService.getUsersStatus().subscribe(usersStatus => {
      this.usersStatus = usersStatus;
    });

    this.currentUser$ = this.store.select('currentUser');
    this.query$ = this.store.select( state => state.users.query ) 

    this.currentUser$.subscribe(currentUser => {
      if(currentUser){
        this.query$.subscribe(query => {
          this.users$ = this.store.select( state => selectAll(state.users)
          .filter( user => { 
            return user.id !== currentUser.id 
                            && (currentUser['friends'] || [] ).includes(user.id)
                            && ( query ?  ( (user.name.includes(query) || user.mobile.toString().includes(query))  ) : true )
          }) 
          );
          this.users$.subscribe(users => {
            if(this.selected){
              const selectedUser = users.find(user => user.id === this.selected.id);
              this.selected = selectedUser;
            }
          })
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
    if(this.selected && this.selected.id === friend.id){
        return true;
    }
    this.clearInterval(); 
    this.selected = friend;
    if(this.selected.trackMode === 'eye' ){
      this.setInterval();
    }else{
      this.updatePosition();
    };
  }

  private updatePosition(){
    const friend = this.selected;
    this.socketService.fetchLocation(friend);
  }

  private updateAddress(){
    const friend = this.selected;
    this.hereGeoService.getAddress(friend.lat, friend.lon).subscribe(address => {
      this.friendAddress = address;
    }, error => {
      console.log(error);
    });
  }

  refreshLocation(event: Event, friend: object){
    event.stopPropagation();
  }

  onQuery(event: Event){
    this.store.dispatch(onQueryChange({ query: event.target['value'] }));
  }

  onAddressModeChange(addressMode: string){
    if(addressMode === 'address-card'){
      this.updateAddress();  
    }
    this.selectedAddressMode = addressMode;
    const user: Update<User> = {
      id : this.selected.id,
      changes: { addressMode  }
    };
    this.store.dispatch(updateUser({ user }));
  }

  onTrackModeChange(trackMode: string){
    this.selectedTrackMode = trackMode;
    const user: Update<User> = {
      id : this.selected.id,
      changes: { trackMode  }
    };
    this.store.dispatch(updateUser({ user }));
    //this.updatePosition();
    if(trackMode === 'eye'){
      this.setInterval();
    }else{
      this.clearInterval();
      this.updatePosition();
    }
  }

  setInterval(){
    this.trackInterval = setInterval(() => {
      console.log(`tracking on ${this.selected.name} ... `)
      this.updatePosition();
    }, 2000);
  }

  clearInterval(){
    if(this.trackInterval){
      console.log(`stop tracking on ${this.selected.name}`);
      clearInterval(this.trackInterval);
      this.trackInterval = null;
    }
  }
}
