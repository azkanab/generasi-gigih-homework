import { CHANGE_REDIRECT_URI_TYPE } from "../constants/redirect-constants"

const initialState = { value: {} }

export function redirectReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_REDIRECT_URI_TYPE:
            return {...state, value: action.payload}
        default:
            return state
    }
}