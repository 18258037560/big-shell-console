import React, {Component, Children, PropTypes} from 'react'

import {connect} from 'react-redux'
import AppFunctionPage from '../../../core/interface/AppFunctionPage';
import Modal from 'app-core/modal'
import FullDialogContent from 'app-core/common/content/FullDialogContent'


class ToolButton extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

interface ImagePreViewProps {
  showEmptyText: boolean,
  showCloseButton: boolean
  url: string,
  onExited: () => void,
}

class ImagePreView extends React.Component<ImagePreViewProps> {
  _img: any
  static ToolButton = ToolButton
  state = {
    show: true,
    width: 0,
    angle: 0,
    showReset: false
  }

  close = () => {
    this.setState({show: false})
  }

  zoomIn = () => {
    this.setState({width: this.state.width * 1.2, showReset: true})
  }

  zoomOut = () => {
    this.setState({width: this.state.width * 0.8, showReset: true})
  }

  rotate = () => {
    this.setState({angle: this.state.angle + 90, showReset: true})
  }

  reset = () => {
    this.setState({width: this._img.naturalWidth, angle: 0, showReset: false})
  }

  componentDidMount() {
    if (this._img) {
      this._img.onload = () => {
        this.setState({width: this._img.naturalWidth, angle: 0, showReset: false})
      }
    }
  }

  render() {
    let toolButtons = [], contents = []
    Children.forEach(this.props.children, (child: any) => {
      if (!child) return
      if (child.type == ToolButton) {
        toolButtons.push(child)
      } else {
        contents.push(child)
      }
    })

    const imageStyle: any = {
      transform: 'rotate(' + this.state.angle + 'deg)'
    }
    if (this.state.width) {
      imageStyle.width = this.state.width
    }

    return (
      <Modal
        contentComponent={FullDialogContent}
        show={this.state.show}
        onHide={this.close}
        onExited={this.props.onExited}
      >
        <Modal.Header closeButton={true}></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            {
              !this.props.url && this.props.showEmptyText && (
                <div>暂无图片</div>
              )
            }
            {
              this.props.url && (
                <img ref={ c => this._img = c} src={this.props.url} style={imageStyle}/>
              )
            }
            {contents && contents}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="ngdialog-buttons">
            <div className="pull-left">
              {this.props.url && <input type="button" className="btn toolbar-btn" onClick={this.zoomIn} value="放大"/>}
              {this.props.url && <input type="button" className="btn toolbar-btn" onClick={this.zoomOut} value="缩小"/>}
              {this.props.url && <input type="button" className="btn toolbar-btn" onClick={this.rotate} value="旋转"/>}
              {this.state.showReset &&
              <input type="button" className="btn toolbar-btn reset" onClick={this.reset} value="还原"/>}
            </div>
            {toolButtons && toolButtons}
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ImagePreView

