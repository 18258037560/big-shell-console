import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import {FlexDiv, Part, Line} from 'app-core/layout/'
import Input from 'app-core/form/Input'
import {ReducerType} from '../../../reducers/index'
import Label from '../../../components/element/Label'
import Data from '../../../core/interface/Data'
import ValueText from '../../../core/interface/ValueText'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import {updateAccount, deleteAccount, resetPasswordAccount} from '../account-management.action'
import {AccountItem} from '../interface/AccountItem'
import Button from '../../../components/button/Button'

interface UpdateAccountDialogProps {
  account: AccountItem
  authorityList: Data<ValueText[]>

  updateAccount: (options) => void
  updateAccountSuccess: boolean

  deleteAccount: (backend_user_id, type) => void
  deleteAccountSuccess: boolean

  resetPasswordAccount: (backend_user_id, type) => void
  resetPasswordAccountSuccess: boolean
  onExited: () => void
}

class UpdateAccountDialog extends React.Component<UpdateAccountDialogProps> {
  state = {
    show: true,

    showDeleteConfirm: false,
    showResetPasswordConfirm: false,
    showSureUpdateConfirm: false,

    backend_user_account: '',
    backend_user_id: '',
    backend_user_name: '',
    group_id: '',
    operation_person: ''
  }

  close = () => {
    this.setState({show: false})
  }

  deleteAccount = () => {
    this.props.deleteAccount(this.state.backend_user_id, 1)
  }

  resetPasswordAccount = () => {
    this.props.resetPasswordAccount(this.state.backend_user_id, 2)
  }

  updateAccount = () => {
    this.props.updateAccount({
      'backend_user_account': this.state.backend_user_account,
      'backend_user_id': this.state.backend_user_id,
      'backend_user_name': this.state.backend_user_name,
      'group_id': this.state.group_id
      // "operation_person": this.state.operation_person,
    })
  }

  componentWillMount() {
    const {
      backend_user_id, backend_user_account, backend_user_name, group_Id,
      group_Name, remark, create_time
    } = this.props.account
    this.setState({
      backend_user_id: backend_user_id,
      backend_user_account: backend_user_account,
      backend_user_name: backend_user_name,
      group_id: group_Id,
      group_Name: group_Name,
      remark: remark,
      create_time: create_time
    })
  }

  componentWillReceiveProps(nextProps: UpdateAccountDialogProps) {
    if (!this.props.updateAccountSuccess && nextProps.updateAccountSuccess) {
      this.close()
    }
    if (!this.props.deleteAccountSuccess && nextProps.deleteAccountSuccess) {
      this.close()
    }
    if (!this.props.resetPasswordAccountSuccess && nextProps.resetPasswordAccountSuccess) {
      this.close()
    }

  }

  render() {
    return (
      <Modal className="add-hospital-dialog" show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showDeleteConfirm && (
            <Confirm message="确定删除账号吗？"
                     onExited={() => this.setState({showDeleteConfirm: false})}
                     onConfirm={this.deleteAccount}/>
          )
        }

        {
          this.state.showResetPasswordConfirm && (
            <Confirm message="确定重置密码吗？"
                     onExited={() => this.setState({showResetPasswordConfirm: false})}
                     onConfirm={this.resetPasswordAccount}/>
          )
        }

        {
          this.state.showSureUpdateConfirm && (
            <Confirm message="确定修改账号吗？"
                     onExited={() => this.setState({showSureUpdateConfirm: false})}
                     onConfirm={this.updateAccount}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>修改账号</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FlexDiv>
            <Part>
              <Label>账号</Label>
            </Part>
            <Part weight={2}>
              <Input value={this.state.backend_user_account} onChange={v => this.setState({backend_user_account: v})}/>
            </Part>
          </FlexDiv>

          <Line/>

          <FlexDiv>
            <Part>
              <Label>姓名</Label>
            </Part>
            <Part weight={2}>
              <Input value={this.state.backend_user_name} onChange={v => this.setState({backend_user_name: v})}/>
            </Part>
          </FlexDiv>

          <Line/>

          <FlexDiv>
            <Part>
              <Label>权限分组</Label>
            </Part>
            <Part weight={2}>
              <Select1 options={this.props.authorityList.data || []} value={this.state.group_id} onChange={v => this.setState({group_id: v})}/>
            </Part>
          </FlexDiv>

          <Line/>

        </Modal.Body>
        <Modal.Footer>
          <div className="flex between button-container">
            <Button onClick={() => this.setState({showDeleteConfirm: true})}>删除账号</Button>
            <Button onClick={() => this.setState({showResetPasswordConfirm: true})}>重置密码</Button>
            <Button onClick={() => this.setState({showSureUpdateConfirm: true})}>确认修改</Button>
          </div>
        </Modal.Footer>

      </Modal>
    )
  }
}

function mapStateToProps(state: ReducerType) {
  return {
    authorityList: state.authorityList,
    updateAccountSuccess: state.accountManagement.updateAccountSuccess,
    deleteAccountSuccess: state.accountManagement.deleteAccountSuccess,
    resetPasswordAccountSuccess: state.accountManagement.resetPasswordAccountSuccess

  }
}

export default connect(mapStateToProps, {updateAccount, deleteAccount, resetPasswordAccount})(UpdateAccountDialog)