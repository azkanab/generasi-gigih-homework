import { useEffect, useState } from 'react'
import '../../../styles/Home/TrackCard.css'
import Image from '../../common/Image'
import Button from '../../common/Button'
import Text from '../../common/Text'
import isObjectEmpty from '../../../utils/isObjectEmpty'

export default function TrackCard({ data }) {

	const [altAlbum, setAltAlbum] = useState('')
	const [imgUrl, setImgUrl] = useState('')
	const [trackTitle, setTrackTitle] = useState('')
	const [artistName, setArtistName] = useState('')
	const [albumName, setAlbumName] = useState('')
	const [spotifyUrl, setSpotifyUrl] = useState('')

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
		window.location.href = spotifyUrl
	}

	useEffect(() => {
		if (!isObjectEmpty(data)) {
			setAltAlbum(data.albumName + ' Album')
			setImgUrl(data.imgUrl)
			setTrackTitle(data.trackTitle)
			setArtistName(data.artistName)
			setAlbumName(data.albumName)
			setSpotifyUrl(data.spotifyUrl)
		}
	}, [data])

    return (
        <div className="wrapper">
			<div className="image-wrapper">
				<Image imgUrl={imgUrl} imgAlt={altAlbum} imgClass="albumImage" />
				<div className="button-wrapper">
					<Button primary img={playButton} text={SELECT_BUTTON} handleClick={handleSelectButtonClick} />
				</div>
			</div>
			<div className="detail-container">
				<div className="text-wrapper">
					<Text textClass="title" text={trackTitle} />
					<Text textClass="artistText" text={artistName} />
					<Text textClass="albumText" text={albumName} />
				</div>
			</div>
		</div>
    )
}