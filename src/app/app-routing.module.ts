import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { TrackComponent } from './track/track.component';
import { AddAFriendComponent } from './add-afriend/add-afriend.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from '../app/shared/guards/auth.guard';
import { ShouldNotAuthGuard } from '../app/shared/guards/should-not-auth.guard';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [{
    path: 'about', component: AboutComponent  
  },{
    path: '', component: TrackComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'add-a-friend', component: AddAFriendComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'login', component: LoginComponent,
    canActivate: [ ShouldNotAuthGuard ]
  },
  {
    path: 'signup', component: SignupComponent,
    canActivate: [ ShouldNotAuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
