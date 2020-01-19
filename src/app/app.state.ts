import { User } from '../store/models/user.model';
import { UsersState } from 'src/store/reducers/users.reducer';

export interface AppState{
    readonly users: UsersState;
    readonly currentUser: User;
}