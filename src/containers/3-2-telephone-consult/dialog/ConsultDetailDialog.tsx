/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import {connect} from 'react-redux'

import Modal from 'app-core/modal/Modal'
import Confirm from 'app-core/common/Confirm'

import ConsultBasicInfo from './part/ConsultBasicInfo'
import RateInfo from '../../3-1-questions-answers/dialog/part/RateInfo'
import PaymentInfo from './part/PaymentInfo'
import UserAppeal from '../../3-1-questions-answers/dialog/part/UserAppeal'
import Other from './part/Other'

import Data from '../../../core/interface/Data'
import {
  fetchConsultDetail,
  updateRemark,
  updateIsHideState,
  updateAppealResult,
  addServiceInfo,
  deleteServiceInfo,
  refundMoney
} from '../telephone-consult.action'
import ServiceInfo from './part/ServiceInfo'
import TwoSidesCall from './part/TwoSidesCall'

interface OrderDetailDialogProps {
  consultId: string
  order_time: string
  pay_time: string
  pay_money: string
  fetchConsultDetail: (orderCode) => void
  telephoneConsultDetail: Data<any>
  onExited: () => void

  updateRemark: (orderCode, remark) => void
  updateRemarkSuccess: boolean

  updateIsHideState: (orderCode) => void
  updateIsHideSuccess: boolean

  updateAppealResult: (orderCode, appeal_result, appeal_remark) => void
  updateAppealResultSuccess: boolean

  addServiceInfo: (options) => void
  deleteServiceInfo: (service_info_id) => void
  updateServiceInfoSuccess: boolean

  refundMoney: (payType, order_code) => void
  refundMoneySuccess: boolean
}

class OrderDetailDialog extends React.Component<OrderDetailDialogProps> {
  state = {
    show: true,
    showAddConfirm: false

  }

  updateRemark = (remark) => {
    this.props.updateRemark(this.props.consultId, remark)
  }

  updateIsHideState = () => {
    this.props.updateIsHideState(this.props.consultId)
  }

  updateAppealResult = (appeal_result, appeal_remark) => {
    this.props.updateAppealResult(this.props.consultId, appeal_result, appeal_remark)
  }

  addServiceInfo = (remark, status, time) => {
    const detail = this.props.telephoneConsultDetail.data || {}
    this.props.addServiceInfo({
      'phone_order_id': detail['phone_order_id'],
      'phone_service_remark': remark,
      'phone_service_status': status,
      'phone_service_time': time
    })
  }

  deleteServiceInfo = (service_info_id) => {
    this.props.deleteServiceInfo(service_info_id)
  }

  refundMoney = (payType) => {
    this.props.refundMoney(payType, this.props.consultId)
  }

  close = () => {
    this.setState({show: false})
  }

  componentWillReceiveProps(nextProps: OrderDetailDialogProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.props.fetchConsultDetail(this.props.consultId)
    }
    if (!this.props.updateIsHideSuccess && nextProps.updateIsHideSuccess) {
      this.props.fetchConsultDetail(this.props.consultId)
    }
    if (!this.props.updateAppealResultSuccess && nextProps.updateAppealResultSuccess) {
      this.props.fetchConsultDetail(this.props.consultId)
    }
    if (!this.props.updateServiceInfoSuccess && nextProps.updateServiceInfoSuccess) {
      this.props.fetchConsultDetail(this.props.consultId)
    }
    if (!this.props.refundMoneySuccess && nextProps.refundMoneySuccess) {
      this.props.fetchConsultDetail(this.props.consultId)
    }
  }

  componentDidMount() {
    this.props.fetchConsultDetail(this.props.consultId)
  }

  render() {

    const detail = this.props.telephoneConsultDetail.data || {}
    const basicInfo = detail['base_info'] || {}
    const username = detail['real_name']
    const other = detail['other_info'] || {}

    const paymentStatus = detail['pay_status']
    const payment = detail['pay_info'] || {}

    const answerStatus = detail['answer_status'] != '1'
    const answer = detail['answer_info'] || {}

    const rateStatus = detail['evaluate_status'] != '1'
    const rate = detail['evaluate_info'] || {}

    const appealStatus = detail['appeal_status'] != '1'
    const appeal = detail['appeal_info'] || {}

    const service_records = detail['service_records'] || []
    return (
      <Modal className="telephone-consult-detail" show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={() => null}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>的咨询订单 订单编号：{this.props.consultId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>

            <ConsultBasicInfo detail={detail} order_time={this.props.order_time} />
            <PaymentInfo paymentStatus={paymentStatus} detail={detail} refundMoney={(payType) => this.refundMoney(payType)}/>
            <ServiceInfo addServiceInfo={(remark, status, time) => this.addServiceInfo(remark, status, time)} deleteServiceInfo={(service_info_id) => this.deleteServiceInfo(service_info_id)} serviceRecords={service_records} />
            <TwoSidesCall/>
            <RateInfo rateStatus={rateStatus} rate={rate} />
            <UserAppeal appealStatus={appealStatus} appeal={appeal} updateAppealResult={(appeal_result, appeal_remark) => this.updateAppealResult(appeal_result, appeal_remark)}/>
            <Other updateRemark={(v) => this.updateRemark(v)} updateIsHideState={() => this.updateIsHideState()} other={other}/>

          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    telephoneConsultDetail: state.telephoneConsultDetail,
    updateRemarkSuccess: state.telephoneConsult.updateRemarkSuccess,
    updateIsHideSuccess: state.telephoneConsult.updateIsHideSuccess,
    updateAppealResultSuccess: state.telephoneConsult.updateAppealResultSuccess,
    updateServiceInfoSuccess: state.telephoneConsult.updateServiceInfoSuccess,
    refundMoneySuccess: state.telephoneConsult.refundMoneySuccess
  }
}

export default connect(mapStateToProps, {
  fetchConsultDetail,
  updateRemark,
  updateIsHideState,
  updateAppealResult,
  addServiceInfo,
  deleteServiceInfo,
  refundMoney
})(OrderDetailDialog)
