import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { useSelector, useDispatch } from "react-redux"
import { useContext } from "react"
import { useHistory } from "react-router"
import Text from "../../components/common/Text"
import PlaylistCard from "../../components/MyPlaylist/PlaylistCard"
// import { tokenState } from "../../state/auth/token"
import { changeToken } from "../../redux/actions/token-actions"
import { userState } from "../../state/user"
import { getPlaylistList } from "../../data/spotify/get-playlist-list-api-call"
import { useState } from "react"
import isArrayEmpty from "../../utils/isArrayEmpty"
import { KeyContext } from ".."

export default function MyPlaylist() {
    // const [token, setToken] = useRecoilState(tokenState)
    const dispatch = useDispatch()
    const token = useSelector(state => state.token.value)
    /* eslint-disable */
    const [user, setUser] = useRecoilState(userState)
    /* eslint-enable */
    const [playlists, setPlaylists] = useState([])
    const history = useHistory()
    const loaderContext = useContext(KeyContext)

    const onFetchError = (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401: // unauthorized
                    // setToken({})
                    dispatch(changeToken({}))
                    setUser({})
                    loaderContext.setIsFetching(false)
                    history.push('/login')
                    break;
                case 400: // bad request
                    // setToken({})
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
        } else {
            console.log(`Error: ${error}`)
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

    useEffect(() => {
        loaderContext.setIsFetching(true)
        document.title = 'Spotifi | My Playlist';
        window.scrollTo(0,0)
        fetchPlaylist()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <Text text="Playlists" textClass="main-title" />
            <div className="trackCard-container">
                {renderPlaylistCard()}
            </div>
        </div>
    )
}
