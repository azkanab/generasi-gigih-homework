import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLogin } from "../../utils/isLogin";

export default function PrivateRoute({ children, ...props }) {
    const token = useSelector(state => state.token.value)

    return (
        <Route {...props} render={() => (isLogin(token) ? children : <Redirect to="/login" />)} />
    )
}