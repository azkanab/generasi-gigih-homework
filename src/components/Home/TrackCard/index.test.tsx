import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import TrackCard from "./index";
import { getArtistText } from "../../../utils/getArtistText";

const type = "normal"

const data = {
    id: '123',
    uri: 'spotify:123',
    imgUrl: 'https://www.rspca.org.uk/documents/1494939/0/what+to+do+with+stray+cats+and+kittens+%283%29.jpg/886bc0d5-1dc5-d2bf-eabd-473fd4d99886?t=1618404272031',
    trackTitle: 'Catty Cat',
    artistName: ['Adylan Roaffa', 'Azka Mumtaz'],
    albumName: 'Lovey Dovey',
    spotifyUrl: 'https://www.instagram.com/azkanab/'
}

const onClick = jest.fn()
const handleSelectButtonClick = jest.fn()

const IMG_PLAY_BUTTON = "/playbutton.png"
const IMG_PLAY_ALT = "Select Button"
const IMG_PLAY_CLASS = "play-button"

const playButton = {
    imgUrl: IMG_PLAY_BUTTON,
    imgAlt: IMG_PLAY_ALT,
    imgClass: IMG_PLAY_CLASS
}

beforeEach(() => {
    render (
        <TrackCard type={type} data={data} handleClick={onClick} />
    )
})

test('Check if Track Card is rendered', () => {
    const { container } = render (
        <TrackCard type={type} data={data} handleClick={onClick} />
    )
    expect(container.firstChild).toMatchSnapshot(`
        <div id="track-card" class="track-card">
            <div class="track-card__image-wrapper">
                <div class="image">
                    <div class="image__placeholder-container">
                        <img src="/unknown_playlist.png" alt="loading" class="image__placeholder" />
                    </div>
                    <img src="${data.imgUrl}" alt="${data.albumName + ' Album'}" class="track-card__album-image image__display-none" />
                </div>
                <div class="track-card__button-wrapper">
                    <button onClick=${handleSelectButtonClick} class="button-primary">
                        <img src="${playButton.imgUrl}" alt="${playButton.imgAlt}" class="${playButton.imgClass}" />}
                    </button>
                </div>
            </div>
            <div class="track-card__detail">
                <div class="track-card__text-wrapper">
                    <p class="card__title">${data.trackTitle}</p>
                    <p class="card__artist">${getArtistText(data.artistName)}</p>
                    <p class="card__album"/>${data.albumName}</p>
                </div>
            </div>
        </div>
    `)
})

test('Check if Track Card renders image', () => {
    const imgElement = screen.getByAltText(data.albumName + ' Album')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement.getAttribute('src')).toBe(data.imgUrl)
})

test('Check if Track Card renders the title', () => {
    const titleElement = screen.getByText(data.trackTitle)
    expect(titleElement).toBeInTheDocument()
})

test('Check if Track Card renders the artist', () => {
    const artistName = screen.getByText(getArtistText(data.artistName))
    expect(artistName).toBeInTheDocument()
})

test('Check if Track Card renders the album name', () => {
    const albumName = screen.getByText(data.albumName)
    expect(albumName).toBeInTheDocument()
})

test('Check if Track Card renders playButton', () => {
    const buttonPlayElement = screen.getByRole('button')
    expect(buttonPlayElement).toBeInTheDocument()
    expect(buttonPlayElement.getAttribute('class')).toBe('button-primary')
})

test('Check if onClick function is called when user click the playButton', () => {
    const buttonPlayElement = screen.getByRole('button')

    const leftClick = { button: 0 }
    userEvent.click(buttonPlayElement, leftClick)

    expect(onClick).toBeCalledTimes(1)
})