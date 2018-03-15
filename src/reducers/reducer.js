import { combineReducers } from 'redux'
import users from './user-reducer'
import repos from './repos-reducer'

const profileInspector = combineReducers({
    users,
    repos
})

export default profileInspector