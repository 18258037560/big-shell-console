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
import {addAccount} from '../account-management.action'

interface AddAccountDialogProps {
  authorityList: Data<ValueText[]>
  addAccount: (options) => void
  addAccountSuccess: boolean
  onExited: () => void
}

class AddAccountDialog extends React.Component<AddAccountDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,

    backend_user_account: '',
    backend_user_id: '',
    backend_user_name: '',
    group_id: '',
    operation_person: ''
  }

  close = () => {
    this.setState({show: false})
  }

  addAccount = () => {
    this.props.addAccount({
      'backend_user_account': this.state.backend_user_account,
      'backend_user_id': this.state.backend_user_id,
      'backend_user_name': this.state.backend_user_name,
      'group_id': this.state.group_id
      // "operation_person": this.state.operation_person,
    })
  }

  componentWillReceiveProps(nextProps: AddAccountDialogProps) {
    console.log('addAccountSuccess', this.props.addAccountSuccess, nextProps.addAccountSuccess);
    if (!this.props.addAccountSuccess && nextProps.addAccountSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal className="add-hospital-dialog" show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="确定添加账号吗？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={this.addAccount}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>新增账号</Modal.Title>
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
          <ConfirmOrClose onCancel={this.close} onConfirm={() => this.setState({showAddConfirm: true})}/>
        </Modal.Footer>

      </Modal>
    )
  }
}

function mapStateToProps(state: ReducerType) {
  return {
    authorityList: state.authorityList,
    addAccountSuccess: state.accountManagement.addAccountSuccess
  }
}

export default connect(mapStateToProps, {addAccount})(AddAccountDialog)