/**
 * Created by jiangyukun on 2017/10/26.
 */
function getActionTypeFn(prefix) {
  return function (type) {
    return prefix + '__' + type
  }
}

function generatorValueFromKey(prefix: string, obj: object): void {
  let typeFn = getActionTypeFn(prefix)
  Object.keys(obj).forEach(key => obj[key] = typeFn(key))
}

export const APP = {
  FETCH_PROVINCE_LIST: null,
  FETCH_CITY_LIST: null,
  FETCH_HOSPITAL_LIST: null,
  FETCH_AUTHORITY_LIST: null
}

export const PATIENT_INFO = {
  FETCH_LIST: null,
  UPDATE_REMARK: null
}

export const TREAT_SITUATION = {
  FETCH_LIST: null,
  UPDATE_REMARK: null,
  TREAT_SITUATION_RECORD: null
}

export const LABORATORY_SHEET = {
  FETCH_LIST: null,
  FETCH_SHEET_CATEGORY_LIST: null,
  UPDATE_REMARK: null,
  UPDATE_SHEET_STATUS: null
}

export const FOLLOW_APPLY = {
  FETCH_LIST: null,
  UPDATE_REMARK: null
}

/* 医生 */
export const DOCTOR_AUDIT = {
  FETCH_LIST: null,
  UPDATE_REMARK: null,
  FETCH_POSITION_LIST: null,
  UPDATE_DOCTOR: null
}

export const HOSPITAL_MANAGE = {
  FETCH_LIST: null,
  UPDATE_REMARK: null,
  ADD_HOSPITAL: null,
  UPDATE_HOSPITAL: null
}

export const CLINIC_DATE = {
  FETCH_LIST: null,
  UPDATE_REMARK: null
}

export const DOCTOR_WALLET = {
  FETCH_LIST: null,
  UPDATE_REMARK: null,
  FETCH_WALLET_OPERATION_LIST: null,
  FETCH_WALLET_DEAL_LIST: null,
  DEAL_DEAL_LIST: null

}

/* 订单 */
export const QUESTIONS_ANSWERS = {
  FETCH_LIST: null,
  FETCH_ORDER_OPERATION_LIST: null,
  FETCH_ORDER_DETAIL: null,
  UPDATE_REMARK: null,
  UPDATE_IS_HIDE_STATE: null,
  UPDATE_APPEAL_RESULT: null
}

export const TELEPHONE_CONSULT = {
  FETCH_LIST: null,
  FETCH_CONSULT_DETAIL: null,
  UPDATE_REMARK: null,
  UPDATE_IS_HIDE_STATE: null,
  UPDATE_APPEAL_RESULT: null,
  ADD_SERVICE_INFO: null,
  DELETE_SERVICE_INFO: null,
  REFUND_MONEY: null
}

export const USER_APPEAL = {
  FETCH_LIST: null,
  UPDATE_REMARK: null,
  FETCH_APPEAL_TYPE_LIST: null

}
export const KNOWLEDGE_BASE = {
  FETCH_LIST: null,
  UPDATE_REMARK: null,
  FETCH_ALL_TAG: null,
  ADD_KNOWLEDGEBASE: null,
  UPDATE_KNOWLEDGEBASE:null,
  DELETE_KNOWLEDGEBASE:null,
  FETCH_KNOWLEDGEBASE_DETAIL:null
}

export const TOPIC = {
  FETCH_TOPIC_LIST:null,
  UPDATE_TOPIC_REMARK: null,
  FETCH_TOPIC_DETAIL:null,
  FETCH_LIKE_DETAIL:null,
  FETCH_LIKE_PERSON_DETAIL:null,
  FETCH_DISCUSS_DETAIL:null,
  AMEND_TOPIC_REMARK:null,
  UPDATE_IS_HIDE_STATE:null,
  UPDATE_IS_HOT_STATE:null

}

export const SYSTEM_MANAGEMENT = {
  FETCH_LIST: null,
  UPDATE_REMARK: null,
  ADD_ACCOUNT: null,
  UPDATE_ACCOUNT: null,
  DELETE_ACCOUNT: null,
  RESET_PASSWORD_ACCOUNT: null
}


generatorValueFromKey('APP', APP)

generatorValueFromKey('PATIENT_INFO', PATIENT_INFO)
generatorValueFromKey('TREAT_SITUATION', TREAT_SITUATION)
generatorValueFromKey('LABORATORY_SHEET', LABORATORY_SHEET)

generatorValueFromKey('DOCTOR_AUDIT', DOCTOR_AUDIT)
generatorValueFromKey('HOSPITAL_MANAGE', HOSPITAL_MANAGE)
generatorValueFromKey('DOCTOR_WALLET', DOCTOR_WALLET)

generatorValueFromKey('QUESTIONS_ANSWERS', QUESTIONS_ANSWERS)
generatorValueFromKey('TELEPHONE_CONSULT', TELEPHONE_CONSULT)
generatorValueFromKey('USER_APPEAL', USER_APPEAL)
generatorValueFromKey('KNOWLEDGE_BASE', KNOWLEDGE_BASE)
generatorValueFromKey('TOPIC', TOPIC)
generatorValueFromKey('SYSTEM_MANAGEMENT', SYSTEM_MANAGEMENT)