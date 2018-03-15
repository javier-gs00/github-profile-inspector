import * as types from './action-types'

const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET

export const requestUser = () => ({
    type: types.REQUEST_USER
})

export const addUser = payload => ({
    type: types.ADD_USER,
    payload
})

export const fetchUser = user => {
    return function (dispatch) {
        dispatch(requestUser())
        return fetch(`https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(
            response => response.json(),
            error => console.log('An error ocurred while fetching the user: ', error)
        )
        .then(payload => {
            if (payload.message) return dispatch(addUser({
                ...payload,
                login: 'Not Found'
            }))
            dispatch(addUser(payload))
            dispatch(requestRepos())
            return fetch(`https://api.github.com/users/${user}/repos?client_id=${clientId}&client_secret=${clientSecret}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
        })
        .then(
            response => response.json(),
            error => console.log('An error ocurred while fetching this user repositories: ', error)
        )
        .then(payload => dispatch(addRepos(payload)))
    }
}

export const requestRepos = () => ({
    type: types.REQUEST_REPOS
})

export const addRepos = payload => ({
    type: types.ADD_REPOS,
    payload
})
