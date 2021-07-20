import '../../styles/Navbar/Navbar.css'
import { getUserState } from '../../state/user'
import { useRecoilValue } from 'recoil'
import Image from '../common/Image'
import Text from '../common/Text'

export default function Navbar() {
    const user = useRecoilValue(getUserState)
    const LOGO_IMG_URL = './spotify.png'
    const LOGO_TEXT = 'Spotifi'

    return (
        <div className="header">
            <div className="logo">
                <Image imgUrl={LOGO_IMG_URL} imgClass="logo-img" />
                <Text text={LOGO_TEXT} textClass="header-logo-text" />
            </div>
            <a href={user.url} className="profile">
                <Image imgUrl={user.imgUrl} imgAlt='User Picture' imgClass="profile-img" />
                <p>{user.username}</p>
            </a>
        </div>
    )
}