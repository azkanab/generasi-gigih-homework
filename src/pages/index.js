import React, { useState } from "react"
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from "../components/Navbar"
import AppRouter from "../route"
import Loader from "../components/common/Loader"
import Sidebar from "../components/Sidebar"
import NoNetworkModal from "../components/common/NoNetworkModal"
import CreatePlaylistModal from "../components/CreatePlaylistModal"
import '../styles/Main/Main.css'

export const HomeContext = React.createContext('loading')

export default function Main() {
    const [isFetching, setIsFetching] = useState(true)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showSideBarMobile, setShowSideBarMobile] = useState(false)
    const [showNoNetworkModal, setShowNoNetworkModal] = useState(false)

    const handleOpenCreatePlaylistModal = () => {
        return setShowCreateModal(true)
    }

    const handleCloseCreatePlaylistModal = () => {
        return setShowCreateModal(false)
    }

    const handleOpenSideBarMobile = () => {
        return setShowSideBarMobile(true)
    }

    const handleCloseSideBarMobile = () => {
        return setShowSideBarMobile(false)
    }

    return (
        <HomeContext.Provider value={{
            setIsFetching: setIsFetching,
            setShowCreateModal: setShowCreateModal,
            setShowNoNetworkModal: setShowNoNetworkModal
        }}>
            <Router>
                {isFetching && <Loader />}
                {showNoNetworkModal && <NoNetworkModal />}
                {showCreateModal && <CreatePlaylistModal handleClose={handleCloseCreatePlaylistModal} />}
                <Sidebar show={showSideBarMobile} handleModal={handleOpenCreatePlaylistModal} handleCloseSidebar={handleCloseSideBarMobile} />
                <Navbar openSideBar={handleOpenSideBarMobile}  />
                <AppRouter />
            </Router>
        </HomeContext.Provider>
    )
}