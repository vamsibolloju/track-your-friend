import { User } from '../store/models/user.model';
import { UsersState } from 'src/store/reducers/users.reducer';
import { Message } from '../store/models/message.model';

export interface AppState{
    readonly users: UsersState;
    readonly currentUser: User;
    readonly message: Message
}