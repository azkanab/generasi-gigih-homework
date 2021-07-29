import React, { useState } from "react"
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from "../components/Navbar"
import AppRouter from "../route"
import Loader from "../components/common/Loader"
import Sidebar from "../components/Sidebar"
import '../styles/Main/Main.css'

export const KeyContext = React.createContext('loading')

export default function Main() {
    const [isFetching, setIsFetching] = useState(true)
    const [showSideBarMobile, setShowSideBarMobile] = useState(false)

    const handleOpenSideBarMobile = () => {
        return setShowSideBarMobile(true)
    }

    const handleCloseSideBarMobile = () => {
        return setShowSideBarMobile(false)
    }

    return (
        <KeyContext.Provider value={{
            setIsFetching: setIsFetching,
        }}>
            <Router>
                {isFetching && <Loader />}
                {/* {showCreateModal && <CreatePlaylistModal handleClose={handleCloseCreatePlaylistModal} />} */}
                <Sidebar show={showSideBarMobile} handleCloseSidebar={handleCloseSideBarMobile} />
                <Navbar openSideBar={handleOpenSideBarMobile}  />
                <AppRouter />
            </Router>
        </KeyContext.Provider>
    )
}