import { CHANGE_TOKEN_TYPE } from "../constants/token-constants"

export function changeToken(newToken) {
    return {
        type: CHANGE_TOKEN_TYPE,
        payload: newToken
    }
}