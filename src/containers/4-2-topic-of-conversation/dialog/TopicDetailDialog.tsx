/**
 * Created by zhouhangshuai on 2018/3/9.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal/Modal'
import Confirm from 'app-core/common/Confirm'

import Discuss from './part/Discuss'
import LikeInfo from './part/LikeInfo'
import TopicBasicInfo from './part/TopicBasicInfo'
import Other from './part/Other'

import Data from '../../../core/interface/Data'
import {updateRemark, updateAppealResult} from '../../3-1-questions-answers/questions-answers.action'
import {fetchTopicDetail,fetchLikeDetail,fetchLikePersonDetail,fetchDiscussDetail,amendTopicRemark,updateIsHideState,updateIsHotState} from '../../4-2-topic-of-conversation/topicOfConversation.action'
import {refundMoney} from '../../3-2-telephone-consult/telephone-consult.action'
import data from "../../../reducers/data.reducer";

interface TopicDetailDialogProps {
  item:[any]
  topicId: string
  topicLikeDetail:any
  topicLikePersonDetail:any
  fetchTopicDetail: (topicId) => void
  fetchLikeDetail: (start,id) => Data<any>
  fetchLikePersonDetail:(user_account)=> Data<any>
  fetchDiscussDetail: (start,id) => Data<any>
  amendTopicRemark:(id,remark) => void
  discussDetail: any
  orderDetail: Data<any>
  topicDetail: Data<any>
  onExited: () => void
  updateRemark: (orderCode, newRemark) => void
  updateRemarkSuccess: boolean

  updateIsHideState: (orderCode) => void
  updateIsHotState:(orderCode) => void
  updateIsHideSuccess: boolean

  updateAppealResult: (orderCode, appeal_result, appeal_remark) => void
  updateAppealResultSuccess: boolean

  refundMoneySuccess: boolean
}

class TopicDetailDialog extends React.Component<TopicDetailDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,
    startIndex:0
  }

  close = () => {
    this.setState({show: false})
  }

  updateRemark = (v) => {
    this.props.updateRemark(this.props.topicId, v)
  }

  updateAppealResult = (appeal_result, appeal_remark) => {
    this.props.updateAppealResult(this.props.topicId, appeal_result, appeal_remark)
  }

  componentWillReceiveProps(nextProps: TopicDetailDialogProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.props.fetchTopicDetail(this.props.topicId)
    }
    if (!this.props.updateIsHideSuccess && nextProps.updateIsHideSuccess) {
      this.props.fetchTopicDetail(this.props.topicId)
    }
    if (!this.props.updateAppealResultSuccess && nextProps.updateAppealResultSuccess) {
      this.props.fetchTopicDetail(this.props.topicId)
    }
  }

  componentDidMount() {
    this.props.fetchTopicDetail(this.props.topicId)
    this.props.fetchLikeDetail(this.state.startIndex, this.props.topicId)
  }
  render() {
    const detail = this.props.topicDetail.data || {}
    const username = detail['real_name'] || ''
    const other = detail['other_info'] || {}
     return (
      <Modal className="qa-order-detail" show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={() => null}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>{username}&nbsp;&nbsp;发表的话题</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <TopicBasicInfo detail={detail}/>
            <LikeInfo getLikePersonDetail={this.props.fetchLikePersonDetail} topicId={this.props.topicId} topicLikePersonDetail={this.props.topicLikePersonDetail} fetchLoad={this.props.fetchLikeDetail} count={detail['like_count']}  likeDetail={this.props.topicLikeDetail}/>
            <Discuss topicId={this.props.topicId} discussDetail={this.props.discussDetail} fetchDiscussDetail={this.props.fetchDiscussDetail} />
            <Other item={this.props.item} topicId={this.props.topicId} amendTopicRemark={this.props.amendTopicRemark} updateIsHideState={this.props.updateIsHideState} updateIsHotState={this.props.updateIsHotState}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    discussDetail: state.discussDetail,
    orderDetail: state.orderDetail,
    topicDetail: state.topicDetail,
    topicLikeDetail: state.topicLikeDetail,
    topicLikePersonDetail:state.topicLikePersonDetail,
    updateRemarkSuccess: state.qaOrder.updateRemarkSuccess,
    updateIsHideSuccess: state.qaOrder.updateIsHideSuccess,
    updateAppealResultSuccess: state.qaOrder.updateAppealResultSuccess,
    refundMoneySuccess: state.telephoneConsult.refundMoneySuccess
  }
}

export default connect(mapStateToProps, {fetchTopicDetail,fetchLikeDetail,fetchLikePersonDetail,fetchDiscussDetail,amendTopicRemark, updateIsHideState,updateIsHotState, updateAppealResult, refundMoney})(TopicDetailDialog)
