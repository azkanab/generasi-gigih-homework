import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../../state/user'
import { useSelector, useDispatch } from 'react-redux'
import { changeToken } from '../../redux/actions/token-actions'
import '../../styles/CreatePlaylistModal/Modal.css'
import ModalContent from './ModalContent'
import SuccessModalContent from './SuccessModalContent'
import { createPlaylist } from '../../data/spotify/create-playlist-api-call'
import { useContext } from 'react'
import { KeyContext } from '../../pages'
import { useHistory } from 'react-router-dom'
import isObjectEmpty from '../../utils/isObjectEmpty'

export const InputContext = React.createContext('input')

export default function CreatePlaylistModal() {
    const loaderContext = useContext(KeyContext)
    const [user, setUser] = useRecoilState(userState)
    const dispatch = useDispatch()

    const token = useSelector(state => state.token.value)
    const [form, setForm] = useState({
        name: '',
        description: ''
    })
    const [statusLayout, setStatusLayout] = useState({})
    const history = useHistory()

    const SuccessModalLayout = {
        imgUrl: '/success.png',
        title: 'Success',
        description: 'You have successfully created a playlist',
        handleClose: () => handleCloseSuccessModal()
    }

    const FailedModalLayout = {
        imgUrl: '/failed.png',
        title: 'Failed',
        description: `You failed to create a new playlist`,
        handleClose: () => handleCloseFailedModal()
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
                    setStatusLayout({...FailedModalLayout, description: 'You are not allowed to create a new playlist'})
                    loaderContext.setIsFetching(false)
                    break;
                default:
                    setStatusLayout({...FailedModalLayout, description: `Error: ${error.message}`})
                    loaderContext.setIsFetching(false)
                    break;
            }
        }
    }

    async function postForm() {
        try {
            let response = await createPlaylist(token, user.username, form)
            if (response.message === "SUCCESS") {
                setStatusLayout(SuccessModalLayout)
                loaderContext.setIsFetching(false)
            }
        } catch (error) {
            onFetchError(error)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        postForm()
        loaderContext.setIsFetching(true)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setForm({...form, [name]: value})
    }

    const handleCloseSuccessModal = () => {
        history.push('/my-playlist')
    }

    const handleCloseFailedModal = () => {
        history.goBack()
    }
    
    return (
        <div className="create-playlist-modal">
            <div className="modal-content">
                {isObjectEmpty(statusLayout) ?
                <InputContext.Provider value={{
                    data: form,
                    handleChange: (e) => handleInputChange(e)
                }}>
                    <ModalContent handleSubmit={handleFormSubmit} />
                </InputContext.Provider>
                :
                <SuccessModalContent layout={statusLayout} />}
            </div>
        </div>
    )
}