import React from 'react'
import { connect } from 'react-redux'
import LoadingSpinner from './loading-spinner'

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
                <span>{repo.stargazers_count}</span>
                <span>{repo.watchers_count}</span>
                <span>{repo.updated_at}</span>
            </div>
        </li>
        )
    )

    return (props.isLoading
        ? <LoadingSpinner />
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