import { useHistory } from "react-router-dom"
import Text from "../../common/Text"
import Form from "../Form"

export default function ModalContent({ handleSubmit }) {
    const history = useHistory()

    const handleCancelModal = () => {
        history.push('/my-playlist')
    }
    
    return (
        <div>
            <Text text="Create Playlist" textClass="create-playlist-title" />
            <Form handleSubmit={handleSubmit} handleClose={handleCancelModal} />
        </div>
    )
}