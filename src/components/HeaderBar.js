import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as headerActions } from '../redux/modules/header'
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'

class HeaderBar extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    toggleNav: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <AppBar title='hello'
          onLeftIconButtonTouchTap={this.props.toggleNav}
        />
        <LeftNav open={this.props.open}>
          <AppBar
            style={{
              backgroundColor: '#666666'
            }}
            iconElementLeft={<IconButton onTouchTap={this.props.toggleNav}><NavigationClose /></IconButton>}
          />
          <MenuItem>Login</MenuItem>
        </LeftNav>
      </div>
    )
  }
}

export default connect(state => ({
  open: state.header
}), headerActions)(HeaderBar)
