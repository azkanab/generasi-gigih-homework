import Text from "../../common/Text"
import Form from "../Form"

export default function ModalContent({ handleSubmit, handleClose }) {
    return (
        <div>
            <Text text="Create Playlist" textClass="create-playlist-title" />
            <Form handleSubmit={handleSubmit} handleClose={handleClose} />
        </div>
    )
}