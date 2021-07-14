import '../../../../styles/Home/TrackCard.css'

export default function Image ({ imgUrl, imgAlt }) {
    return (
        <img src={imgUrl} alt={imgAlt} className="albumImage" />
    )
}