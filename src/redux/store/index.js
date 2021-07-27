import { configureStore } from "@reduxjs/toolkit";
import { tokenReducer } from "../reducers/token-reducers";

export default configureStore ({
    reducer: {
        token: tokenReducer
    }
})