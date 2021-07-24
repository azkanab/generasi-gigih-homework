import '../../../styles/MyPlaylist/PlaylistTracks.css'
import Image from '../../common/Image'
import Text from '../../common/Text'
import { changeDateFormat } from '../../../utils/changeDateFormat'
import { msToTime } from '../../../utils/msToTime'

export default function PlaylistTracks({ tracks }) {
    const getArtistText = (artists) => {
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

    const renderTracks = () => {
        return (
            tracks !== undefined && tracks.map((track, index) => (
                <tr key={track.uri} className="table-row-track">
                    <td>{index+1}</td>
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
                    <td><Text text={track.albumName} textClass="table-track-album" /></td>
                    <td>{changeDateFormat(track.date_added)}</td>
                    <td>{msToTime(track.duration)}</td>
                </tr>
            ))
        )
    }
    return (
        <table className="list-playlist">
            <tbody>
                <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th>ALBUM</th>
                    <th>DATE ADDED</th>
                    <th>DURATION</th>
                </tr>
                {renderTracks()}
            </tbody>
        </table>
    )
}