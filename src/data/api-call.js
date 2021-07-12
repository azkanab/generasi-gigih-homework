import data from './mock-data-track'

const axios = require('axios');

const GET_SONG_URL = 'https://gist.githubusercontent.com/aryapradipta9/0b8d0a1a113e3594d34c68c72ec32daf/raw/cb5d20b494bd2cb259d31596b9e8eea02e0f6d1e/single-sample.js'
const IMAGE_HEIGHT = 300 /* Choices: 640, 300, 64 */
const BASIC_IMG_URL = '../public/smiley.png'

function findSmallImage(images) {
    return images.find(image => { return image.height === IMAGE_HEIGHT }) || BASIC_IMG_URL
}

export function getTrack() {
    function onFetchSuccessful(response) {
        console.log(response.data)
        let image = findSmallImage(response.data.album.images)

        return ({
            imgUrl: image,
            trackTitle: response.data.name,
            artistName: response.data.artists[0].name,
            albumName: response.data.album.name
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
    })
}