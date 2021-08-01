import '../../../styles/common/Text.css'

export default function Text ({ textClass, text }) {
    return (
        <p className={textClass}>{text}</p>
    )
}