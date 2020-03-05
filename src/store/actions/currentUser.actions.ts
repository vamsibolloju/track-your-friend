import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const ADD_AS_A_FRIEND = '[CURRENT USER] AddAsAFriend';
export const LOAD_CURRENT_USER = '[CURRENT USER] Load';
export const LOAD_CURRENT_USER_SUCCESS = '[CURRENT USER] Load Success';
export const LOAD_CURRENT_USER_FAILED = '[CURRENT USER] Load Failed';
export const CLEAR_CURRENT_USER = '[CURRENT USER] Clear User'

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
    constructor(public payload: User | null){
    }
}

export class LoadCurrentUserFailed implements Action{
    readonly type = LOAD_CURRENT_USER_FAILED;
    constructor(public payload: object){
    }
}

export class ClearCurrentUser implements Action{
    readonly type = CLEAR_CURRENT_USER;
    constructor(){
    }
}


export type Actions = AddAsAFriend;
