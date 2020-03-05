import { createAction, props } from '@ngrx/store';
import { Message } from '../models/message.model';

export const addMessage = createAction('[Global] add message',
props<{message: Message }>());
