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
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserReducer } from 'src/store/reducers/users.reducer';
import { CurrentUserReducer } from 'src/store/reducers/currentUser.reducer';
import { ProfileComponent } from './profile/profile.component';
import { UsersEffects } from '../store/effects/users.effect';
import { CurrentUserEffects } from '../store/effects/currentUser.effect';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TrackComponent,
    AddAFriendComponent,
    LoginComponent,
    SignupComponent,
    MapComponent,
    FriendsSearchPipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      users: UserReducer,
      currentUser: CurrentUserReducer  
    }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([UsersEffects, CurrentUserEffects]),
    SocketIoModule.forRoot(config)
  ],
  providers: [ FriendsService, AuthGuard, ShouldNotAuthGuard, CurrentUserResolver ],
  bootstrap: [AppComponent]
})
export class AppModule { }
