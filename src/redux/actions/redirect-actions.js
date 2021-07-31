import { CHANGE_REDIRECT_URI } from "../constants/redirect-constants"

export function changeRedirectURI(newURI) {
    return {
        type: CHANGE_REDIRECT_URI,
        payload: newURI
    }
}