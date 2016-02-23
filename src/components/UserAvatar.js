import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {actions} from '../redux/modules/user'

class UserAvatar extends React.Component {
  static propTypes = {
    loginUser: PropTypes.object,
    loadLoginUser: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.loginUser || this.props.loadLoginUser()
  }

  render() {
    if (!this.props.loginUser) {
      return (<p>Loading....</p>)
    }
    if (this.props.loginUser.success === false) {
      return (<p>Error {JSON.stringify(this.props.loginUser.data)}</p>)
    }
    return (
      <div>
        <p>{this.props.loginUser.data.name}</p>
        <img src={this.props.loginUser.data.avatarUrl} width='50' height='50'/>
      </div>
    )
  }
}

export default connect(state => ({
  loginUser: state.user.loginUser
}), actions)(UserAvatar)
