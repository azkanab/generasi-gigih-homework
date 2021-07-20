import { Route, Switch } from "react-router-dom"
import Login from "../pages/Login"
import Home from "../pages/Home"
import Loading from "../pages/Loading"

export default function AppRouter() {
    return (
        <Switch>
            <Route exact path='/callback' component={Loading}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/' component={Home}></Route>
        </Switch>
    )
}