import { useEffect, useState } from 'react'
import '../../../styles/common/Image.css'

const BASIC_IMG_URL = '/unknown_playlist.png'

export default function Image ({ imgUrl, imgAlt, imgClass }) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (imgClass !== "image-album") {
            setIsLoaded(true)
        }
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        imgClass === "image-album" ?
        <div className="image">
            {!isLoaded &&
                <div className="image-placeholder-container">
                    <img src={BASIC_IMG_URL} alt="loading" className="image-placeholder" />
                </div>
            }
            <img src={imgUrl} alt={imgAlt} className={isLoaded ? imgClass : imgClass + ' image-display-none'} onLoad={() => setIsLoaded(true)} />
        </div>
        :
        <img src={imgUrl} alt={imgAlt} className={imgClass} />
    )
}