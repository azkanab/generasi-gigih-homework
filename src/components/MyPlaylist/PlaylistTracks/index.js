import '../../../styles/MyPlaylist/PlaylistTracks.css'
import Text from '../../common/Text'
import TrackRow from './TrackRow'
import isArrayEmpty from '../../../utils/isArrayEmpty'

export default function PlaylistTracks({ tracks }) {
    const renderTracks = () => {
        return (
            tracks !== undefined && tracks.map((track, index) => (
                <TrackRow key={index} track={track} id={index} />
            ))
        )
    }

    return (
        <div>
            <table className="list-playlist">
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>TITLE</th>
                        <th className="hide-in-mobile">ALBUM</th>
                        <th className="hide-in-mobile">DATE ADDED</th>
                        <th className="hide-in-mobile">DURATION</th>
                    </tr>
                    {renderTracks()}
                </tbody>
            </table>
            {tracks === undefined || isArrayEmpty(tracks) ? <Text text="You have no track in this playlist" textClass="have-no-track-info" /> : ''}
        </div>
    )
}