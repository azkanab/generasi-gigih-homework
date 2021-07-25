import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../../state/user'
import { tokenState } from '../../state/auth/token'
import '../../styles/CreatePlaylistModal/Modal.css'
import ModalContent from './ModalContent'
import SuccessModalContent from './SuccessModalContent'
import { createPlaylist } from '../../data/spotify/create-playlist-api-call'
import { useContext } from 'react'
import { KeyContext } from '../../pages'
import { useHistory, useLocation } from 'react-router-dom'

export const InputContext = React.createContext('input')

export default function CreatePlaylistModal({ handleClose }) {
    const loaderContext = useContext(KeyContext)
    const [user, setUser] = useRecoilState(userState)
    const [token, setToken] = useRecoilState(tokenState)
    const [form, setForm] = useState({
        name: '',
        description: ''
    })
    const [success, setSuccess] = useState(false)
    const history = useHistory()
    const location = useLocation()

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
                    console.log(`Error: ${error.message}`)
                    break;
            }
        }
    }

    async function postForm() {
        try {
            let response = await createPlaylist(token, user.username, form)
            if (response.message === "SUCCESS") {
                setSuccess(true)
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
        handleClose()
        setSuccess(false)
        if (location.pathname === '/my-playlist') {
            history.go(0)
        } else {
            history.push('/my-playlist')
        }
    }

    const SuccessModalLayout = {
        imgUrl: '/success.png',
        title: 'Success',
        description: 'You have successfully created a playlist',
        handleClose: () => handleCloseSuccessModal()
    }
    
    return (
        <div className="create-playlist-modal">
            <div className="modal-content">
                {!success ?
                <InputContext.Provider value={{
                    data: form,
                    handleChange: (e) => handleInputChange(e)
                }}>
                    <ModalContent handleSubmit={handleFormSubmit} handleClose={handleClose}  />
                </InputContext.Provider>
                :
                <SuccessModalContent layout={SuccessModalLayout} />}
            </div>
        </div>
    )
}