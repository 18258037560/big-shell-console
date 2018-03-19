/**
 * Created by jiangyukun on 2017/11/15.
 */
import React from 'react'
import {connect} from 'react-redux'

import Icon from '../../components/Icon'
import Button from '../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'
import SearchBox from '../../components/search/SearchBox'
import FilterItem from '../../components/query-filter/FilterItem'
import DateInterval from '../../components/query-filter/extends/DateInterval'
import FilterOptions from '../../components/query-filter/FilterOptions'
import SelectedFilter from '../../components/query-filter/SelectedFilter'
import EditRemark from '../../components/EditRemark'
import SelectedItem from '../../components/query-filter/SelectedItem'

import Data from '../../core/interface/Data'
import AppFunctionPage from '../../core/interface/AppFunctionPage'
import addCommonFunction from '../../core/hoc/addCommonFunction'
import {filters} from './user-appeal.constant'
import {handleListData, getStartEndDateStr, haveNotEmptyValue} from '../common/common-helper'
import {getDateStr} from '../../core/utils/dateUtils'
import {fetchList, updateRemark, fetchAppealTypeList} from './user-appeal.action'
import {getOrderTypeText} from './user-appeal.helper'
import OrderDetailDialog from '../3-1-questions-answers/dialog/OrderDetailDialog'
import ConsultDetailDialog from '../3-2-telephone-consult/dialog/ConsultDetailDialog'
import {exportExcel} from '../app.action'

interface UserAppealProps extends AppFunctionPage {
  userAppealList: Data<any>
  fetchAppealTypeList: () => void
  appealTypeList: Data<any[]>
  updateRemark: (orderCode, orderType, newRemark) => void
  updateRemarkSuccess: boolean
  updateConsultIsHideSuccess: boolean
  updateConsultAppealResultSuccess: boolean
  updateConsultServiceInfoSuccess: boolean
  refundConsultMoneySuccess: boolean

  updateQuestionIsHideSuccess: boolean,
  updateQuestionAppealResultSuccess: boolean,
  refundQuestionMoneySuccess: boolean
}

class UserAppeal extends React.Component<UserAppealProps> {
  state = {
    currentPage: 0,
    index: -1,
    showEditRemark: false,
    showOrderDetail: false,

    searchKey: '',
    orderType: '',
    appealType: '',
    appealStartDate: null,
    appealEndDate: null,
    handleResult: '',
    handleStartDate: null,
    handleEndDate: null
  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      'start': newPage,
      'limit': 10,
      'key_words': this.state.searchKey,
      'order_type': this.state.orderType,
      'appeal_type_id': this.state.appealType,
      'appeal_begin_time': getDateStr(this.state.appealStartDate),
      'appeal_end_time': getDateStr(this.state.appealEndDate),
      'appeal_result': this.state.handleResult,
      'appeal_result_begin_time': getDateStr(this.state.handleStartDate),
      'appeal_result_end_time': getDateStr(this.state.handleEndDate)
    })
  }

  handleExportExcel = () => {
    exportExcel('/export/appeal/list', {
      start: this.state.currentPage,
      limit: 10,
      key_words: this.state.searchKey,
      order_type: this.state.orderType,
      appeal_type_id: this.state.appealType,
      appeal_begin_time: getDateStr(this.state.appealStartDate),
      appeal_end_time: getDateStr(this.state.appealEndDate),
      appeal_result: this.state.handleResult,
      appeal_result_begin_time: getDateStr(this.state.handleStartDate),
      appeal_result_end_time: getDateStr(this.state.handleEndDate)
    })
  }

  clearAllFilter = () => {
    this.setState({
      searchKey: '',
      orderType: '',
      appealType: '',
      appealStartDate: null,
      appealEndDate: null,
      handleResult: '',
      handleStartDate: null,
      handleEndDate: null
    })
  }

  updateRemark = (newRemark) => {
    const item = handleListData(this.props.userAppealList).list[this.state.index]
    this.props.updateRemark(item['order_code'], item['order_type'], newRemark)
  }

  inspectOrder = (item) => {
    this.setState({showOrderDetail: true})
  }

  componentDidMount() {
    this.props.fetchAppealTypeList()
    this.toPage(0)
  }

  componentWillReceiveProps(nextProps: UserAppealProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.props.showSuccess('修改备注成功！')
      this.toPage()
    }
    if (!this.props.updateConsultIsHideSuccess && nextProps.updateConsultIsHideSuccess) {
      this.toPage()
    }
    if (!this.props.updateConsultServiceInfoSuccess && nextProps.updateConsultServiceInfoSuccess) {
      this.toPage()
    }
    if (!this.props.updateConsultAppealResultSuccess && nextProps.updateConsultAppealResultSuccess) {
      this.toPage()
    }
    if (!this.props.refundConsultMoneySuccess && nextProps.refundConsultMoneySuccess) {
      this.toPage()
    }
    if (!this.props.updateQuestionIsHideSuccess && nextProps.updateQuestionIsHideSuccess) {
      this.toPage()
    }
    if (!this.props.updateQuestionAppealResultSuccess && nextProps.updateQuestionAppealResultSuccess) {
      this.toPage()
    }
    if (!this.props.refundQuestionMoneySuccess && nextProps.refundQuestionMoneySuccess) {
      this.toPage()
    }
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.userAppealList)
    const item = list[this.state.index] || {}

    const order_type = item['order_type'] || ''
    return (
      <div className="app-function-page">
        {
          this.state.showEditRemark && (
            <EditRemark
              value={item['appeal_remark']}
              updateRemark={this.updateRemark} updateRemarkSuccess={this.props.updateRemarkSuccess} onExited={() => this.setState({showEditRemark: false})}/>
          )
        }
        {
          this.state.showOrderDetail && order_type == '1' && (
            <OrderDetailDialog
              orderCode={item['order_code'] || '0117110002401'}
              onExited={() => this.setState({showOrderDetail: false})}
            />
          )
        }
        {
          this.state.showOrderDetail && order_type == '2' && (
            <ConsultDetailDialog
              consultId={item['order_code'] || '0217110004842'}
              order_time={item['order_time'] || ''}
              pay_time={item['pay_time'] || ''}
              pay_money={item['pay_money'] || ''}
              onExited={() => this.setState({showOrderDetail: false})}
            />
          )
        }
        <div className="toolbar">
          <div>
            <Button disabled={this.state.index == -1} onClick={() => this.setState({showConsultDetail: true})}>查看</Button>
          </div>
          <div>
            <SearchBox label="患者" placeholder="输入手机号码、编号查询"
                       searchKey={this.state.searchKey} onChange={v => this.setState({searchKey: v})}
                       onSearch={() => this.toPage(0)}
            />
            <Button onClick={this.handleExportExcel}>导出到Excel</Button>
          </div>
        </div>
        <div className="query-filter">
          <FilterItem label="订单类别">
            <FilterOptions options={filters.orderType} value={this.state.orderType}
                           onChange={v => this.setState({orderType: v})}/>
          </FilterItem>
          <FilterItem label="申诉类别">
            <FilterOptions options={this.props.appealTypeList.data || []} useSelect={true}
                           value={this.state.appealType} onChange={v => this.setState({appealType: v})}/>
          </FilterItem>
          <FilterItem size="big" label="申诉时间">
            <DateInterval
              startDate={this.state.appealStartDate} endDate={this.state.appealEndDate}
              onStartDateChange={v => this.setState({appealStartDate: v})} onEndDateChange={v => this.setState({appealEndDate: v})}
            />
          </FilterItem>
          <FilterItem label="处理结果">
            <FilterOptions options={filters.handleResult} value={this.state.handleResult} onChange={v => this.setState({handleResult: v})}/>
          </FilterItem>
          <FilterItem size="big" label="处理时间">
            <DateInterval
              startDate={this.state.handleStartDate} endDate={this.state.handleEndDate}
              onStartDateChange={v => this.setState({handleStartDate: v})} onEndDateChange={v => this.setState({handleEndDate: v})}
            />
          </FilterItem>
          <SelectedFilter
            notEmpty={haveNotEmptyValue(this.state, ['orderType', 'appealType', 'appealStartDate', 'appealEndDate', 'handleResult', 'handleStartDate', 'handleEndDate'])}
            beginFilter={() => this.toPage(0)}
            clearAll={this.clearAllFilter}
          >
            <SelectedItem
              label="订单类别" value={this.state.orderType} options={filters.orderType}
              onReset={() => this.setState({orderType: ''})}
            />
            <SelectedItem
              label="申诉类别" value={this.state.appealType} options={this.props.appealTypeList.data || []}
              onReset={() => this.setState({appealType: ''})}
            />
            <SelectedItem
              label="申诉时间" text={getStartEndDateStr(this.state.appealStartDate, this.state.appealEndDate)}
              onReset={() => this.setState({appealStartDate: null, appealEndDate: null})}
            />
            <SelectedItem
              label="处理结果" value={this.state.handleResult} options={filters.handleResult}
              onReset={() => this.setState({handleResult: ''})}
            />
            <SelectedItem
              label="处理时间" text={getStartEndDateStr(this.state.handleStartDate, this.state.handleEndDate)}
              onReset={() => this.setState({handleStartDate: null, handleEndDate: null})}
            />
          </SelectedFilter>
        </div>
        <FixHeadList total={total} minWidth="1500px" weights={[1, 1, 1, 2, 2]}>
          <FixHead>
            <FixHead.Item>申诉订单</FixHead.Item>
            <FixHead.Item>订单类别</FixHead.Item>
            <FixHead.Item>订单</FixHead.Item>
            <FixHead.Item>申诉类别</FixHead.Item>
            <FixHead.Item>申诉内容</FixHead.Item>
            <FixHead.Item>申诉时间</FixHead.Item>
            <FixHead.Item>处理结果</FixHead.Item>
            <FixHead.Item>处理备注</FixHead.Item>
            <FixHead.Item>处理时间</FixHead.Item>
            <FixHead.Item>患者编号</FixHead.Item>
            <FixHead.Item>手机号码</FixHead.Item>
            <FixHead.Item>真实姓名</FixHead.Item>
          </FixHead>
          <FixBody>
            {
              list.map((item, index) => {
                return (
                  <FixRow key={item['order_code']}
                          onClick={() => this.setState({index})}
                          selected={this.state.index == index}
                  >
                    <FixRow.Item>{item['order_code']}</FixRow.Item>
                    <FixRow.Item>{getOrderTypeText(item['order_type'])}</FixRow.Item>
                    <FixRow.Item><a onClick={() => this.inspectOrder(item)}>查看订单</a></FixRow.Item>
                    <FixRow.Item>{item['appeal_type']}</FixRow.Item>
                    <FixRow.Item>{item['appeal_content']}</FixRow.Item>
                    <FixRow.Item>{item['appeal_time']}</FixRow.Item>
                    <FixRow.Item>{item['appeal_result']}</FixRow.Item>
                    <FixRow.Item>
                      {item['appeal_remark']}<Icon type="remark" onClick={() => this.setState({showEditRemark: true})}/>
                    </FixRow.Item>
                    <FixRow.Item>{item['appeal_result_time']}</FixRow.Item>
                    <FixRow.Item>{item['patient_code']}</FixRow.Item>
                    <FixRow.Item>{item['user_account']}</FixRow.Item>
                    <FixRow.Item>{item['real_name']}</FixRow.Item>
                  </FixRow>
                )
              })
            }
          </FixBody>
        </FixHeadList>
        <PageCountNav currentPage={this.state.currentPage} total={total} onPageChange={this.toPage}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    updateRemarkSuccess: state.userAppeal.updateRemarkSuccess,
    userAppealList: state.userAppealList,
    appealTypeList: state.appealTypeList,
    updateConsultIsHideSuccess: state.telephoneConsult.updateIsHideSuccess,
    updateConsultAppealResultSuccess: state.telephoneConsult.updateAppealResultSuccess,
    updateConsultServiceInfoSuccess: state.telephoneConsult.updateServiceInfoSuccess,
    refundConsultMoneySuccess: state.telephoneConsult.refundMoneySuccess,

    updateQuestionIsHideSuccess: state.qaOrder.updateIsHideSuccess,
    updateQuestionAppealResultSuccess: state.qaOrder.updateAppealResultSuccess,
    refundQuestionMoneySuccess: state.telephoneConsult.refundMoneySuccess

  }
}

export default connect(mapStateToProps, {fetchList, updateRemark, fetchAppealTypeList})(
  addCommonFunction(UserAppeal)
)
