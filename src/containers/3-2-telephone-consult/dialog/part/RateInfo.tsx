/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../../../common/OrderCategoryTitle'
import PartContent from '../../../common/PartContent'

interface RateInfoProps {
  rateStatus: boolean
  rate: any
}

class RateInfo extends React.Component<RateInfoProps> {
  getScores = () => {
    let score = this.props.rate['evaluate_store']
    const scoreArr = ['1', '2', '3', '4', '5']
    return scoreArr.map((item) => {
      return item <= score ? <img key={item} src={require('../icon/rate-full.svg')}/> :
        <img key={item} src={require('../icon/rate-empty.svg')}/>
    })
  }

  getEvaluateWayString = (way) => {
    return way == '1' ? '病人评价' : (way == '2' ? '系统评价' : '')
  }

  render() {
    let evaluate_content = this.props.rate['evaluate_content'] || ''
    return (
      <section className="big-category rate-info">
        <OrderCategoryTitle src={require('../icon/rate.svg')} title="评分信息"/>
        <PartContent status={true} noDataTxt="暂无评分">
          <div className="rate-info-item category-item">
            <Label size="small">用户评分</Label>
            <div>
              {this.getScores()}
              {this.props.rate['evaluate_store']}.0分
              &nbsp;&nbsp;&nbsp;
              {this.getEvaluateWayString(this.props.rate['evaluate_way'])}
            </div>
          </div>
          <div className="rate-info-item category-item">
            <Label size="small">评价内容</Label>
            <div>
              {evaluate_content.length ? evaluate_content : '未填写'}
            </div>
          </div>
          <div className="rate-info-item category-item">
            <Label size="small">评价时间</Label>
            <div>{this.props.rate['evaluate_time']}</div>
          </div>
        </PartContent>
      </section>
    )
  }
}

export default RateInfo
