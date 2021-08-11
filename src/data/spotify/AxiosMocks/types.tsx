interface Image {
    width: number,
    url: string
}

interface Artist {
    name: string
}

interface Data {
    id: string,
    uri: string,
    name: string,
    album: {
        images: Image[],
        name: string
    },
    artists: Artist[],
    external_urls: {
        spotify: string
    }
}

export interface Params {
    [key: string]: string | number,
    q: string,
    type: string,
    limit: number,
    offset: number
}

export interface Response {
    tracks: {
        items: Data[]
    }
}

export interface Track {
    id: string,
    uri: string,
    imgUrl: string,
    trackTitle: string,
    artistName: string[],
    albumName: string,
    spotifyUrl: string
}