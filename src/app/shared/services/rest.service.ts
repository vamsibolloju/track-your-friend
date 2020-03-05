import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from 'src/store/models/user.model';
import { delay, find, filter, map } from 'rxjs/operators';

//const service_url = 'http://localhost/php-getting-started/web';
const service_url = 'https://track-your-friend.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class RestService {
        
    constructor(private _http: HttpClient){}
    
    getUsers(): Observable<User[]>{
      return this._http.get<User[]>(`${service_url}`);
      /*
      return this._http.get<User[]>('assets/data/users.json').pipe(
        delay(500)
      );
      */  
    }

    getCurrentUser(): Observable<User>{
      const currentUser = localStorage.getItem('currentUser');
      //const id = currentUser === 'vamsikrishna' ? 1 : 2;
      return this._http.get<User>(`${service_url}/user.php?name=${currentUser}`);
      /*
      return this._http.get<User[]>('assets/data/users.json')
      .pipe(
        map(users => users.find(user => user.name === currentUser ) )
      )
      */
    }

    addAFriend(user_id, friend_id){
        return this._http.post(`${service_url}/addAFriend.php`, { user_id, friend_id });
    }

    updateUserLocation(user_name, lat, lon){
      return this._http.post(`${service_url}/updateUserLocation.php`, { user_name, lat, lon })
    }

    login(user){
      console.log(user);
      return this._http.post(`${service_url}/login.php`, user);
    }

    signUp(user){
      console.log(user);
      return this._http.post(`${service_url}/signUp.php`, user);
    }


}