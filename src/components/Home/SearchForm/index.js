import Input from "../../common/Input"
import Button from "../../common/Button"
import '../../../styles/Home/Form.css'

export default function SearchForm({ handleChange, handleSubmit }) {
    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <Input placeholder="Search" handleOnChange={handleChange} inputClass="search-input" />
            <div className="button-container">
                <Button text="Search" type="submit" primary />
            </div>
        </form>
    )
}