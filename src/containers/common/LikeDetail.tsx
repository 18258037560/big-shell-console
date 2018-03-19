/**
 * Created by jiangyukun on 2017/11/9.
 */
import React from 'react'

interface LikeDetailProps {
  src: string
  title: string
  count:any
}

class LikeDetail extends React.Component<LikeDetailProps> {
  render() {
      // console.log('count',this.props.count);
      return (
      <div className="detail-title">
        <div className="title-icon-container">
          <img src={this.props.src}/>
        </div>
        {this.props.title +'(' +this.props.count+')' }
      </div>
    )
  }
}

export default LikeDetail
