import './styles.scss'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { HashRouter as Router, Route, Link } from 'react-router-dom'

const demos = {
  main: require('./demo-main').default,

}

// A simple component that shows the pathname of the current location
class Menu extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  render() {
    let pathname = (this.props.location || {}).pathname

    if (!pathname || pathname === '/') {
      pathname = `/${Object.keys(demos)[0]}`
    }

    return (
      <div
        className={`demo-row${
          pathname.indexOf('sticky') >= 0 ? ' sticky' : ''
        }`}
      >
        Choose the demo:
        {Object.keys(demos).map(key => (
          <Link
            key={key}
            className={pathname === `/${key}` ? 'selected' : ''}
            to={`/${key}`}
          >
            {key}
          </Link>
        ))}
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <Router>
        <div>
        
          <div className="demo-demo">
            <Route path="/" exact component={demos[Object.keys(demos)[0]]} />
            {Object.keys(demos).map(key => (
              <Route key={key} path={`/${key}`} component={demos[key]} />
            ))}
          </div>
        </div>
      </Router>
    )
  }
}

export default App
