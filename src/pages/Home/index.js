import { useEffect, useState, useContext } from 'react'
import { useRecoilState } from 'recoil'
import { useHistory } from 'react-router-dom'
import { KeyContext } from '..'
import TrackCard from '../../components/Home/TrackCard'
import SearchForm from '../../components/Home/SearchForm'
import Text from '../../components/common/Text'
import AddToPlaylist from '../../components/Home/AddToPlaylist'
import { getSearchTracks } from '../../data/spotify/search-api-call'
import { getRecommendedTracks } from '../../data/spotify/recommendation-api-call'
import { getUser } from '../../data/spotify/user-api-call'
import isArrayEmpty from '../../utils/isArrayEmpty'
import getGreeting from '../../utils/getGreeting'
import isObjectEmpty from '../../utils/isObjectEmpty'
import { tokenState } from '../../state/auth/token'
import { userState } from '../../state/user'
import '../../styles/Home/Home.css'

export default function Home() {
    const loaderContext = useContext(KeyContext)

    const [token, setToken] = useRecoilState(tokenState)
    const [user, setUser] = useRecoilState(userState)
    const [tracks, setTracks] = useState([])
    const [selectedTrack, setSelectedTrack] = useState({})
    const [greetingWord, setGreetingWord] = useState(getGreeting())
    const [params, setParams] = useState({
        q: '',
        type: 'track',
        limit: 50,
        offset: 0
    })
    const history = useHistory()
    const [showAddTrackModal, setShowAddTrackModal] = useState(false)

    const handleOpenAddTrackModal = (data) => {
        setSelectedTrack(data)
        setShowAddTrackModal(true)
    }

    const handleCloseAddTrackModal = () => {
        setSelectedTrack({})
        setShowAddTrackModal(false)
    }

    const renderTrackCard = () => {
        return (
            !isArrayEmpty(tracks) ? tracks.map(track => (
                <TrackCard key={track.id} type="normal" data={track} handleClick={handleOpenAddTrackModal} />
             )) : <span>Loading...</span>
        )
    }

    const handleSearchChange = (event) => {
        setParams(prevState => ({
            ...prevState,
            q: event.target.value
        }))
    }

    const handleSearchClick = () => {
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
                    setUser({})
                    loaderContext.setIsFetching(false)
                    history.push('/login')
                    break;
                case 400: // bad request
                    setToken({})
                    setUser({})
                    loaderContext.setIsFetching(false)
                    history.push('/login')
                    break;
                case 403: // forbidden
                    loaderContext.setIsFetching(false)
                    alert('You are forbidden, please try to ask for a permission to the author of this program')
                    break;
                default:
                    loaderContext.setIsFetching(false)
                    console.log(`Error: ${error.message}`)
                    break;
            }
        } else {
            console.log(`Error: ${error}`)
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
            if (!isObjectEmpty(response)) {
                setGreetingWord(`${getGreeting()}, ${response.name}!`)
            }
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
        if (isObjectEmpty(token)) {
            history.push("/login")
        }
        if (!isObjectEmpty(user)) {
            setGreetingWord(`${getGreeting()}, ${user.name}!`)
        }
        document.title = 'Spotifi | Home';
        loaderContext.setIsFetching(true)
        window.scrollTo(0,0)
        fetchUser()
        fetchRecommendation()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {showAddTrackModal && <AddToPlaylist data={selectedTrack} handleClose={handleCloseAddTrackModal} />}
            <Text textClass="main-title" text={greetingWord} />
            <SearchForm handleChange={handleSearchChange} handleClick={handleSearchClick} />
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
