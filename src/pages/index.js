import React, { useState } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "../components/Navbar"
import AppRouter from "../route"
import Loader from "../components/common/Loader"

export const KeyContext = React.createContext('loading')

export default function Main() {
    const [isFetching, setIsFetching] = useState(true)
    return (
        <KeyContext.Provider value={{
            setIsFetching: setIsFetching
        }}>
            <Router>
                {isFetching && <Loader />}
                <Navbar />
                <AppRouter />
            </Router>
        </KeyContext.Provider>
    )
}