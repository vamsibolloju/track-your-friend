import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from 'src/store/models/user.model';
import { HttpClient } from '@angular/common/http';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { selectAll } from 'src/store/reducers/users.reducer';
import { Update } from '@ngrx/entity';
import { updateUser } from 'src/store/actions/user.actions';
import { Message } from 'src/store/models/message.model';
import { addMessage } from 'src/store/actions/message.actions';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket: Socket;
    private url: string = 'http://localhost:3000';
    //private url: string =  'https://track-your-friend-socket.herokuapp.com';

    private users: Array<User>;
    constructor(private _http: HttpClient, private store: Store<AppState>){
        /*    
        const user = localStorage.getItem('currentUser');
        if(user){
          this.socket.emit('start',  user);
        }
        */
       this.store.select(state => selectAll(state.users)).subscribe(users => {
           this.users = users;
       })
    }
    
    lat = 10;
    lon = 20;

    init(){
        const currentUser = localStorage.getItem('currentUser');
        if(currentUser){
            this.socket = new Socket({ url : this.url, options: {  transports: ['websocket'], upgrade: false   } });
            this.socket.emit('start', currentUser);

            this.socket.on('disconnect', (reason) => {
                console.log(`socket is disconnect due to ${reason}`);
            });

            this.socket.on('requestLocation', (friend_name) => {
                window.navigator.geolocation.getCurrentPosition((position) => {
                    console.log(`sending location to ${friend_name}, ${position.coords.latitude} - ${position.coords.longitude} `);
                    this.socket.emit( 'responseLocation', 
                    { lat : position.coords.latitude, 
                        lon : position.coords.longitude });
                })
            });
            
            this.socket.on('responseLocation', ({friend_name, location}) => {
                console.log(`Got location ${location} of ${friend_name} `);
                const friend = this.users.find(user => user.name === friend_name);
                    if( (location['lat'] !== friend['lat']) || 
                        (location['lon'] !== friend['lon'])  ){
                            const user: Update<User> = {
                                id : friend.id,
                                changes: { lat: location.lat, lon: location.lon, lastUpdated: Date.now()  }
                              };
                              this.store.dispatch(updateUser({ user }));
                    }else{
                        if(friend.trackMode === 'eye') {
                            if( ( (Date.now() - friend.lastUpdated)  / 1000 ) > 20  ){
                                console.log('he is not moving...');
                                this.store.dispatch(addMessage({  message : { message: `${friend.name} is not moving`, type: 'warning' } }));
                                const user: Update<User> = {
                                    id : friend.id,
                                    changes: { lastUpdated: Date.now()  }
                                  };
                                  this.store.dispatch(updateUser({ user }));    
                            }
                        };
                    }


            });

            this.socket.on('message', (message: Message) => {
                this.store.dispatch(addMessage({  message }));
            });

        }
    }

    trackRequest(user: string, friend_name: string){
        this.socket.emit('message', { user, friend_name, message:  { type: 'warning', message : `${user} wants to track you` } } );
    }


    fetchLocation(friend: User){
        this.socket.emit('fetchLocation', friend.name);
    }

    getUsersStatus(){
       return this._http.get<Array<string>>(`${this.url}/sockets`)
    }

}    
  