/**
 * Created by jiangyukun on 2017/11/6.
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {USER_APPEAL} from '../../core/constants/types'

const urlPrefix = '/backend/order';

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: USER_APPEAL.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/appeal/list', {body: options}),
      handleResponse: data => ({
        list: data['list'] || [],
        total: data['totalCount']
      })
    }
  }
}

export function fetchAppealTypeList() {
  return {
    [THREE_PHASE]: {
      type: USER_APPEAL.FETCH_APPEAL_TYPE_LIST,
      http: () => _get(urlPrefix + '/v1/appeal/type/list'),
      handleResponse: data => data.map(item => ({value: item['appeal_type_id'], text: item['appeal_type_value']}))
    }
  }
}

export function updateRemark(orderCode, orderType, remark) {
  return {
    [THREE_PHASE]: {
      type: USER_APPEAL.UPDATE_REMARK,
      http: () => _post(urlPrefix + `/v1/appeal/remark/edit?question_order_code=${orderCode}&order_type=${orderType}&appeal_remark=${remark}`)
    }
  }
}
