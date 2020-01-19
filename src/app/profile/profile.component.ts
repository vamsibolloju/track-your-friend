import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser$;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.currentUser$ = this.store.select('currentUser');

  }

}
