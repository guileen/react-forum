import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import SimpleEditor from '../../components/SimpleEditor'
import PostList from '../../components/PostList'

export class MainView extends React.Component {
  static propTypes = {
    loginUser: PropTypes.object
  };

  render() {
    return (
      <div className='container'>
        <SimpleEditor/>
        <PostList src='/v1/post/'/>
      </div>
    )
  }
}
const actions = null
export default connect(state => ({
  loginUser: state.user.loginUser
}), actions)(MainView)
