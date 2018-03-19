/**
 * Created by jiangyukun on 2017/10/18.
 */
import React from 'react'
import {connect} from 'react-redux'

import FilterItem from '../../components/query-filter/FilterItem'
import FilterOptions from '../../components/query-filter/FilterOptions'
import DateInterval from '../../components/query-filter/extends/DateInterval'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'
import ProvinceCity from '../../components/query-filter/extends/ProvinceCity'
import SelectedFilter from '../../components/query-filter/SelectedFilter'
import SelectedItem from '../../components/query-filter/SelectedItem'
import Button from '../../components/button/Button'
import SearchBox from '../../components/search/SearchBox'
import EditRemark from '../../components/EditRemark'
import Icon from '../../components/Icon'
import addCommonFunction from '../../core/hoc/addCommonFunction'

import Data from '../../core/interface/Data'
import ValueText from '../../core/interface/ValueText'
import AppFunctionPage from '../../core/interface/AppFunctionPage'
import {filters} from './patient-info'
import {fetchProvinceList, fetchCityList, exportExcel} from '../app.action'
import {fetchList, updateRemark} from './patient-info.action'
import {ReducerType} from '../../reducers/index'

import {
  handleListData,
  getStartEndDateStr,
  haveNotEmptyValue,
  getProvinceCityText,
  getSex
} from '../common/common-helper'

interface PatientInfoProps extends AppFunctionPage {
  fetchProvinceList: () => void
  fetchCityList: (provinceId) => void
  patientInfoList: Data<any>
  provinceList: Data<ValueText[]>
  cityList: Data<ValueText[]>

  updateRemark: any
  updateRemarkSuccess: boolean
}

class PatientInfo extends React.Component<PatientInfoProps> {
  state = {
    index: -1,
    currentPage: 0,
    showEditRemark: false,

    sex: '',
    province: '',
    city: '',
    search_key: '',
    createStartDate: null,
    createEndDate: null,
    lastLoginStartDate: null,
    lastLoginEndDate: null
  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      register_time_begin: this.state.createStartDate,
      register_time_end: this.state.createEndDate,
      lasted_login_time_begin: this.state.lastLoginStartDate,
      lasted_login_time_end: this.state.lastLoginEndDate,
      location_city: this.state.city,
      location_province: this.state.province,
      search_key: this.state.search_key,
      sex: this.state.sex,
      start: this.state.currentPage,
      rows: 10
    })
  }

  updateRemark = (newRemark) => {
    const {total, list, loading, loaded} = handleListData(this.props.patientInfoList)
    const item = list[this.state.index] || {}
    this.props.updateRemark(item['patient_info_id'], newRemark)
  }

  handleProvinceChange = (newProvinceId) => {
    if (newProvinceId) {
      this.props.fetchCityList(newProvinceId)
    }
    this.setState({province: newProvinceId, city: ''})
  }

  componentDidMount() {
    this.toPage(0)
    if (!this.props.provinceList.loaded) {
      this.props.fetchProvinceList()
    }
  }

  componentWillReceiveProps(nextProps: PatientInfoProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.props.showSuccess('更新备注成功！')
      this.toPage()
    }
  }

  clearAllFilter = () => {
    this.setState({
      sex: '',
      province: '',
      city: '',
      search_key: '',
      createStartDate: '',
      createEndDate: '',
      lastLoginStartDate: '',
      lastLoginEndDate: ''
    })
  }

  handleExportExcel = () => {
    exportExcel('/export/patient/list', {
      register_time_begin: this.state.createStartDate,
      register_time_end: this.state.createEndDate,
      lasted_login_time_begin: this.state.lastLoginStartDate,
      lasted_login_time_end: this.state.lastLoginEndDate,
      location_city: this.state.city,
      location_province: this.state.province,
      search_key: this.state.search_key,
      sex: this.state.sex,
      start: this.state.currentPage
    })
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.patientInfoList)
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

        <div className="toolbar">
          <div>
          </div>

          <div>
            <SearchBox label="患者" placeholder="输入手机号码、编号查询"
                       searchKey={this.state.search_key} onChange={v => this.setState({search_key: v})}
                       onSearch={() => this.toPage(0)}
            />
            <Button disabled={false} onClick={this.handleExportExcel}>导到Excel</Button>
          </div>

        </div>

        <div className="query-filter">
          <FilterItem label="性别">
            <FilterOptions options={filters.sex} value={this.state.sex} onChange={v => this.setState({sex: v})}/>
          </FilterItem>
          <FilterItem label="所在地区">
            <ProvinceCity
              province={this.state.province} city={this.state.city}
              provinceList={this.props.provinceList.data || []} cityList={this.props.cityList.data || []}
              onProvinceChange={this.handleProvinceChange} onCityChange={v => this.setState({city: v})}
            />
          </FilterItem>
          <FilterItem label="注册日期">
            <DateInterval
              startDate={this.state.createStartDate}
              endDate={this.state.createEndDate}
              onStartDateChange={v => this.setState({createStartDate: v})}
              onEndDateChange={v => this.setState({createEndDate: v})}
            />
          </FilterItem>
          <FilterItem label="最近登录日期">
            <DateInterval
              startDate={this.state.lastLoginStartDate}
              endDate={this.state.lastLoginEndDate}
              onStartDateChange={v => this.setState({lastLoginStartDate: v})}
              onEndDateChange={v => this.setState({lastLoginEndDate: v})}
            />
          </FilterItem>
          <div className="query-filter">
            <SelectedFilter
              notEmpty={haveNotEmptyValue(this.state, ['sex', 'province', 'city', 'createStartDate', 'createEndDate', 'lastLoginStartDate', 'lastLoginEndDate'])}
              beginFilter={() => this.toPage(0)}
              clearAll={this.clearAllFilter}
            >

              <SelectedItem
                label="性别" text={getSex(this.state.sex)}
                onReset={() => this.setState({sex: ''})}
              />
              <SelectedItem
                label="所在地区" text={getProvinceCityText(this.state.province, this.state.city, this.props.provinceList.data, this.props.cityList.data)}
                onReset={() => this.setState({province: '', city: ''})}
              />
              <SelectedItem
                label="注册日期" text={getStartEndDateStr(this.state.createStartDate, this.state.createEndDate)}
                onReset={() => this.setState({createStartDate: null, createEndDate: null})}
              />
              <SelectedItem
                label="最近登录日期" text={getStartEndDateStr(this.state.lastLoginStartDate, this.state.lastLoginEndDate)}
                onReset={() => this.setState({lastLoginStartDate: null, lastLoginEndDate: null})}
              />

            </SelectedFilter>

          </div>

        </div>

        <FixHeadList total={total}>
          <FixHead>
            <FixHead.Item>患者编号</FixHead.Item>
            <FixHead.Item>手机号码</FixHead.Item>
            <FixHead.Item>昵称</FixHead.Item>
            <FixHead.Item>头像</FixHead.Item>
            <FixHead.Item>真实姓名</FixHead.Item>
            <FixHead.Item>性别</FixHead.Item>
            <FixHead.Item>出生日期</FixHead.Item>
            <FixHead.Item>所在地区</FixHead.Item>
            <FixHead.Item>注册日期</FixHead.Item>
            <FixHead.Item>登录机型</FixHead.Item>
            <FixHead.Item>系统</FixHead.Item>
            <FixHead.Item>登录时间</FixHead.Item>
            <FixHead.Item>APP版本</FixHead.Item>
            <FixHead.Item>备注</FixHead.Item>
          </FixHead>
          <FixBody>
            {
              list.map((item, index) => {
                return (
                  <FixRow key={item['patient_user_id']}
                          onClick={() => this.setState({index})}
                          selected={this.state.index == index}>
                    <FixRow.Item>{item['patient_code']}</FixRow.Item>
                    <FixRow.Item>{item['patient_phone']}</FixRow.Item>
                    <FixRow.Item>{item['nick_name']}</FixRow.Item>
                    <FixRow.Item>{item['photo_url']}</FixRow.Item>
                    <FixRow.Item>{item['real_name']}</FixRow.Item>
                    <FixRow.Item>{item['sex']}</FixRow.Item>
                    <FixRow.Item>{item['birth_time']}</FixRow.Item>
                    <FixRow.Item>{item['location']}</FixRow.Item>
                    <FixRow.Item>{item['register_time']}</FixRow.Item>
                    <FixRow.Item>{item['device_model']}</FixRow.Item>
                    <FixRow.Item>{item['device_system']}</FixRow.Item>
                    <FixRow.Item>{item['lasted_login_time']}</FixRow.Item>
                    <FixRow.Item>{item['app_version']}</FixRow.Item>
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

function mapStateToProps(state: ReducerType) {
  return {
    patientInfoList: state.patientInfoList,
    provinceList: state.provinceList,
    cityList: state.cityList,
    updateRemarkSuccess: state.patientInfo.updateRemarkSuccess
  }
}

export default connect(mapStateToProps, {fetchProvinceList, fetchCityList, fetchList, updateRemark})(
  addCommonFunction(PatientInfo)
)
