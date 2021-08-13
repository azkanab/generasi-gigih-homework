import '../../../styles/common/Modal.css'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { HomeContext } from '../../../pages'
import Image from '../Image'
import Text from '../Text'
import Button from '../Button'

export default function NoNetworkModal() {
    const loaderContext = useContext(HomeContext)
    const history = useHistory()

    const layout = {
        imgUrl: '/failed.png',
        title: 'No internet connection',
        description: 'Please check your internet connection',
        handleClose: () => loaderContext.setShowNoNetworkModal(false),
        handleTryAgain: () => history.go(0)
    }

    return (
        <div className="modal">
            <div className="modal-content">
            <div style={{textAlign: 'center'}}>
                <Image imgUrl={layout.imgUrl} imgAlt="No Internet Connection" imgClass="success-img" />
                <Text text={layout.title} textClass="success-title-text" />
                <Text text={layout.description} textClass="success-info-text" />
                <div className="create-modal-button-wrapper">
                    <div className="left">
                        <Button text="Close" handleClick={layout.handleClose} />
                    </div>
                    <div className="right">
                        <Button primary text="Try again" handleClick={layout.handleTryAgain} />
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}