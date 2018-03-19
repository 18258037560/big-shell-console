/**
 * Created by zhouhangshuai on 2018/3/9.
 */
import React from 'react'
import {connect} from 'react-redux'

import Confirm from 'app-core/common/Confirm'
import {fetchTopicDetail} from '../../topicOfConversation.action'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../../../common/OrderCategoryTitle'
import EditRemark from '../../../../components/EditRemark'

interface OtherProps {
  other: any
  updateIsHideState: (topic,status) => void
  updateIsHotState: (topic,status) => void
  updateHospitalSuccess: boolean
  topicDetail:any

  amendTopicRemark: (id,remark) => void
  fetchTopicDetail:(id) => any
  updateRemarkSuccess: boolean
  topicId:string
  item:any
}

class Other extends React.Component<OtherProps> {
  state = {
    editRemark: false,
    showAddConfirm: false,
    showAddConfirmHot: false
  }

  updateRemark = (v) => {
    this.props.amendTopicRemark(this.props.item['topic_id'],v)
  }

  updateIsHide = () => {
    const status = this.props.topicDetail.data['is_hide'] == 0 ? 1 : 0
    this.props.updateIsHideState(this.props.item['topic_id'],status)
    this.props.fetchTopicDetail(this.props.item['topic_id'])
  }
  updateIsHot = () =>{
    const status = this.props.topicDetail.data['is_hot'] == 0 ? 1 : 0
    this.props.updateIsHotState(this.props.item['topic_id'],status)
    this.props.fetchTopicDetail(this.props.item['topic_id'])
  }


  componentWillMount(){
    this.props.fetchTopicDetail(this.props.item['topic_id'])
  }

  componentWillReceiveProps(nextProps: OtherProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.setState({editRemark: false})
    }
  }

  render() {
    const {remark} = this.props.item
    console.log(this.props.topicDetail)
    const {is_hot,is_hide} = this.props.topicDetail.data || []
    return (
      <section className="qa-big-category other">
        {
          this.state.editRemark && (
            <EditRemark value={remark} updateRemark={(v) => this.updateRemark(v)} updateRemarkSuccess={this.props.updateRemarkSuccess} onExited={() => this.setState({editRemark: false})}/>
          )
        }
        {
          this.state.showAddConfirm && (
            <Confirm message={is_hide == 0? '确定要显示此话题吗？恢复后客户端将显示' : '确定要隐藏此话题吗？隐藏后在数据库仍保留，但客户端将不会显示'}
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={this.updateIsHide}/>
          )
        }
        {
          this.state.showAddConfirmHot && (
            <Confirm message={is_hot == 0? '确定要设置此话题为热门吗' : '确定要取消这个热门话题吗'}
                     onExited={() => this.setState({showAddConfirmHot: false})}
                     onConfirm={this.updateIsHot}/>
          )
        }

        <OrderCategoryTitle src={require('../icon/set.svg')} title="其它"/>
        <div className="category-item">
          <div className="item-main-content">
            <Label size="small">备注</Label>
            {
              remark && (
                <div>{remark}</div>
              )
            }
            {
              !remark && (
                <span style={{color: '#aaa'}}>未填写</span>
              )
            }
          </div>
          <div className="button-area">
            <button onClick={() => this.setState({editRemark: true})}>编辑</button>
          </div>
        </div>
        <div className="category-item">
          <div className="item-main-content">
            <Label size="small">是否隐藏</Label>
            <div>{is_hide == 0 ? '否' : '是'}</div>
          </div>
          <div className="button-area">
            <button onClick={() => this.setState({showAddConfirm: true})}>{is_hide == 0 ? '恢复' : '隐藏'}</button>
          </div>
        </div>
        <div className="category-item">
          <div className="item-main-content">
            <Label size="small">是否热门</Label>
            <div>{is_hot == 0 ? '否' : '是'}</div>
          </div>
          <div className="button-area">
            <button onClick={() => this.setState({showAddConfirmHot: true})}>{is_hot == 0 ? '设为热门' : '取消'}</button>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    topicDetail:state.topicDetail,
    updateRemarkSuccess: state.topicOfConversation.updateRemarkSuccess,
    updateIsHideSuccess: state.topicOfConversation.updateIsHideSuccess
  }
}

export default connect(mapStateToProps, {fetchTopicDetail})(Other)
