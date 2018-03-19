/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import {connect} from 'react-redux'

import Confirm from 'app-core/common/Confirm'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../../../common/OrderCategoryTitle'
import EditRemark from '../../../../components/EditRemark'

interface OtherProps {
  other: any
  updateIsHideState: () => void
  updateHospitalSuccess: boolean

  updateRemark: (newRemark) => void
  updateRemarkSuccess: boolean
}

class Other extends React.Component<OtherProps> {
  state = {
    editRemark: false,
    showAddConfirm: false
  }

  updateRemark = (v) => {
    this.props.updateRemark(v)
  }

  updateIsHide = () => {
    this.props.updateIsHideState()
  }

  componentWillReceiveProps(nextProps: OtherProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.setState({editRemark: false})
    }
  }

  render() {
    const other = this.props.other
    let remark = ''
    if (other['order_remark']) remark = other['order_remark']
    const isHide = other['is_hide'] == 1
    return (
      <section className="qa-big-category other">
        {
          this.state.editRemark && (
            <EditRemark value={remark} updateRemark={(v) => this.updateRemark(v)} updateRemarkSuccess={this.props.updateRemarkSuccess} onExited={() => this.setState({editRemark: false})}/>
          )
        }
        {
          this.state.showAddConfirm && (
            <Confirm message={isHide ? '确定要恢复此订单吗？恢复后客户端将显示' : '确定要隐藏此订单吗？隐藏后在数据库仍保留，但客户端将不会显示'}
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={this.updateIsHide}/>
          )
        }

        <OrderCategoryTitle src={require('../icon/other.svg')} title="其它"/>
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
            <div>{other['is_hide_desc']}</div>
          </div>
          <div className="button-area">
            <button onClick={() => this.setState({showAddConfirm: true})}>{isHide ? '恢复' : '隐藏'}</button>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    updateRemarkSuccess: state.qaOrder.updateRemarkSuccess,
    updateIsHideSuccess: state.qaOrder.updateIsHideSuccess
  }
}

export default connect(mapStateToProps, {})(Other)