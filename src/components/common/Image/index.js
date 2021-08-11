import { useState } from 'react'
import '../../../styles/common/Image.css'

const BASIC_IMG_URL = '/unknown_playlist.png'

export default function Image ({ imgUrl, imgAlt, imgClass }) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <img src={!isLoaded && imgClass === "albumImage" ? BASIC_IMG_URL : imgUrl } alt={imgAlt} className={imgClass} onLoad={() => setIsLoaded(true)} />
    )
}