import { atom, selector } from 'recoil'
import localStorageEffect from './storage/localStorageEffect'

export const userState = atom({
    key: 'userState',
    default: {
        username: 'anonymous'
    },
    effects_UNSTABLE: [
        localStorageEffect('my_profile')
    ]
})

export const getUserState = selector({
    key: 'getUser',
    get: ({get}) => {
        const user = get(userState)
        return user
    }
})
