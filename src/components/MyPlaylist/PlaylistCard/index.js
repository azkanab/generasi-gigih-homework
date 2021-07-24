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
        <div className="playlist-card-wrapper" onClick={handleCardClick}>
            <div className="playlist-card-image-wrapper">
                <Image imgUrl={data.imgUrl} imgAlt={data.imgAlt} imgClass="albumImage" />
            </div>
            <div className="playlist-card-detail-container">
                <Text textClass="title" text={data.name} />
            </div>
        </div>
    )
}