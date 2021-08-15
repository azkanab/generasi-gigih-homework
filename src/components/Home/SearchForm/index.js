import Input from "../../common/Input"
import Button from "../../common/Button"
import '../../../styles/Home/SearchForm.css'

export default function SearchForm({ handleChange, handleSubmit }) {
    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <Input placeholder="Search" handleOnChange={handleChange} inputClass="search-form__input" />
            <div className="search-form__button-container">
                <Button text="Search" type="submit" primary />
            </div>
        </form>
    )
}