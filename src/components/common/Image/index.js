import '../../../styles/common/Image.css'

export default function Image ({ imgUrl, imgAlt, imgClass }) {
    return (
        <img src={imgUrl} alt={imgAlt} className={imgClass} />
    )
}