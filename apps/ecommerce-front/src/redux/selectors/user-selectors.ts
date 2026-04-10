import type { RootState } from "@/redux/store";

export const selectUser = (state: RootState) => state.userReducer;
export const selectUserId = (state: RootState) => state.userReducer.id;
export const selectIsLogged = (state: RootState) => state.userReducer.isLogged;