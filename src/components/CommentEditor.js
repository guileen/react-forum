import React, {PropTypes, Component} from 'react'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'

export default class CommentEditor extends Component {
  static propTypes = {
    value: PropTypes.any,
    disabled: PropTypes.boolean,
    onChange: PropTypes.func,
    onPost: PropTypes.func
  };

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onPost = this.onPost.bind(this)
    console.log('init props', props)
  }

  getInitialState() {
    return {
      value: ''
    }
  }

  onChange(e) {
    this.props.onChange && this.props.onChange(e)
  }

  onPost(e) {
    this.props.onPost && this.props.onPost(e)
  }

  getValue() {
    return this.refs.textField.getValue()
  }

  render() {
    console.log('editor value', this.props.value)
    const inputProps = this.props.value === undefined ? {} : {value: this.props.value}
    return (
      <div className='row'>
        <div className='col-md-8'>
          <TextField
            ref='textField'
            {...inputProps}
            hintText='Say somthing'
            floatingLabelText='Comment'
            onChange={this.onChange}
            disabled={this.props.disabled}
            />
        </div>
        <div className='col-md-4'>
          <FlatButton onTouchTap={this.onPost}>Send</FlatButton>
        </div>
      </div>
    )
  }
}
