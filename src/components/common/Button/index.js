import Image from "../Image"

export default function Button (props) {
    const { text, handleClick, img } = props

    return (
        <button onClick={handleClick}>{text}
            {img && <Image imgUrl={img.imgUrl} imgAlt={img.imgAlt} imgClass={img.imgClass} />}
        </button>
    )
}