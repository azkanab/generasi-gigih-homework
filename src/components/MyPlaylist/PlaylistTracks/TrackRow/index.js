import '../../../../styles/MyPlaylist/PlaylistTracks.css'
import Image from '../../../common/Image'
import Text from '../../../common/Text'
import { changeDateFormat } from '../../../../utils/changeDateFormat'
import { msToTime } from '../../../../utils/msToTime'
import { getArtistText } from '../../../../utils/getArtistText'

export default function TrackRow({ track, id}) {
    return (
    <tr key={track.uri} className="track-row">
        <td>{id+1}</td>
        <td>
            <div className="track-row__title">
                <div>
                    <Image imgUrl={track.imgUrl} />
                </div>
                <div className='track-row__text-wrapper'>
                    <Text text={track.title} textClass="track-row__song-title" />
                    <Text text={getArtistText(track.artists)} />
                </div>
            </div>
        </td>
        <td className="hide-in-mobile"><Text text={track.albumName} textClass="track-row__album" /></td>
        <td className="hide-in-mobile">{changeDateFormat(track.date_added)}</td>
        <td className="hide-in-mobile">{msToTime(track.duration)}</td>
    </tr>
    )
}