import React, {Component, PropTypes} from 'react'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardHeader from 'material-ui/lib/card/card-header'

class CommentCard extends Component {

  static propTypes = {
    comment: PropTypes.object.isRequired
  };

  render() {
    const {comment} = this.props
    return (
      <Card style={{marginTop: 20}}>
        <CardHeader
          title={comment.user.name}
          subtitle='xxxxx'
          avatar={comment.user.avatarUrl}
        />
        <CardText>
          {comment.text}
        </CardText>
      </Card>
    )
  }
}

export default CommentCard
