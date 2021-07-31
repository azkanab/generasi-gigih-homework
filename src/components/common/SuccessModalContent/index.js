import Image from "../Image"
import Text from "../Text"
import Button from "../Button"

export default function SuccessModalContent({ layout }) {
    return (
        <div style={{textAlign: 'center'}}>
            <Image imgUrl={layout.imgUrl} imgAlt="Success" imgClass="success-img" />
            <Text text={layout.title} textClass="success-title-text" />
            <Text text={layout.description} textClass="success-info-text" />
            <div className="success-modal-button-wrapper">
                <Button primary text="Close" handleClick={layout.handleClose} />
            </div>
        </div>
    )
}