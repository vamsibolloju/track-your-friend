import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { loadUsers, loadUsersSuccess } from '../actions/user.actions';
import { switchMap, map, catchError } from 'rxjs/operators'
import { RestService  } from '../../app/shared/services/rest.service';  
import { of } from 'rxjs';

@Injectable()
export class UsersEffects{
    constructor(private actions$: Actions,
        private restService: RestService){     
    }

    @Effect()
    loadUsers$ = this.actions$.pipe(
        ofType(loadUsers),
        switchMap(() => {
            return this.restService.getUsers().pipe(
                map(users => users.map( user => ({ ...user, addressMode: 'map', trackMode: 'refresh' }) )  ),
                map(users => loadUsersSuccess({ users })),
                //catchError(error => of(new LoadUsersFailed(error)))
                );
        })
    )
}