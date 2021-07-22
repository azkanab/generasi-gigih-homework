import { useEffect, useState } from 'react'
import '../../../styles/Home/TrackCard.css'
import Image from '../../common/Image'
import Button from '../../common/Button'
import Text from '../../common/Text'
import isObjectEmpty from '../../../utils/isObjectEmpty'

export default function TrackCard({ data }) {

	const [track, setTrack] = useState({})

	const SELECT_BUTTON = ""
	const IMG_PLAY_BUTTON = "./playbutton.png"
	const IMG_PLAY_ALT = "Play Button"
	const IMG_PLAY_CLASS = "play-button"
	const playButton = {
		imgUrl: IMG_PLAY_BUTTON,
		imgAlt: IMG_PLAY_ALT,
		imgClass: IMG_PLAY_CLASS
	}

	const handleSelectButtonClick = () => {
		window.location.href = track.url
	}

	const renderArtists = (artists) => {
		return (
			artists.map((artist, idx) => (
				idx === artists.length-1 ?
					<Text key={idx} textClass="artistText" text={artist} />
				:
					<Text key={idx} textClass="artistText" text={artist + ', '} />
			))
		)
	}

	useEffect(() => {
		if (!isObjectEmpty(data)) {
			setTrack({
				altAlbum: data.albumName + ' Album',
				imgUrl: data.imgUrl,
				title: data.trackTitle,
				artists: data.artistName,
				album: data.albumName,
				url: data.spotifyUrl
			})
		}
	}, [data])

    return (
		!isObjectEmpty(track) &&
		<div className="wrapper">
			<div className="image-wrapper">
				<Image imgUrl={track.imgUrl} imgAlt={track.altAlbum} imgClass="albumImage" />
				<div className="button-wrapper">
					<Button primary img={playButton} text={SELECT_BUTTON} handleClick={handleSelectButtonClick} />
				</div>
			</div>
			<div className="detail-container">
				<div className="text-wrapper">
					<Text textClass="title" text={track.title} />
					{renderArtists(track.artists)}
					<Text textClass="albumText" text={track.album} />
				</div>
			</div>
		</div>
		
    )
}