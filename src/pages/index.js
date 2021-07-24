import React, { useState } from "react"
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from "../components/Navbar"
import AppRouter from "../route"
import Loader from "../components/common/Loader"
import Sidebar from "../components/Sidebar"
import CreatePlaylistModal from "../components/CreatePlaylistModal"
import '../styles/Main/Main.css'

export const KeyContext = React.createContext('loading')

export default function Main() {
    const [isFetching, setIsFetching] = useState(true)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const location = window.location.pathname

    const isLoginPage = () => {
        return location === '/login'
    }

    const handleOpenCreatePlaylistModal = () => {
        return setShowCreateModal(true)
    }

    const handleCloseCreatePlaylistModal = () => {
        return setShowCreateModal(false)
    }

    return (
        <KeyContext.Provider value={{
            setIsFetching: setIsFetching,
            setShowCreateModal: setShowCreateModal
        }}>
            <Router>
                {isFetching && <Loader />}
                {showCreateModal && <CreatePlaylistModal handleClose={handleCloseCreatePlaylistModal} />}
                <Sidebar handleModal={handleOpenCreatePlaylistModal} />
                <div className={isLoginPage() ? 'page-container' : 'page-container-home'}>
                    <Navbar />
                    <AppRouter />
                </div>
            </Router>
        </KeyContext.Provider>
    )
}