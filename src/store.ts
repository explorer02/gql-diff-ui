import {
  configureStore,
  createSlice,
  PayloadAction,
  Draft,
  Slice,
} from "@reduxjs/toolkit";

interface RouteState {
  value: {
    url: string;
  };
}

const initialRouteState: RouteState = {
  value: { url: "/" },
};

const routeSlice: Slice<RouteState> = createSlice({
  name: "route",
  initialState: initialRouteState,
  reducers: {
    navigate: (state, action: PayloadAction<{ url: string }>) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

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

export const { navigate } = routeSlice.actions;
export const { login } = userSlice.actions;

export const store = configureStore({
  reducer: {
    route: routeSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
