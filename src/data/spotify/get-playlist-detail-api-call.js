import getImageBasedOnSize from '../../utils/getImageBasedOnSize'
import isArrayEmpty from '../../utils/isArrayEmpty'

const axios = require('axios')

const getImage = (images) => {
    if (isArrayEmpty(images)) {
        return '/unknown_playlist.png'
    } else {
        return images[0].url
    }
}

export function getPlaylistDetail(token, playlistID) {
    const URL = `https://api.spotify.com/v1/playlists/${playlistID}`
    
    const HEADER = {
        Authorization: `${token.token_type} ${token.access_token}`
    }

    function onFetchSuccessful(response) {
        const { data } = response

        let image = getImage(data.images)

        let tracks = []

        data.tracks.items.forEach((item) => {
            console.log(response)
            let artist_list = []
            item.track.artists.forEach(artist => {
                artist_list.push(artist.name)
            })

            let image = getImageBasedOnSize(item.track.album.images, 64)

            tracks.push({
                uri: item.track.uri,
                date_added: item.added_at,
                title: item.track.name,
                artists: artist_list,
                albumName: item.track.album.name,
                imgUrl: image.url,
                duration: item.track.duration_ms
            })
        })

        let result = {
            playlistId: data.id,
            name: data.name,
            description: data.description,
            image: image,
            tracks: tracks
        }

        return result
    }

    return axios.get(URL, {
        headers: HEADER
    })
        .then(onFetchSuccessful)
}
