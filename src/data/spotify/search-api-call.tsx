import getFullUrl from '../../utils/getFullUrl';
import getImageBasedOnSize from '../../utils/getImageBasedOnSize';

const axios = require('axios');

const BASE_URL = 'https://api.spotify.com/v1/search?'

interface Params {
    [key: string]: string | number,
    q: string,
    type: string,
    limit: number,
    offset: number
}

interface Token {
    token_type: string,
    access_token: string
}

interface Image {
    width: number,
    url: string
}

interface Artist {
    name: string
}

interface Data {
    id: string,
    uri: string,
    name: string,
    album: {
        images: Image[],
        name: string
    },
    artists: Artist[],
    external_urls: {
        spotify: string
    }
}

interface Response {
    data: {
        tracks: {
            items: Data[]
        }
    }
}

interface Tracks {
    id: string,
    uri: string,
    imgUrl: string,
    trackTitle: string,
    artistName: string[],
    albumName: string,
    spotifyUrl: string
}

export function getSearchTracks(params: Params, token: Token) {
    let fullUrl = getFullUrl(BASE_URL, params)

    const HEADER = {
        Authorization: token.token_type + ' ' + token.access_token
    }

    function onFetchSuccessful(response: Response): Tracks[] {
        let result = response.data.tracks.items
        let tracks: Tracks[] = []

        result.forEach(data => {
            let image = getImageBasedOnSize(data.album.images, 300)
            let artists: string[] = []
            data.artists.forEach(artist => {
                artists.push(artist.name)
            })

            tracks.push({
                id: data.id,
                uri: data.uri,
                imgUrl: image.url,
                trackTitle: data.name,
                artistName: artists,
                albumName: data.album.name,
                spotifyUrl: data.external_urls.spotify
            })
        })

        return tracks
	}

    return axios.get(fullUrl, {
        headers: HEADER
    })
        .then(onFetchSuccessful)
}