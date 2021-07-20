import '../../styles/Navbar/Navbar.css'
import { useLocation } from 'react-router-dom'
import { getUserState } from '../../state/user'
import { useRecoilValue } from 'recoil'
import Image from '../common/Image'
import Text from '../common/Text'

export default function Navbar() {
    const user = useRecoilValue(getUserState)
    const LOGO_IMG_URL = './spotify.png'
    const LOGO_TEXT = 'Spotifi'
    let location = useLocation()

    const hideProfile = () => {
        return location.pathname === '/login'
    }

    return (
        <div className="header">
            <div className="logo">
                <Image imgUrl={LOGO_IMG_URL} imgClass="logo-img" />
                <Text text={LOGO_TEXT} textClass="header-logo-text" />
            </div>
            {!hideProfile() &&
                <a href={user.url} className="profile">
                    <Image imgUrl={user.imgUrl} imgAlt='User Picture' imgClass="profile-img" />
                    <p>{user.username}</p>
                </a>     
            }
        </div>
    )
}