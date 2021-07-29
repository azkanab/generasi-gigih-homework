import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeRedirectURI } from "../../redux/actions/redirect-actions"
import { useHistory } from "react-router-dom"
import CreatePlaylistModal from "../../components/CreatePlaylistModal"
import isObjectEmpty from "../../utils/isObjectEmpty"

export default function CreatePlaylist() {
    const token = useSelector(state => state.token.value)
    const history = useHistory()
    const dispatch = useDispatch()

    const isNotLoggedIn = () => {
        return isObjectEmpty(token)
    }

    useEffect(() => {
        if (isNotLoggedIn()) {
            dispatch(changeRedirectURI('/create-playlist'))
            history.push("/login")
        }
    }, [])

    return (
        <CreatePlaylistModal />
    )
}