/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'

import {TREAT_SITUATION} from '../../core/constants/types'
import {flagState} from '../common/common-helper'
import phase from '../../core/constants/phase'

const initValue = {
  updateRemarkSuccess: false,

}

export default function treatSituation(iState = fromJS(initValue), action) {
  let nextIState = iState

  nextIState = flagState(nextIState, action)
    .handle(TREAT_SITUATION.UPDATE_REMARK, 'updateRemarkSuccess')
    .get()

  return nextIState
}
