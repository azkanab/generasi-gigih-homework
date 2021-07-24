import FormInput from "../FormInput"
import Button from "../../common/Button"

export default function Form({ handleSubmit, handleClose }) {
    const inputSections = [{
        id: 'name',
        textLabel: 'Name',
        type: 'input',
        inputType: 'text',
        required: true,
        placeholder: "Playlist's name"
    }, {
        id: 'description',
        textLabel: 'Description',
        type: 'text-area',
        inputType: 'text',
        required: false,
        placeholder: "Please describe your playlist here"
    }]

    const renderInputSections = () => {
        return (
            inputSections.map(section => (
                <FormInput key={section.id} data={section} />
            ))
        )
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            {renderInputSections()}
            <div className="create-button-wrapper">
                <Button text="Cancel" handleClick={handleClose}  />
                <Button primary text="Create" type="submit" />
            </div>
        </form>
    )
}