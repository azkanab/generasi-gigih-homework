import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLogin } from "../../utils/isLogin";

export default function PrivateRoute({ ...props }) {
    const token = useSelector(state => state.token.value)

    return (
        <Route exact={props.exact} path={props.path} render={() => isLogin(token) ? (<props.component />) : (<Redirect to={{pathname: "/login", state: {redirectURI: props.path}}} />)} />
    )
}