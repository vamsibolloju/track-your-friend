import { Action } from '@ngrx/store';
import { User } from '../models/user.model';
import * as UserActions from '../actions/user.actions';

const initialState: User = {
    name: 'vamsikrishna',
    mobile: 9876543213,
    password: 'test123',
    status: 'active',
    toggle: false,
    lat: 5,
    lon: 5
};

export function reducer(state: User[] = [ initialState ] , action: UserActions.AddUser ){
    switch(action.type){
        case UserActions.ADD_USER:
            return [...state, action.payload]
        default:
            return state;
    }
}