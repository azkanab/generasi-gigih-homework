import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
// import { tokenState } from '../../../state/auth/token'
import { changeToken } from '../../../redux/actions/token-actions'
import { userState } from '../../../state/user'
import '../../../styles/CreatePlaylistModal/Modal.css'
import '../../../styles/CreatePlaylistModal/Form.css'
import Text from '../../common/Text'
import Form from './Form'
import SuccessModalContent from '../../CreatePlaylistModal/SuccessModalContent'
import { KeyContext } from '../../../pages'
import { getPlaylistList } from '../../../data/spotify/get-playlist-list-api-call'
import { addItemToPlaylist } from '../../../data/spotify/add-item-to-playlist'
import isObjectEmpty from '../../../utils/isObjectEmpty'

export default function AddToPlaylist({ handleClose, data }) {
    // const [token, setToken] = useRecoilState(tokenState)
    const dispatch = useDispatch()

    const token = useSelector(state => state.token.value)
    /* eslint-disable */
    const [user, setUser] = useRecoilState(userState)
    /* eslint-enable */
    const [selectedPlaylist, setSelectedPlaylist] = useState("")
    const [playlists, setPlaylists] = useState([])
    const [statusLayout, setStatusLayout] = useState({})
    const loaderContext = useContext(KeyContext)
    const history = useHistory()
    const INFO_TEXT = `You want to add ${data.trackTitle} to`

    const SuccessModalLayout = {
        imgUrl: '/success.png',
        title: 'Success',
        description: `You have successfully add ${data.trackTitle} to the playlist`,
        handleClose: () => handleClose()
    }

    const FailedModalLayout = {
        imgUrl: '/failed.png',
        title: 'Failed',
        description: `You failed to add ${data.trackTitle} to the playlist`,
        handleClose: () => handleClose()
    }

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
                case 403: // forbidden
                    setStatusLayout({...FailedModalLayout, description: 'You are not allowed to modify this playlist'})
                    loaderContext.setIsFetching(false)
                    break;
                default:
                    setStatusLayout({...FailedModalLayout, description: `Error: ${error.message}`})
                    loaderContext.setIsFetching(false)
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

    async function addSongToPlaylist() {
        try {
            let response = await addItemToPlaylist(token, data.uri, selectedPlaylist)
            if (response) {
                loaderContext.setIsFetching(false)
                setStatusLayout(SuccessModalLayout)
            }
        } catch (error) {
            onFetchError(error)
        } 
    }

    const handleOnSelectChange = (e) => {
        setSelectedPlaylist(e.target.value)
    }

    const handleAddButtonClick = (e) => {
        e.preventDefault()
        if (selectedPlaylist === "") {
        } else {
            loaderContext.setIsFetching(true)
            addSongToPlaylist()
        }
    }

    const selected = {
        value: selectedPlaylist,
        handleOnChange: (e) => handleOnSelectChange(e)
    }

    useEffect(() => {
        fetchPlaylist()
        loaderContext.setIsFetching(true)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="create-playlist-modal">
            <div className="modal-content">
               {isObjectEmpty(statusLayout) ? <div>
                    <Text text="Select your playlist" textClass="create-playlist-title" />
                    <Text text={INFO_TEXT} />
                    <Form selected={selected} handleSubmit={handleAddButtonClick} playlists={playlists} handleCloseModal={handleClose} />
                </div>
                :
                <SuccessModalContent layout={statusLayout} />}
            </div>
        </div>
    )
}