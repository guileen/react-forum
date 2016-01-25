import React, {Component} from 'react'
import Link from 'react-router'

class NoMatch extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        No match resource found.
      </div>
    )
  }
}

export default NoMatch
