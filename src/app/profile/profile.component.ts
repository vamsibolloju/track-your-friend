import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { HereGeoService } from '../shared/services/here-geo.service';
import { UtilServices } from '../shared/services/utils.services';
import { RestService } from '../shared/services/rest.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser$;
  position: object;
  savingLocation: boolean;

  constructor(private store: Store<AppState>, 
    private hereGeoService:HereGeoService,
    private utilServices: UtilServices,
    private restService: RestService) { }

  ngOnInit() {
    this.currentUser$ = this.store.select('currentUser');
    this.utilServices.getCurrentPosition((position) => {
      this.position = position;
    });
    /*
    this.hereGeoService.getAddress().subscribe(data => {
      console.log(data);
    })
    */
  }
  saveLocation(){
    this.savingLocation = true;
    this.restService.updateUserLocation( this.utilServices.getLoggedInUserName,
    this.position['lat'], this.position['lon'] ).subscribe(response => {
      console.log(response);
    });
    setTimeout(() => {
      this.savingLocation = false;
    }, 1000);
  }

}
