export const getArtistText = (artists) => {
    let result = ''
    artists.forEach((artist, idx) => {
        if (idx === artists.length-1) {
            result += artist
        } else {
            result += `${artist}, `
        }
    })
    return result
}