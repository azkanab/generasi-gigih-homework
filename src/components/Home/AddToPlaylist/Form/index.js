import Button from "../../../common/Button"
import isArrayEmpty from "../../../../utils/isArrayEmpty"

export default function Form(props) {
    const { selected, handleSubmit, playlists, handleCloseModal } = props
    const { value, handleOnChange } = selected

    const renderOption = () => {
        return (
            !isArrayEmpty(playlists) &&
                playlists.map(playlist => (
                    <option key={playlist.playlistId} value={playlist.playlistId}>{playlist.name}</option>
                ))
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-container">
                <select required value={value} onChange={handleOnChange}>
                    <option value="">Select your playlist</option>
                    {renderOption()}
                </select>
            </div>
            <div className="create-modal-button-wrapper">
                <Button text="Cancel" handleClick={handleCloseModal}  />
                <Button primary text="Add" type='submit' />
            </div>
        </form>
    )
}