import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import NavBar from './NavBar'

class Home extends Component {

  render() {
    return (
      <main>
        <Link to="/">Home</Link>
        <Link to="/example">Example</Link>
        <Link to="/about">About</Link>
        <Link to="/nomatch">NoMatch</Link>
        <NavBar/>


        {/* details */}
        {this.props.children}

      </main>
    )
  }
}

export default connect(state => state.Sample)(Home)
