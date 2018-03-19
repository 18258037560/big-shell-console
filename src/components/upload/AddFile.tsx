import React, {Component} from 'react'
import Icon from 'antd/lib/icon'

import FileUpload from './FileUpload'

interface AddFileProps {
    accept?: string
    multiple?: boolean
    tip: string
    onFileUploadSuccess: (fileInfo: any) => void
}

class AddFile extends Component<AddFileProps> {
    onFileUploadSuccess = (fileInfo) => {
        this.props.onFileUploadSuccess(fileInfo)
    }

    render() {
        return (
            <FileUpload className="add-file" onFileUploadSuccess={this.onFileUploadSuccess} accept={this.props.accept} multiple={this.props.multiple}>
                <Icon type="plus" className="file-trigger"/>
                <div className="file-upload-tip">
                    {this.props.tip}
                </div>
            </FileUpload>
        )
    }
}

export default AddFile