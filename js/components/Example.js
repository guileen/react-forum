import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as ExampleActions from '../actions/ExampleActions'
import styles from '../../css/app.css'

class Example extends Component {
  render() {
    const {title, dispatch} = this.props
    const actions = bindActionCreators(ExampleActions, dispatch)
    return (
        <div>
          <h1 className={styles.text}>Welcome {title}!</h1>
          <button onClick={e => actions.changeTitle(prompt())}>
            Update Title
          </button>
        </div>
    )
  }
}
export default connect(state => state.Sample)(Example)
