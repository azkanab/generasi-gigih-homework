import { useLocation, useHistory } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { useSelector } from "react-redux"
// import { myTokenState } from "../../state/auth/token"
import isObjectEmpty from "../../utils/isObjectEmpty"
import Image from "../common/Image"
import Text from "../common/Text"
import SideMenu from "./SideMenu"
import '../../styles/Sidebar/Sidebar.css'

export default function Sidebar({ show, handleModal, handleCloseSidebar }) {
    // const token = useRecoilValue(myTokenState)
    const token = useSelector(state => state.token.value)
    const LOGO_IMG_URL = '/spotify.png'
    const LOGO_TEXT = 'Spotifi'
    const location = useLocation()
    const history = useHistory()

    const hideSidebar = () => {
        return location.pathname === '/login'
    }

    const isHome = () => {
        return location.pathname === '/'
    }

    const isPlaylist = () => {
        return location.pathname.startsWith('/my-playlist')
    }

    const isPlaylistList = () => {
        return location.pathname === '/my-playlist'
    }

    const handleHomeClick = () => {
        if (isObjectEmpty(token)) {
            history.push("/login")
        } else if (isHome()) {
            history.go(0)
        } else {
            history.push("/")
        }
        handleCloseSidebar()
    }

    const handlePlaylistClick = () => {
        if (isObjectEmpty(token)) {
            history.push("/login")
        } else if (isPlaylistList()) {
            history.go(0)
        } else {
            history.push("/my-playlist")
        }
        handleCloseSidebar()
    }

    const handleCreateClick = () => {
        if (isObjectEmpty(token)) {
            history.push("/login")
        } else {
            handleModal()
        }
        handleCloseSidebar()
    }

    const sideMenus = [{
        id: 1,
        active: isHome(),
        handleOnClick: () => handleHomeClick(),
        img: '/home.png',
        text: 'Home'
    }, {
        id: 2,
        active: isPlaylist(),
        handleOnClick: () => handlePlaylistClick(),
        img: '/playlist.png',
        text: 'My Playlist'
    }, {
        id: 3,
        active: false,
        handleOnClick: () => handleCreateClick(),
        img: '/add.png',
        text: 'Create Playlist'
    }]

    const renderSideMenu = () => {
        return (
            sideMenus.map(menu => (
                <SideMenu key={menu.id} data={menu} />
            ))
        )
    }

    return (
        !hideSidebar() &&
        <div>
            <div className={show ? 'sidebar-container open' : 'sidebar-container'}>
                <div className="logo-sidebar" onClick={handleHomeClick}>
                    <Image imgUrl={LOGO_IMG_URL} imgClass="logo-img" />
                    <Text text={LOGO_TEXT} textClass="header-logo-text" />
                </div>
                <div className="sidebar-menu-wrapper">
                    {renderSideMenu()}
                </div>
                <div className="copyright-wrapper">
                    <Text text="© Azka N. Mumtaz" textClass="copyright-text" />
                </div>
            </div>
            {show && <div className="sidebar-layer" onClick={handleCloseSidebar} />}
        </div>
    )
}