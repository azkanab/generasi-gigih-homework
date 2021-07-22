import { atom, selector } from 'recoil'
import localStorageEffect from './storage/localStorageEffect'

export const selectedTrackState = atom({
    key: 'selectedTrackState',
    default: [],
    effects_UNSTABLE: [
        localStorageEffect('selected_track')
    ]
})

export const getSelectedTrackState = selector({
    key: 'getSelectedTrackState',
    get: ({get}) => {
        const selectedTrack = get(selectedTrackState)
        return selectedTrack
    }
})