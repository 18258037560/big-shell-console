/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'

import {TELEPHONE_CONSULT} from '../../core/constants/types'
import {flagState} from '../common/common-helper'

const initValue = {
  updateRemarkSuccess: false,
  updateIsHideSuccess: false,
  updateAppealResultSuccess: false,
  updateServiceInfoSuccess: false,
  refundMoneySuccess: false
}

export default function telephoneConsult(iState = fromJS(initValue), action) {
  let nextIState = iState

  nextIState = flagState(nextIState, action)
  .handle(TELEPHONE_CONSULT.UPDATE_REMARK, 'updateRemarkSuccess')
  .handle(TELEPHONE_CONSULT.UPDATE_IS_HIDE_STATE, 'updateIsHideSuccess')
  .handle(TELEPHONE_CONSULT.UPDATE_APPEAL_RESULT, 'updateAppealResultSuccess')
  .handle(TELEPHONE_CONSULT.ADD_SERVICE_INFO, 'updateServiceInfoSuccess')
  .handle(TELEPHONE_CONSULT.DELETE_SERVICE_INFO, 'updateServiceInfoSuccess')
  .handle(TELEPHONE_CONSULT.REFUND_MONEY, 'refundMoneySuccess')
  .get()

  return nextIState
}
