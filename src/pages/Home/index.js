import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { trackState } from '../../state/trackState'
import { getTrack } from '../../data/api-call'
import TrackCard from '../../components/Home/TrackCard'
import isObjectEmpty from '../../utils/isObjectEmpty'

export default function Home() {
    const [track, setTrack] = useRecoilState(trackState)

    const renderTrackCard = () => {
        return (
            !isObjectEmpty(track) ? <TrackCard data={track} /> : <span>Loading...</span>
        )
    }

    useEffect(() => {
        async function fetchData() {
            const response = await getTrack();
            setTrack(response)
        }

        if (isObjectEmpty(track)) {
            fetchData()
        }
    })

    return renderTrackCard()
}
