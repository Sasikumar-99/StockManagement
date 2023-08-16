import { createFeatureSelector, createSelector } from "@ngrx/store";
import { initialState } from "./chat_store";

const selectFeatureSelector = createFeatureSelector<initialState>('chatApp');

export const selectUsers = createSelector(selectFeatureSelector, (state:initialState) => {
    return state.user;
});

export const selectIsHideNav = createSelector(selectFeatureSelector, state => state.hideNavbar );

export const selectUserOnChat = createSelector(selectFeatureSelector, (state:any)=>{
    return state.currentlyChattingTo;
})
