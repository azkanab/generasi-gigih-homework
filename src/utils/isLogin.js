import isObjectEmpty from "./isObjectEmpty";

export function isLogin(token) {
    return !isObjectEmpty(token)
}