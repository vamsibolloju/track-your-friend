import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { User } from '../models/user.model';
import * as UserActions from '../actions/user.actions';

export interface UsersState extends EntityState<User> {
  loading: boolean;
  query: string;
}

export const adapter: EntityAdapter<User> = createEntityAdapter();

const initialState: UsersState = adapter.getInitialState({
  loading: false,
  query: ''
});


const UserReducerFunction = createReducer(
    initialState,
    on(UserActions.loadUsers, (state) => {
      return ({ ...state, loading: true });
    }),
    on(UserActions.loadUsersSuccess, 
      (state, { users }) => 
      {
        state = {...state, loading: false};
        return adapter.addAll(users, state) 
      }),
    on(UserActions.onQueryChange, 
      (state, { query }) => {
        return { ...state, query: query }
      }),
      on(UserActions.updateUser, 
        (state, { user }) => {
          return adapter.updateOne(user, state)
        })  

  );
  
  export function UserReducer(state: UsersState | undefined, action: Action) {
    return UserReducerFunction(state, action);
  }

  export const {
    selectAll
  } = adapter.getSelectors();