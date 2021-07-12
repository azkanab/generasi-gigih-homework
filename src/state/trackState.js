import { atom, selector } from 'recoil'
import { getMockTrack, getTrack } from '../data/api-call';

export const trackState = atom({
    key: 'trackState',
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