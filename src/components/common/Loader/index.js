import '../../../styles/common/Loader.css'
import Text from '../Text'

export default function Loader() {
    return (
        <div className="loader-container">
            <div>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <Text text="Loading..." textClass="loading" />
            </div>
        </div>
    )
}