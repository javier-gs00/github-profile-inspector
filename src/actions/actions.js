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
            return getAllRepositories(user, payload.public_repos)
        })
        .then(payload => {
            return getSubscribersCount(user, payload)
        })
        .then(payload => {
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

// Get all the repos from a user
function getAllRepositories(user, repositoriesCount) {
    return new Promise (resolve => {
        // Calculate the number of pages to fetch. Each fetch can get a maximum of 100 repos
        const pagesToFetch = Math.floor(repositoriesCount / 100) + 1
        let resolvedPromises = []
        // Make the request and hold them in an array
        for (let page = 1; page <= pagesToFetch; page++ ) {
            resolvedPromises.push(apiRequest(`users/${user}/repos?per_page=100&page=${page}`))
        }
        // Create a new array containing all the others
        Promise.all(resolvedPromises)
        .then(pages => resolve([].concat.apply([], pages)))
    })
}

// Get subscribers, formerly known as watchers, from a user repository
function getSubscribersCount (user, payload) {
    return new Promise (resolve => {
        // create an array containing the executed api request to get the subscribers
        let resolvedPromises = payload.map(repository => apiRequest(`repos/${user}/${repository.name}/subscribers?per_page=100`))
        // Resolve the promises
        Promise.all(resolvedPromises)
        .then(data => {
            let newPayload = []
            // iterate over the data length to create a new repositories containing their
            // subscribers count
            // data and payload length is the same
            for (let i = 0; i < data.length; i++) {
                const subscribersCount = data[i].length === 100 ? '100+' : data[i].length
                newPayload.push({ ...payload[i], subscribers_count: subscribersCount })
            }
            resolve(newPayload)
        })
    })
}