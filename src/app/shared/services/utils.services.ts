import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilServices {
    currentUserName: string = null;
   
    public getCurrentPosition(cb: Function){
        window.navigator.geolocation.getCurrentPosition((position) => {
            cb({ 
                    lat: position.coords.latitude, 
                    lon: position.coords.longitude 
            });
        })
    }

    public getLoggedInUserName(){
        if(!this.currentUserName){
            this.currentUserName = localStorage.getItem('currentUser');
        }
        return this.currentUserName;
    }
}
