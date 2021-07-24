import '../../styles/Navbar/Navbar.css'
import { useLocation, useHistory } from 'react-router-dom'
import { getUserState } from '../../state/user'
import { myTokenState } from '../../state/auth/token'
import { useRecoilValue } from 'recoil'
import Image from '../common/Image'
import Text from '../common/Text'
import isObjectEmpty from '../../utils/isObjectEmpty'

export default function Navbar() {
    const user = useRecoilValue(getUserState)
    const token = useRecoilValue(myTokenState)
    const LOGO_IMG_URL = './spotify.png'
    const LOGO_TEXT = 'Spotifi'
    const location = useLocation()
    const history = useHistory()

    const isLogin = () => {
        return location.pathname === '/login'
    }

    const handleLogoClick = () => {
        if (isObjectEmpty(token)) {
            history.push("/login")
        } else {
            history.go(0)
        }
    }

    return (
        <div className={isLogin() ? 'header' : 'header home'}>
            {isLogin() && <div className="logo" onClick={handleLogoClick}>
                <Image imgUrl={LOGO_IMG_URL} imgClass="logo-img" />
                <Text text={LOGO_TEXT} textClass="header-logo-text" />
            </div>}
            {!isLogin() &&
                <a href={user.url} className="profile">
                    <Image imgUrl={user.imgUrl} imgAlt='User Picture' imgClass="profile-img" />
                    <p>{user.username}</p>
                </a>     
            }
        </div>
    )
}