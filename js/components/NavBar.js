import React, {Component} from 'react'
import {Link} from 'react-router'

import AppBar from 'material-ui/lib/app-bar'
import RaisedButton from 'material-ui/lib/raised-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'

class NavBar extends Component {
  render() {
    const btnLeft = <IconButton><NavigationClose /></IconButton>
    return (
        <div>
          <AppBar
            title="Title"
            iconElementLeft={btnLeft}
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon/></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Profile"/>
                <MenuItem primaryText="Help"/>
                <MenuItem primaryText="Sign out"/>
              </IconMenu>
            }
          />
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
