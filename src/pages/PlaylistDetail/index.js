import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useRecoilState } from "recoil"
import { useContext } from "react"
import { getPlaylistDetail } from "../../data/spotify/get-playlist-detail-api-call"
import { changeToken } from "../../redux/actions/token-actions"
import { KeyContext } from ".."
import { userState } from "../../state/user"
import PlaylistInfo from "../../components/MyPlaylist/PlaylistInfo"
import PlaylistTracks from "../../components/MyPlaylist/PlaylistTracks"
import isObjectEmpty from "../../utils/isObjectEmpty"

export default function PlaylistDetail() {
    const dispatch = useDispatch()

    const token = useSelector(state => state.token.value)
    /* eslint-disable */
    const [user, setUser] = useRecoilState(userState)
    /* eslint-enable */
    const [playlist, setPlaylist] = useState({})
    const params = useParams()
    const loaderContext = useContext(KeyContext)
    const history = useHistory()

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
        } else {
            console.log(`Error: ${error}`)
        }
    }


    async function fetchPlaylistDetail() {
        try {
            let response = await getPlaylistDetail(token, params.playlistId)
            if (response) {
                setPlaylist({
                    playlistInfo: {
                        playlistId: response.playlistId,
                        name: response.name,
                        description: response.description,
                        image: response.image
                    },
                    tracks: response.tracks
                })
                document.title = `Spotifi | ${response.name}`;
                loaderContext.setIsFetching(false)
            }
        } catch (error) {
            onFetchError(error)
        }
    }

    useEffect(() => {
        window.scrollTo(0,0)
        loaderContext.setIsFetching(true)
        fetchPlaylistDetail()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {!isObjectEmpty(playlist) && <PlaylistInfo data={playlist.playlistInfo} />}
            <PlaylistTracks tracks={playlist.tracks} />
        </div>
    )
}