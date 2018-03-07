import React, { Component } from 'react'
import { Provider } from 'react-redux'
import SearchFormContainer from './components/search-form'
import PersonalInfoContainer from './components/personal-info'
import Footer from './components/footer'

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div className="container">
          <SearchFormContainer />
          <PersonalInfoContainer />
          <Footer />
        </div>
      </Provider>
    )
  }
}

export default App
