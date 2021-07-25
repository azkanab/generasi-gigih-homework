import '../../../../styles/MyPlaylist/PlaylistTracks.css'
import Image from '../../../common/Image'
import Text from '../../../common/Text'
import { changeDateFormat } from '../../../../utils/changeDateFormat'
import { msToTime } from '../../../../utils/msToTime'
import { getArtistText } from '../../../../utils/getArtistText'

export default function TrackRow({ track, id}) {
    return (
    <tr key={track.uri} className="table-row-track">
        <td>{id+1}</td>
        <td>
            <div className="title-table-wrapper">
                <div>
                    <Image imgUrl={track.imgUrl} />
                </div>
                <div className='table-text-wrapper'>
                    <Text text={track.title} textClass="table-track-title" />
                    <Text text={getArtistText(track.artists)} />
                </div>
            </div>
        </td>
        <td className="hide-in-mobile"><Text text={track.albumName} textClass="table-track-album" /></td>
        <td className="hide-in-mobile">{changeDateFormat(track.date_added)}</td>
        <td className="hide-in-mobile">{msToTime(track.duration)}</td>
    </tr>
    )
}