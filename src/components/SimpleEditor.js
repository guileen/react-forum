import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../redux/modules/post'
import { uploadQiniu } from '../apis/upload'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardMedia from 'material-ui/lib/card/card-media'
import Dropzone from 'react-dropzone'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'

class SimpleEditor extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    editor: PropTypes.object,
    newPost: PropTypes.object,
    setEditorText: PropTypes.func.isRequired,
    requestAddNewPost: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.onUploadTap = this.onUploadTap.bind(this)
    this.onPostTap = this.onPostTap.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.state = {
      files: []
    }
  }

  onUpload (files) {
    // set onprogress function before uploading
    files.map(function (f) {
      f.onprogress = function(e) {
        console.log(e.percent)
      }
    })
  }

  onDrop (files) {
    files.map(file => {
      uploadQiniu(file, key).then(json => {
        console.log('qiniu res:', json)
      })
    })
    this.setState({
      files: this.state.files.concat(files.map(file => ({
        preview: file.type.indexOf('image') >= 0 ? file.preview : 'http://xxx'
      })))
    }, () => console.log('state.files: ', this.state.files))
    // files is a FileList(https://developer.mozilla.org/en/docs/Web/API/FileList) Object
    // and with each file, we attached two functions to handle upload progress and result
    // file.request => return super-agent uploading file request
    // file.uploadPromise => return a Promise to handle uploading status(what you can do when upload failed)
    // `react-qiniu` using bluebird, check bluebird API https://github.com/petkaantonov/bluebird/blob/master/API.md
    // see more example in example/app.js
  }

  onChange() {
    this.props.setEditorText(this.refs.textField.getValue())
  }

  onUploadTap() {
    this.refs.dropzone.open()
  }

  onPostTap() {
    this.props.requestAddNewPost({text: this.refs.textField.getValue()})
  }

  getValue() {
    return this.props.editor.text
  }

  render() {
    console.log('render', this.state.files)
    const {editor, newPost} = this.props
    const previews = this.state.files.map(file => (<img src={file.preview} style={{width: 40, height: 40}}/>))
    return (
      <Dropzone
        ref='dropzone'
        onDrop={this.onDrop}
        style={{width: '100%'}}
        token={this.props.token || 'test'}
        onUpload={this.onUpload}
        activeStyle={{border: '2px dashed #0f0', margin: -2}}
        disableClick={true}
        accept='image/*,audio/*,video/*'
        >
        <Card style={{padding: '0 10px'}}>
          <CardMedia>
            <TextField
              ref='textField'
              hintText='Say somthing'
              // floatingLabelText='Say somthing ...'
              style={{width: '100%'}}
              multiLine={true}
              rows={1}
              rowsMax={10}
              value={editor.text}
              onChange={this.onChange}
              disabled={newPost.pending}
              />
            <div>{previews}</div>
          </CardMedia>
          <CardActions style={{textAlign: 'right'}}>
            <RaisedButton
              label='Upload'
              onTouchTap={this.onUploadTap}
              disabled={newPost.pending}
            />
            <RaisedButton
              label='Post'
              secondary={true}
              onTouchTap={this.onPostTap}
              disabled={newPost.pending}
            />
          </CardActions>
        </Card>
      </Dropzone>
    )
  }
}

export default connect(state => ({
  newPost: state.post.newPost,
  editor: state.post.editor
}), actionCreators)(SimpleEditor)
