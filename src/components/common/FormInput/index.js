import { useContext} from 'react'
import { CreateModalContext } from '../../CreatePlaylistModal'
import { CreatePageContext } from '../../../pages/CreatePlaylist'
import '../../../styles/common/FormInput.css'
import { isModal, isPage } from '../../../utils/componentType'

const inputType = {
    textArea: 'text-area',
    input: 'input'
}

export default function FormInput({ type, data }) {
    const modalContext = useContext(CreateModalContext)
    const pageContext = useContext(CreatePageContext)

    const isTextArea = () => {
        return data.type === inputType.textArea
    }

    return (
        <div className={isModal(type) ? "form-input__container" : "form-input__page-container"}>
            <label className="" htmlFor={data.id}>{data.textLabel}</label><br />
            {isTextArea() ?
                <textarea required={data.required} placeholder={data.placeholder} value={isPage(type) ? pageContext.data[data.id] : modalContext.data[data.id]} onChange={(e) => isPage(type) ? pageContext.handleChange(e) : modalContext.handleChange(e)} id={data.id} name={data.id} />
            :
                <input required={data.required} placeholder={data.placeholder} value={isPage(type) ? pageContext.data[data.id] : modalContext.data[data.id]} onChange={(e) => isPage(type) ? pageContext.handleChange(e) : modalContext.handleChange(e)} id={data.id} name={data.id} type={data.type} />
            }
            <p style={{color: 'red'}}>{pageContext.errorMessage[data.id]}</p>
        </div>
    )
}