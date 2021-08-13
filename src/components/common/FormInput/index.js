import { useContext} from 'react'
import { CreateModalContext } from '../../CreatePlaylistModal'
import { CreatePageContext } from '../../../pages/CreatePlaylist'
import '../../../styles/common/FormInput.css'

export default function FormInput({ type, data }) {
    const modalContext = useContext(CreateModalContext)
    const pageContext = useContext(CreatePageContext)

    return (
        <div className={type === 'modal' ? "input-container" : "input-pages-container"}>
            <label className="" htmlFor={data.id}>{data.textLabel}</label><br />
            {data.type === 'text-area' ?
                <textarea required={data.required} placeholder={data.placeholder} value={type === 'pages' ? pageContext.data[data.id] : modalContext.data[data.id]} onChange={(e) => type === 'pages' ? pageContext.handleChange(e) : modalContext.handleChange(e)} id={data.id} name={data.id} className="" />
            :
                <input required={data.required} placeholder={data.placeholder} value={type === 'pages' ? pageContext.data[data.id] : modalContext.data[data.id]} onChange={(e) => type === 'pages' ? pageContext.handleChange(e) : modalContext.handleChange(e)} id={data.id} name={data.id} type={data.type} />
            }
            <p style={{color: 'red'}}>{pageContext.errorMessage[data.id]}</p>
        </div>
    )
}