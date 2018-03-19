/**
 * Created by jiangyukun on 2017/11/15.
 */
import React from 'react'

interface AvailableConsultDayProps {
  workDay: string[],
  imgSrc: string
}

const weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

class AvailableConsultDay extends React.Component<AvailableConsultDayProps> {

  getIsWorkDay = (location) => {

    if (this.props.workDay) {
      return (this.props.workDay.indexOf(location) != -1) ? <img src={this.props.imgSrc} style={{width:'20px', height:'20px' }}/> : ''
    }
    return ''
  }

  render() {
    let morningItem = [1, 2, 3, 4, 5, 6, 7]
    return (
      <div>
        <header className="weeks">
          <div className="item week-item"></div>
          {
            weeks.map((item, index) => {
              return (
                <div key={index} className="item week-item">{item}</div>
              )
            })
          }
        </header>
        <div className="morning">
          <div className="item morning-item">上午</div>
          {
            morningItem.map((item, index) => {
              return (
                <div key={index} className="item morning-item">{this.getIsWorkDay(item + '0')}</div>
              )
            })
          }
        </div>
        <div className="afternoon">
          <div className="item afternoon-item">下午</div>
          {
            morningItem.map((item, index) => {
              return (
                <div key={index} className="item afternoon-item">{this.getIsWorkDay(item + '1')}</div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default AvailableConsultDay
