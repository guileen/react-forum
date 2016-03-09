import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardHeader from 'material-ui/lib/card/card-header'
import CardAction from 'material-ui/lib/card/card-actions'

import FlatButton from 'material-ui/lib/flat-button'

class PostCard extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired
  };

  render() {
    const {post} = this.props
    return (
      <Card style={{marginTop: 20}}>
        <CardHeader
          title={post.user.name}
          subtitle='xxxxx'
          avatar={post.user.avatarUrl}
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

export default PostCard
