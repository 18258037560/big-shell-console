/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'

import {getTxt} from '../../../common/common-helper'
import Label from '../../../../components/element/Label'
import AvailableConsultDay from '../base/AvailableConsultDay'
import ImagePreView from '../../../2-1-doctor-audit/dialog/ImagePreView'

interface ConsultBasicInfoProps {
  detail: any
  order_time: string
}

class ConsultBasicInfo extends React.Component<ConsultBasicInfoProps> {
  state = {
    shouldShowImage: null
  }

  getQuestionUrls = (v) => {
    if (v.length == 0) return []
    return v.split(',')
  }

  getQuestionUrlContainers = (urls) => {
    return urls.map((item, index) => {
      return <a key={index} onClick={() => this.setState({shouldShowImage: item})}><img  className="consult_question_urls" src={item} style={{
      }}/></a>
    })
  }

  render() {
    const detail = this.props.detail || {}

    const basicInfo = detail['base_info'] || {}
    const photoUrl = basicInfo['photo_url'] || require('../icon/1.png')
    const username = getTxt(basicInfo['real_name'])
    const nickname = getTxt(basicInfo['nick_name'])
    const mobile = getTxt(basicInfo['user_account'])

    const content = getTxt(basicInfo['question_content'])
    const expect_time = getTxt(basicInfo['expect_time'])

    const questionOwnerName = getTxt(basicInfo['question_target_name'])
    const questionOwnerPhone = getTxt(basicInfo['question_target_account'])
    const questionOwnerHospitalName = getTxt(basicInfo['question_target_hsp_name'])
    const questionOwnerDepartmentName = getTxt(basicInfo['question_target_title_name'])

    const consult_time_array = basicInfo['consult_time_array'] || []
    const question_picture_urls = this.getQuestionUrls(basicInfo['question_picture_url'] || '')

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

        <section className="big-category user-basic-info">
          <div className="category-item">
            <img src={photoUrl}/>
            <div>
              <div className="username">{username} ( {nickname} )</div>
              <div className="mobile">{mobile}</div>
            </div>
          </div>

          <div className="consult-content">
            <div>{this.getQuestionUrlContainers(question_picture_urls)}</div>
            <div className="qa-content-text">{content}</div>
          </div>

          <div className="category-item">
            <Label size="small">期望时间</Label>{expect_time}
          </div>

          <div className="category-item">
            <Label size="small">咨询对象</Label>
            {questionOwnerName}&nbsp;&nbsp;
            {questionOwnerPhone}&nbsp;&nbsp;
            {questionOwnerHospitalName}&nbsp;&nbsp;
            {questionOwnerDepartmentName}
          </div>

          <div className="category-item">
            <Label size="small">可咨询时间</Label>
            <AvailableConsultDay workDay={consult_time_array} imgSrc={require('../../../../components/workDay/departmentSelected.png')}/>
          </div>

          <div className="category-item">
            <Label size="small">订单时间</Label>{this.props.order_time}
          </div>
        </section>
      </div>

    )
  }
}

export default ConsultBasicInfo
