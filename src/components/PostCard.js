import React, {Component, PropTypes} from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardHeader from 'material-ui/lib/card/card-header'

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
      </Card>
    )
  }
}

export default PostCard
