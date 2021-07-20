import '../../../styles/common/Input.css'

export default function Input({ placeholder, handleOnChange, inputClass }) {
    return (
        <input placeholder={placeholder} onChange={(e) => handleOnChange(e)} className={inputClass} />
    )
}