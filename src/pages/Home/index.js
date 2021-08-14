import { useEffect, useState, useContext } from 'react'
import { useRecoilState } from 'recoil'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { HomeContext } from '..'
import TrackCard from '../../components/Home/TrackCard/index'
import SearchForm from '../../components/Home/SearchForm'
import Text from '../../components/common/Text'
import AddToPlaylist from '../../components/Home/AddToPlaylist'
import { getSearchTracks } from '../../data/spotify/search-api-call'
import { getRecommendedTracks } from '../../data/spotify/recommendation-api-call'
import { getUser } from '../../data/spotify/user-api-call'
import isArrayEmpty from '../../utils/isArrayEmpty'
import getGreeting from '../../utils/getGreeting'
import isObjectEmpty from '../../utils/isObjectEmpty'
import { isLogin } from '../../utils/isLogin'
import { changeToken } from '../../redux/actions/token-actions'
import { changeRedirectURI } from '../../redux/actions/redirect-actions'
import { userState } from '../../state/user'
import '../../styles/Home/Home.css'

export default function Home() {
    const loaderContext = useContext(HomeContext)
    const dispatch = useDispatch()
    
    const token = useSelector(state => state.token.value)
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
    const location = useLocation()
    const [showAddTrackModal, setShowAddTrackModal] = useState(false)
    const NO_NETWORK_ERROR = "Network Error"

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

    const handleOnClick = (e) => {
        e.preventDefault()
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
                    dispatch(changeToken({}))
                    setUser({})
                    loaderContext.setIsFetching(false)
                    history.push('/login')
                    break;
                case 400: // bad request
                    dispatch(changeToken({}))
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
        } else if (error.message === NO_NETWORK_ERROR) {
            loaderContext.setIsFetching(false)
            loaderContext.setShowNoNetworkModal(true)
        } else {
            console.log(`Error: ${error.message}`)
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

    const init = () => {
        dispatch(changeRedirectURI(location.pathname))
        if (isLogin(token)) {
            loaderContext.setIsFetching(false)
        } else {
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
    }

    useEffect(() => {
        init()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {showAddTrackModal && <AddToPlaylist data={selectedTrack} handleClose={handleCloseAddTrackModal} />}
            <Text textClass="main-title" text={greetingWord} />
            <SearchForm handleChange={handleSearchChange} handleSubmit={handleOnClick} />
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
