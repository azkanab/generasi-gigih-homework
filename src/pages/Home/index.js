import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { tracksState } from '../../state/trackState'
import { getAllMockTracks } from '../../data/api-call'
import TrackCard from '../../components/Home/TrackCard'
import isArrayEmpty from '../../utils/isArrayEmpty'
import hasDifferentKey from '../../utils/hasDifferentKey'
import Text from '../../components/common/Text'
import Navbar from '../../components/Navbar'
import getGreeting from '../../utils/getGreeting'
import { getUser } from '../../state/user'
import '../../styles/Home/Home.css'

export default function Home() {
    // const [track, setTrack] = useRecoilState(trackState)
    const [tracks, setTracks] = useRecoilState(tracksState)
    const user = useRecoilValue(getUser)
    const GREETING_WORD = getGreeting()+', '+user.nickname+'!'

    const renderTrackCard = () => {
        return (
            !isArrayEmpty(tracks) ? tracks.map(track => (
                <TrackCard data={track} key={track.id} />
             )) : <span>Loading...</span>
        )
    }

    useEffect(() => {
        // async function fetchData() {
        //     const response = await getTrack();
        //     setTrack(response)
        // }

        function fetchMockData() {
            let response = getAllMockTracks()
            setTracks(response)
        }

        if (isArrayEmpty(tracks) || hasDifferentKey(tracks)) {
            localStorage.clear()
            fetchMockData()
        }
    });

    return (
        <div>
            <Navbar />
            <Text textClass="main-title" text={GREETING_WORD} />
            <div className="trackCard-wrapper">
                <div>
                    <div className="trackCard-container">
                        {renderTrackCard()}
                    </div>
                </div>
            </div>
        </div>
    )
}
