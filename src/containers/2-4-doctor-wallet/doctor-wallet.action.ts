/**
 * Created by jiangyukun on 2017/11/6.
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {DOCTOR_WALLET} from '../../core/constants/types'
import {DOCTOR_WALLET_TYPE_MAPPER} from './doctor-wallet.constant'

const urlPrefix = '/backend/doctor'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: DOCTOR_WALLET.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/wallet/list', {body: options}),
      handleResponse: data => ({
        list: data['list'] || [],
        total: data['totalCount']
      })
    }
  }
}

export function updateRemark(doctor_info_id, remark) {
  return {
    [THREE_PHASE]: {
      type: DOCTOR_WALLET.UPDATE_REMARK,
      http: () => _post(urlPrefix + `/v1/wallet/remark/edit?doctor_info_id=${doctor_info_id}&remark=${remark}`)
    }
  }
}

export function fetchDoctorWalletOperationList(start, options) {
  return {
    [THREE_PHASE]: {
      type: DOCTOR_WALLET.FETCH_WALLET_OPERATION_LIST,
      startParam: {start},
      http: () => _post(urlPrefix + '/v1/wallet/withdraw/record/list', {body: options}),
      handleResponse: data => ({
        list: data['list'] || [],
        total: data['totalCount']
      })
    }
  }
}

export function fetchDoctorDealList(type, start, options) {
  let url = ``
  if (type == DOCTOR_WALLET_TYPE_MAPPER.has_deal) url = `/v1/wallet/has/deal/withdraw/list`
  if (type == DOCTOR_WALLET_TYPE_MAPPER.not_deal) url = `/v1/wallet/not/deal/withdraw/list`
  return {
    [THREE_PHASE]: {
      type: DOCTOR_WALLET.FETCH_WALLET_DEAL_LIST,
      startParam: {start},
      http: () => _post(urlPrefix + url, {body: options}),
      handleResponse: data => ({
        list: data['withdrawList'] || [],
        card_num: data['card_num'] || '',
        bank_name: data['bank_name'] || '',
        card_owner: data['card_owner'] || '',
        total: data['totalCount']
      })
    }
  }
}

export function dealDealApplies(type, withdrawIds) {
  let url = ``
  if (type == DOCTOR_WALLET_TYPE_MAPPER.has_deal) url = `/v1/wallet/batch/deal/has/withdraw`
  if (type == DOCTOR_WALLET_TYPE_MAPPER.not_deal) url = `/v1/wallet/batch/deal/not/withdraw`
  console.log(url)
  return {
    [THREE_PHASE]: {
      type: DOCTOR_WALLET.DEAL_DEAL_LIST,
      http: () => _post(urlPrefix + url, {body: withdrawIds})
    }
  }
}