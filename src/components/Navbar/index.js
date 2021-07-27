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
        <div className={isLogin() ? 'header' : 'header home'}>
            {isLogin() && <div className="logo">
                <Image imgUrl={LOGO_IMG_URL} imgClass="logo-img" />
                <Text text={LOGO_TEXT} textClass="header-logo-text" />
            </div>}
            {!isLogin() && <div className="sidebar-menu-bar" onClick={handleLogoClick}>
                <Image imgUrl="/sidebar-menu.png" imgAlt="Click to open sidebar menu" imgClass="logo-img" />
            </div>}
            {!isLogin() && !isObjectEmpty(user) &&
                <a href={user.url} className="profile">
                    <Image imgUrl={user.imgUrl} imgAlt='User Picture' imgClass="profile-img" />
                    <p>{user.username}</p>
                </a>     
            }
        </div>
    )
}