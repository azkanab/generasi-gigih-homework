export default function getFullUrl(baseUrl, params) {
    let full_url = new URL(baseUrl)
    for (let key in params) {
        full_url.searchParams.append(key, params[key])
    }
    return full_url.href
}