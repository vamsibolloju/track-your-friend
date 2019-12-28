import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { TrackComponent } from './track/track.component';
import { AddAFriendComponent } from './add-afriend/add-afriend.component';

import { FriendsService } from './shared/services/friends.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AuthGuard } from '../app/shared/guards/auth.guard';
import { CurrentUserResolver } from '../app/shared/resolvers/currentUser.resolver';
import { ShouldNotAuthGuard } from './shared/guards/should-not-auth.guard';
import { MapComponent } from './map/map.component';
import { FriendsSearchPipe } from './shared/pipes/friendsSearch.pipe';

import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/store/reducers/users.reducer';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TrackComponent,
    AddAFriendComponent,
    LoginComponent,
    SignupComponent,
    MapComponent,
    FriendsSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({
      user: reducer  
    })
  ],
  providers: [ FriendsService, AuthGuard, ShouldNotAuthGuard, CurrentUserResolver ],
  bootstrap: [AppComponent]
})
export class AppModule { }
