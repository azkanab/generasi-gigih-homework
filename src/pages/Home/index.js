import { useEffect, useState, useContext } from 'react'
import { useRecoilState } from 'recoil'
import { useHistory } from 'react-router-dom'
import { KeyContext } from '..'
import TrackCard from '../../components/Home/TrackCard'
import Form from '../../components/Home/Form'
import Text from '../../components/common/Text'
import { getSearchTracks } from '../../data/spotify/search-api-call'
import { getRecommendedTracks } from '../../data/spotify/recommendation-api-call'
import { getUser } from '../../data/spotify/user-api-call'
import isArrayEmpty from '../../utils/isArrayEmpty'
import getGreeting from '../../utils/getGreeting'
import { tokenState } from '../../state/auth/token'
import { userState } from '../../state/user'
import '../../styles/Home/Home.css'

export default function Home() {
    const loaderContext = useContext(KeyContext)

    const [token, setToken] = useRecoilState(tokenState)
    const [user, setUser] = useRecoilState(userState)
    const [tracks, setTracks] = useState([])
    const [params, setParams] = useState({
        q: '',
        type: 'track',
        limit: 50,
        offset: 0
    })
    const GREETING_WORD = getGreeting()+', '+user.name+'!'
    const history = useHistory()

    const renderTrackCard = () => {
        return (
            !isArrayEmpty(tracks) ? tracks.map(track => (
                <TrackCard key={track.id} data={track} />
             )) : <span>Loading...</span>
        )
    }

    const handleSearchChange = (event) => {
        setParams(prevState => ({
            ...prevState,
            q: event.target.value
        }))
    }

    const handleButtonClick = (event) => {
        event.preventDefault()
        loaderContext.setIsFetching(true)
        if (params.q === '') {
            fetchRecommendation()
        } else {
            fetchData()
        }
    }

    const onFetchError = (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401: // unauthorized
                    setToken({})
                    loaderContext.setIsFetching(false)
                    history.push('/login')
                    break;
                case 400: // bad request
                    setToken({})
                    loaderContext.setIsFetching(false)
                    history.push('/login')
                    break;
                default:
                    alert(`Error: ${error.message}`)
                    break;
            }
        } else {
            alert(`Error: ${error}`)
        }
    }

    async function fetchData() {
        try {
            let response = await getSearchTracks(params, token);
            setTracks(response)
            if (response) {
                loaderContext.setIsFetching(false)
            }
        } catch (error) {
            onFetchError(error)
        }
    }

    async function fetchUser() {
        try {
            let response = await getUser(token)
            setUser(response)
        } catch (error) {
            onFetchError(error)
        }
    }

    async function fetchRecommendation() {
        try {
            let response = await getRecommendedTracks(token)
            setTracks(response)
            if (response) {
                loaderContext.setIsFetching(false)
            }
        } catch (error) {
            onFetchError(error)
        }
    }

    useEffect(() => {
        document.title = 'Spotifi | Dashboard';
        loaderContext.setIsFetching(true)
        fetchUser()
        fetchRecommendation()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <Text textClass="main-title" text={GREETING_WORD} />
            <Form handleChange={handleSearchChange} handleClick={handleButtonClick} />
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
