import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../../redux/modules/post'
import { actionCreators as commentActionCreators } from '../../redux/modules/comment'
import { Link } from 'react-router'
import CommentCard from 'components/CommentCard'
import CommentEditor from 'components/CommentEditor'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardMedia from 'material-ui/lib/card/card-media'
import CardHeader from 'material-ui/lib/card/card-header'

export class PostDetailView extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    fetchPost: PropTypes.func.isRequired,
    fetchPostComments: PropTypes.func.isRequired,
    requestAddComment: PropTypes.func.isRequired,
    setCommentEditorText: PropTypes.func.isRequired,
    postId: PropTypes.string,
    postFetch: PropTypes.object,
    commentsFetch: PropTypes.object,
    addCommentFetch: PropTypes.object,
    commentEditorText: PropTypes.any,
    post: PropTypes.object,
    comments: PropTypes.array
  };

  constructor(props) {
    super(props)
    this.onCommentEditorChange = this.onCommentEditorChange.bind(this)
    this.onPostCommentTap = this.onPostCommentTap.bind(this)
  }

  onCommentEditorChange() {
    this.props.setCommentEditorText(this.refs.commentEditor.getValue())
  }

  onPostCommentTap() {
    this.props.requestAddComment({
      text: this.refs.commentEditor.getValue(),
      postId: this.props.post.id
    })
  }

  componentWillMount() {
    const postId = this.props.params.postId
    this.props.fetchPost(postId)
    this.props.fetchPostComments(postId)
  }

  render() {
    const {postFetch, commentsFetch, post, comments, addCommentFetch, commentEditorText} = this.props
    if (!postFetch || !commentsFetch || postFetch.pending || commentsFetch.pending) {
      return <span>Loading...</span>
    }
    if (postFetch.rejected || commentsFetch.rejected) {
      return <span>Error... </span>
    }
    const commentsView = comments.map(comment => (
      <CommentCard comment={comment}/>
      // <ListItem primaryText={comment.text} leftAvatar={<Avatar src={comment.user.avatarUrl} />} />
    ))
    const medias = post.files ? post.files.map(file => (
      <CardMedia key={file.url}>
        <img src={file.url}/>
      </CardMedia>
    )) : ''

    return (
      <div className='container'>
        <Link to='/'>Back</Link>
        <div className='row'>
          <div className='col-md-6'>
            <h3>评论</h3>
            <CommentEditor
              ref='commentEditor'
              value={commentEditorText}
              onChange={this.onCommentEditorChange}
              onPost={this.onPostCommentTap}
              disabled={addCommentFetch && addCommentFetch.pending}
              />
            {commentsView}
          </div>
          <div className='col-md-6'>
            <h3>全文</h3>
            <Card style={{marginTop: 20}}>
              <CardHeader
                title={post.user.name}
                subtitle='xxxxx'
                avatar={post.user.avatarUrl}
              />
              <CardText>
                {post.text}
              </CardText>
              {medias}
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  ...state.post,
  ...state.comment
}), Object.assign({}, actionCreators, commentActionCreators))(PostDetailView)
