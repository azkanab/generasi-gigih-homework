import '../../../styles/common/Loader.css'
import Text from '../Text'

export default function Loader() {
    return (
        <div className="loader__container">
            <div>
                <div className="loader__roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <Text text="Loading..." textClass="loading" />
            </div>
        </div>
    )
}