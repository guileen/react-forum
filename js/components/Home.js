import React, {Component} from 'react'
import {connect} from 'react-redux'
import NavBar from './NavBar'

class Home extends Component {

  render() {
    return (
      <div>
        <NavBar/>

        {/* details */}
        {this.props.children}

      </div>
    )
  }
}

export default connect(state => state.Sample)(Home)
