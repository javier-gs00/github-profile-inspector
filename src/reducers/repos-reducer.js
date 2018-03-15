import { ADD_REPOS, REQUEST_REPOS } from '../actions/action-types'

const initialState = {
    isLoading: false,
    repos: []
}

const repos = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_REPOS:
            return {
                ...state,
                isLoading: true
            }
        case ADD_REPOS:
            console.log(action)
            return {
                ...state,
                isLoading: false,
                repos: action.payload.map(repo => ({
                    id: repo.id,
                    name: repo.name,
                    archived: repo.archived,
                    created_at: repo.created_at,
                    description: repo.description,
                    forks_count: repo.forks_count,
                    language: repo.language,
                    languages_url: repo.languages_url,
                    stargazers_count: repo.stargazers_count,
                    updated_at: repo.updated_at,
                    watchers_count: 0
                }))
            }
        default:
            return state
    }
}

export default repos