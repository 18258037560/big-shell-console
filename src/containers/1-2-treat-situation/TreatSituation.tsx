/**
 * Created by jiangyukun on 2017/11/21.
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
import CustomContent from '../../components/query-filter/extends/CustomContent'

import Data from '../../core/interface/Data'
import AppFunctionPage from '../../core/interface/AppFunctionPage'
import addCommonFunction from '../../core/hoc/addCommonFunction'
import {haveNotEmptyValue, handleListData} from '../common/common-helper'
import {filters} from './treat-situation.constant'
import {fetchList, updateRemark, fetchTreatSituationDetail} from './treat-situation.action'
import {exportExcel} from '../app.action'
import TreatSituationRecordsDialog from './dialog/TreatSituationRecordsDialog'

interface TreatSituationProps extends AppFunctionPage {
  treatSituationList: Data<any>
  updateRemark: any
  updateRemarkSuccess: boolean

  fetchTreatSituationDetail: (patient_info_id, start, rows) => void
}

class TreatSituation extends React.Component<TreatSituationProps> {
  state = {
    currentPage: 0,
    index: -1,
    showEditRemark: false,
    showDetail: false,

    searchKey: '',
    takeMedicine: '',
    week: '',
    patientConditionStatus: ''
  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      'start': newPage,
      'rows': 10,
      'search_key': this.state.searchKey,
      'lasted_use_drug_status': this.state.takeMedicine,
      'use_drug_week': this.state.week,
      'lasted_illness_status': this.state.patientConditionStatus,
      'hospital_id_str': ''
    })
  }

  clearAllFilter = () => {
    this.setState({
      searchKey: '',
      takeMedicine: '',
      week: '',
      patientConditionStatus: ''
    })
  }

  updateRemark = (newRemark) => {
    const item = handleListData(this.props.treatSituationList).list[this.state.index]
    this.props.updateRemark(item['patient_info_id'], newRemark)
  }

  fetchTreatSituationRecord = (patient_info_id, start, rows) => {
    this.props.fetchTreatSituationDetail(patient_info_id, start, rows)
  }

  handleExportExcel = () => {
    exportExcel('/export/treatment/list', {
      start: this.state.currentPage,
      rows: 10,
      search_key: this.state.searchKey,
      lasted_use_drug_status: this.state.takeMedicine,
      use_drug_week: this.state.week,
      lasted_illness_status: this.state.patientConditionStatus,
      hospital_id_str: ''
    })
  }

  componentDidMount() {
    this.toPage(0)
  }

  componentWillReceiveProps(nextProps: TreatSituationProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.props.showSuccess('更新备注成功！')
      this.toPage()
    }
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.treatSituationList)
    const item = list[this.state.index] || {}

    return (
      <div className="app-function-page">
        {
          this.state.showEditRemark && (
            <EditRemark
              value={item['remark']}
              updateRemark={this.updateRemark} updateRemarkSuccess={this.props.updateRemarkSuccess} onExited={() => this.setState({showEditRemark: false})}/>
          )
        }
        {
          this.state.showDetail && (
            <TreatSituationRecordsDialog
              fetchTreatSituationRecord={(patient_info_id, start, rows) => this.fetchTreatSituationRecord(patient_info_id, start, rows)}
              onExited={() => this.setState({showDetail: false})}
              patient_info_id={item['patient_info_id']}
              patient_name={item['patient_real_name']}
              patient_phone={item['patient_phone']}
            />
          )
        }

        <div className="toolbar">
          <div>
            <Button disabled={this.state.index == -1} onClick={() => this.setState({showDetail: true})}>查看</Button>
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
          <FilterItem label="服药状态">
            <FilterOptions
              options={filters.takeMedicine} value={this.state.takeMedicine}
              onChange={v => this.setState({takeMedicine: v})}/>
          </FilterItem>

          <FilterItem label="服药周数">
            <CustomContent value={this.state.week} onChange={v => this.setState({week: v})} unit="周"/>
          </FilterItem>
          <FilterItem label="病情状态">
            <FilterOptions
              options={filters.patientConditionStatus} value={this.state.patientConditionStatus}
              onChange={v => this.setState({patientConditionStatus: v})}/>
          </FilterItem>

          <SelectedFilter
            notEmpty={haveNotEmptyValue(this.state, [])}
            beginFilter={() => this.toPage(0)}
            clearAll={this.clearAllFilter}
          >
            <SelectedItem
              label="服药状态" value={this.state.takeMedicine} options={filters.takeMedicine}
              onReset={() => this.setState({takeMedicine: ''})}
            />
            {
              this.state.week && (
                <SelectedItem
                  label="服药周数" text={this.state.week + '周'}
                  onReset={() => this.setState({week: ''})}
                />
              )
            }
            <SelectedItem
              label="病情状态" value={this.state.patientConditionStatus} options={filters.patientConditionStatus}
              onReset={() => this.setState({patientConditionStatus: ''})}
            />
          </SelectedFilter>
        </div>
        <FixHeadList total={total} minWidth="800px" weights={[1, 1, 1, 2, 2]}>
          <FixHead>
            <FixHead.Item>患者编号</FixHead.Item>
            <FixHead.Item>手机号码</FixHead.Item>
            <FixHead.Item>真实姓名</FixHead.Item>
            <FixHead.Item>服药状态</FixHead.Item>
            <FixHead.Item>病情状态</FixHead.Item>
            <FixHead.Item>备注</FixHead.Item>
          </FixHead>
          <FixBody>
            {
              list.map((item, index) => {
                return (
                  <FixRow key={item['patient_info_id']}
                          onClick={() => this.setState({index})}
                          selected={this.state.index == index}
                  >
                    <FixRow.Item>{item['patient_info_id']}</FixRow.Item>
                    <FixRow.Item>{item['patient_phone']}</FixRow.Item>
                    <FixRow.Item>{item['patient_real_name']}</FixRow.Item>
                    <FixRow.Item>{item['lasted_use_drug_status']}</FixRow.Item>
                    <FixRow.Item>{item['lasted_illness_status']}</FixRow.Item>
                    <FixRow.Item>
                      {item['remark']}<Icon type="remark" onClick={() => this.setState({showEditRemark: true})}/>
                    </FixRow.Item>
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
    updateRemarkSuccess: state.treatSituation.updateRemarkSuccess,
    treatSituationList: state.treatSituationList
  }
}

export default connect(mapStateToProps, {fetchList, updateRemark, fetchTreatSituationDetail})(
  addCommonFunction(TreatSituation)
)