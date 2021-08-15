import { useEffect, useState } from 'react'
import '../../../styles/common/Image.css'

const BASIC_IMG_URL = '/unknown_playlist.png'

export default function Image ({ imgUrl, imgAlt, imgClass }) {
    const [isLoaded, setIsLoaded] = useState(false)

    const useLoadedState = () => {
        return imgClass === "track-card__album-image" || imgClass === "playlist-card__album-image"
    }

    useEffect(() => {
        if (!useLoadedState()) {
            setIsLoaded(true)
        }
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        useLoadedState() ?
        <div className="image">
            {!isLoaded &&
                <div className="image__placeholder-container">
                    <img src={BASIC_IMG_URL} alt="loading" className="image__placeholder" />
                </div>
            }
            <img src={imgUrl} alt={imgAlt} className={isLoaded ? imgClass : imgClass + ' image__display-none'} onLoad={() => setIsLoaded(true)} />
        </div>
        :
        <img src={imgUrl} alt={imgAlt} className={imgClass} />
    )
}