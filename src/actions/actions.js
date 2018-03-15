import * as types from './action-types'

export const requestUser = () => ({
    type: types.REQUEST_USER
})

export const addUser = payload => ({
    type: types.ADD_USER,
    payload
})

export const fetchUser = user => {
    return function (dispatch) {
        let userRepositories = []
        dispatch(requestUser())
        return apiRequest(`users/${user}`)
        .then(payload => {
            if (payload.message) return dispatch(addUser({
                ...payload,
                login: 'Not Found'
            }))
            dispatch(addUser(payload))
            dispatch(requestRepos())
            return apiRequest(`users/${user}/repos`)
        })
        .then(payload => {
            // payload.map(repository => {
            //     getSubscribersCount(repository.url).then(count => console.log(count))
            // })
            dispatch(addRepos(payload))
            return apiRequest('rate_limit')
        })
        .then(payload => {
            console.log(` Request left in this hour: ${payload.resources.core.remaining}`)
        })
    }
}

export const requestRepos = () => ({
    type: types.REQUEST_REPOS
})

export const addRepos = payload => ({
    type: types.ADD_REPOS,
    payload
})

function apiRequest (path) {
    return new Promise((resolve, reject) => {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `token ${process.env.REACT_APP_GITHUB_OAUTH_TOKEN}`
        })

        const fetchOptions = {
            headers: headers,
            method: 'GET'
        }

        fetch(`https://api.github.com/${path}`, fetchOptions)
        .then(
            response => resolve(response.json()),
            error => reject(error)
        )
    })
}

// Consumes rate limits too fast
// function getSubscribersCount (endpoint) {
//     return new Promise (resolve => {
//         fetch(`${endpoint}/subscribers?client_id=${clientId}&client_secret=${clientSecret}`, {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' }  
//         })
//         .then(response => response.json())
//         .then(subscribers => resolve(subscribers.length))
//     })
// }