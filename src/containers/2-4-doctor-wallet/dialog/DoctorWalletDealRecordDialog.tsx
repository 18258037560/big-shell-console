import React from 'react'
import {connect} from 'react-redux'
import DatePicker from 'antd/lib/date-picker'
import Modal from 'app-core/modal'
import Input from 'app-core/form/Input'
import ScrollContainer from 'app-core/core/ScrollContainer'
import Confirm from 'app-core/common/Confirm'
import FullDialogContent from 'app-core/common/content/FullDialogContent'
import CheckBox from 'app-core/checkbox/CheckBox'
import Label from '../../../components/element/Label'
import Button from '../../../components/button/Button'

import List from '../../../core/interface/List'
import {handlePageListData} from '../../common/common-helper'
import {getDateStr} from '../../../core/utils/dateUtils'
import {fetchDoctorDealList, dealDealApplies} from '../doctor-wallet.action'
import {filters, DOCTOR_WALLET_TYPE_MAPPER} from '../doctor-wallet.constant'

interface DoctorWalletDealRecordDialogProps {
  fetchDoctorDealList: (type, start, options) => void
  doctorWalletDealList: any
  dealDealApplies: (type, withdrawIds) => void
  dealDealSuccess: boolean
  onExited: () => void
  doctor_name: string
  doctor_info_id: string
  type: string
}

class DoctorWalletDealRecordDialog extends React.Component<DoctorWalletDealRecordDialogProps> {
  start = 0
  doctor_info_id = ''
  state = {
    show: true,
    showAddConfirm: false,
    startDate: null,
    endDate: null,
    checkedChanged: false,
    selectDealList: []
  }

  close = () => {
    this.setState({show: false})
  }

  loadMoreList = () => {
    let {list, total} = handlePageListData(this.props.doctorWalletDealList)
    if (total != -1 && list.length == total) {
      return
    }
    this.load()
  }

  load = () => {
    this.props.fetchDoctorDealList(this.props.type, this.start, {
      'doctor_info_id': this.doctor_info_id,
      'begin_time': this.state.startDate,
      'end_time': this.state.endDate,
      'limit': 10,
      'start': this.start
    })
    this.start++
  }

  search = () => {
    this.start = 0
    this.load()
  }

  handleResponseData = (responseData: any) => {
    let bank_name = '', card_owner = '', card_num = '', list = [], total = 0
    if (responseData.data) {
      if (responseData.data.bank_name) {
        bank_name = responseData.data.bank_name
      }
      if (responseData.data.card_owner) {
        card_owner = responseData.data.card_owner
      }
      if (responseData.data.card_num) {
        card_num = responseData.data.card_num
      }
      if (responseData.data.list) {
        list = responseData.data.list
      }
      if (responseData.data.total) {
        total = responseData.data.total
      }
    }
    return {list, total, bank_name, card_owner, card_num}
  }

  checkBoxChanged = (checked, index) => {
    let {list, total, bank_name, card_owner, card_num} = this.handleResponseData(this.props.doctorWalletDealList)
    let preSelectList = this.state.selectDealList
    let item = list[index]

    let location = preSelectList.indexOf(item)

    if (location == -1) {
      preSelectList.push(item)
    } else {
      preSelectList.splice(location, 1)
    }
    this.setState({selectDealList: preSelectList})
  }

  configSelectAllList = () => {
    this.configSelectList(true)
  }

  configSelectNothingList = () => {
    this.configSelectList(false)
  }

  configSelectList = (all) => {
    const {list, total, bank_name, card_owner, card_num} = this.handleResponseData(this.props.doctorWalletDealList)
    if (all) this.setState({selectDealList: list.slice(0)})
    else this.setState({selectDealList: []})
  }

  dealDealList = () => {
    let ids = this.state.selectDealList.map((item, index) => {
      return item['withdraw_id']
    })
    if (ids.length) this.props.dealDealApplies(this.props.type, ids)
  }

  getCheckedStatus = (item) => {
    return this.state.selectDealList.indexOf(item) != -1
  }

  getAmount = () => {
    let cost = 0
    this.state.selectDealList.map((item, index) => {
      cost += item['amount']
    })
    return cost
  }

  componentDidMount() {
    if (this.props.doctor_info_id) {
      this.doctor_info_id = this.props.doctor_info_id
    }
    this.load()
  }

  componentWillReceiveProps(nextProps: DoctorWalletDealRecordDialogProps) {
    if (!this.props.dealDealSuccess && nextProps.dealDealSuccess) {
      let {list, total, bank_name, card_owner, card_num} = this.handleResponseData(this.props.doctorWalletDealList)
      if (list.length <= this.state.selectDealList.length) {
        this.setState({show: false})
      } else {
        this.setState({selectDealList: []})

        this.start = 0
        this.load()
      }
    }
  }

  render() {
    let {list, total, bank_name, card_owner, card_num} = this.handleResponseData(this.props.doctorWalletDealList)
    return (
      <Modal contentComponent={FullDialogContent} style={{width: '650px'}} className="qa-operation-list-dialog"
             show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >
        {
          this.state.showAddConfirm && (
            <Confirm message={'确定要将医生' + card_owner + '的共计' + '￥' + this.getAmount() + (this.props.type == DOCTOR_WALLET_TYPE_MAPPER.has_deal ? '已' : '未') + '处理提现申请改为' + (this.props.type == DOCTOR_WALLET_TYPE_MAPPER.has_deal ? '未' : '已') + '处理吗？'}
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={this.dealDealList}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>{this.props.doctor_name + '的' + (this.props.type == DOCTOR_WALLET_TYPE_MAPPER.has_deal ? '已' : '未') + '处理提现申请'}</Modal.Title>
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
              <div>
                <Button onClick={this.search}>搜索</Button>
              </div>
            </div>

            <ScrollContainer onScrollBottom={this.loadMoreList} className="order-item-wrap">
              {
                list.map((item, index) => {
                  return (
                    <div className="wallet-record-list-container">

                      <div className="wallet-record-list">
                        <CheckBox checked={this.getCheckedStatus(item)} onChange={(v) => this.checkBoxChanged(v, index)} disabled={false}/>

                        {'￥' + item['amount']}
                        &#12288;&#12288;
                        {item['status']}

                      </div>

                      <div className="wallet-record-list">
                        {'申请时间：' + item['time']}
                      </div>

                    </div>
                  )
                })
              }
            </ScrollContainer>

            <div className="select-all-nothing-container">
              <Button onClick={this.configSelectAllList}>全选</Button>
              <Button onClick={this.configSelectNothingList}>全不选</Button>
            </div>

            <div className="bank-info-select-info-container">
              <div className="bank-info-container">
                <div className="bank-info-item">
                  {'开户行：' + bank_name}
                </div>
                <div className="bank-info-item">
                  {'持卡人：' + card_owner}
                </div>
                <div className="bank-info-item">
                  {'卡号：' + card_num}
                </div>
              </div>

              <div className="select-item-container">
                <Label>已选中申请总金额</Label>
                <div className="select-info-item">
                  {'￥' + this.getAmount()}
                </div>
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          已加载 {list.length} 条数据，总共 {total} 条数据
          <div className="select-all-nothing-container">
            {this.props.type == DOCTOR_WALLET_TYPE_MAPPER.has_deal && (
              <Button className="select-all-button" onClick={() => this.setState({showAddConfirm: true})}>改为未处理</Button>
            )}
            {this.props.type == DOCTOR_WALLET_TYPE_MAPPER.not_deal && (
              <Button className="select-nothing-button" onClick={() => this.setState({showAddConfirm: true})}>改为已处理</Button>
            )}
          </div>

        </Modal.Footer>

      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    doctorWalletDealList: state.doctorWalletDealList,
    dealDealSuccess: state.doctorWallet.dealDealSuccess
  }
}

export default connect(mapStateToProps, {fetchDoctorDealList, dealDealApplies})(DoctorWalletDealRecordDialog)
