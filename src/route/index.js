import { Route, Switch } from "react-router-dom"
import Login from "../pages/Login"
import Home from "../pages/Home"
import Loading from "../pages/Loading"
import MyPlaylist from "../pages/MyPlaylist"
import PlaylistDetail from "../pages/PlaylistDetail"
import '../styles/Main/Main.css'
import { Fragment } from "react"

export default function AppRouter() {
    return (
        <Switch>
            <Route exact path='/callback' component={Loading}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Fragment>
                <div className="page-container-home">
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/my-playlist' component={MyPlaylist}></Route>
                    <Route exact path='/my-playlist/:playlistId' component={PlaylistDetail}></Route>
                </div>
            </Fragment>
        </Switch>
    )
}