import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {actionCreators} from 'redux/modules/post'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardHeader from 'material-ui/lib/card/card-header'
import CardAction from 'material-ui/lib/card/card-actions'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import Delete from 'material-ui/lib/svg-icons/action/delete'
import ContentLink from 'material-ui/lib/svg-icons/content/link'
import FlatButton from 'material-ui/lib/flat-button'

class PostCard extends Component {

  static propTypes = {
    loginUser: PropTypes.object,
    requestDeletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
  }

  onDelete() {
    this.props.requestDeletePost(this.props.post.id)
  }

  render() {
    const {post, loginUser} = this.props
    console.log('post', post)
    console.log('loginUser', loginUser)
    const menu = (
      <IconMenu
        style={{float: 'right'}}
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText='Get links' leftIcon={<ContentLink />} />
        {loginUser && Number(post.userId) === loginUser.id
          ? <MenuItem primaryText='Delete' leftIcon={<Delete />} onTouchTap={this.onDelete}/>
          : ''}
      </IconMenu>
    )

    return (
      <Card style={{marginTop: 20}}>
        <CardHeader
          title={post.user.name}
          subtitle='xxxxx'
          avatar={post.user.avatarUrl}
          children={menu}
        />
        <CardText>
          {post.text}
        </CardText>
        <CardAction>
          {/* <FlatButton label='+1' /> */}
          <Link to={`/post/${post.id}`}>
            <FlatButton
              label='comment'
              />
          </Link>
        </CardAction>
      </Card>
    )
  }
}

export default connect(state => ({
  loginUser: state.user.loginUser && state.user.loginUser.value
}), actionCreators)(PostCard)
