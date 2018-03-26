import React from 'react'
import { connect } from 'react-redux'
import LoadingSpinner from './loading-spinner'
import Stargazer from '../assets/img/stargazer'
import Watchers from '../assets/img/watchers'

const mapStateToProps = ({ repos }) => ({
    isLoading: repos.isLoading,
    repos: repos.repos
})

const RepositoriesList = props => {
    const repositories = props.repos.map(repo => (
        <li key={repo.id}>
            <div>
                <span>{repo.name}</span>
                <span>{repo.language}</span>
            </div>
            <div>
                <Stargazer />
                <span>{repo.stargazers_count}</span>
                <Watchers />
                <span>{repo.watchers_count}</span>
                <span>updated: {parseDate(repo.updated_at)}</span>
            </div>
        </li>
        )
    )

    return (props.isLoading
        ? <LoadingSpinner repositoriesMessage={"Fetching Repos Data"}/>
        :
        <div className="repositories-container">
            <ul>
                { repositories }
            </ul>
        </div>
    )
}

const RepositoriesListContainer = connect(mapStateToProps)(RepositoriesList)

export default RepositoriesListContainer

function parseDate (date) {
    return date.slice(0, date.indexOf('T'))
}