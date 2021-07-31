import { Route, Switch } from "react-router-dom"
import Login from "../pages/Login"
import Home from "../pages/Home"
import Loading from "../pages/Loading"
import MyPlaylist from "../pages/MyPlaylist"
import PlaylistDetail from "../pages/PlaylistDetail"
import CreatePlaylist from "../pages/CreatePlaylist"
import PrivateRoute from "./PrivateRoute"
import '../styles/Main/Main.css'
import { Fragment } from "react"

export default function AppRouter() {
    return (
        <Switch>
            <Route exact path='/callback' component={Loading}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Fragment>
                <div className="page-container-home">
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute exact path="/my-playlist" component={MyPlaylist} />
                    <Route exact path="/my-playlist/:playlistId" component={PlaylistDetail} />
                    <PrivateRoute exact path="/create-playlist" component={CreatePlaylist} />
                </div>
            </Fragment>
        </Switch>
    )
}