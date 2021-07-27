import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { tokenState } from "../../state/auth/token";
// import { useRecoilState } from "recoil";
import { changeToken } from "../../redux/actions/token-actions";
import isObjectEmpty from "../../utils/isObjectEmpty";
import { KeyContext } from "..";

export default function Loading() {
    const loaderContext = useContext(KeyContext)

    // const [token, setToken] = useRecoilState(tokenState)
    const dispatch = useDispatch()

    const token = useSelector(state => state.token.value)
    const urlSearchParams = new URLSearchParams(window.location.hash.substring(1));
    const error = urlSearchParams.get('error');
    const history = useHistory()

    useEffect(() => {
        document.title = 'Please wait...';
        if (!error) {
            let accessToken = urlSearchParams.get('access_token')
            let tokenType = urlSearchParams.get('token_type')
            let expiresIn = urlSearchParams.get('expires_in')
            dispatch(changeToken({
                access_token: accessToken,
                token_type: tokenType,
                expires_in: expiresIn
            }))
            // setToken({
            //     access_token: accessToken,
            //     token_type: tokenType,
            //     expires_in: expiresIn
            // })
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!isObjectEmpty(token)) {
            history.push("/")
        }
        loaderContext.setIsFetching(true)
    }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div />
    )
}