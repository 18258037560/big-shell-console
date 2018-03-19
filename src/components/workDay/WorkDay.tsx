import React from 'react'

interface WorkDayProps {
  workDay: string[]
  title: string
  imgSrc: string
}

class WorkDay extends React.Component<WorkDayProps> {

  getIsWorkDay = (location) => {

    if (this.props.workDay) {
      return (this.props.workDay.indexOf(location) != -1) ? <img src={this.props.imgSrc} style={{width:'20px', height:'20px' }}/> : ''
    }
    return ''
  }

  render() {
    return (
      <div className="workDay">
        <ul>
          <li>{this.props.title}</li>
          <li>周一</li>
          <li>周二</li>
          <li>周三</li>
          <li>周四</li>
          <li>周五</li>
          <li>周六</li>
          <li className="rightLi">周日</li>
        </ul>
        <ul>
          <li>上午</li>
          <li>{this.getIsWorkDay('10')}</li>
          <li>{this.getIsWorkDay('20')}</li>
          <li>{this.getIsWorkDay('30')}</li>
          <li>{this.getIsWorkDay('40')}</li>
          <li>{this.getIsWorkDay('50')}</li>
          <li>{this.getIsWorkDay('60')}</li>
          <li className="rightLi">{this.getIsWorkDay('70')}</li>
        </ul>
        <ul>
          <li>下午</li>
          <li>{this.getIsWorkDay('11')}</li>
          <li>{this.getIsWorkDay('21')}</li>
          <li>{this.getIsWorkDay('31')}</li>
          <li>{this.getIsWorkDay('41')}</li>
          <li>{this.getIsWorkDay('51')}</li>
          <li>{this.getIsWorkDay('61')}</li>
          <li className="rightLi">{this.getIsWorkDay('71')}</li>
        </ul>

      </div>
    )
  }
}

export default WorkDay
