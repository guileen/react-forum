import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { actions } from '../redux/modules/post'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardMedia from 'material-ui/lib/card/card-media'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'

class SimpleEditor extends React.Component {
  static propTypes = {
    newPost: PropTypes.object,
    requestAddNewPost: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.sendNewPost = this.sendNewPost.bind(this)
  }

  sendNewPost() {
    console.log(this.refs.textField.getValue())
    this.props.requestAddNewPost({text: this.refs.textField.getValue()})
  }

  render() {
    return (
      <Card style={{padding: '0 10px'}}>
        <CardMedia>
          <TextField
            ref='textField'
            hintText='Say somthing'
            floatingLabelText='Say somthing ...'
            multiLine={true}
            rows={1}
            rowsMax={10}
            disabled={this.props.newPost.pending}
            />
        </CardMedia>
        <CardActions style={{textAlign: 'right'}}>
          <RaisedButton
            label='Post'
            secondary={true}
            onTouchTap={this.sendNewPost}
            disabled={this.props.newPost.pending}
          />
        </CardActions>
      </Card>

    )
  }
}

export default connect(state => ({
  newPost: state.post.newPost
}), actions)(SimpleEditor)
