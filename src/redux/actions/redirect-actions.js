import { CHANGE_REDIRECT_URI_TYPE } from "../constants/redirect-constants"

export function changeRedirectURI(newRedirectUri) {
    return {
        type: CHANGE_REDIRECT_URI_TYPE,
        payload: newRedirectUri
    }
}
