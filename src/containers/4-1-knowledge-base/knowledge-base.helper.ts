/**
 * zhouhangshuai on 2018-1-5
 */
import {KNOWLEDGE_BASE_TYPE_CODE_TEXT} from './knowledge-base.constant'

export function getKnowledgeBaseText(code) {
    return KNOWLEDGE_BASE_TYPE_CODE_TEXT[code]
}

export function adapterServerTagData(data){
    return data.map(d =>({
        title:d['label_Name'],
        list:d['smallClass_List'].map(tag =>({
            value: tag['smallClass_Id'],
            text:tag['smallClass_Name']
        }))
    }))
}

function transformTitle(string){
    switch (string.toLocaleString()){
        case "1":
            return "身份";
        case "2" :
            return "热敏词";
        case "3":
            return "行为";
        default:
            return string
    }
}

export function  transformTagData(data) {
    return data.map(tag =>({
        tagTitle:transformTitle(tag['knowledge_base_tag_type']),
        tagList:tag.list
    }))
}
