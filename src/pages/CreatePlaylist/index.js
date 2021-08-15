import React from 'react'
import { useContext, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { useHistory, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { userState } from "../../state/user"
import { changeToken } from "../../redux/actions/token-actions"
import { changeRedirectURI } from '../../redux/actions/redirect-actions'
import { HomeContext } from ".."
import Text from "../../components/common/Text"
import Form from '../../components/common/Form'
import { createPlaylist } from "../../data/spotify/create-playlist-api-call"
import SuccessModalContent from '../../components/common/SuccessModalContent'
import { isLogin } from '../../utils/isLogin'
import '../../styles/common/Modal.css'
import { isLengthLarger } from '../../utils/isLengthLarger'

export const CreatePageContext = React.createContext('create-page')

export default function CreatePlaylist() {
    const loaderContext = useContext(HomeContext)
    const dispatch = useDispatch()
    const token = useSelector(state => state.token.value)
    const [allowToSubmit, setAllowToSubmit] = useState(false)
    const [form, setForm] = useState({
        name: '',
        description: ''
    })
    const [errorMessage, setErrorMessage] = useState({
        name: '',
        description: ''
    })
    const minLength = {
        name: 10,
        description: 20
    }
    const [user, setUser] = useRecoilState(userState)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [statusLayout, setStatusLayout] = useState({})
    const location = useLocation()
    const history = useHistory()
    const NO_NETWORK_ERROR = "Network Error"
    const inputSections = [{
        id: 'name',
        textLabel: 'Name',
        type: 'input',
        inputType: 'text',
        required: true,
        placeholder: "Playlist's name"
    }, {
        id: 'description',
        textLabel: 'Description',
        type: 'text-area',
        inputType: 'text',
        required: true,
        placeholder: "Please describe your playlist here"
    }]

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
        handleClose: () => setShowSuccessModal(false)
    }

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false)
        if (location.pathname === '/my-playlist') {
            history.go(0)
        } else {
            history.push('/my-playlist')
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
                    setStatusLayout({...FailedModalLayout, description: 'You are not allowed to create a new playlist'})
                    loaderContext.setIsFetching(false)
                    break;
                default:
                    setStatusLayout({...FailedModalLayout, description: `Error: ${error.message}`})
                    loaderContext.setIsFetching(false)
                    break;
            }
            setShowSuccessModal(true)
        } else if (error.message === NO_NETWORK_ERROR) {
            loaderContext.setIsFetching(false)
            loaderContext.setShowNoNetworkModal(true)
        } else {
            setStatusLayout({...FailedModalLayout, description: `Error: ${error.message}`})
            setShowSuccessModal(true)
        }
    }

    async function postCreatePlaylistForm() {
        try {
            let response = await createPlaylist(token, user.username, form)
            console.log(response.message)
            if (response.message === "SUCCESS") {
                setStatusLayout(SuccessModalLayout)
                loaderContext.setIsFetching(false)
                setShowSuccessModal(true)
            }
        } catch (error) {
            onFetchError(error)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (allowToSubmit) {
            loaderContext.setIsFetching(true)
            postCreatePlaylistForm()
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setForm({...form, [name]: value})
        if (!isLengthLarger(value, minLength[name])) {
            setErrorMessage({...errorMessage, [name]: `Number of character must be greater than ${minLength[name]}`})
        } else {
            setErrorMessage({...errorMessage, [name]: ''})   
        }
    }

    const canSubmit = () => {
        return isLengthLarger(form.name, minLength.name) && isLengthLarger(form.description, minLength.description)
    }

    const init = () => {
        dispatch(changeRedirectURI(location.pathname))
        if (isLogin(token)) {
            loaderContext.setIsFetching(false)
        } else {
            history.push("/login")
        }
        document.title = 'Spotifi | Create Playlist';
        window.scrollTo(0,0)
    }

    useEffect(() => {
        init()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (canSubmit()) {
            setAllowToSubmit(true)
        } else {
            setAllowToSubmit(false)
        }
    }, [form])

    return (
        <div className="create-playlist">
            {showSuccessModal &&
            <div className="create-playlist__modal">
                <div className="create-playlist__modal-content">
                    <SuccessModalContent layout={statusLayout} />
                </div>
            </div>
            }
            <Text text="Create Playlist" textClass="common__main-title" />
            <CreatePageContext.Provider value={{
                data: form,
                handleChange: (e) => handleInputChange(e),
                errorMessage: errorMessage
            }}>
                <Form type="pages" allowSubmit={allowToSubmit} handleSubmit={handleFormSubmit} inputLayout={inputSections} />
            </CreatePageContext.Provider>
        </div>
    )
}