import React from 'react'
import {connect} from 'react-redux'
import Data from '../../core/interface/Data'
import ValueText from '../../core/interface/ValueText'

import AppFunctionPage from '../../core/interface/AppFunctionPage'
import Button from '../../components/button/Button'
import EditRemark from '../../components/EditRemark'

import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import {handleListData} from '../common/common-helper'
import {ReducerType} from '../../reducers/index'
import {filters} from './account-management.constant'
import SearchBox from '../../components/search/SearchBox'
import FilterItem from '../../components/query-filter/FilterItem'
import FilterOptions from '../../components/query-filter/FilterOptions'
import PageCountNav from '../../components/nav/PageCountNav'
import addCommonFunction from '../../core/hoc/addCommonFunction'
import Icon from '../../components/Icon'
import SelectedItem from '../../components/query-filter/SelectedItem'
import SelectedFilter from '../../components/query-filter/SelectedFilter'
import {fetchList, updateRemark, addAccount} from './account-management.action'
import {fetchAuthorityList} from '../app.action'

import AddAccountDialog from './dialog/AddAccountDialog'
import UpdateAccountDialog from './dialog/UpdateAccountDialog'

interface AccountManagementProps extends AppFunctionPage {
  accountList: Data<any>

  authorityList: Data<ValueText[]>
  fetchAuthorityList: () => void

  updateRemark: (id, remark) => void
  updateRemarkSuccess: boolean

  addAccount: (options) => void
  addAccountSuccess: boolean

  updateAccountSuccess: boolean
  deleteAccountSuccess: boolean
  resetPasswordAccountSuccess: boolean
}

class AccountManagement extends React.Component<AccountManagementProps> {
  state = {
    currentPage: 0,
    index: -1,
    searchKey: '',
    selectAuthority: '',
    showEditRemark: false,
    showAddBtn: false,
    showEditBtn: false

  }

  toPage = (newPage ?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      'backend_user_account': this.state.searchKey,
      'group_id': this.state.selectAuthority,
      'rows': 10,
      'start': newPage
    })
  }

  componentDidMount() {
    if (!this.props.authorityList.loaded) {
      this.props.fetchAuthorityList()
    }
    this.toPage(0)
  }

  componentWillReceiveProps(nextProps: AccountManagementProps) {
    if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
      this.props.showSuccess('修改备注成功！')
      this.toPage()
    }
    if (!this.props.addAccountSuccess && nextProps.addAccountSuccess) {
      this.props.showSuccess('添加账号成功！')
      this.toPage()
    }
    if (!this.props.updateAccountSuccess && nextProps.updateAccountSuccess) {
      this.props.showSuccess('修改账号成功！')
      this.toPage()
    }
    if (!this.props.deleteAccountSuccess && nextProps.deleteAccountSuccess) {
      this.props.showSuccess('删除账号成功！')
      this.toPage()
    }
    if (!this.props.resetPasswordAccountSuccess && nextProps.resetPasswordAccountSuccess) {
      this.props.showSuccess('重置密码成功！')
      this.toPage()
    }

  }

  updateRemark = (newRemark) => {
    const item = handleListData(this.props.accountList).list[this.state.index]
    this.props.updateRemark(item['backend_user_id'], newRemark)
  }

  clearAllFilter = () => {
    this.setState({
      selectAuthority: ''
    })
  }

  getSelectAuthorityValue = () => {
    let authorityList = this.props.authorityList.data || []
    let selectItemIndex = authorityList.findIndex(item => {
      return item.value == this.state.selectAuthority;
    })
    return selectItemIndex == -1 ? '' : authorityList[selectItemIndex].text
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.accountList)
    const item = list[this.state.index] || {}
    let authorityList = this.props.authorityList.data || []
    return (
      <div className="app-function-page">
        {

          this.state.showAddBtn && (
            <AddAccountDialog
              onExited={() => this.setState({showAddBtn: false})}
            />
          )
        }
        {

          this.state.showEditBtn && (
            <UpdateAccountDialog
              account={item}
              onExited={() => this.setState({showEditBtn: false})}
            />
          )
        }
        {
          this.state.showEditRemark && (
            <EditRemark
              value={item['remark']}
              updateRemark={this.updateRemark} updateRemarkSuccess={this.props.updateRemarkSuccess} onExited={() => this.setState({showEditRemark: false})}/>
          )
        }
        <div className="toolbar">
          <div>
            <Button onClick={() => this.setState({showAddBtn: true})}>新增账号</Button>
            <Button disabled={this.state.index == -1} onClick={() => this.setState({showEditBtn: true})}>修改</Button>
          </div>
          <div>
            <SearchBox label="" placeholder="输入接收人账号查询"
                       searchKey={this.state.searchKey} onChange={v => this.setState({searchKey: v})}
                       onSearch={() => this.toPage(0)}
            />
          </div>
        </div>
        <div className="query-filter">
          <FilterItem label="权限包含">
            <FilterOptions options={authorityList} useSelect={true} value={this.state.selectAuthority}
                           onChange={v => this.setState({selectAuthority: v})}/>
          </FilterItem>

          <SelectedFilter
            notEmpty={this.state.selectAuthority != ''}
            beginFilter={() => this.toPage(0)}
            clearAll={this.clearAllFilter}
          >

            <SelectedItem
              label="权限包含" text={this.getSelectAuthorityValue()}
              onReset={() => this.setState({selectAuthority: ''})}
            />

          </SelectedFilter>

        </div>
        <FixHeadList total={total} minWidth="800px" weights={[1, 1, 3, 3, 2]}>
          <FixHead>
            <FixHead.Item>账号</FixHead.Item>
            <FixHead.Item>姓名</FixHead.Item>
            <FixHead.Item>分组</FixHead.Item>
            <FixHead.Item>备注</FixHead.Item>
            <FixHead.Item>创建时间</FixHead.Item>
          </FixHead>
          <FixBody>
            {
              list.map((item, index) => {
                return (
                  <FixRow key={item['backend_user_id']}
                          onClick={() => this.setState({index})}
                          selected={this.state.index == index}
                  >
                    <FixRow.Item>{item['backend_user_account']}</FixRow.Item>
                    <FixRow.Item>{item['backend_user_name']}</FixRow.Item>
                    <FixRow.Item>{item['group_Name']}</FixRow.Item>
                    <FixRow.Item>
                      {item['remark']}<Icon type="remark" onClick={() => this.setState({showEditRemark: true})}/>
                    </FixRow.Item>
                    <FixRow.Item>{item['create_time']}</FixRow.Item>
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
    accountList: state.accountList,
    authorityList: state.authorityList,
    updateAccountSuccess: state.accountManagement.updateAccountSuccess,
    deleteAccountSuccess: state.accountManagement.deleteAccountSuccess,
    resetPasswordAccountSuccess: state.accountManagement.resetPasswordAccountSuccess,
    updateRemarkSuccess: state.accountManagement.updateRemarkSuccess,
    addAccountSuccess: state.accountManagement.addAccountSuccess
  }
}

export default connect(mapStateToProps, {fetchList, fetchAuthorityList, updateRemark, addAccount})(
  addCommonFunction(AccountManagement)
)
