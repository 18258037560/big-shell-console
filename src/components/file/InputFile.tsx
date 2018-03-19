/**
 * Created by jiangyukun on 2017/5/10.
 */
import React from 'react'
import classnames from 'classnames'

let uid = 0

function getUid() {
  return '__upload__' + uid++
}

interface InputFileProps {
  className?: string
  accept?: string
  multiple?: boolean
  uploadFile: (files: File) => void
}

class InputFile extends React.Component<InputFileProps> {
  static defaultProps = {
    accept: '*',
    multiple: false
  }

  _file: HTMLInputElement

  state = {
    uid: getUid()
  }

  handleClick = () => {
    this._file.click()
  }

  onChange = (e) => {
    const files = e.target.files
    if (files) {
      if (this.props.multiple) {
        this.props.uploadFile(files)
      } else {
        this.props.uploadFile(files[0])
      }
    }
    this.setState({uid: getUid()})
  }

  render() {
    return (
      <span>
        <div className={classnames('upload', this.props.className)} onClick={this.handleClick}>
          <input
            ref={c => this._file = c}
            key={this.state.uid}
            type="file"
            accept={this.props.accept}
            multiple={this.props.multiple}
            style={{display: 'none'}}
            onChange={this.onChange}
          />
          {this.props.children}
        </div>
      </span>
    )
  }
}

export default InputFile
