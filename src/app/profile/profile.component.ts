import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { HereGeoService } from '../shared/services/here-geo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser$;
  constructor(private store: Store<AppState>, private hereGeoService:HereGeoService) { }

  ngOnInit() {
    this.currentUser$ = this.store.select('currentUser');
    /*
    this.hereGeoService.getAddress().subscribe(data => {
      console.log(data);
    })
    */

  }

}
