import { ConnectedUser } from './../chat-interface';
import { hideNavbar } from './chat_actions';

export interface initialState{
  usersList: {[key: string]: ConnectedUser },
  user: null | ConnectedUser,
  currentlyChattingTo: null | ConnectedUser,
  hideNavbar: boolean,
  chatRoute:null | string
}
export const chatInitialState : initialState = {
  usersList: {},
  user: null,
  currentlyChattingTo: null,
  hideNavbar:false,
  chatRoute:null
}
