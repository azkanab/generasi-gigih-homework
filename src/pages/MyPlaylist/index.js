import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { useContext } from "react"
import { useHistory } from "react-router"
import Text from "../../components/common/Text"
import PlaylistCard from "../../components/MyPlaylist/PlaylistCard"
import { tokenState } from "../../state/auth/token"
import { userState } from "../../state/user"
import { getPlaylistList } from "../../data/spotify/get-playlist-list-api-call"
import { useState } from "react"
import isArrayEmpty from "../../utils/isArrayEmpty"
import { KeyContext } from ".."

export default function MyPlaylist() {
    const [token, setToken] = useRecoilState(tokenState)
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
                default:
                    alert(`Error: ${error.message}`)
                    break;
            }
        } else {
            alert(`Error: ${error}`)
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
                <PlaylistCard data={playlist} key={playlist.id} />
            ))
        )
    }

    useEffect(() => {
        loaderContext.setIsFetching(true)
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
