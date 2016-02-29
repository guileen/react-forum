import React, {Component, PropTypes} from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'

class PostCard extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired
  };

  render() {
    const {post} = this.props
    return (
      <Card>
        <CardTitle>
          {post.userId}
        </CardTitle>
        <CardText>
          {post.text}
        </CardText>
        <CardMedia>
        </CardMedia>
      </Card>
    )
  }
}

export default PostCard
