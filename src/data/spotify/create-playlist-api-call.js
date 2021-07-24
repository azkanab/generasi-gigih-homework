const axios = require('axios')

export function createPlaylist(token, userID, data) {
    const URL = `https://api.spotify.com/v1/users/${userID}/playlists`
    
    const bodyParams = {
        name: data.name,
        description: data.description,
        collaborative: false,
        public: false
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

    return axios.post(URL, bodyParams, {
        headers: HEADER
    })
        .then(onFetchSuccessful)
}