import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {SYSTEM_MANAGEMENT} from '../../core/constants/types'

const urlPrefix = '/backend/system'


export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: SYSTEM_MANAGEMENT.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/user/list', {body: options}),
      handleResponse: data => ({
        list: data['list'] || [],
        total: data['count']
      })
    }
  }
}

export function updateRemark(backend_user_id, remark) {
  return {
    [THREE_PHASE]: {
      type: SYSTEM_MANAGEMENT.UPDATE_REMARK,
      http: () => _post(urlPrefix + `/v1/update/user/remark/?backend_user_id=${backend_user_id}&remark=${remark}`)
    }
  }
}

export function addAccount(options) {
  return {
    [THREE_PHASE]: {
      type: SYSTEM_MANAGEMENT.ADD_ACCOUNT,
      http: () => _post(urlPrefix + '/v1/update/user', {body: options})
    }
  }
}

export function updateAccount(options) {
  return {
    [THREE_PHASE]: {
      type: SYSTEM_MANAGEMENT.UPDATE_ACCOUNT,
      http: () => _post(urlPrefix + '/v1/update/user', {body: options})
    }
  }
}

export function deleteAccount(backend_user_id, operation_type) {
  return {
    [THREE_PHASE]: {
      type: SYSTEM_MANAGEMENT.DELETE_ACCOUNT,
      http: () => _get(urlPrefix + `/v1/deleteOrReset/user/${backend_user_id}/1`)
    }
  }
}

export function resetPasswordAccount(backend_user_id, operation_type) {
  return {
    [THREE_PHASE]: {
      type: SYSTEM_MANAGEMENT.RESET_PASSWORD_ACCOUNT,
      http: () => _get(urlPrefix + `/v1/deleteOrReset/user/${backend_user_id}/2`)
    }
  }
}

