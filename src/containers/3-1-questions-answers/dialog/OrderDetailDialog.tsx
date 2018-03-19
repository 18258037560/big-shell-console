/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal/Modal'
import Confirm from 'app-core/common/Confirm'

import RateInfo from './part/RateInfo'
import AnswerInfo from './part/AnswerInfo'
import PaymentInfo from './part/PaymentInfo'
import OrderBasicInfo from './part/OrderBasicInfo'
import UserAppeal from './part/UserAppeal'
import Other from './part/Other'

import Data from '../../../core/interface/Data'
import {fetchOrderDetail, updateRemark, updateIsHideState, updateAppealResult} from '../questions-answers.action'
import {refundMoney} from '../../3-2-telephone-consult/telephone-consult.action'

interface OrderDetailDialogProps {
  orderCode: string
  fetchOrderDetail: (orderCode) => void
  orderDetail: Data<any>
  onExited: () => void

  updateRemark: (orderCode, newRemark) => void
  updateRemarkSuccess: boolean

  updateIsHideState: (orderCode) => void
  updateIsHideSuccess: boolean

  updateAppealResult: (orderCode, appeal_result, appeal_remark) => void
  updateAppealResultSuccess: boolean

  refundMoney: (payType, order_code) => void
  refundMoneySuccess: boolean
}

class OrderDetailDialog extends React.Component<OrderDetailDialogProps> {
  state = {
    show: true,
    showAddConfirm: false
  }

  close = () => {
    this.setState({show: false})
  }

  updateRemark = (v) => {
    this.props.updateRemark(this.props.orderCode, v)
  }

  updateIsHideState = () => {
    this.props.updateIsHideState(this.props.orderCode)
  }

  updateAppealResult = (appeal_result, appeal_remark) => {
    this.props.updateAppealResult(this.props.orderCode, appeal_result, appeal_remark)
  }

  refundMoney = (payType) => {
    this.props.refundMoney(payType, this.props.orderCode)
  }

  componentWillReceiveProps(nextProps: OrderDetailDialogProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.props.fetchOrderDetail(this.props.orderCode)
    }
    if (!this.props.updateIsHideSuccess && nextProps.updateIsHideSuccess) {
      this.props.fetchOrderDetail(this.props.orderCode)
    }
    if (!this.props.updateAppealResultSuccess && nextProps.updateAppealResultSuccess) {
      this.props.fetchOrderDetail(this.props.orderCode)
    }
  }

  componentDidMount() {
    this.props.fetchOrderDetail(this.props.orderCode)
  }

  render() {
    const detail = this.props.orderDetail.data || {}
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

    return (
      <Modal className="qa-order-detail" show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={() => null}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>{username} 的问答订单 订单编号： {this.props.orderCode}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>

            <OrderBasicInfo detail={detail}/>
            <PaymentInfo paymentStatus={paymentStatus} payment={payment} refundMoney={(payType) => this.refundMoney(payType)}/>
            <AnswerInfo answerStatus={answerStatus} answer={answer}/>
            <RateInfo rateStatus={rateStatus} rate={rate}/>
            <UserAppeal appealStatus={appealStatus} appeal={appeal} updateAppealResult={(appeal_result, appeal_remark) => this.updateAppealResult(appeal_result, appeal_remark)}/>
            <Other other={other} updateRemark={(v) => this.updateRemark(v)} updateIsHideState={this.updateIsHideState}/>

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
    orderDetail: state.orderDetail,
    updateRemarkSuccess: state.qaOrder.updateRemarkSuccess,
    updateIsHideSuccess: state.qaOrder.updateIsHideSuccess,
    updateAppealResultSuccess: state.qaOrder.updateAppealResultSuccess,
    refundMoneySuccess: state.telephoneConsult.refundMoneySuccess
  }
}

export default connect(mapStateToProps, {fetchOrderDetail, updateRemark, updateIsHideState, updateAppealResult, refundMoney})(OrderDetailDialog)
