import React from 'react'
import { connect } from 'react-redux'
import LoadingSpinner from './loading-spinner'

const mapStateToProps = ({ users }) => ({
    isLoading: users.isLoading,
    avatarUrl: users.avatarUrl,
    username: users.username,
    realName: users.realName,
    location: users.location,
    htmlUrl: users.htmlUrl,
    publicRepositories: users.publicRepositories,
    followers: users.followers,
    following: users.following
})

const PersonalInfo = props => {
    console.log(typeof props.username)
    return (props.isLoading
        ? <LoadingSpinner />
        : props.username !== undefined
        ?
        <div className="info-container">
            <div className="personal-info-container">
                <div className="personal-info-image-container">
                    <img
                        src={props.avatarUrl}
                        alt=""></img>
                </div>
                <div className="personal-info-data-container">
                    <span>{props.username|| 'username'}</span>
                    <span>{props.realName || 'real name'}</span>
                    <span>{props.location || 'location'}</span>
                    <div className="personal-info-stats">
                        <div className="stats-block">
                            <span>{props.publicRepositories || 0}</span>
                            <span>Public Repos</span>
                        </div>
                        <div className="stats-block">
                            <span>{props.followers || 0}</span>
                            <span>Followers</span>
                        </div>
                        <div className="stats-block">
                            <span>{props.following || 0}</span>
                            <span>Following</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        : null
    )
}

const PersonalInfoContainer = connect(mapStateToProps)(PersonalInfo)

export default PersonalInfoContainer