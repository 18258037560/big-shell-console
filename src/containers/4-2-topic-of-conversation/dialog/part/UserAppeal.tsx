/**
 * Created by zhouhangshuai on 2018/3/9.
 */
import React from 'react'
import {connect} from 'react-redux'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../../../common/OrderCategoryTitle'
import PartContent from '../../../common/PartContent'
import EditAppealResultDialog from '../EditAppealResultDialog'

interface UserAppealProps {
  appealStatus: boolean
  appeal: any
  updateAppealResult: (appeal_result, appeal_remark) => void
  updateAppealResultSuccess: boolean
  updateConsultAppealResultSuccess: boolean
}

class UserAppeal extends React.Component<UserAppealProps> {
  state = {
    showModify: false
  }

  updateAppealResult = (appeal_result, appeal_remark) => {
    this.props.updateAppealResult(appeal_result, appeal_remark)
  }

  componentWillReceiveProps(nextProps: UserAppealProps) {
    if (!this.props.updateAppealResultSuccess && nextProps.updateAppealResultSuccess) {
      this.setState({showModify: false})
    }
    if (!this.props.updateConsultAppealResultSuccess && nextProps.updateConsultAppealResultSuccess) {
      this.setState({showModify: false})
    }
  }

  render() {
    return (
      <section className="qa-big-category appeal-info">
        {
          this.state.showModify && (
            <EditAppealResultDialog
              updateAppealResult={(appeal_result, appeal_remark) => this.updateAppealResult(appeal_result, appeal_remark)}
              onExited={() => this.setState({showModify: false})}
            />
          )
        }
        <OrderCategoryTitle src={require('../icon/appeal.svg')} title="用户申诉"/>
        <PartContent status={this.props.appealStatus} noDataTxt="未申诉">
          <div className="category-item appeal-info-item">
            <Label size="small">申诉类别</Label>
            <div>
              {this.props.appeal['appeal_type'] || ''}）
            </div>
          </div>
          <div className="category-item appeal-info-item">
            <Label size="small">申诉内容</Label>
            <div>
              {this.props.appeal['appeal_content'] || '未填写'}
            </div>
          </div>
          <div className="category-item appeal-info-item">
            <Label size="small">申诉时间</Label>
            <div>{this.props.appeal['appeal_time'] || ''}</div>
          </div>
          <div className="category-item appeal-info-item">
            <div className="flex1">
              <div className="flex">
                <Label size="small">处理结果</Label>
                <div>{this.props.appeal['appeal_result'] || '未处理'}</div>
              </div>
              <div className="flex mt7">
                <Label size="small">处理备注</Label>
                <div>{this.props.appeal['appeal_remark'] || '未填写'}</div>
              </div>
            </div>
            <div className="button-area">
              <button onClick={() => this.setState({showModify: true})}>修改处理结果</button>
            </div>
          </div>
        </PartContent>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    updateAppealResultSuccess: state.qaOrder.updateAppealResultSuccess,
    updateConsultAppealResultSuccess: state.telephoneConsult.updateAppealResultSuccess
  }
}

export default connect(mapStateToProps, {})(UserAppeal)