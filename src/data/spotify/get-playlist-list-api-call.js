import isArrayEmpty from '../../utils/isArrayEmpty'

const axios = require('axios')

const BASE_URL = `https://api.spotify.com/v1/me/playlists`

const getImage = (images) => {
    if (isArrayEmpty(images)) {
        return './unknown_playlist.png'
    } else {
        return images[0].url
    }
}

export function getPlaylistList(token) {
    const HEADER = {
        Authorization: `${token.token_type} ${token.access_token}`
    }

    function onFetchSuccessful(response) {
        const { data: { items } } = response

        let result = []

        items.forEach(item => {
            let image = getImage(item.images)

            if (item.name !== "") {
                result.push({
                    playlistId: item.id,
                    name: item.name,
                    imgUrl: image,
                    imgAlt: `${item.name} Playlist`,
                    description: item.description
                })
            }
        })

        return result
    }

    return axios.get(BASE_URL, {
        headers: HEADER
    })
        .then(onFetchSuccessful)
}
