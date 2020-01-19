import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { runInThisContext } from 'vm';
import { User } from 'src/store/models/user.model';


@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket: Socket;
    /*
    constructor(private socket: Socket){
        const user = localStorage.getItem('currentUser');
        if(user){
          this.socket.emit('start',  user);
        }
    }
    */

    init(){
        const currentUser = localStorage.getItem('currentUser');
        if(currentUser){
            console.log('came aa')
            this.socket = new Socket({ url : 'http://localhost:4444', options: {  } });
            this.socket.emit('start', currentUser);

            this.socket.on('disconnect', (reason) => {
                console.log(`socket is disconnect due to ${reason}`);
            });

            this.socket.on('requestLocation', (friend_name) => {
                this.socket.emit( 'responseLocation', { lat : 10, lon : 20 });
            });
            
            this.socket.on('responseLocation', (friend_name, location) => {
                console.log(friend_name, location);
            });


        }
    }

    fetchLocation(friend: User){
        this.socket.emit('fetchLocation', friend.name);
    }

}    
  