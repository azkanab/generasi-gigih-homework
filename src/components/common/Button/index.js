import Image from "../Image"
import '../../../styles/common/Button.css'

export default function Button (props) {
    const { text, handleClick, img, primary } = props

    return (
        <button onClick={handleClick} className={primary ? 'button-primary' : 'button-secondary'}>{text}
            {img && <Image imgUrl={img.imgUrl} imgAlt={img.imgAlt} imgClass={img.imgClass} />}
        </button>
    )
}