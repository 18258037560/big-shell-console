/**
 * Created by jiangyukun on 2017/11/24.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import {FlexDiv, Part, Line} from 'app-core/layout'
import Input from 'app-core/form/Input'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import ImagePreView from './ImagePreView'

import Label from '../../../components/element/Label'

import {ReducerType} from '../../../reducers/index'
import ValueText from '../../../core/interface/ValueText'
import Data from '../../../core/interface/Data'
import {DoctorAuditItem} from '../interface/DoctorAudit'
import {fetchHospitalList} from '../../app.action'
import {updateDoctor, fetchPositionList} from '../doctor-audit.action'
import Button from '../../../components/button/Button'
import {getCheckStatus} from '../../common/common-helper'

interface UpdateDoctorDialogProps {
  doctor: DoctorAuditItem
  fetchHospitalList: () => void
  hospitalList: Data<ValueText[]>
  fetchPositionList: () => void
  positionList: Data<ValueText[]>

  updateDoctor: (options) => void
  updateDoctorSuccess: boolean

  preViewImage: (url) => void

  onExited: () => void
}

class UpdateDoctorDialog extends React.Component<UpdateDoctorDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,
    showImagePreView: false,
    imageUrl: '',

    doctorName: '',
    hospitalId: '',
    positionId: '',
    codeNumber: '',
    speciality: '',
    remark: '',
    id: '',
    auditStatus: ''
  }

  close = () => {
    this.setState({show: false})
  }

  updateDoctor = () => {

    let options = {
      'check_status': this.state.auditStatus,
      'doctor_info_id': this.state.id,
      'doctor_name': this.state.doctorName,
      'doctor_specialty': this.state.speciality,
      'doctor_title_id': this.state.positionId,
      'hospital_id': this.state.hospitalId
    }
    this.props.updateDoctor(options)
  }

  preViewImage = (url) => {
    this.setState({imageUrl: url})
  }

  componentWillMount() {
    const {doctorName, hospitalId, positionId, remark, codeNumber, speciality, id} = this.props.doctor
    this.setState({
      doctorName, hospitalId, positionId, remark, codeNumber, speciality, id,
      auditStatus: getCheckStatus(this.props.doctor.auditStatus)
    })

  }

  componentDidMount() {
    if (!this.props.positionList.loaded) {
      this.props.fetchPositionList()
    }
    if (!this.props.hospitalList.loaded) {
      this.props.fetchHospitalList()
    }
  }

  componentWillReceiveProps(nextProps: UpdateDoctorDialogProps) {
    if (!this.props.updateDoctorSuccess && nextProps.updateDoctorSuccess) {
      this.close()
    }
  }

  render() {
    const doctor = this.props.doctor
    return (
      <Modal className="update-doctor-dialog" show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="确定更新医生信息吗？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={this.updateDoctor}/>
          )
        }
        {
          this.state.showImagePreView && (
            <ImagePreView
              url={this.state.imageUrl}
              showEmptyText={true}
              showCloseButton={true}
              onExited={() => this.setState({showImagePreView: false})}/>)
        }
        <Modal.Header closeButton={true}>
          <Modal.Title>{doctor.doctorName} - {doctor.hospital}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FlexDiv>
            <Part><Label>医生姓名</Label></Part>
            <Part weight={2}>
              <Input value={this.state.doctorName} onChange={v => this.setState({doctorName: v})}/>
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Part><Label>医院</Label></Part>
            <Part weight={2}>
              <Select1 options={this.props.hospitalList.data || []}
                       value={this.state.hospitalId} onChange={v => this.setState({hospitalId: v})}
              />
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Part><Label>职称</Label></Part>
            <Part weight={2}>
              <Select1 options={this.props.positionList.data || []}
                       value={this.state.positionId} onChange={v => this.setState({positionId: v})}
              />
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Part><Label>执业证编号</Label></Part>
            <Part weight={2}>
              {doctor.codeNumber}
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Part><Label>专长</Label></Part>
            <Part weight={2}>
              {doctor.speciality}
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Part><Label>创建时间</Label></Part>
            <Part weight={2}>
              {doctor.createDateTime}
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Part><Label>上次修改时间</Label></Part>
            <Part weight={2}>

            </Part>
          </FlexDiv>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <div className="flex between button-container">
              <Button onClick={() => this.setState({imageUrl: this.props.doctor.pictureUrl, showImagePreView: true})}>查看头像</Button>
              <Button onClick={() => this.setState({imageUrl: this.props.doctor.codeNumber, showImagePreView: true})}>持牌照片</Button>
              <Button onClick={() => this.setState({showAddConfirm: true})}>保存修改</Button>
            </div>
            <div className="mt10 flex between button-container">
              <Button onClick={() => this.setState({showAddConfirm: true, auditStatus: '1'})}>标为未审核</Button>
              <Button onClick={() => this.setState({showAddConfirm: true, auditStatus: '2'})}>标为不通过</Button>
              <Button onClick={() => this.setState({showAddConfirm: true, auditStatus: '3'})}>标为已审核</Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state: ReducerType) {
  return {
    positionList: state.positionList,
    hospitalList: state.hospitalList,
    updateDoctorSuccess: state.doctorAudit.updateDoctorSuccess
  }
}

export default connect(mapStateToProps, {fetchHospitalList, fetchPositionList, updateDoctor})(UpdateDoctorDialog)
