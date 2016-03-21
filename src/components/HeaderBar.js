import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as headerActions } from '../redux/modules/header'
import { actions as userActions } from '../redux/modules/user'
import { Link } from 'react-router'

class HeaderBar extends React.Component {
  static propTypes = {
    loginUser: PropTypes.object,
    loadLoginUser: PropTypes.func
  };

  componentWillMount() {
    this.props.loginUser || this.props.loadLoginUser()
  }

  render() {
    let rightNav
    const {loginUser} = this.props
    if (loginUser && loginUser.fulfilled) {
      rightNav = (
        <ul className='nav navbar-nav navbar-right'>
          {/*
            <li className='active'><a href='#'>Home</a></li>
            <li><a href='#help'>Help</a></li>
          */}
          <li>
            <a href='#contact'>
              {loginUser.value.name}
              <img src={loginUser.value.avatarUrl} width='25' height='25'/>
              {/* <a href='/v1/auth/logout'>Logout</a> */}
            </a>
          </li>
        </ul>
      )
    } else {
      rightNav = (
        <ul className='nav navbar-nav navbar-right'>
          <li>
            <a href='/v1/auth/oauth2/github'>Github Login</a>
          </li>
        </ul>
      )
    }

    return (
      <nav className='navbar navbar-inverse navbar-fixed-top'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>

              <div className='navbar-header'>
                <button
                  type='button'
                  className='navbar-toggle collapsed'
                  data-toggle='collapse'
                  data-target='#navbar'
                  aria-expanded='false'
                  aria-controls='navbar'
                >
                  <span className='sr-only'>Toggle navigation</span>
                  <span className='icon-bar'></span>
                  <span className='icon-bar'></span>
                  <span className='icon-bar'></span>
                </button>
                <Link className='navbar-brand' to='/'>React Forum(dev)</Link>
              </div>
              <div id='navbar' className='collapse navbar-collapse'>
                {rightNav}
                <form className='navbar-form'>
                  <input type='text' className='form-control' placeholder='Search...'/>
                </form>
              </div>

            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default connect(state => ({
  open: state.header,
  loginUser: state.user.loginUser
}), Object.assign({}, headerActions, userActions))(HeaderBar)
