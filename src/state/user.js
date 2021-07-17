import { atom, selector } from 'recoil'
import localStorageEffect from './storage/localStorageEffect'

export const userState = atom({
    key: 'userState',
    default: {
        id: 1,
        fullName: 'Azka Nabilah Mumtaz',
        nickname: 'Azka',
        username: 'azkanab'
    },
    effects_UNSTABLE: [
        localStorageEffect('my_profile')
    ]
})

export const getUser = selector({
    key: 'getUser',
    get: ({get}) => {
        const user = get(userState)
        return user
    }
})
