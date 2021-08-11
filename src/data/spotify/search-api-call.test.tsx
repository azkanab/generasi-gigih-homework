import axios, { AxiosResponse } from "axios";
import { getSearchTracks } from "./search-api-call";
import { Response, Track } from './AxiosMocks/types'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const tracks: Response =  {
    tracks: {
        items: [{
            id: '1234',
            uri: 'spotify:1234',
            name: 'Catty Cat',
            album: {
                images: [{
                    width: 300,
                    url: 'https://www.rspca.org.uk/documents/1494939/0/what+to+do+with+stray+cats+and+kittens+%283%29.jpg/886bc0d5-1dc5-d2bf-eabd-473fd4d99886?t=1618404272031'
                }, {
                    width: 600,
                    url: 'https://www.google.com'
                }, {
                    width: 900,
                    url: 'https://www.google.co.id'
                }],
                name: 'Lovey Dovey'
            },
            artists: [{
                name: 'Adylan Roaffa'
            }, {
                name: 'Azka Mumtaz'
            }],
            external_urls: {
                spotify: 'https://www.instagram.com/azkanab/'
            }
        }]
    }
}

const expectedOutput: Track[] = [{
    id: '1234',
    uri: 'spotify:1234',
    imgUrl: 'https://www.rspca.org.uk/documents/1494939/0/what+to+do+with+stray+cats+and+kittens+%283%29.jpg/886bc0d5-1dc5-d2bf-eabd-473fd4d99886?t=1618404272031',
    trackTitle: 'Catty Cat',
    artistName: ['Adylan Roaffa', 'Azka Mumtaz'],
    albumName: 'Lovey Dovey',
    spotifyUrl: 'https://www.instagram.com/azkanab/'
}]

const mockedResponse: AxiosResponse = {
    data: tracks,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {}
}

const params =  {
    q: 'Adylan',
    type: 'track',
    limit: 50,
    offset: 0
}

const token = {
    token_type: 'string',
    access_token: 'abcdefg'
}

const fullRequestUrl = 'https://api.spotify.com/v1/search?q=Adylan&type=track&limit=50&offset=0'

describe('api call: getSearchTracks() using axios mock', () => {
    test('Check if api call returns search tracks', async () => {
        mockedAxios.get.mockResolvedValueOnce(mockedResponse)

        expect(axios.get).not.toHaveBeenCalled()

        const response = await getSearchTracks(params, token)
        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith(fullRequestUrl, {"headers": {"Authorization": "string abcdefg"}})
        expect(response).toEqual(expectedOutput)
    })
})
