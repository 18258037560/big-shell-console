import {fromJS} from 'immutable'

import {SYSTEM_MANAGEMENT} from '../../core/constants/types'
import {flagState} from '../common/common-helper'

const initValue = {
  updateRemarkSuccess: false,
  addAccountSuccess: false,
  updateAccountSuccess: false,
  deleteAccountSuccess: false,
  resetPasswordAccountSuccess: false
}

export default function accountManagement(iState = fromJS(initValue), action) {
  let nextIState = iState

  nextIState = flagState(nextIState, action)
  .handle(SYSTEM_MANAGEMENT.UPDATE_REMARK, 'updateRemarkSuccess')
  .handle(SYSTEM_MANAGEMENT.ADD_ACCOUNT, 'addAccountSuccess')
  .handle(SYSTEM_MANAGEMENT.UPDATE_ACCOUNT, 'updateAccountSuccess')
  .handle(SYSTEM_MANAGEMENT.DELETE_ACCOUNT, 'deleteAccountSuccess')
  .handle(SYSTEM_MANAGEMENT.RESET_PASSWORD_ACCOUNT, 'resetPasswordAccountSuccess')
  .get()

  return nextIState
}
