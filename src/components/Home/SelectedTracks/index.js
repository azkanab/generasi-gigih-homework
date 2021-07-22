import { useRecoilValue } from "recoil"
import TrackCard from "../TrackCard"
import { getSelectedTrackState } from "../../../state/selectedTrack"
import isArrayEmpty from "../../../utils/isArrayEmpty"

export default function SelectedTracks() {
    const selectedTrack = useRecoilValue(getSelectedTrackState)

    const renderTrackCard = () => {
        return (
            !isArrayEmpty(selectedTrack) && selectedTrack.map(track => (
                <TrackCard key={track.id} type="selected" data={track} />
            ))
        )
    }

    return (
        renderTrackCard()
    )
}