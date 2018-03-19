/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import Confirm from 'app-core/common/Confirm'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../../../common/OrderCategoryTitle'
import {getPaymentText, getPaymentTypeText} from '../../qa-order.helper'
import {paymentTypeMapper} from '../../qa-order.constant'
import {getDateTimeStr} from '../../../../core/utils/dateUtils'

interface PaymentInfoProps {
  refundMoney: (payType) => void

  paymentStatus: string
  payment: any
}

class PaymentInfo extends React.Component<PaymentInfoProps> {
  payType: string

  state = {
    showRefund: false
  }

  render() {
    const payment = this.props.payment
    const paymentStatus = this.props.paymentStatus
    this.payType = payment['pay_way']

    return (
      <section className="qa-big-category payment-info">
        {
          this.state.showRefund && (
            <Confirm
              message="确定要退款吗？退款将原路径返还到付款账户"
              onConfirm={() => this.props.refundMoney(this.payType)}
              onExited={() => this.setState({showRefund: false})}
            />
          )
        }
        <OrderCategoryTitle src={require('../icon/card.svg')} title="付款信息"/>
        {
          paymentStatus == '1' && (
            <div className="category-item">
              <Label size="small">付款状态</Label>
              <div>未付款</div>
            </div>
          )
        }
        {
          paymentStatus != '1' && (
            <div className="category-item payment-info-summary">
              <div className="summary-basic-info">
                <div>
                  <Label size="small">付款状态</Label>{getPaymentText(paymentStatus)}
                </div>
                <div className="mt7">
                  <Label size="small">付款方式</Label>{getPaymentTypeText(payment['pay_way'])}
                  {
                    payment['pay_way'] == '2' && (
                      <img src={require('../icon/weixin.svg')}/>
                    )
                  }
                  {
                    payment['pay_way'] == '1' && (
                      <img src={require('../icon/zhifubao.svg')}/>
                    )
                  }
                </div>
                <div className="mt7">
                  <Label size="small">付款时间</Label>{getDateTimeStr(payment['pay_time'])}
                </div>
              </div>
              <div className="money-container">
                <div>
                  <div className="money-count">
                    <span>￥</span>
                    <span>{payment['pay_money']}</span>
                  </div>
                  <div className="money-text">付款金额</div>
                </div>
              </div>
              <div className="refund">
                <button className="refund-btn" onClick={() => this.setState({showRefund: true})}>退款</button>
              </div>
            </div>
          )
        }

      </section>
    )
  }
}

export default PaymentInfo
