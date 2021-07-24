import getFullUrl from '../../utils/getFullUrl'
import getImageBasedOnSize from '../../utils/getImageBasedOnSize'

const axios = require('axios')

const BASE_URL = 'https://api.spotify.com/v1/recommendations?'
const params = {
    limit: 50,
    market: 'ID',
    seed_artists: '4NHQUGzhtTLFvgF5SZesLK',
    seed_tracks: '0c6xIDDpzE81m2q797ordA',
    min_energy: 0.4,
    min_popularity: 50
}

export function getRecommendedTracks(token) {
    let fullUrl = getFullUrl(BASE_URL, params)

    const HEADER = {
        Authorization: `${token.token_type} ${token.access_token}`
    }

    function onFetchSuccessful(response) {
        let result = response.data.tracks

        let tracks = []

        result.forEach(data => {
            let image = getImageBasedOnSize(data.album.images, 300)
            let artists = []
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