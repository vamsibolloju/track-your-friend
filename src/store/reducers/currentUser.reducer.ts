import { User } from '../models/user.model';
import * as CurrentUserActions from '../actions/currentUser.actions';
import { ActivationEnd } from '@angular/router';

const currentUser: User = null; 

export function CurrentUserReducer(state: User = currentUser, 
  action: CurrentUserActions.AddAsAFriend | CurrentUserActions.LoadCurrentUserSuccess | CurrentUserActions.ClearCurrentUser ){
  switch(action.type){
      case CurrentUserActions.ADD_AS_A_FRIEND:
        const user = { ...state };
        user.friends = [...user.friends, action.payload.id ]
        return user;
      case CurrentUserActions.LOAD_CURRENT_USER_SUCCESS:
        return { ...action.payload };
      case CurrentUserActions.CLEAR_CURRENT_USER:
        return null;
      default: 
          return state;
  }
}