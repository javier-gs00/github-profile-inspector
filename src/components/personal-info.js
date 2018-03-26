import React from 'react'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import LoadingSpinner from './loading-spinner'
import Menu from './menu'
import RepositoriesList from './repos-list'

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
    return (props.isLoading
        ? <LoadingSpinner repositoriesMessage={""}/>
        : props.username === undefined
        ? null
        : props.username !== 'Not Found'
        ?
        <div className="info-container">
            <div className="personal-info-container">
                <div className="personal-info-image-container">
                    <img
                        src={props.avatarUrl}
                        alt=""></img>
                </div>
                <div className="personal-info-data-container">
                    <div className="personal-info-data">
                        <div><FontAwesomeIcon icon="user-circle" /></div>
                        <span>{props.username|| 'username'}</span>
                    </div>
                    <div className="personal-info-data">
                        <div><FontAwesomeIcon icon="map-marker-alt" /></div>
                        <span>{props.location || 'N/A'}</span>
                    </div>
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
            <Menu />
            <RepositoriesList />
        </div>
        :
        <div className="info-container">
            <span className="user-not-found">
                This user does not exists :S<br />Please try another one
            </span>
        </div>
    )
}

const PersonalInfoContainer = connect(mapStateToProps)(PersonalInfo)

export default PersonalInfoContainer