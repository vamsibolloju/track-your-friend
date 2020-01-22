import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from 'src/store/models/user.model';
import { delay, find, filter, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestService {
    constructor(private _http: HttpClient){}
    
    getUsers(): Observable<User[]>{
      return this._http.get<User[]>('assets/data/users.json').pipe(
        delay(500)
      );  
    }

    getCurrentUser(): Observable<User>{
      const currentUser = localStorage.getItem('currentUser');
      return this._http.get<User[]>('assets/data/users.json')
      .pipe(
        map(users => users.find(user => user.name === currentUser ) )
      )
    }

}