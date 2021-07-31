import Text from "../../common/Text"
import Form from "../../common/Form"

export default function ModalContent({ handleSubmit, handleClose }) {
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

    return (
        <div>
            <Text text="Create Playlist" textClass="create-playlist-title" />
            <Form type="modal" handleSubmit={handleSubmit} handleClose={handleClose} inputLayout={inputSections} />
        </div>
    )
}