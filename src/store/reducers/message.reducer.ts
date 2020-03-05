import { createReducer, on, Action } from "@ngrx/store";
import { addMessage } from '../actions/message.actions';
import { Message } from '../models/message.model';

const initialState:Message = { type: '', message:'' }


const UserReducerFunction = createReducer(
    initialState,
    on(addMessage, (state, { message }) => {
      return ({ ...message });
    }) );

    export function MessageReducer(state: Message | undefined, action: Action) {
        return UserReducerFunction(state, action);
      }
    