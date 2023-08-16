import { createReducer, on } from "@ngrx/store";
import { chatInitialState, initialState } from "./chat_store";
import { AssignCurrentUSer, hideNavbar, resetState, setAllUsers, setChatUser } from "./chat_actions";
import { ConnectedUser } from "../chat-interface";

export const chatReducer = createReducer(chatInitialState, on(setAllUsers,(state, action) : any => {
  return{
    ...state,
    usersList: action.users
  }
}),on(AssignCurrentUSer,(state, action): any =>{
  return {
    ...state,
    user: action.user
  }
}),on(setChatUser, (state, {user,route,navbar}): any => {
  const currentState: {[key: string]: ConnectedUser }  = {...state.usersList};
  return {
    ...state,
    currentlyChattingTo: currentState[user],
    chatRoute: route,
    hideNavbar: navbar
  }
}),on(hideNavbar, (state, {hide}): any => {
  return {...state,hideNavbar:hide}
}),on(resetState, (state):any=> {
  return {
    ...chatInitialState
  }
}))
