const axios = require('axios')

export function addItemToPlaylist(token, song_uri, playlist_id) {
    const fullUrl = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`

    const bodyParams = {
        uris: [song_uri]
    }

    const HEADER = {
        Authorization: `${token.token_type} ${token.access_token}`
    }

    function onFetchSuccessful(response) {
        return({
            playlistID: response.data.id,
            status: response.status,
            message: "SUCCESS"
        })
    }

    return axios.post(fullUrl, bodyParams, {
        headers: HEADER
    })
        .then(onFetchSuccessful)
}