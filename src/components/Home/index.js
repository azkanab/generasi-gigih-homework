import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { mockTrackState } from '../../state/trackState'
import TrackCard from './TrackCard'

export default function Home() {
    const track = useRecoilValue(mockTrackState)

    const renderTrackCard = () => {
        return (
            <TrackCard data={track} />
        )
    }

    useEffect(() => {
        console.log(track, 'My Track')
    }, [track])

    return renderTrackCard()
}