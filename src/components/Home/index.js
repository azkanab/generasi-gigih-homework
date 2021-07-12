import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import '../../styles/Home/Home.css'
import { mockTrackState } from '../../state/trackState'

export default function Home() {
    const track = useRecoilValue(mockTrackState)

    useEffect(() => {
        console.log(track)
    }, [])

    return (
        <h1>Halo</h1>
    )
}