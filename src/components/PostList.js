import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../redux/modules/post'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import PostCard from './PostCard'
import RefreshIndicator from 'material-ui/lib/refresh-indicator'

class PostList extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    requestDeletePost: PropTypes.func.isRequired,
    deletePostFetch: PropTypes.object,
    postsFetch: PropTypes.object,
    posts: PropTypes.array,
    fetchPosts: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.postsFetch || this.props.fetchPosts()
  }

  render() {
    const {postsFetch, posts} = this.props
    if (!postsFetch || postsFetch.pending) {
      return (
        <Card style={{textAlign: 'center'}}>
          <CardText>
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
          </CardText>
        </Card>
      )
    } else if (postsFetch.fulfilled) {
      const postCards = posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          deletePost={this.props.requestDeletePost}
        />))
      return <div>{postCards}</div>
    } else {
      return (
        <Card style={{textAlign: 'center'}}>
          <CardText>
            <RefreshIndicator
              size={40}
              left={0}
              top={0}
              percentage={80}
              color='red'
              status='ready'
              style={{
                display: 'inline-block',
                position: 'relative'
              }}
            />
          </CardText>
        </Card>
      )
    }
  }
}

export default connect(state => ({
  postsFetch: state.post.postsFetch,
  posts: state.post.posts
}), actionCreators)(PostList)
