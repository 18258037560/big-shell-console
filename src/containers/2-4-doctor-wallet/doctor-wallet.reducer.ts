/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'

import {DOCTOR_WALLET} from '../../core/constants/types'
import {flagState} from '../common/common-helper'

const initValue = {
  updateRemarkSuccess: false,
  dealDealSuccess: false
}

export default function doctorWallet(iState = fromJS(initValue), action) {
  let nextIState = iState

  nextIState = flagState(nextIState, action)
  .handle(DOCTOR_WALLET.UPDATE_REMARK, 'updateRemarkSuccess')
  .handle(DOCTOR_WALLET.DEAL_DEAL_LIST, 'dealDealSuccess')
  .get()

  return nextIState
}
