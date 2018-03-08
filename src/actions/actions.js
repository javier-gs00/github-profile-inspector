import * as types from './action-types'

const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET

export const requestUser = user => ({
    type: types.REQUEST_USER,
    user
})

export const addUser = payload => ({
    type: types.ADD_USER,
    payload
})

export const fetchUser = user => {
    return function (dispatch) {
        dispatch(requestUser(user))
        return fetch(`https://api.github.com/users/${user}?client_id=${clientId}&client_secret=${clientSecret}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(
            response => response.json(),
            error => console.log('An error ocurred: ', error)
        )
        .then(json => dispatch(addUser(json)))
    }
}

