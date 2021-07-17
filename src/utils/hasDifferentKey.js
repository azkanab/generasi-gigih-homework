import { arrKey } from "../data/api-call"

// Check if object in localStorage has different key with the one on the server
export default function hasDifferentKey(arrObj) {
    let result = false
    if (arrObj.length === 0) {
        result = true
    } else {
        arrKey.forEach((key) => {
            if (Object.keys(arrObj[0]).includes(key) === false) {
                result = true
            }
        })
    }
    return result
}