/**
 * zhouhangshuai on 2018-1-5
 */
import {_get, _post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {KNOWLEDGE_BASE} from "../../core/constants/types"
import {transformTagData} from './knowledge-base.helper'
import data from "../../reducers/data.reducer";

const urlPrefix =  '/backend/app/';
export function fetchList(options) {
    return {
        [THREE_PHASE]: {
            type: KNOWLEDGE_BASE.FETCH_LIST,
            http: () => _post(urlPrefix + '/v1/knowledge/list', {body: options}),
            handleResponse: data => ({
                list: data['list'] || [],
                total: data['totalCount']
            })
        }
    }
}

export function updateRemark(id, remark) {
    return {
        [THREE_PHASE]: {
            type: KNOWLEDGE_BASE.UPDATE_REMARK,
            http: () => _get(urlPrefix + `/v1/knowledge/updateRemark?id=${id}&remark=${remark}`)
        }
    }
}

export function fetchAllTag(){
    return {
        [THREE_PHASE]: {
            type: KNOWLEDGE_BASE.FETCH_ALL_TAG,
            http: () => _get(urlPrefix + '/v1/knowledge/tagList'),
            handleResponse: (data) => transformTagData(data)
        }
    }
}

export function addKnowledgeBase(category,title,tags,KnowledgePictureUrl,isImgConfig,order,imgConfigUrl,url,remark) {
    const options = {
        "knowledge_base_type": category,
        "knowledge_base_title": title,
        "knowledge_base_tag": tags,
        "knowledge_base_picture_url": KnowledgePictureUrl,
        "is_img_config": isImgConfig,
        "img_config_order": order,
        "img_config_url": imgConfigUrl,
        "knowledge_base_url": url,
        "knowledge_base_remark": remark,
        "knowledge_base_content": ""
    }
    console.log(options)
    return {
        [THREE_PHASE]: {
            type: KNOWLEDGE_BASE.ADD_KNOWLEDGEBASE,
            http: () => _post(urlPrefix + '/v1/knowledge/add', {body: options})
        }
    }
}

export function updateKnowledgeBase(category,title,tags,KnowledgePictureUrl,isImgConfig,order,imgConfigUrl,url,remark,id) {
    const options = {
        "knowledge_base_type": category,
        "knowledge_base_title": title,
        "knowledge_base_tag": tags,
        "knowledge_base_picture_url": KnowledgePictureUrl,
        "is_img_config": isImgConfig,
        "img_config_order": order,
        "img_config_url": imgConfigUrl,
        "knowledge_base_url": url,
        "knowledge_base_remark": remark,
        "knowledge_base_content": "",
        "knowledge_base_id": id
    }
    console.log(options)
    return {
        [THREE_PHASE]: {
            type: KNOWLEDGE_BASE.UPDATE_KNOWLEDGEBASE,
            http: () => _post(urlPrefix + '/v1/knowledge/update', {body: options})
        }
    }
}

export function deleteKnowledgeBase(id){
    return {
        [THREE_PHASE]: {
            type: KNOWLEDGE_BASE.DELETE_KNOWLEDGEBASE,
            http: () => _get(urlPrefix + '/v1/knowledge/delete/'+id)
        }
    }
}
export function getKnowledgeBaseList(id){
    return {
        [THREE_PHASE]: {
            type: KNOWLEDGE_BASE.FETCH_KNOWLEDGEBASE_DETAIL,
            http: () => _get(urlPrefix + '/v1/knowledge/info/'+id),
            handleResponse:data => data
        }
    }
}