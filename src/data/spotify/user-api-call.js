const axios = require('axios');

const BASE_URL = 'https://api.spotify.com/v1/me'
const BASIC_USER_IMG_URL = '/unknown_user.png'

export function getUser(token) {
    const HEADER = {
        Authorization: token.token_type + ' ' + token.access_token
    }

    function onFetchSuccessful(response) {
        let data = response.data
        return ({
            name: data.display_name,
            username: data.id,
            totalFollowers: data.followers.total,
            imgUrl: data.images[0] ? data.images[0].url : BASIC_USER_IMG_URL,
            url: data.external_urls.spotify
        })
	}

    return axios.get(BASE_URL, {
        headers: HEADER
    })
        .then(onFetchSuccessful)
}