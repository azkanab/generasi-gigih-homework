import { atom, selector } from 'recoil'
import { getMockTrack, getTrack } from '../data/api-call';
import localStorageEffect from './storage/localStorageEffect'

export const trackState = atom({
    key: 'trackState',
    default: {},
    effects_UNSTABLE: [
        localStorageEffect('my_track')
    ]
})

export const tracksState = atom({
    key: 'tracksState',
    default: [],
    effects_UNSTABLE: [
        localStorageEffect('tracks')
    ]
})

export const getTrackState = selector({
    key: 'getTrackState',
    get: async () => {
        const response = await getTrack();
        return response;
    }
})

export const mockTrackState = selector({
    key: 'mockTrackState',
    get: () => {
        const response = getMockTrack();
        return response;
    }
});
