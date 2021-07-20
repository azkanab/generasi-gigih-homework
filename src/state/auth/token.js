import { atom, selector } from 'recoil'
import localStorageEffect from '../storage/localStorageEffect'

export const tokenState = atom({
    key: 'tokenState',
    default: {},
    effects_UNSTABLE: [
        localStorageEffect('my_token')
    ]
})

export const myTokenState = selector({
    key: 'restoNameState',
    get: ({get}) => {
        const token = get(tokenState)
        return token
    }
})