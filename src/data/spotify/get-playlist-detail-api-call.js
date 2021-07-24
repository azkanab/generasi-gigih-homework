const axios = require('axios')

export function getPlaylistDetail(token, playlistID, data) {
    const URL = `https://api.spotify.com/v1/playlists/${playlistID}`
    
    const HEADER = {
        Authorization: `${token.token_type} ${token.access_token}`
    }

    function onFetchSuccessful(response) {
        const { data: { items } } = response

        return items.map(item => ({
            playlistId: item.id,
            name: item.name,
            images: item.images,
            description: item.description,
            tracks: item.tracks.items
        }))
    }

    return axios.get(URL, {
        headers: HEADER
    })
        .then(onFetchSuccessful)
}
