/**
 * Created by jiangyukun on 2016/12/23.
 */
import React from 'react'
import InputFile from '../file/InputFile'

import {uploadFile} from './file-ajax'

interface FileUpload1Props {
  className?: string
  accept?: string
  multiple?: boolean
  beforeUpload?: (file: any) => boolean
  onStartUpload?: () => void
  onFileUploadSuccess: (fileInfo: any) => void
  onFileUploadFailure?: () => void
}

class FileUpload extends React.Component<FileUpload1Props> {
  static defaultProps = {
    accept: '*',
    multiple: false,
    beforeUpload: () => true,
    onStartUpload: () => null,
    onFileUploadFailure: () => null
  }

  uploadFileToServer = (file) => {
    if (!this.props.beforeUpload(file)) {
      return
    }
    this.props.onStartUpload()
    uploadFile(file, this.props.multiple).then(this.props.onFileUploadSuccess, this.props.onFileUploadFailure)
  }

  render() {
    return (
      <InputFile
        multiple={this.props.multiple}
        accept={this.props.accept}
        uploadFile={this.uploadFileToServer}
        className={this.props.className}
      >
        {this.props.children}
      </InputFile>
    )
  }
}

export default FileUpload
