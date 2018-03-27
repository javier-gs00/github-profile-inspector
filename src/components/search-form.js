import React from 'react'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { fetchUser } from '../actions/actions'

const mapDispatchToProps = {
    fetchUser: fetchUser
}

const SearchForm = props => {
    const handleSubmit = e => {
        e.preventDefault()
        const query = document.getElementById('search-input').value
        props.fetchUser(query)
    }

    return (
        <div className="header-container">
            <div className="align-header-containers">
                <div className="appname-container">
                    <span>GitHub</span><span>Profile Inspector</span>
                </div>
                <div className="search-form-container">
                    <form 
                        onSubmit={handleSubmit}
                        className="search-form">
                        <input
                            id="search-input"
                            type="text"
                            name="search"
                            className="search-input"
                            placeholder="Who are you looking for?"/>
                        <button className="search-button">
                            <FontAwesomeIcon icon="search" />
                        </button>
                    </form>
                </div>
                <div className="header-options-container"></div>
            </div>
        </div>
    )
}

const SearchFormContainer = connect(null, mapDispatchToProps)(SearchForm)

export default SearchFormContainer