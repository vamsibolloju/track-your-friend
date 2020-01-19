import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
//import { LOAD_USERS, LoadUsersSuccess, LoadUsersFailed } from '../actions/user.actions';
import { LOAD_CURRENT_USER, LoadCurrentUserSuccess, LoadCurrentUserFailed } from '../actions/currentUser.actions';
import { switchMap, map, catchError } from 'rxjs/operators'
import { RestService  } from '../../app/shared/services/rest.service';  
import { of } from 'rxjs';

@Injectable()
export class CurrentUserEffects{
    constructor(private actions$: Actions,
        private restService: RestService){     
    }

    @Effect()
    loadCurrentUser$ = this.actions$.pipe(
        ofType(LOAD_CURRENT_USER),
        switchMap(() => {
            return this.restService.getCurrentUser().pipe(
                map(user => new LoadCurrentUserSuccess(user)),
                catchError(error => of(new LoadCurrentUserFailed(error)))
                );
        })
    )
}