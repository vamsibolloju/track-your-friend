import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from 'src/store/models/user.model';
import { HttpClient } from '@angular/common/http';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { selectAll } from 'src/store/reducers/users.reducer';
import { Update } from '@ngrx/entity';
import { updateUser } from 'src/store/actions/user.actions';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket: Socket;
    //private url: string = 'http://localhost:3000';
    private url: string =  'https://track-your-friend-socket.herokuapp.com';

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
                this.socket.emit( 'responseLocation', { lat : this.lat, lon : this.lon });
                this.lon = this.lon+ 0.1;
                this.lat = this.lat+ 0.1;
            });
            
            this.socket.on('responseLocation', ({friend_name, location}) => {
                    const friend = this.users.find(user => user.name === friend_name);
                    const user: Update<User> = {
                        id : friend.id,
                        changes: { lat: location.lat, lon: location.lon  }
                      };
                      this.store.dispatch(updateUser({ user }));
            });
        }
    }

    fetchLocation(friend: User){
        this.socket.emit('fetchLocation', friend.name);
    }

    getUsersStatus(){
       return this._http.get<Array<string>>(`${this.url}/sockets`)
    }

}    
  