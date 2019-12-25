import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate  {
  
  constructor(private router: Router){

  } 

  canActivate(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    if(currentUser){
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
