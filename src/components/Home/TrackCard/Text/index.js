import '../../../../styles/Home/TrackCard.css'

export default function Text ({ type, text }) {

    const isBoldText = () => {
        return type === 'title'
    }

    return (
        <p className={isBoldText() ? 'title' : ''}>{text}</p>
    )
}