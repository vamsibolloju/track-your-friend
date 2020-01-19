import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[Users Page] Load Users');

export const loadUsersSuccess = createAction('[Users Page] Load Users Success', 
                props<{users: Array<User>}>());

export const onQueryChange = createAction('[Users Page] Search Query Change', 
                props<{query: string}>());
                            