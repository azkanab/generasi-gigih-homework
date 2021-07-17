import '../../styles/Navbar/Navbar.css'
import { getUser } from '../../state/user'
import { useRecoilValue } from 'recoil'
import Image from '../common/Image'
import Text from '../common/Text'

export default function Navbar() {
    const user = useRecoilValue(getUser)
    const LOGO_IMG_URL = './spotify.png'
    const LOGO_TEXT = 'Spotifi'

    return (
        <div className="header">
            <div className="logo">
                <Image imgUrl={LOGO_IMG_URL} imgClass="logo-img" />
                <Text text={LOGO_TEXT} textClass="header-logo-text" />
            </div>
            <div className="profile">
                {user.username}
            </div>
        </div>
    )
}