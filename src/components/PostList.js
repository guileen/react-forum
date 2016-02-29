import React, {Component, PropTypes} from 'react'
import { actions } from '../redux/modules/post'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import PostCard from './PostCard'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'

import { connect, PromiseState } from 'react-refetch'

class PostList extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    listFetch: PropTypes.instanceOf(PromiseState).isRequired
  };

  componentWillMount() {
    console.log('props', this.props)
  }

  render() {
    const {listFetch} = this.props
    if (listFetch.pending) {
      return (
        <Card style={{textAlign: 'center'}}>
          <RefreshIndicator
            size={40}
            left={0}
            top={0}
            status='loading'
            style={{
              display: 'inline-block',
              position: 'relative'
            }}
          />
        </Card>
      )
    } else if (listFetch.fulfilled) {
      const postCards = listFetch.value.map(post => <PostCard post={post}/>)
      return <div>{postCards}</div>
    } else {
      return (
        <Card style={{textAlign: 'center'}}>
          <RefreshIndicator
            size={40}
            left={0}
            top={0}
            status='ready'
            style={{
              display: 'inline-block',
              position: 'relative'
            }}
          />
        </Card>
      )
    }
  }
}

export default connect(props => ({
  listFetch: `${props.src}`
}))(PostList)
