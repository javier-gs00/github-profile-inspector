import { combineReducers } from 'redux'
import users from './user-reducer'

const profileInspector = combineReducers({
    users
})

export default profileInspector