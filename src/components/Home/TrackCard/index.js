import { useEffect, useState } from 'react'
// import { useRecoilState } from 'recoil'
import '../../../styles/Home/TrackCard.css'
import Image from '../../common/Image'
import Button from '../../common/Button'
import Text from '../../common/Text'
import isObjectEmpty from '../../../utils/isObjectEmpty'
// import { selectedTrackState } from '../../../state/selectedTrack'

const TRACK_CARD_TYPE = {
	unselected: "normal",
	selected: "selected"
}

const SELECT_BUTTON = ""
const IMG_PLAY_BUTTON = "/playbutton.png"
const IMG_DESELECT_BUTTON = "/remove.png"
const IMG_PLAY_ALT = "Select Button"
const IMG_DESELECT_ALT = "Deselect Button"
const IMG_PLAY_CLASS = "play-button"

export default function TrackCard({ type, data, handleClick }) {

	const [track, setTrack] = useState({})
	// const [selectedTrack, setSelectedTrack] = useRecoilState(selectedTrackState)

	const playButton = {
		imgUrl: IMG_PLAY_BUTTON,
		imgAlt: IMG_PLAY_ALT,
		imgClass: IMG_PLAY_CLASS
	}
	const deselectButton = {
		imgUrl: IMG_DESELECT_BUTTON,
		imgAlt: IMG_DESELECT_ALT,
		imgClass: IMG_PLAY_CLASS
	}

	const isSelected = () => {
		return type === TRACK_CARD_TYPE.selected
	}

	// const checkItemToDeselect = (item) => {
	// 	return item.uri !== track.uri
	// }

	const handleSelectButtonClick = () => {
		// window.location.href = track.url
		if (!isSelected()) {
			// Select Item
			// let newSelectedTrack = [...selectedTrack]
			// newSelectedTrack.push(data)
			// setSelectedTrack(newSelectedTrack)
			handleClick(data)
		} else {
			// Deselect Item
			// let newSelectedTrack = selectedTrack.filter(checkItemToDeselect)
			// setSelectedTrack(newSelectedTrack)
		}
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
				url: data.spotifyUrl,
				uri: data.uri
			})
		}
	}, [data])

    return (
		!isObjectEmpty(track) &&
		<div className="wrapper">
			<div className="image-wrapper">
				<Image imgUrl={track.imgUrl} imgAlt={track.altAlbum} imgClass="albumImage" />
				<div className="button-wrapper">
					{!isSelected() ?
						<Button primary img={playButton} text={SELECT_BUTTON} handleClick={handleSelectButtonClick} />
					:
						<Button secondary img={deselectButton} text={SELECT_BUTTON} handleClick={handleSelectButtonClick} />
					}
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