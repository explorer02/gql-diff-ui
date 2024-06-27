import {
  configureStore,
  createSlice,
  PayloadAction,
  Draft,
  Slice,
} from "@reduxjs/toolkit";

interface UserState {
  value: {
    userId: string;
  };
}

const initialUserState: UserState = {
  value: { userId: "" },
};

const userSlice: Slice<UserState> = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login: (
      state: UserState | Draft<UserState>,
      action: PayloadAction<{ userId: string }>
    ) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { login } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
