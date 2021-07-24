import Image from "../../common/Image"
import Text from "../../common/Text"
import '../../../styles/MyPlaylist/PlaylistInfo.css'

export default function PlaylistInfo({ data }) {
    return (
        <div className="playlist-info-container">
            <div>
                <Image imgUrl={data.image} imgAlt={data.image+' Playlist'} imgClass="playlist-detail-img" />
            </div>
            <div className="playlist-info-text-wrapper">
                <Text text='PLAYLIST' textClass="playlist-detail" />
                <Text text={data.name} textClass="playlist-detail-title" />
                <Text text={data.description} textClass="playlist-detail-description" />
            </div>
        </div>
    )
}