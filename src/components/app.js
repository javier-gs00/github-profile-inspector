import React from 'react'
import '../style/style.less'
import logo from '../assets/img/logo.svg'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React-Less-Template</h1>
                </header>
                    <p className="App-intro">
                        To get started, edit <code>src/components/app.js</code> and save to reload.
                    </p>
                    <p className="App-intro">
                        Style, Logo and some webpack configuration taken from the Create React App team. Props to them for all their work.
                    </p>
            </div>
        )
    }
}

export default App