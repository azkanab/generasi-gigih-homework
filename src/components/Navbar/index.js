import '../../styles/Navbar/Navbar.css'
import { useLocation } from 'react-router-dom'
import { getUserState } from '../../state/user'
import { useRecoilValue } from 'recoil'
import Image from '../common/Image'
import Text from '../common/Text'
import isObjectEmpty from '../../utils/isObjectEmpty'

export default function Navbar({ openSideBar }) {
    const user = useRecoilValue(getUserState)
    const LOGO_IMG_URL = '/spotify.png'
    const LOGO_TEXT = 'Spotifi'
    const location = useLocation()

    const isLogin = () => {
        return location.pathname === '/login'
    }

    const handleLogoClick = () => {
        openSideBar()
    }

    return (
        <div className={isLogin() ? 'navbar' : 'navbar navbar-home'}>
            {isLogin() && <div className="navbar__logo">
                <Image imgUrl={LOGO_IMG_URL} imgClass="common__logo-img" />
                <Text text={LOGO_TEXT} textClass="common__logo-text" />
            </div>}
            {!isLogin() && <div className="navbar__side-menu" onClick={handleLogoClick}>
                <Image imgUrl="/sidebar-menu.png" imgAlt="Click to open sidebar menu" imgClass="common__logo-img" />
            </div>}
            {!isLogin() && !isObjectEmpty(user) &&
                <a href={user.url} className="navbar__profile">
                    <Image imgUrl={user.imgUrl} imgAlt='User Picture' imgClass="navbar__profile-img" />
                    <p>{user.username}</p>
                </a>     
            }
        </div>
    )
}