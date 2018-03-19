import {fromJS} from 'immutable'

import {PATIENT_INFO} from '../../core/constants/types'
import {flagState} from '../common/common-helper'

const initValue = {
  updateRemarkSuccess: false,
}

export default function patientInfo(iState = fromJS(initValue), action) {
  let nextIState = iState

  nextIState = flagState(nextIState, action)
  .handle(PATIENT_INFO.UPDATE_REMARK, 'updateRemarkSuccess')
  .get()

  return nextIState
}
