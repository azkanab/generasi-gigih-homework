import Image from "../Image"
import '../../../styles/common/Button.css'

export default function Button (props) {
    const { text, handleClick, img, primary, secondary, type } = props

    return (
        <button type={type} onClick={handleClick} className={primary ? 'button-primary' : secondary ? 'button-secondary' : 'button-tertiary'}>{text}
            {img && <Image imgUrl={img.imgUrl} imgAlt={img.imgAlt} imgClass={img.imgClass} />}
        </button>
    )
}