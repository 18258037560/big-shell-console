/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import {connect} from 'react-redux'

import Label from '../../../../components/element/Label'
import OrderCategoryTitle from '../../../common/OrderCategoryTitle'
import EditRemark from '../../../../components/EditRemark'

interface OtherProps {
  other: any
  updateRemark: (remark) => void
  updateRemarkSuccess: any

  updateIsHideState: () => void
  updateIsHideSuccess: boolean
}

class Other extends React.Component<OtherProps> {
  state = {
    editRemark: false
  }

  componentWillReceiveProps(nextProps: OtherProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.setState({editRemark: false})
    }
    if (!this.props.updateIsHideSuccess && nextProps.updateIsHideSuccess) {
      this.setState({editRemark: false})
    }
  }

  render() {
    const other = this.props.other || {}
    let remark = ''
    if (other['order_remark']) remark = other['order_remark']

    return (
      <section className="big-category other">
        {
          this.state.editRemark && (
            <EditRemark updateRemark={(v) => this.props.updateRemark(v)} updateRemarkSuccess={this.props.updateRemarkSuccess} onExited={() => this.setState({editRemark: false})}/>
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
            <button onClick={() => this.props.updateIsHideState()}>恢复</button>
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    updateRemarkSuccess: state.telephoneConsult.updateRemarkSuccess,
    updateIsHideSuccess: state.telephoneConsult.updateIsHideSuccess
  }
}

export default connect(mapStateToProps, {})(Other)