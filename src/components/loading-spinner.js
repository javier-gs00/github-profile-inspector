import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class LoadingSpinner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingMessage: ''
        }
    }

    componentDidMount() {
        this.state.loadingMessage = setTimeout(() => this.setState({
            loadingMessage: 'A lot of repos on this account. It may take a while.'
        }), 5000)
    }

    componentWillUnmount() {
        clearTimeout(this.state.loadingMessage)
    }

    render() {
        const { loadingMessage } = this.state
        const { repositoriesMessage } = this.props
        return (
            <div className="loading">
                <FontAwesomeIcon icon="spinner" size="3x" spin />
                <span className="loading-message">{repositoriesMessage}</span>
                <span className="loading-message">{loadingMessage}</span>
            </div>
        )
    }
}

export default LoadingSpinner