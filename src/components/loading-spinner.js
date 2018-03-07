import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const LoadingSpinner = () => (
    <div className="loading">
        <FontAwesomeIcon icon="spinner" size="3x" spin />
    </div>
)

export default LoadingSpinner