import React from 'react'
import {connect} from 'react-redux'
import DatePicker from 'antd/lib/date-picker'
import Modal from 'app-core/modal'
import Input from 'app-core/form/Input'
import ScrollContainer from 'app-core/core/ScrollContainer'
import Confirm from 'app-core/common/Confirm'
import FullDialogContent from 'app-core/common/content/FullDialogContent'

import Label from '../../../components/element/Label'
import Button from '../../../components/button/Button'

import List from '../../../core/interface/List'
import {handlePageListData} from '../../common/common-helper'
import {getDateStr} from '../../../core/utils/dateUtils'
import {fetchDoctorWalletOperationList} from '../doctor-wallet.action'


interface DoctorWalletOperationRecordDialogProps {
  fetchDoctorWalletOperationList: (start, options) => void
  doctorWalletOperationList: any
  doctorCode: string
  onExited: () => void
}

class DoctorWalletOperationRecordDialog extends React.Component<DoctorWalletOperationRecordDialogProps> {
  start = 0
  doctorCode = ''
  state = {
    show: true,
    showAddConfirm: false,
    startDate: null,
    endDate: null,
    doctorCode: ''
  }

  close = () => {
    this.setState({show: false})
  }

  loadMoreList = () => {
    let {list, total} = handlePageListData(this.props.doctorWalletOperationList)
    if (total != -1 && list.length == total) {
      return
    }
    this.load()
  }

  load = () => {
    this.props.fetchDoctorWalletOperationList(this.start, {
      'start': this.start,
      'limit': 10,
      'operate_begin_time': getDateStr(this.state.startDate),
      'operate_end_time': getDateStr(this.state.endDate),
      'doctor_account': this.doctorCode
    })

    this.start++
  }

  search = () => {
    this.start = 0
    this.load()
  }

  componentDidMount() {
    const doctor_account = this.props.doctorCode
    this.doctorCode = doctor_account
    this.load()
  }

  render() {
    let list = (this.props.doctorWalletOperationList.data ? this.props.doctorWalletOperationList.data.list : []) || []
    let total = (this.props.doctorWalletOperationList.data ? this.props.doctorWalletOperationList.data.total : '0') || '0'
    return (
      <Modal contentComponent={FullDialogContent} style={{width: '650px'}} className="qa-operation-list-dialog"
             show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >
        {
          this.state.showAddConfirm && (
            <Confirm message="？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={() => null}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>提现操作记录</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="order-operation-box">
            <div className="flex bottom">
              <div className="search-item-container">
                <Label>起始日期</Label>
                <DatePicker value={this.state.startDate} onChange={v => this.setState({startDate: v})}/>
              </div>
              <div className="search-item-container">
                <Label>结束日期</Label>
                <DatePicker value={this.state.endDate} onChange={v => this.setState({endDate: v})}/>
              </div>
              <div className="search-item-container">
                <Label>医生</Label>
                <Input
                  placeholder="请输入"
                  value={this.doctorCode} onChange={v => (this.doctorCode = v)}/>
              </div>
              <div>
                <Button onClick={this.search}>搜索</Button>
              </div>
            </div>

            <ScrollContainer onScrollBottom={this.loadMoreList} className="order-item-wrap">
              {
                list.map((item, index) => {
                  return (
                    <div key={index} className="order-item-outer">
                      <div className="flex between">
                        <div className="order-item-content">{item['record_content']}</div>
                        <div className="order-user-date">
                          {item['operate_person']}，
                          {item['operate_time']}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </ScrollContainer>
          </div>
        </Modal.Body>
        <Modal.Footer>
          已加载 {list.length} 条数据，总共 {total} 条数据
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    doctorWalletOperationList: state.doctorWalletOperationList
  }
}

export default connect(mapStateToProps, {fetchDoctorWalletOperationList})(DoctorWalletOperationRecordDialog)

