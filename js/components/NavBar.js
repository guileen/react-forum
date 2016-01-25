import React, {Component} from 'react'
import {Link} from 'react-router'
import {AppBar, RaisedButton} from 'material-ui'

class NavBar extends Component {
  render() {
    return (
        <div>
          <AppBar title="Title" />
          <div>
            <Link to="/">Home</Link>
            <Link to="/example">Example</Link>
            <Link to="/about">About</Link>
            <Link to="/nomatch">NoMatch</Link>
          </div>
          <RaisedButton label="Github Login" linkButton={true} href="/auth/oauth2/github"/>
        </div>
    )
  }
}

export default NavBar
