import { useEffect, useState } from 'react'
import '../../../styles/Home/TrackCard.css'
import Image from '../../common/Image'
import Button from '../../common/Button'
import Text from '../../common/Text'
import isObjectEmpty from '../../../utils/isObjectEmpty'
import { getArtistText } from '../../../utils/getArtistText'

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

interface Data {
	id: string,
	uri: string,
	imgUrl: string,
	trackTitle: string,
	artistName: string[],
	albumName: string,
	spotifyUrl: string
}

interface Props {
	type: string,
	data: Data,
	handleClick: (data: Data) => void
}

interface TrackState {
	altAlbum?: string,
	imgUrl?: string,
	title?: string,
	artists?: string[],
	album?: string,
	url?: string,
	uri?: string
}

export default function TrackCard({ type, data, handleClick }: Props) {

	const [track, setTrack] = useState<TrackState>({})

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

	const handleSelectButtonClick = () => {
		if (!isSelected()) {
			handleClick(data)
		}
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
		!isObjectEmpty(track) ?
		<div id="track-card" className="wrapper">
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
					<Text textClass="artistText" text={getArtistText(track.artists)} />
					<Text textClass="albumText" text={track.album} />
				</div>
			</div>
		</div>
		: null
    )
}