import FormInput from "../FormInput"
import Button from "../Button"
import '../../../styles/common/Form.css'

export default function Form({ type, allowSubmit, handleSubmit, handleClose, inputLayout }) {
    const renderInputSections = () => {
        return (
            inputLayout.map(section => (
                <FormInput type={type} key={section.id} data={section} />
            ))
        )
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={type === 'pages' && "create-playlist_form-container"}>
            {renderInputSections()}
            <div className={type === 'modal' ? "create-modal-button-wrapper" : "create-page-button-wrapper"}>
                <div className="left">
                    {type === 'modal' && <Button text="Cancel" handleClick={handleClose} /> }
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