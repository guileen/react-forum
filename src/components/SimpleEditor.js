import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../redux/modules/post'
import { sendNewPost } from '../apis/post'
import { uploadQiniu } from '../apis/upload'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardMedia from 'material-ui/lib/card/card-media'
import Dropzone from 'react-dropzone'
import RaisedButton from 'material-ui/lib/raised-button'
import TextField from 'material-ui/lib/text-field'
import CircularProgress from 'material-ui/lib/circular-progress'

class SimpleEditor extends React.Component {
  static propTypes = {
    addNewPost: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.onUploadTap = this.onUploadTap.bind(this)
    this.onPostTap = this.onPostTap.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.state = {
      pending: false,
      text: '',
      fileIds: [],
      fileMap: {}
    }
  }

  onChange (e) {
    this.setState({
      ...this.state,
      text: e.target.value
    })
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
    // files is a FileList(https://developer.mozilla.org/en/docs/Web/API/FileList) Object
    // update state
    const newFilesMap = {}
    files.map(file => {
      newFilesMap[file.preview] = {
        preview: file.type.indexOf('image') >= 0 ? file.preview : 'http://xxx'
      }
    })
    this.setState({
      fileIds: this.state.fileIds.concat(files.map(file => file.preview)),
      fileMap: {
        ...this.state.fileMap,
        ...newFilesMap
      }
    }, () => console.log('state: ', this.state))

    // upload and update state
    var self = this
    files.map(file => {
      uploadQiniu(file).then(json => {
        self.setState({
          ...this.state,
          fileMap: {
            ...this.state.fileMap,
            [file.preview]: {
              ...this.state.fileMap[file.preview],
              key: json.key,
              bucket: json.bucket,
              done: true
            }
          }
        })
      })
    })
  }

  onUploadTap() {
    this.refs.dropzone.open()
  }

  onPostTap() {
    var postBody = {
      text: this.refs.textField.getValue(),
      files: this.state.fileIds.map(id => ({
        key: this.state.fileMap[id].key,
        bucket: this.state.fileMap[id].bucket
      }))
    }
    const self = this
    sendNewPost(postBody).then((data) => {
      self.setState({
        text: '',
        fileIds: [],
        fileMap: {}
      })
      self.props.addNewPost(data)
    })
  }

  render() {
    const {fileIds, fileMap} = this.state
    const previews = fileIds.map(id => {
      const file = fileMap[id]
      return (
        <div>
          <img src={file.preview} style={{width: 40, height: 40}}/>
          {file.done ? '' : <CircularProgress />}
        </div>
      )
    })
    return (
      <Dropzone
        ref='dropzone'
        onDrop={this.onDrop}
        style={{width: '100%'}}
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
              style={{width: '100%'}}
              multiLine={true}
              rows={1}
              rowsMax={10}
              value={this.state.text}
              onChange={this.onChange}
              disabled={this.state.pending}
              />
            <div>{previews}</div>
          </CardMedia>
          <CardActions style={{textAlign: 'right'}}>
            <RaisedButton
              label='Upload'
              onTouchTap={this.onUploadTap}
              disabled={this.state.pending}
            />
            <RaisedButton
              label='Post'
              secondary={true}
              onTouchTap={this.onPostTap}
              disabled={this.state.pending}
            />
          </CardActions>
        </Card>
      </Dropzone>
    )
  }
}

export default connect(state => ({}), actionCreators)(SimpleEditor)
