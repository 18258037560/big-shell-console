/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import ImagePreView from '../../../2-1-doctor-audit/dialog/ImagePreView'

import {getTxt} from '../../../common/common-helper'

interface OrderBasicInfoProps {
  detail: any
}

class OrderBasicInfo extends React.Component<OrderBasicInfoProps> {
  state = {
    shouldShowImage: null
  }

  getQuestionUrls = (v) => {
    if (v.length == 0) return []
    return v.split(',')
  }

  getQuestionUrlContainers = (urls) => {
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

    const basicInfo = detail['base_info'] || {}
    const photoUrl = basicInfo['photo_url'] || require('../icon/1.png')
    const question_picture_urls = this.getQuestionUrls(basicInfo['question_picture_url'] || '')
    const username = detail['real_name']
    const mobile = basicInfo['user_account']
    const nickname = basicInfo['nick_name']
    const content = basicInfo['question_content']
    const questionOwner = getTxt(basicInfo['question_target_name'])
    const questionTime = getTxt(basicInfo['question_time'])
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
            <div>{this.getQuestionUrlContainers(question_picture_urls)}</div>
            <div className="qa-content-text">{content}</div>
          </div>
          <div className="question-owner">
            <label>提问对象：</label>{questionOwner}
          </div>
          <div className="question-date-time">
            <label>提问时间：</label>{questionTime}
          </div>
        </section>

      </div>
    )
  }
}

export default OrderBasicInfo
