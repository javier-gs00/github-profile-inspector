import React from 'react'
import { connect } from 'react-redux'
import LoadingSpinner from './loading-spinner'
import RepositoriesList from './repos-list'

const mapStateToProps = ({ repos }) => ({
    isLoading: repos.isLoading
})

const Menu = props => {
    window.addEventListener('resize', setUnderline)

    function setUnderline (e) {
        const menuOptionsRepo = document.getElementById('menu-options-repos')
        const menuOptionsActivity = document.getElementById('menu-options-activity')
        const width = menuOptionsRepo.offsetWidth
        // Get the user input or select the active class in case of
        // window resize
        const clickedTag = e.target.id || document.getElementsByClassName('active-menu-option')[0].id
        const clickedElement = document.getElementById(clickedTag)
        const underlinePosition = document.getElementsByClassName('underline-selection')[0]
        
        switch(clickedTag) {
          case "menu-options-repos":
            document.getElementById('menu-options-activity').classList.remove('active-menu-option')
            clickedElement.classList.add('active-menu-option')
            return underlinePosition.style.marginLeft = '0px'
          case "menu-options-activity":
            document.getElementById('menu-options-repos').classList.remove('active-menu-option')
            clickedElement.classList.add('active-menu-option')
            return underlinePosition.style.marginLeft =  width + 'px'
          default:
            return;
        }
    }

    function collapseLeft () {
        // const repositories = document.getElementsByClassName('repositories-container')[0]
        // const width = repositories.offsetWidth
        // repositories.style.marginRight = width + "px"
    }

    function collapseRight () {
        // const repositories = document.getElementsByClassName('repositories-container')[0]
        // repositories.style.marginRight = "0"
    }

    return (
        props.isLoading
        ? <LoadingSpinner repositoriesMessage={"Fetching Repos Data"}/>
        :
        <React.Fragment>
            <div className="menu-container">
                <div className="underline-menu-container">
                    <div className="underline-selection"></div>
                </div>
                <ul>
                    <li onClick={collapseRight}>
                        <span onClick={setUnderline} id="menu-options-repos"
                            className="active-menu-option">
                            Repos
                        </span>
                    </li>
                    <li onClick={collapseLeft}>
                        <span onClick={setUnderline} id="menu-options-activity">
                            Activity
                        </span>
                    </li>
                </ul>
            </div>
            <RepositoriesList />
        </React.Fragment>
    )
}

const MenuContainer = connect(mapStateToProps)(Menu)

export default MenuContainer