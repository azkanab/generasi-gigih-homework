import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { useSelector, useDispatch } from "react-redux"
import { useContext } from "react"
import { useHistory, useLocation } from "react-router-dom"
import Text from "../../components/common/Text"
import PlaylistCard from "../../components/MyPlaylist/PlaylistCard"
import { changeToken } from "../../redux/actions/token-actions"
import { changeRedirectURI } from "../../redux/actions/redirect-actions"
import { userState } from "../../state/user"
import { getPlaylistList } from "../../data/spotify/get-playlist-list-api-call"
import { useState } from "react"
import isArrayEmpty from "../../utils/isArrayEmpty"
import { isLogin } from "../../utils/isLogin"
import { HomeContext } from ".."
import '../../styles/MyPlaylist/MyPlaylist.css'

export default function MyPlaylist() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.token.value)
    /* eslint-disable */
    const [user, setUser] = useRecoilState(userState)
    /* eslint-enable */
    const [playlists, setPlaylists] = useState([])
    const history = useHistory()
    const location = useLocation()
    const loaderContext = useContext(HomeContext)
    const NO_NETWORK_ERROR = "Network Error"

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
                default:
                    loaderContext.setIsFetching(false)
                    console.log(`Error: ${error.message}`)
                    break;
            }
        }  else if (error.message === NO_NETWORK_ERROR) {
            loaderContext.setIsFetching(false)
            loaderContext.setShowNoNetworkModal(true)
        } else {
            console.log(`Error: ${error.message}`)
        }
    }

    async function fetchPlaylist() {
        try {
            let response = await getPlaylistList(token)
            setPlaylists(response)
            if (response) {
                loaderContext.setIsFetching(false)
            }
        } catch (error) {
            onFetchError(error)
        }
    }

    const renderPlaylistCard = () => {
        return (
            !isArrayEmpty(playlists) && playlists.map(playlist => (
                <PlaylistCard data={playlist} key={playlist.playlistId} />
            ))
        )
    }

    const init = () => {
        dispatch(changeRedirectURI(location.pathname))
        if (isLogin(token)) {
            loaderContext.setIsFetching(false)
        } else {
            history.push("/login")
        }
        document.title = 'Spotifi | My Playlist';
        window.scrollTo(0,0)
        loaderContext.setIsFetching(true)
        fetchPlaylist()
    }

    useEffect(() => {
        init()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="my-playlist">
            <Text text="Playlists" textClass="common__main-title" />
            <div className="my-playlist__track-card__container">
                {renderPlaylistCard()}
            </div>
        </div>
    )
}
