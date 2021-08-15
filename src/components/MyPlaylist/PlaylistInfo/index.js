import Image from "../../common/Image"
import Text from "../../common/Text"
import '../../../styles/MyPlaylist/PlaylistInfo.css'

export default function PlaylistInfo({ data }) {
    return (
        <div className="playlist-info">
            <div>
                <Image imgUrl={data.image} imgAlt={data.image+' Playlist'} imgClass="playlist-info__img" />
            </div>
            <div className="playlist-info__text">
                <Text text='PLAYLIST' textClass="playlist-info__text-title" />
                <Text text={data.name} textClass="playlist-info__text-name" />
                <Text text={data.description} textClass="playlist-info__text-description" />
            </div>
        </div>
    )
}