import { createAction, props } from "@ngrx/store";
import { ConnectedUser } from "../chat-interface";

export const setAllUsers = createAction('[chatComponent] setUsers',props<{users : ConnectedUser[]}>());
export const AssignCurrentUSer = createAction('[chatComponent] AssignCurrentUser',props<{user: ConnectedUser}>());
export const setChatUser = createAction('[chatComponent] setChatUser',props<{user:keyof {[key: string]: ConnectedUser },route:string,navbar:boolean}>());
export const hideNavbar = createAction('[chatComponent] hideNavBar',props<{hide:boolean}>());
export const resetState = createAction('[chatComponent] resetState');
