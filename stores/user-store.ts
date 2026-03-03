import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  id: string | null;
  name: string | null;
  email: string | null;
  isLogged: boolean;
};

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  isLogged: false,
};

type SetUserPayload = {
  id: string;
  email: string;
  name?: string | null;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name ?? null;
      state.isLogged = true;
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null;
      state.name = null;
      state.isLogged = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;