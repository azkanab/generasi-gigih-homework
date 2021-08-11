import { getSearchTracks } from "./search-api-call";
import { Response, Track, Params } from './AxiosMocks/types'

// import API mocking utilities from Mock Service Worker
import {rest} from 'msw'
import {setupServer} from 'msw/node'

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

const tracksNotAdylan: Response =  {
    tracks: {
        items: [{
            id: '1235',
            uri: 'spotify:1235',
            name: 'Pus Pus Meow',
            album: {
                images: [{
                    width: 300,
                    url: 'https://www.gojek.com/id-id/'
                }, {
                    width: 600,
                    url: 'https://www.blibli.com'
                }, {
                    width: 900,
                    url: 'https://www.tokopedia.com'
                }],
                name: 'Lasorsi'
            },
            artists: [{
                name: 'Azka Mumtaz'
            }],
            external_urls: {
                spotify: 'https://www.instagram.com/adylanrff/'
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

let params: Params =  {
    q: 'Adylan',
    type: 'track',
    limit: 50,
    offset: 0
}

const token = {
    token_type: 'string',
    access_token: 'abcdefg'
}

const handlers = [
    rest.get("https://api.spotify.com/v1/search", (req: any, res: any, ctx: any) => {
        const query = req.url.searchParams
        const q = query.get("q")

        // respond using a mocked JSON body
        if (q === 'Adylan') {
            return res(ctx.status(200), ctx.json(tracks))
        } else {
            return res(ctx.status(200), ctx.json(tracksNotAdylan))
        }
    })
]

// declare which API requests to mock
const server = setupServer(...handlers)

describe('api call: getSearchTracks() using msw', () => {
    beforeAll(() => {
        server.listen()
    })

    afterEach(() => {
        server.resetHandlers()
    })

    afterAll(() => {
        server.close()
    })

    test('Check if api call return search tracks correctly', async () => {
        const response = await getSearchTracks(params, token)

        expect(response).toEqual(expectedOutput)

        params = {
            q: 'Azka',
            type: 'track',
            limit: 50,
            offset: 0
        }

        const responseNotAdylan = await getSearchTracks(params, token)

        expect(responseNotAdylan).not.toEqual(expectedOutput)
    })
})
