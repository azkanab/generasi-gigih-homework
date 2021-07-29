import { configureStore } from "@reduxjs/toolkit";
import { tokenReducer } from "../reducers/token-reducers";
import { redirectReducer } from "../reducers/redirect-reducers";
import { loadState, saveState } from "../../storage/localStorage"

const store = configureStore({
    reducer: {
        token: tokenReducer,
        redirect: redirectReducer
    },
    preloadedState: loadState()
})

store.subscribe(() => {
    saveState({
      token: store.getState().token,
      redirect: store.getState().redirect
    });
});

export default store;
