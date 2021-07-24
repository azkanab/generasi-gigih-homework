import Image from "../../common/Image"
import Text from "../../common/Text"
import '../../../styles/Sidebar/SideMenu.css'

export default function SideMenu({ data }) {
    return (
        <div className={data.active ? 'sidebar-menu active' : 'sidebar-menu'} onClick={data.handleOnClick}>
            <Image imgUrl={data.img} imgClass="sidebar-menu-logo" />
            <Text text={data.text} textClass="sidebar-menu-text" />
        </div>
    )
}