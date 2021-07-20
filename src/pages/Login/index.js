import { useEffect } from "react"
import Text from "../../components/common/Text"
import Button from "../../components/common/Button"
import Image from "../../components/common/Image"
import '../../styles/Login/login.css'
import getFullUrl from "../../utils/getFullUrl"

export default function Login() {
    const LOGIN_BUTTON = 'Login with Spotify'
    const SPOTIFI_TITLE = 'Spotifi'

    const LOGIN_BASE_URL = "https://accounts.spotify.com/authorize?"
    const callback_url = "http://localhost:3000/callback"
    const PARAMS = {
        client_id: process.env.REACT_APP_SPOTIFY_KEY,
        response_type: "token",
        redirect_uri: callback_url,
        scope: "playlist-modify-private"
    }
    const FULL_URL = getFullUrl(LOGIN_BASE_URL, PARAMS)

    useEffect(() => {
        document.title = 'Spotifi | Login';
    }, [])

    return (
        <div className="login-container">
            <div>
                <div className="login-logo-container">
                    <Image imgUrl="./spotify.png" imgAlt="Spotifi Logo" imgClass="login-logo" />
                    <Text text={SPOTIFI_TITLE} textClass="login-title"  />
                </div>
                <a href={FULL_URL} className="login-button-wrapper">
                    <Button primary text={LOGIN_BUTTON} handleClick={() => console.log('Redirecting to Spotify...')} />
                </a>
            </div>
        </div>
    )
}