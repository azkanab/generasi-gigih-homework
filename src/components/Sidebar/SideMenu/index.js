import Image from "../../common/Image"
import Text from "../../common/Text"
import '../../../styles/Sidebar/SideMenu.css'

export default function SideMenu({ data }) {
    return (
        <div className={data.active ? 'side-menu active' : 'side-menu'} onClick={data.handleOnClick}>
            <Image imgUrl={data.img} imgClass="side-menu__logo" />
            <Text text={data.text} textClass="side-menu__text" />
        </div>
    )
}