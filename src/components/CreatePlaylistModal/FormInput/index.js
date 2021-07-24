import { useContext } from 'react'
import { InputContext } from '..'
import '../../../styles/CreatePlaylistModal/Form.css'

export default function FormInput({ data }) {
    const context = useContext(InputContext)

    return (
        <div className="input-container">
            <label className="" htmlFor={data.id} placeholder={data.placeholder}>{data.textLabel}</label><br />
            {data.type === 'text-area' ?
                <textarea required={data.required} value={context.data[data.id]} onChange={(e) => context.handleChange(e)} id={data.id} name={data.id} className="" />
            :
                <input required={data.required} value={context.data[data.id]} onChange={(e) => context.handleChange(e)} id={data.id} name={data.id} type={data.type} />
            }
        </div>
    )
}