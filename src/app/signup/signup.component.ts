import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../shared/services/friends.service';
import { User } from 'src/store/models/user.model';
import { RestService } from '../shared/services/rest.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: object = { name: 'test', mobile: '4444444444',  email:'sample@ste.com', password: 'test@123' };
  signing: boolean = false;
  error: string;
  
  constructor(private router: Router,
    private friendsService: FriendsService,
    private restService: RestService) { }

  ngOnInit() {
  }

  signUp(user: User){
    this.signing = true;

    window.navigator.geolocation.getCurrentPosition((position) => {
      this.restService.signUp({ ...user, lat: position.coords.latitude, lon: position.coords.longitude }).subscribe( (data) => {
        if(data['message'] !== 'Success'){
          this.error = data['message'];
        }
        this.signing = false;
        //this.router.navigateByUrl('/');
    });
  });


    
  }

}
