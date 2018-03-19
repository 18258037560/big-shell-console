/**
 * Created by jiangyukun on 2017/11/6.
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {QUESTIONS_ANSWERS} from '../../core/constants/types'

const urlPrefix = '/backend/order'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: QUESTIONS_ANSWERS.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/question/list', {body: options}),
      handleResponse: data => ({
        list: data['list'] || [],
        total: data['totalCount']
      })
    }
  }
}

export function fetchOrderDetail(orderCode) {
  return {
    [THREE_PHASE]: {
      type: QUESTIONS_ANSWERS.FETCH_ORDER_DETAIL,
      http: () => _post(urlPrefix + `/v1/question/info/${orderCode}`),
      handleResponse: data => data
    }
  }
}

export function updateRemark(orderCode, remark) {
  return {
    [THREE_PHASE]: {
      type: QUESTIONS_ANSWERS.UPDATE_REMARK,
      http: () => _post(urlPrefix + `/v1/question/remark/edit?question_order_code=${orderCode}&order_remark=${remark}`)
    }
  }
}

export function fetchOrderOperationList(start, options) {
  return {
    [THREE_PHASE]: {
      type: QUESTIONS_ANSWERS.FETCH_ORDER_OPERATION_LIST,
      startParam: {start},
      http: () => _post(urlPrefix + '/v1/operate/record/list', {body: options}),
      handleResponse: data => ({
        list: data['list'],
        total: data['totalCount']
      })
    }
  }
}

export function updateIsHideState(orderCode) {
  return {
    [THREE_PHASE]: {
      type: QUESTIONS_ANSWERS.UPDATE_IS_HIDE_STATE,
      http: () => _post(urlPrefix + `/v1/question/hide/edit/${orderCode}`)
    }
  }
}

export function updateAppealResult(question_order_code, appeal_result, appeal_remark) {
  return {
    [THREE_PHASE]: {
      type: QUESTIONS_ANSWERS.UPDATE_APPEAL_RESULT,
      http: () => _post(urlPrefix + `/v1/question/appeal/result/edit?question_order_code=${question_order_code}&appeal_result=${appeal_result}&appeal_remark=${appeal_remark}`)
    }
  }
}