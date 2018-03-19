/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'

import {QUESTIONS_ANSWERS} from '../../core/constants/types'
import {flagState} from '../common/common-helper'

const initValue = {
  updateRemarkSuccess: false,
  updateIsHideSuccess: false,
  updateAppealResultSuccess: false
}

export default function qaOrder(iState = fromJS(initValue), action) {
  let nextIState = iState

  nextIState = flagState(nextIState, action)
  .handle(QUESTIONS_ANSWERS.UPDATE_REMARK, 'updateRemarkSuccess')
  .handle(QUESTIONS_ANSWERS.UPDATE_IS_HIDE_STATE, 'updateIsHideSuccess')
  .handle(QUESTIONS_ANSWERS.UPDATE_APPEAL_RESULT, 'updateAppealResultSuccess')
  .get()

  return nextIState
}
