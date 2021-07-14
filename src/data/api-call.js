import data from './mock-data-track'

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

        console.log(response.data)

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