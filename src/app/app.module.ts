import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//AIzaSyB9YmivYqaonY_N27jmb0ulUo4rGXmZFyY
import { AgmCoreModule } from '@agm/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { TrackComponent } from './track/track.component';
import { AddAFriendComponent } from './add-afriend/add-afriend.component';

import { FriendsService } from './shared/services/friends.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TrackComponent,
    AddAFriendComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyB9YmivYqaonY_N27jmb0ulUo4rGXmZFyY'
      apiKey: 'AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU'
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    })
  ],
  providers: [ FriendsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
