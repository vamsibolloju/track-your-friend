import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { TrackComponent } from './track/track.component';
import { AddAFriendComponent } from './add-afriend/add-afriend.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{
    path: 'about', component: AboutComponent  
  },{
    path: '', component: TrackComponent
  },
  {
    path: 'add-a-friend', component: AddAFriendComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
