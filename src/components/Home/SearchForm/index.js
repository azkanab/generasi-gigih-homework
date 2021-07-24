import Input from "../../common/Input"
import Button from "../../common/Button"
import '../../../styles/Home/Form.css'

export default function SearchForm({ handleChange, handleClick }) {
    return (
        <div className="form-container">
            <Input placeholder="Search" handleOnChange={handleChange} inputClass="search-input" />
            <div className="button-container">
                <Button text="Search" handleClick={handleClick} primary />
            </div>
        </div>
    )
}