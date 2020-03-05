import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectAll } from 'src/store/reducers/users.reducer';
import { User } from 'src/store/models/user.model';
import { LoadCurrentUserSuccess } from 'src/store/actions/currentUser.actions';
import { RestService } from '../shared/services/rest.service';
import { SocketService } from '../shared/services/socket.service';
import { loadUsersSuccess, loadUsers } from 'src/store/actions/user.actions';
import { UtilServices } from '../shared/services/utils.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: object = { mobile : 9999999999, password: 'test@123' };
  users: Array<User>;
  errorMessages: Array<string> = [];
  logging: boolean = false;
  constructor(private router: Router,
    private store: Store<AppState>,
    private restService: RestService,
    private socketService: SocketService,
    private utilServices: UtilServices ) { }

  ngOnInit() {
    this.store.select(state => selectAll(state.users)).subscribe(
        users => this.users = users
    );
  }

  login(formValue){  
    this.logging = true; 
    this.restService.login(formValue).subscribe((user:User) => {
      this.logging = false;
      if(user){
        localStorage.setItem('currentUser', user['name']);
        this.utilServices.getCurrentPosition((location) => {
          this.restService.updateUserLocation(user['name'], location['lat'], location['lon']).subscribe(response => {
            console.log(response);
          }); 
        });
        this.socketService.init();
        this.store.dispatch(loadUsers());
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
