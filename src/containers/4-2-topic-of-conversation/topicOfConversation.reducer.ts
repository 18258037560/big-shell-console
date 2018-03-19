/**
 * zhouhangshuai on 2018-1-5
 */
import {fromJS} from 'immutable'

import {TOPIC} from "../../core/constants/types";
import {flagState} from "../common/common-helper";

const initValue = {
    updateRemarkSuccess: false,
    updateIsHideSuccess:false
}

export default function topicOfConversation(iState = fromJS(initValue), action) {
    let nextIState = iState

    nextIState = flagState(nextIState, action)
        .handle(TOPIC.UPDATE_TOPIC_REMARK, 'updateRemarkSuccess')
        .handle(TOPIC.AMEND_TOPIC_REMARK, 'updateRemarkSuccess')
        .handle(TOPIC.UPDATE_IS_HIDE_STATE, 'updateIsHideSuccess')
        .get()
    return nextIState
}