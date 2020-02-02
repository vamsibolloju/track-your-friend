import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../shared/services/friends.service';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectAll } from 'src/store/reducers/users.reducer';
import { User } from 'src/store/models/user.model';
import { LoadCurrentUserSuccess } from 'src/store/actions/currentUser.actions';
import { RestService } from '../shared/services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: object = { mobile : 9999999999, password: 'test@123' };
  users: Array<User>;
  errorMessages: Array<string> = [];

  constructor(private router: Router,
    private friendsService: FriendsService,
    private store: Store<AppState>,
    private restService: RestService ) { }

  ngOnInit() {
    this.store.select(state => selectAll(state.users)).subscribe(
        users => this.users = users
    );
  }

  login(formValue){  
    //const user = this.users.find(user => 
    //  (user.mobile === formValue.mobile && user.password === formValue.password ));
    const user = null;
    this.restService.login(formValue).subscribe((user:User) => {
      console.log(user);
      if(user){
        localStorage.setItem('currentUser', user['name']);
        this.store.dispatch(new LoadCurrentUserSuccess(user));
        this.router.navigateByUrl('/');
      }else{
        this.errorMessages.push('Incorrect credentials, Please try with correct data!');
      }
  
    }, error => {
      console.log(error);
    })
  }

}
