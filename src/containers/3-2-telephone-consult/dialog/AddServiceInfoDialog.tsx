/**
 * Created by jiangyukun on 2017/11/13.
 */
import React from 'react'
import Modal from 'app-core/modal/Modal'
import {FlexDiv, Part, Line} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import TextArea from 'app-core/form/TextArea'
import DatePicker from 'antd/lib/date-picker'

import Label from '../../../components/element/Label'

import {filters} from '../telephone-consult.constant'
import {getDateStr} from '../../../core/utils/dateUtils'

interface AddServiceInfoDialogProps {
  onExited: () => void

  addServiceInfo: (reamark, status, time) => void
}

class AddServiceInfoDialog extends React.Component<AddServiceInfoDialogProps> {
  state = {
    show: true,
    status: '',
    time: null,
    handleRemark: ''
  }

  close = () => {
    this.setState({show: false})
  }

  addServiceInfo = () => {
    this.props.addServiceInfo(this.state.handleRemark, this.state.status, getDateStr(this.state.time))
  }

  render() {
    return (
      <Modal style={{width: '450px'}} show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        <Modal.Header closeButton={true}>
          <Modal.Title>添加服务信息</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FlexDiv>
            <Label>服务状态</Label>
            <Part>
              <Select1 options={filters.currentServiceStatus} value={this.state.status} onChange={v => this.setState({status: v})}/>
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Label>时间</Label>
            <Part>
              <DatePicker value={this.state.time} onChange={v => this.setState({time: v})}/>
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Label>服务备注</Label>
            <Part>
              <TextArea
                rows={6}
                value={this.state.handleRemark} onChange={e => this.setState({handleRemark: e})}
              />
            </Part>
          </FlexDiv>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose onCancel={this.close} onConfirm={this.addServiceInfo}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddServiceInfoDialog