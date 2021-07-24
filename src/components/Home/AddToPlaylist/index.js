import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { myTokenState } from '../../../state/auth/token'
import { userState } from '../../../state/user'
import '../../../styles/CreatePlaylistModal/Modal.css'
import '../../../styles/CreatePlaylistModal/Form.css'
import Text from '../../common/Text'
import Button from '../../common/Button'
import SuccessModalContent from '../../CreatePlaylistModal/SuccessModalContent'
import { KeyContext } from '../../../pages'
import { getPlaylistList } from '../../../data/spotify/get-playlist-list-api-call'
import { addItemToPlaylist } from '../../../data/spotify/add-item-to-playlist'
import isArrayEmpty from '../../../utils/isArrayEmpty'
import isObjectEmpty from '../../../utils/isObjectEmpty'

export default function AddToPlaylist({ handleClose, data }) {
    const [token, setToken] = useRecoilState(myTokenState)
    /* eslint-disable */
    const [user, setUser] = useRecoilState(userState)
    /* eslint-enable */
    const [selectedPlaylist, setSelectedPlaylist] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [playlists, setPlaylists] = useState([])
    const [statusLayout, setStatusLayout] = useState({})
    const loaderContext = useContext(KeyContext)
    const history = useHistory()
    const INFO_TEXT = `You want to add ${data.trackTitle} to`

    const SuccessModalLayout = {
        imgUrl: './success.png',
        title: 'Success',
        description: `You have successfully add ${data.trackTitle} to the playlist`,
        handleClose: () => handleClose()
    }

    const FailedModalLayout = {
        imgUrl: './failed.png',
        title: 'Failed',
        description: `You failed to add ${data.trackTitle} to the playlist`,
        handleClose: () => handleClose()
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

    async function addSongToPlaylist() {
        try {
            let response = await addItemToPlaylist(token, data.uri, selectedPlaylist)
            if (response) {
                loaderContext.setIsFetching(false)
                setIsSuccess(true)
                setStatusLayout(SuccessModalLayout)
            }
        } catch (error) {
            setStatusLayout({...FailedModalLayout, ['description']: `Error: ${error.message}`})
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
                    <form onSubmit={handleAddButtonClick}>
                        <div className="input-container">
                            <select required value={selectedPlaylist} onChange={handleOnSelectChange}>
                                <option value="">Select your playlist</option>
                                {!isArrayEmpty(playlists) &&
                                    playlists.map(playlist => (
                                        <option key={playlist.playlistId} value={playlist.playlistId}>{playlist.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="create-button-wrapper">
                            <Button text="Cancel" handleClick={handleClose}  />
                            <Button primary text="Add" type='submit' />
                        </div>
                    </form>
                </div>
                :
                <SuccessModalContent layout={statusLayout} />}
            </div>
        </div>
    )
}