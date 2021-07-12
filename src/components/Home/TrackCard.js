import '../../styles/Home/TrackCard.css'

export default function TrackCard({ data }) {
    return (
        <div className="wrapper">
            <img src={data.imgUrl} alt={data.albumName + ' Album'} className="albumImage" />
		    <p className="titleText">{data.trackTitle}</p>
		    <p className="artistText">{data.artistName}</p>
		    <p className="albumText">{data.albumName}</p>
		    <button>Select</button>
		</div>
    )
}