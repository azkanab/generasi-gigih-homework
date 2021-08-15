import FormInput from "../FormInput"
import Button from "../Button"
import '../../../styles/common/Form.css'
import { isModal } from "../../../utils/componentType"

export default function Form({ type, allowSubmit, handleSubmit, handleClose, inputLayout }) {
    const renderInputSections = () => {
        return (
            inputLayout.map(section => (
                <FormInput type={type} key={section.id} data={section} />
            ))
        )
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            {renderInputSections()}
            <div className={isModal(type) ? "common__modal-button-wrapper" : "common__page-button-wrapper"}>
                <div className="left">
                    {isModal(type) && <Button text="Cancel" handleClick={handleClose} /> }
                </div>
                <div className="right">
                    {allowSubmit ?
                        <Button primary text="Create" type="submit" />
                        :
                        <Button disable text="Create" type="submit" />
                    }
                </div>
            </div>
        </form>
    )
}