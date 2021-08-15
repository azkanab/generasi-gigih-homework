import { useHistory } from "react-router-dom"
import isObjectEmpty from "../../../utils/isObjectEmpty"
import Image from "../../common/Image"
import Text from "../../common/Text"
import '../../../styles/MyPlaylist/PlaylistCard.css'

export default function PlaylistCard({ data }) {
    const history = useHistory()

    const handleCardClick = () => {
        history.push(`/my-playlist/${data.playlistId}`)
    }

    return (
        !isObjectEmpty(data) &&
        <div className="playlist-card__wrapper" onClick={handleCardClick}>
            <div className="playlist-card__image-wrapper">
                <Image imgUrl={data.imgUrl} imgAlt={data.imgAlt} imgClass="playlist-card__album-image" />
            </div>
            <div className="playlist-card__detail">
                <Text textClass="card__title" text={data.name} />
            </div>
        </div>
    )
}