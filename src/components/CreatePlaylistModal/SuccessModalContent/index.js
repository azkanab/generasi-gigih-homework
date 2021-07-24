import Image from "../../common/Image"
import Text from "../../common/Text"
import Button from "../../common/Button"
import '../../../styles/CreatePlaylistModal/Form.css'

export default function SuccessModalContent({ layout }) {
    return (
        <div className="success-container">
            <Image imgUrl={layout.imgUrl} imgAlt="Success" imgClass="success-img" />
            <Text text={layout.title} textClass="success-title-text" />
            <Text text={layout.description} textClass="success-info-text" />
            <div className="close-button-wrapper">
                <Button primary text="Close" handleClick={layout.handleClose} />
            </div>
        </div>
    )
}