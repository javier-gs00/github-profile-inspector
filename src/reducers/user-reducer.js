import {  ADD_USER, REQUEST_USER } from '../actions/action-types';

const initialState = {
    isLoading: false,
    username: undefined,
    realName: '',
    avatarUrl: '',
    location: 'Somewhere in the world :S',
    htmlUrl: '',
    publicRepositories: '',
    followers: '',
    following: '',
    bio: ''
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_USER:
            return {
                ...state,
                isLoading: true
            }
        case ADD_USER:
            // console.log(action)
            return {
                ...state,
                isLoading: false,
                username: action.payload.login,
                realName: action.payload.name,
                avatarUrl: action.payload.avatar_url,
                location: action.payload.location,
                htmlUrl: action.payload.html_url,
                publicRepositories: action.payload.public_repos,
                followers: action.payload.followers,
                following: action.payload.following,
                bio: action.payload.bio
            }
        default:
            return state
    }
}

export default users