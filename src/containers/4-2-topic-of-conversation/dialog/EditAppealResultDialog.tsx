/**
 * Created by zhouhangshuai on 2018/3/9.
 */
import React from 'react'
import Modal from 'app-core/modal/Modal'
import {FlexDiv, Part, Line} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import TextArea from 'app-core/form/TextArea'

import Label from '../../../components/element/Label'

import {handleResults} from '../../3-1-questions-answers/qa-order.constant'

interface EditAppealResultDialogProps {
  onExited: () => void

  updateAppealResult: (appeal_result, appeal_remark) => void
}

class EditAppealResultDialog extends React.Component<EditAppealResultDialogProps> {
  state = {
    show: true,
    result: '',
    handleRemark: ''
  }

  close = () => {
    this.setState({show: false})
  }

  modifyAppealResult = () => {
    this.props.updateAppealResult(this.state.result, this.state.handleRemark)
  }

  render() {
    return (
      <Modal style={{width: '450px'}} show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        <Modal.Header closeButton={true}>
          <Modal.Title>修改申诉处理结果</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FlexDiv>
            <Label>处理结果</Label>
            <Part>
              <Select1 options={handleResults} value={this.state.result} onChange={v => this.setState({result: v})}/>
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Label>处理备注</Label>
            <Part>
              <TextArea
                rows={6}
                value={this.state.handleRemark} onChange={e => this.setState({handleRemark: e})}
              />
            </Part>
          </FlexDiv>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose onCancel={this.close} onConfirm={this.modifyAppealResult}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default EditAppealResultDialog