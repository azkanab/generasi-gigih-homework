import getFullUrl from '../../utils/getFullUrl';
import getSmallImage from '../../utils/getSmallImage';

const axios = require('axios');

const BASE_URL = 'https://api.spotify.com/v1/search?'

export function getSearchTracks(params, token) {
    let fullUrl = getFullUrl(BASE_URL, params)

    const HEADER = {
        Authorization: token.token_type + ' ' + token.access_token
    }

    function onFetchSuccessful(response) {
        let result = response.data.tracks.items
        let tracks = []

        result.forEach(data => {
            let image = getSmallImage(data.album.images)
            let artists = []
            data.artists.forEach(artist => {
                artists.push(artist.name)
            })

            tracks.push({
                id: data.id,
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