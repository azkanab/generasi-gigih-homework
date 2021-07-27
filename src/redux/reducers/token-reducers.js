import { CHANGE_TOKEN_TYPE } from "../constants/token-constants"

const initialState = { value: {} }

export function tokenReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TOKEN_TYPE:
            return {...state, value: action.payload}
        default:
            return state
    }
}