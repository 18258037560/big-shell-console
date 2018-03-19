/**
 * Created by jiangyukun on 2017/11/22.
 */
import React from 'react'
import {connect} from 'react-redux'

import Icon from '../../components/Icon'
import Button from '../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'
import SearchBox from '../../components/search/SearchBox'
import FilterItem from '../../components/query-filter/FilterItem'
import FilterOptions from '../../components/query-filter/FilterOptions'
import SelectedFilter from '../../components/query-filter/SelectedFilter'
import EditRemark from '../../components/EditRemark'
import SelectedItem from '../../components/query-filter/SelectedItem'
import HospitalSelect from '../../components/query-filter/extends/HospitalSelect'

import Data from '../../core/interface/Data'
import AppFunctionPage from '../../core/interface/AppFunctionPage'
import addCommonFunction from '../../core/hoc/addCommonFunction'
import {handleListData, haveNotEmptyValue, getPrice} from '../common/common-helper'
import {filters, DOCTOR_WALLET_TYPE_MAPPER} from './doctor-wallet.constant'
import {fetchList, updateRemark} from './doctor-wallet.action'
import {exportExcel, fetchHospitalList} from '../app.action'
import DoctorWalletOperationRecordDialog from './dialog/DoctorWalletOperationRecordDialog'
import WorkDay from '../../components/workDay/WorkDay'
import DoctorWalletDealRecordDialog from './dialog/DoctorWalletDealRecordDialog'

interface DoctorWalletProps extends AppFunctionPage {
  fetchHospitalList: () => void
  hospitalList: Data<any>
  doctorWalletList: Data<any>
  updateRemark: any
  updateRemarkSuccess: boolean
  dealDealSuccess: boolean
}

class DoctorWallet extends React.Component<DoctorWalletProps> {
  type: string
  state = {
    currentPage: 0,
    index: -1,
    showEditRemark: false,
    showOperationDialog: false,
    showDealContentList: false,

    searchKey: '',
    hospitalId: '',
    hospitalText: '',

    is_open_consult: '',
    is_open_question: '',
    has_not_withdraw: ''

  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      'start': newPage,
      'limit': 10,
      'search_key': this.state.searchKey,
      'hospital_id': this.state.hospitalId,
      'hospital_name': this.state.hospitalText,
      'is_open_question': this.state.is_open_question,
      'is_open_consult': this.state.is_open_consult,
      'has_not_withdraw': this.state.has_not_withdraw

    })
  }

  clearAllFilter = () => {
    this.setState({
      hospitalText: '',
      hospitalId: '',
      is_open_question: '',
      is_open_consult: '',
      has_not_withdraw: ''
    })
  }

  handleExportExcel = () => {
    exportExcel('/export/doctor/withdraw/list', {
      start: this.state.currentPage,
      limit: 10,
      search_key: this.state.searchKey,
      hospital_id: this.state.hospitalId,
      hospital_name: this.state.hospitalText,
      is_open_question: this.state.is_open_question,
      is_open_consult: this.state.is_open_consult,
      has_not_withdraw: this.state.has_not_withdraw
    })
  }

  updateRemark = (newRemark) => {
    const item = handleListData(this.props.doctorWalletList).list[this.state.index]
    this.props.updateRemark(item['doctor_info_id'], newRemark)
  }

  handleAmountClick = (index, type) => {
    this.type = type
    this.setState({index, showDealContentList: true})
  }

  getDealAmount(amount, index, type) {
    let amountString = ''
    if (amount == 0) {
      if (type == DOCTOR_WALLET_TYPE_MAPPER.has_deal) return <span>无已处理</span>
      if (type == DOCTOR_WALLET_TYPE_MAPPER.not_deal) return <span>无未处理</span>
    } else {
      if (type == DOCTOR_WALLET_TYPE_MAPPER.has_deal) amountString = amount + '条已处理'
      if (type == DOCTOR_WALLET_TYPE_MAPPER.not_deal) amountString = amount + '条未处理'
    }

    return (
      <a className="amount" onClick={() => this.handleAmountClick(index, type)}>{amountString}</a>
    )
  }

  componentDidMount() {
    if (!this.props.hospitalList.loaded) {
      this.props.fetchHospitalList()
    }
    this.toPage(0)
  }

  componentWillReceiveProps(nextProps: DoctorWalletProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.props.showSuccess('更新备注成功！')
      this.toPage()
    }
    if (!this.props.dealDealSuccess && nextProps.dealDealSuccess) {
      this.props.showSuccess('处理成功！')
      this.toPage()
    }
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.doctorWalletList)
    const item = list[this.state.index] || {}

    return (
      <div className="app-function-page laboratory-sheet">
        {
          this.state.showEditRemark && (
            <EditRemark
              value={item['doctor_asset_remark']}
              updateRemark={this.updateRemark} updateRemarkSuccess={this.props.updateRemarkSuccess} onExited={() => this.setState({showEditRemark: false})}/>
          )
        }
        {
          this.state.showOperationDialog && (
            <DoctorWalletOperationRecordDialog
              doctorCode={item['doctor_account'] || ''}
              onExited={() => this.setState({showOperationDialog: false})}
            />
          )
        }
        {
          this.state.showDealContentList && (
            <DoctorWalletDealRecordDialog
              onExited={() => this.setState({showDealContentList: false})}
              doctor_name={item['doctor_name']}
              doctor_info_id={item['doctor_info_id']}
              type={this.type}/>
          )
        }
        <div className="toolbar">
          <div>
            <Button disabled={this.state.index == -1} onClick={() => this.setState({showOperationDialog: true})}>操作记录</Button>
          </div>
          <div>
            <SearchBox label="医生" placeholder="输入手机号码、姓名查询"
                       searchKey={this.state.searchKey} onChange={v => this.setState({searchKey: v})}
                       onSearch={() => this.toPage(0)}
            />
            <Button onClick={this.handleExportExcel}>导出到Excel</Button>
          </div>
        </div>
        <div className="query-filter">
          <FilterItem label="医院" style={{width: '500px'}}>
            <HospitalSelect
              options={this.props.hospitalList.data || []}
              value={this.state.hospitalId} onValueChange={v => this.setState({hospitalId: v})}
              text={this.state.hospitalText} onTextChange={v => this.setState({hospitalText: v})}
            />
          </FilterItem>
          <FilterItem label="是否有未处理提现申请" style={{width: '500px'}}>
            <FilterOptions options={filters.department} value={this.state.has_not_withdraw} onChange={v => this.setState({has_not_withdraw: v})}/>
          </FilterItem>
          <FilterItem label="问答收费是否开启" style={{width: '500px'}}>
            <FilterOptions options={filters.isOpen} value={this.state.is_open_question} onChange={v => this.setState({is_open_question: v})}/>
          </FilterItem>
          <FilterItem label="咨询收费是否开启" style={{width: '500px'}}>
            <FilterOptions options={filters.isOpen} value={this.state.is_open_consult} onChange={v => this.setState({is_open_consult: v})}/>
          </FilterItem>

          <SelectedFilter
            notEmpty={haveNotEmptyValue(this.state, ['hospitalId', 'hospitalText', 'has_not_withdraw', 'is_open_question', 'is_open_consult'])}
            beginFilter={() => this.toPage(0)}
            clearAll={this.clearAllFilter}
          >
            {
              this.state.hospitalText && (
                <SelectedItem
                  label="医院" text={this.state.hospitalText}
                  onReset={() => this.setState({hospitalText: '', hospitalId: ''})}
                />
              )
            }

            <SelectedItem
              label="医院" value={this.state.hospitalId} options={this.props.hospitalList.data || []}
              onReset={() => this.setState({hospitalId: '', hospitalText: ''})}
            />

            <SelectedItem
              label="是否有未处理提现申请" value={this.state.has_not_withdraw} options={filters.department}
              onReset={() => this.setState({has_not_withdraw: ''})}
            />
            <SelectedItem
              label="问答收费是否开启" value={this.state.is_open_question} options={filters.isOpen}
              onReset={() => this.setState({is_open_question: ''})}
            />
            <SelectedItem
              label="科室" value={this.state.is_open_consult} options={filters.isOpen}
              onReset={() => this.setState({is_open_consult: ''})}
            />

          </SelectedFilter>
        </div>
        <FixHeadList total={total} minWidth="2200px" weights={[2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8, 4]}>
          <FixHead>
            <FixHead.Item>手机号码</FixHead.Item>
            <FixHead.Item>医生姓名</FixHead.Item>
            <FixHead.Item>医院</FixHead.Item>
            <FixHead.Item>可提现金额</FixHead.Item>
            <FixHead.Item>未记收益金额</FixHead.Item>
            <FixHead.Item>已提现金额</FixHead.Item>
            <FixHead.Item>未处理提现申请</FixHead.Item>
            <FixHead.Item>已处理提现申请</FixHead.Item>
            <FixHead.Item>问答收费是否开启</FixHead.Item>
            <FixHead.Item>咨询收费</FixHead.Item>
            <FixHead.Item>已回答次数</FixHead.Item>
            <FixHead.Item>问答收益</FixHead.Item>
            <FixHead.Item>问答评分</FixHead.Item>
            <FixHead.Item>咨询收费是否开启</FixHead.Item>
            <FixHead.Item>咨询收费</FixHead.Item>
            <FixHead.Item>已咨询次数</FixHead.Item>
            <FixHead.Item>咨询收益</FixHead.Item>
            <FixHead.Item>咨询评分</FixHead.Item>
            <FixHead.Item>可咨询时间</FixHead.Item>
            <FixHead.Item>备注</FixHead.Item>
          </FixHead>
          <FixBody>
            {
              list.map((item, index) => {
                return (
                  <FixRow key={index}
                          onClick={() => this.setState({index})}
                          selected={this.state.index == index}
                  >
                    <FixRow.Item>{item['doctor_account']}</FixRow.Item>
                    <FixRow.Item>{item['doctor_name']}</FixRow.Item>
                    <FixRow.Item>{item['hospital_name']}</FixRow.Item>
                    <FixRow.Item>{getPrice(item['can_withdraw_amount'])}</FixRow.Item>
                    <FixRow.Item>{getPrice(item['no_profit_amount'])}</FixRow.Item>
                    <FixRow.Item>{getPrice(item['has_withdraw_amount'])}</FixRow.Item>
                    <FixRow.Item>{this.getDealAmount(item['not_deal_withdraw_count'], index, DOCTOR_WALLET_TYPE_MAPPER.not_deal)}</FixRow.Item>
                    <FixRow.Item>{this.getDealAmount(item['has_deal_withdraw_count'], index, DOCTOR_WALLET_TYPE_MAPPER.has_deal)}</FixRow.Item>
                    <FixRow.Item>{item['is_open_question']}</FixRow.Item>
                    <FixRow.Item>{getPrice(item['question_price'])}</FixRow.Item>
                    <FixRow.Item>{item['answer_count'] + '次'}</FixRow.Item>
                    <FixRow.Item>{getPrice(item['question_profit'])}</FixRow.Item>
                    <FixRow.Item>{item['question_score']}</FixRow.Item>
                    <FixRow.Item>{item['is_open_consult']}</FixRow.Item>
                    <FixRow.Item>{getPrice(item['consult_price'])}</FixRow.Item>
                    <FixRow.Item>{item['consult_count'] + '次'}</FixRow.Item>
                    <FixRow.Item>{getPrice(item['consult_profit'])}</FixRow.Item>
                    <FixRow.Item>{item['consult_score']}</FixRow.Item>
                    <FixRow.Item>{
                      <WorkDay workDay={item['consult_time_array'] || []} title={''} imgSrc={require('../../components/workDay/departmentSelected.png')}/>}</FixRow.Item>
                    <FixRow.Item>{item['doctor_asset_remark']}<Icon type="remark" onClick={() => this.setState({showEditRemark: true})}/></FixRow.Item>
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
    hospitalList: state.hospitalList,
    updateRemarkSuccess: state.doctorWallet.updateRemarkSuccess,
    dealDealSuccess: state.doctorWallet.dealDealSuccess,
    doctorWalletList: state.doctorWalletList
  }
}

export default connect(mapStateToProps, {fetchHospitalList, fetchList, updateRemark})(
  addCommonFunction(DoctorWallet)
)
