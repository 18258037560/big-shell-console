/**
 * Created by jiangyukun on 2017/11/9.
 */
import React from 'react'

interface DiscussDetailProps {
  src: string
  title: string
}

class DiscussDetail extends React.Component<DiscussDetailProps> {
  render() {
    return (
      <div className="detail-title">
        <div className="title-icon-container">
          <img src={this.props.src}/>
        </div>
        {this.props.title}：
      </div>
    )
  }
}

export default DiscussDetail
