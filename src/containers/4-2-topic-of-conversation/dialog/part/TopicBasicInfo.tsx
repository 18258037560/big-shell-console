/**
 * Created by zhouhangshuai on 2018/3/9.
 */
import React from 'react'
import ImagePreView from '../../../2-1-doctor-audit/dialog/ImagePreView'

import {getTxt} from '../../../common/common-helper'

interface TopicBasicInfoProps {
  detail: any
}

class TopicBasicInfo extends React.Component<TopicBasicInfoProps> {
  state = {
    shouldShowImage: null
  }

  getTopicUrls = (v) => {
    if (v.length == 0) return []
    return v.split(',')
  }

  getTopicUrlContainers = (urls) => {
    return urls.map((item, index) => {
      return <a key={index} onClick={() => this.setState({shouldShowImage: item})}><img src={item} style={{
        width: '80px',
        height: '70px',
        paddingRight: '20px',
        paddingBottom: '10px'
      }}/></a>
    })
  }

  render() {
    const detail = this.props.detail
    const photoUrl = detail['photo_url'] || require('../icon/1.png')
    const detail_picture_urls = this.getTopicUrls(detail['topic_picture_url'] || '')
    const username = detail['real_name']
    const mobile = detail['user_account']
    const nickname = detail['nick_name']
    const content = detail['topic_content']
    const topicTime = getTxt(detail['create_time'])
    return (
      <div>
        {
          this.state.shouldShowImage && (
            <ImagePreView
              url={this.state.shouldShowImage}
              showEmptyText={true}
              showCloseButton={true}
              onExited={() => this.setState({shouldShowImage: null})}/>
          )
        }
        <section className="qa-basic-info">
          <div className="user-basic-info">
            <img src={photoUrl}/>
            <div>
              <div className="username">{username} ( {nickname} )</div>
              <div className="mobile">{mobile}</div>
            </div>
          </div>
          <div className="qa-content">
            <div className="qa-content-text">{content}</div>
            <div>{this.getTopicUrlContainers(detail_picture_urls)}</div>
          </div>
          <div className="topic-date-time">
            <label>发表时间：</label>{topicTime}
          </div>
        </section>

      </div>
    )
  }
}

export default TopicBasicInfo
