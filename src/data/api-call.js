import data from './mock-data-track'
import tracksData from './mock-data-tracks'

const axios = require('axios');

const GET_SONG_URL = 'https://gist.githubusercontent.com/aryapradipta9/e6492383477803b233916e01f36d5465/raw/66942c739d66d3774303f84071696aa865a07077/single-sample.json'
const IMAGE_HEIGHT = 300 /* Choices: 640, 300, 64 */
const BASIC_IMG_URL = '../public/smiley.png'

function findSmallImage(images) {
    return images.find(image => { return image.height === IMAGE_HEIGHT }) || BASIC_IMG_URL
}

export function getTrack() {
    function onFetchSuccessful(response) {
        let image = findSmallImage(response.data.album.images)

        return ({
            imgUrl: image.url,
            trackTitle: response.data.name,
            artistName: response.data.artists[0].name,
            albumName: response.data.album.name,
            spotifyUrl: response.data.external_urls.spotify
        })
	}

	function onFetchError(error) {
		alert(`Error: ${error}`)
	}

    return axios.get(GET_SONG_URL)
        .then(onFetchSuccessful)
        .catch(onFetchError)
}

export function getMockTrack() {
    let image = findSmallImage(data.album.images)

    return ({
        imgUrl: image.url,
        trackTitle: data.name,
        artistName: data.artists[0].name,
        albumName: data.album.name,
        spotifyUrl: data.external_urls.spotify
    })
}

export const arrKey = ['id', 'imgUrl', 'trackTitle', 'artistName', 'albumName', 'spotifyUrl']

export function getAllMockTracks() {
    let response = []

    tracksData.forEach(track => {
        let image = findSmallImage(track.album.images)

        let trackData = {}
        trackData[arrKey[0]] = track.id
        trackData[arrKey[1]] = image.url
        trackData[arrKey[2]] = track.name
        trackData[arrKey[3]] = track.artists[0].name
        trackData[arrKey[4]] = track.album.name
        trackData[arrKey[5]] = track.external_urls.spotify

        response.push(trackData)
    })

    return response
}