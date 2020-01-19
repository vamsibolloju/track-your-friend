import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const ADD_AS_A_FRIEND = '[CURRENT USER] AddAsAFriend';
export const LOAD_CURRENT_USER = '[CURRENT USER] Load';
export const LOAD_CURRENT_USER_SUCCESS = '[CURRENT USER] Load Success';
export const LOAD_CURRENT_USER_FAILED = '[CURRENT USER] Load Failed';

export class AddAsAFriend implements Action{
    readonly type = ADD_AS_A_FRIEND;
    constructor(public payload: User){
    }
}

export class LoadCurrentUser implements Action{
    readonly type = LOAD_CURRENT_USER;
    constructor(){
    }
}

export class LoadCurrentUserSuccess implements Action{
    readonly type = LOAD_CURRENT_USER_SUCCESS;
    constructor(public payload: User){
    }
}

export class LoadCurrentUserFailed implements Action{
    readonly type = LOAD_CURRENT_USER_FAILED;
    constructor(public payload: object){
    }
}

export type Actions = AddAsAFriend;
