import React from 'react'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
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
    following: users.following,
    bio: users.bio
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
                    <span>
                        <FontAwesomeIcon icon="user-circle" />
                        {props.username|| 'username'}
                    </span>
                    <span>
                        <FontAwesomeIcon icon="map-marker-alt" />
                        {props.location || 'location'}
                    </span>
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
            <div className="personal-bio">
                <p>{props.realName || 'real name'}</p>
                <p>{props.bio}</p>
            </div>
        </div>
        : null
    )
}

const PersonalInfoContainer = connect(mapStateToProps)(PersonalInfo)

export default PersonalInfoContainer