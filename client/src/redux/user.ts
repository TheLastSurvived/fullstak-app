import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { take, tap } from "rxjs";
import { StoreState } from "./store";

export const USER_PREFIX = "USER";

export type UserData = {
  user: any | null,
  isAuth: boolean | null,
};

export const UserDataEpic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(userDataAction.setUser.type),
    take(1),
    tap((action$) => console.log("")),
  );

export const userDataEntity = createEntityAdapter<UserData>();

export const userDataSlice = createSlice({
  name: USER_PREFIX,
  initialState: {
    user: null,
    isAuth: null,
  },
  reducers: {
    setUser(state, action) {
      console.log("state, action: ", state, action);
      state.user = action.payload;
      // @ts-ignore
      state.isAuth = true;
      // if (Array.isArray(action.payload)) {
      //   userDataEntity.addMany(state, action.payload);
      //   return;
      // }
      // userDataEntity.addOne(state, action.payload);
    },
    logout(state, action) {
      state.user = null;
      // @ts-ignore
      state.isAuth = false;
    }
    
    // updateItem(state, action: PayloadAction<UserData | UserData[]>) {
    //   if (Array.isArray(action.payload)) {
    //     userDataEntity.updateMany(
    //       state,
    //       action.payload.map((item) => ({
    //         id: item.id,
    //         changes: item.attrs,
    //       })),
    //     );
    //     return;
    //   }
    //   userDataEntity.updateOne(state, {
    //     id: action.payload.id,
    //     changes: action.payload,
    //   });
    // },
    // removeItem(state, action) {
    //   if (Array.isArray(action.payload)) {
    //     userDataEntity.removeMany(state, action.payload);
    //     return;
    //   }
    //   userDataEntity.removeOne(state, action.payload);
    // },
    // clearItems(state, action) {
    //   userDataEntity.removeAll(state);
    // },
  },
});

const userDataReducer = userDataSlice.reducer;

export const selectUserData = (state: StoreState) => state.user;

export const userDataSelector = userDataEntity.getSelectors(
  (state: StoreState) => state.user,
);
export const userDataAction = userDataSlice.actions;
export default userDataReducer;
