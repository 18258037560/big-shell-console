/**
 * Created by jiangyukun on 2017/11/6.
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {TELEPHONE_CONSULT} from '../../core/constants/types'

const urlPrefix = '/backend/order'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: TELEPHONE_CONSULT.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/consult/list', {body: options}),
      handleResponse: data => ({
        list: data['list'] || [],
        total: data['totalCount']
      })
    }
  }
}

export function fetchConsultDetail(consultOrderCode) {
  return {
    [THREE_PHASE]: {
      type: TELEPHONE_CONSULT.FETCH_CONSULT_DETAIL,
      http: () => _post(urlPrefix + `/v1/consult/info/${consultOrderCode}`),
      handleResponse: data => data
    }
  }
}

export function updateRemark(orderCode, remark) {
  return {
    [THREE_PHASE]: {
      type: TELEPHONE_CONSULT.UPDATE_REMARK,
      http: () => _post(urlPrefix + `/v1/consult/remark/edit?question_order_code=${orderCode}&order_remark=${remark}`)
    }
  }
}

export function updateIsHideState(orderCode) {
  return {
    [THREE_PHASE]: {
      type: TELEPHONE_CONSULT.UPDATE_IS_HIDE_STATE,
      http: () => _post(urlPrefix + `/v1/consult/hide/edit/${orderCode}`)
    }
  }
}

export function updateAppealResult(question_order_code, appeal_result, appeal_remark) {
  return {
    [THREE_PHASE]: {
      type: TELEPHONE_CONSULT.UPDATE_APPEAL_RESULT,
      http: () => _post(urlPrefix + `/v1/consult/appeal/result/edit?question_order_code=${question_order_code}&appeal_result=${appeal_result}&appeal_remark=${appeal_remark}`)
    }
  }
}

export function addServiceInfo(options) {
  return {
    [THREE_PHASE]: {
      type: TELEPHONE_CONSULT.ADD_SERVICE_INFO,
      http: () => _post(urlPrefix + '/v1/consult/service/status/add', {body: options})
    }
  }
}

export function deleteServiceInfo(service_info_id) {
  return {
    [THREE_PHASE]: {
      type: TELEPHONE_CONSULT.DELETE_SERVICE_INFO,
      http: () => _post(urlPrefix + `/v1/consult/service/status/del/${service_info_id}`)
    }
  }
}

export function refundMoney(payType, order_code) {
  let url = ''
  if (payType == '1') url = `/backend/pay/alipay/refund/${order_code}`
  if (payType == '2') url = `/backend/pay/wx/apply/refund/${order_code}`
  return {
    [THREE_PHASE]: {
      type: TELEPHONE_CONSULT.REFUND_MONEY,
      http: () => _post(url)
    }
  }
}
