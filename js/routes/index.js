import React from 'react'
import Home from '../components/Home'
import NoMatch from '../components/NoMatch'
import About from '../components/About'
import Example from '../components/Example'
import {Router, Route, browserHistory} from 'react-router'

export default (
    <Router history={browserHistory}>
      <Route path="/" component={Home}>
        <Route path="example" component={Example}/>
        <Route path="about" component={About}/>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
)
