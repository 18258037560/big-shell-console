/**
 * Created by zhouhangshuai on 2018/3/9.
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {KNOWLEDGE_BASE, QUESTIONS_ANSWERS, TOPIC} from '../../core/constants/types'

const urlPrefix = '/backend/app/';

export function fetchTopicList(options) {
  return {
    [THREE_PHASE]: {
      type: TOPIC.FETCH_TOPIC_LIST,
      http: () => _post(urlPrefix + 'v1/topic/list', {body: options}),
      handleResponse: data => ({
        list: data['list'] || [],
        total: data['totalCount']
      })
    }
  }
}

export function updateTopicRemark(id, remark) {
  return {
    [THREE_PHASE]: {
      type: TOPIC.UPDATE_TOPIC_REMARK,
      http: () => _get(urlPrefix + `v1/topic/updateRemark?id=${id}&remark=${remark}`)
    }
  }
}

export function fetchTopicDetail(orderCode) {
  return {
    [THREE_PHASE]: {
      type: TOPIC.FETCH_TOPIC_DETAIL,
      http: () => _get(urlPrefix + `v1/topic/info/${orderCode}`),
      handleResponse: data => data
    }
  }
}

export function fetchLikeDetail(startIndex, topicId) {
  return {
    [THREE_PHASE]: {
      type: TOPIC.FETCH_LIKE_DETAIL,
      startParam: {page: startIndex},
      http: () => _get(urlPrefix + `v1/topic/like/info/list/${startIndex}/${topicId}`),
      handleResponse: data => ({pageSize: 10, list: data})
    }
  }
}

export function fetchLikePersonDetail(user_account) {
  return {
    [THREE_PHASE]: {
      type: TOPIC.FETCH_LIKE_PERSON_DETAIL,
      http: () => _get(urlPrefix + `v1/topic/like/info/${user_account}`),
      handleResponse: data => data
    }
  }
}

export function fetchDiscussDetail(startIndex, topicId) {
  return {
    [THREE_PHASE]: {
      type: TOPIC.FETCH_DISCUSS_DETAIL,
      startParam: {start: startIndex},
      http: () => _get(urlPrefix + `v1/topic/discuss/list/${startIndex}/${topicId}`),
      handleResponse: data => ({total: data['totalCount'], list: data['list']})
    }
  }
}

export function amendTopicRemark(id,remark) {
  return {
    [THREE_PHASE]: {
      type: TOPIC.AMEND_TOPIC_REMARK,
      http: () => _get(urlPrefix + `v1/topic/updateRemark?id=${id}&remark=${remark}`),
      handleResponse: data => data
    }
  }
}

export function updateIsHideState(topicId,status) {
  return {
    [THREE_PHASE]: {
      type: TOPIC.UPDATE_IS_HIDE_STATE,
      http: () => _get(urlPrefix + `v1/topic/updateIsHide/${topicId}/${status}`)
    }
  }
}

export function updateIsHotState(topicId,status) {
  console.log(status)
  return {
    [THREE_PHASE]: {
      type: TOPIC.UPDATE_IS_HOT_STATE,
      http: () => _get(urlPrefix + `v1/topic/updateIsHot/${topicId}/${status}`)
    }
  }
}
