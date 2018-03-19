/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import Confirm from 'app-core/common/Confirm'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../../../common/OrderCategoryTitle'
import {getDateTimeStr} from '../../../../core/utils/dateUtils'
import {paymentTypeMapper} from '../../../3-1-questions-answers/qa-order.constant'
import {getPaymentText, getPaymentTypeText} from '../../../3-1-questions-answers/qa-order.helper'

interface PaymentInfoProps {
  detail: any
  refundMoney: (payType) => void
  paymentStatus: string
}

class PaymentInfo extends React.Component<PaymentInfoProps> {
  payType: string
  state = {
    showRefund: false
  }

  render() {
    const detail = this.props.detail || {}
    const basicInfo = detail['base_info'] || {}
    if (basicInfo['pay_way'] == paymentTypeMapper.ZHI_FU_BAO) this.payType = '1'
    if (basicInfo['pay_way'] == paymentTypeMapper.WEI_XIN) this.payType = '2'
    return (
      <section className="big-category payment-info">
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
          this.props.paymentStatus == '1' && (
            <div className="category-item">
              <Label size="small">付款状态</Label>
              <div>{basicInfo['pay_status_desc']}</div>
            </div>
          )
        }
        {
          this.props.paymentStatus != '1' && (
            <div className="category-item payment-info-summary">
              <div className="summary-basic-info">
                <div>
                  <Label size="small">付款状态</Label>{basicInfo['pay_status_desc']}
                </div>
                <div className="mt7">
                  <Label size="small">付款方式</Label>{basicInfo['pay_way']}
                  {
                    basicInfo['pay_way'] == paymentTypeMapper.WEI_XIN && (
                      <img src={require('../icon/weixin.svg')}/>
                    )
                  }
                  {
                    basicInfo['pay_way'] == paymentTypeMapper.ZHI_FU_BAO && (
                      <img src={require('../icon/zhifubao.svg')}/>
                    )
                  }
                </div>
                <div className="mt7">
                  <Label size="small">付款时间</Label>{basicInfo['pay_time']}
                </div>
              </div>
              <div className="money-container">
                <div>
                  <div className="money-count">
                    <span>￥</span>
                    <span>{basicInfo['pay_money']}</span>
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
