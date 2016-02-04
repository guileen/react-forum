import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as headerActions } from '../redux/modules/header'
import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'

function handleTouchTap() {
  alert('onTouchTap triggered on the title component')
}

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
        onTitleTouchTap={handleTouchTap}
        />
        <LeftNav open={this.props.open}>
          <AppBar/>
          <MenuItem>Login</MenuItem>
        </LeftNav>
      </div>
    )
  }
}

export default connect(state => ({
  open: state.header
}), headerActions)(HeaderBar)
