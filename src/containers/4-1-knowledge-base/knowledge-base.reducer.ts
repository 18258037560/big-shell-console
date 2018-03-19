/**
 * zhouhangshuai on 2018-1-5
 */
import {fromJS} from 'immutable'

import {KNOWLEDGE_BASE} from "../../core/constants/types";
import {flagState} from "../common/common-helper";

const initValue = {
    updateRemarkSuccess: false,
    addKnowledgeBaseSuccess:false,
    updateKnowledgeBaseSuccess:false,
    deleteKnowledgeBaseSuccess:false
}

export default function knowledgeBase(iState = fromJS(initValue), action) {
    let nextIState = iState

    nextIState = flagState(nextIState, action)
        .handle(KNOWLEDGE_BASE.UPDATE_REMARK, 'updateRemarkSuccess')
        .handle(KNOWLEDGE_BASE.ADD_KNOWLEDGEBASE,'addKnowledgeBaseSuccess')
        .handle(KNOWLEDGE_BASE.UPDATE_KNOWLEDGEBASE,'updateKnowledgeBaseSuccess')
        .handle(KNOWLEDGE_BASE.DELETE_KNOWLEDGEBASE,'deleteKnowledgeBaseSuccess')
        .get()

    return nextIState
}