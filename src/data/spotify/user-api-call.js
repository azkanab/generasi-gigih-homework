const axios = require('axios');

const BASE_URL = 'https://api.spotify.com/v1/me'

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
            imgUrl: data.images[0].url,
            url: data.external_urls.spotify
        })
	}

    return axios.get(BASE_URL, {
        headers: HEADER
    })
        .then(onFetchSuccessful)
}