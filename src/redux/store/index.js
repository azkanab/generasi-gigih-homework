import { configureStore } from "@reduxjs/toolkit";
import { tokenReducer } from "../reducers/token-reducers";
import { loadState, saveState } from "../../storage/localStorage"

const store = configureStore({
    reducer: {
        token: tokenReducer
    },
    preloadedState: loadState()
})

store.subscribe(() => {
    saveState({
      token: store.getState().token
    });
});

export default store;
