/**
 * Created by jiangyukun on 2017/11/16.
 */
import {_get, _post} from '../core/http'
import {THREE_PHASE} from '../middlewares/request_3_phase'
import {APP} from '../core/constants/types'

export function fetchProvinceList() {
  return {
    [THREE_PHASE]: {
      type: APP.FETCH_PROVINCE_LIST,
      http: () => _get('/backend/doctor/v1/hospital/getHospitalProviceList'),
      handleResponse: data => data.map(item => ({
        value: item['id'], text: item['name']
      }))
    }
  }
}

export function fetchCityList(provinceId) {
  return {
    [THREE_PHASE]: {
      type: APP.FETCH_CITY_LIST,
      http: () => _get(`/backend/doctor/v1/hospital/getHospitalCityList/${provinceId}`),
      handleResponse: data => data.map(item => ({
        value: item['id'], text: item['city']
      }))
    }
  }
}

export function fetchHospitalList() {
  return {
    [THREE_PHASE]: {
      type: APP.FETCH_HOSPITAL_LIST,
      http: () => _get('/backend/doctor/v1/queryHospital/list'),
      handleResponse: data => data.map(item => ({
        value: item['id'], text: item['hospital_name']
      }))
    }
  }
}


export function fetchAuthorityList() {
  return {
    [THREE_PHASE]: {
      type: APP.FETCH_AUTHORITY_LIST,
      http: () => _get('/backend/system/v1/group/all/list'),
      handleResponse: data => data.map(item => ({
        value: item['group_Id'], text: item['group_Name']
      }))
    }
  }
}

export function urlParam(paramObj) {
  let paramUrl = ''
  let current = 0
  for (let param in paramObj) {
    if (paramObj.hasOwnProperty(param)) {
      if (paramObj[param]) {
        let prefix = ''
        if (current++ == 0) {
          prefix = '?'
        } else {
          prefix = '&'
        }
        paramUrl += prefix + param + '=' + paramObj[param];
      }
    }
  }
  return encodeURI(paramUrl)
}

export function exportExcel(url, param) {
  if (param) {
    location.href = 'export' + url + urlParam(param)
  } else {
    location.href = 'export' + url
  }
}
