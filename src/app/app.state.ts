import { User } from '../store/models/user.model';

export interface AppState{
    readonly user: User[];
}