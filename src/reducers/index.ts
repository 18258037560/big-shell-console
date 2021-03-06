/**
 * Created by jiangyukun on 2017/10/16.
 */
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import message from 'app-core/message/message.reducer'
import {wrapReducerState} from 'app-core/tools/redux-utils'

import data from './data.reducer'
import pushData from './pushData.reducer'
import pageList from './page-list.reducer'
import hasMoreList from './has-more-list.reducer'

import patientInfo from '../containers/1-1-patient-info/patient-info.reducer'
import treatSituation from '../containers/1-2-treat-situation/treat-situation.reducer'
import laboratorySheet from '../containers/1-3-laboratory-sheet/laboratory-sheet.reducer'
import followApply from '../containers/1-4-follow-apply/follow-apply.reducer'
import hospitalManage from '../containers/2-2-hospital-manage/hospital-manage.reducer'
import clinicDate from '../containers/2-3-clinic-date/clinic-date.reducer'
import doctorWallet from '../containers/2-4-doctor-wallet/doctor-wallet.reducer'
import qaOrder from '../containers/3-1-questions-answers/qa-order.reducer'
import telephoneConsult from '../containers/3-2-telephone-consult/telephone-consult.reducer'
import userAppeal from '../containers/3-3-user-appeal/user-appeal.reducer'
import knowledgeBase from '../containers/4-1-knowledge-base/knowledge-base.reducer'
import topicOfConversation from '../containers/4-2-topic-of-conversation/topicOfConversation.reducer'
import accountManagement from '../containers/6-1-account-management/account-management.reducer'


import {
    APP,
    PATIENT_INFO,
    LABORATORY_SHEET,
    DOCTOR_AUDIT,
    QUESTIONS_ANSWERS,
    TELEPHONE_CONSULT,
    USER_APPEAL,
    HOSPITAL_MANAGE,
    TREAT_SITUATION,
    FOLLOW_APPLY,
    CLINIC_DATE,
    DOCTOR_WALLET,
    KNOWLEDGE_BASE,
    SYSTEM_MANAGEMENT,
    TOPIC
} from '../core/constants/types'
import doctorAudit from '../containers/2-1-doctor-audit/doctor-audit.reducer'

export default combineReducers({
  router: routerReducer,
  message: wrapReducerState(message),

  provinceList: wrapReducerState(data(APP.FETCH_PROVINCE_LIST)),
  cityList: wrapReducerState(data(APP.FETCH_CITY_LIST)),
  hospitalList: wrapReducerState(data(APP.FETCH_HOSPITAL_LIST)),
  positionList: wrapReducerState(data(DOCTOR_AUDIT.FETCH_POSITION_LIST)),
  authorityList: wrapReducerState(data(APP.FETCH_AUTHORITY_LIST)),

  /*1 患者*/
  patientInfoList: wrapReducerState(data(PATIENT_INFO.FETCH_LIST)),
  patientInfo: wrapReducerState(patientInfo),

  treatSituation: wrapReducerState(treatSituation),
  treatSituationList: wrapReducerState(data(TREAT_SITUATION.FETCH_LIST)),
  treatSituationRecordDetail: wrapReducerState(pushData(TREAT_SITUATION.TREAT_SITUATION_RECORD)),

  laboratorySheet: wrapReducerState(laboratorySheet),
  laboratorySheetList: wrapReducerState(data(LABORATORY_SHEET.FETCH_LIST)),
  sheetCategoryList: wrapReducerState(data(LABORATORY_SHEET.FETCH_SHEET_CATEGORY_LIST)),

  followApply: wrapReducerState(followApply),
  followApplyList: wrapReducerState(data(FOLLOW_APPLY.FETCH_LIST)),

  /*2 医生*/
  doctorAudit: wrapReducerState(doctorAudit),
  doctorAuditList: wrapReducerState(data(DOCTOR_AUDIT.FETCH_LIST)),

  hospitalManage: wrapReducerState(hospitalManage),
  hospitalManageList: wrapReducerState(data(HOSPITAL_MANAGE.FETCH_LIST)),

  clinicDate: wrapReducerState(clinicDate),
  clinicDateList: wrapReducerState(data(CLINIC_DATE.FETCH_LIST)),

  doctorWallet: wrapReducerState(doctorWallet),
  doctorWalletList: wrapReducerState(data(DOCTOR_WALLET.FETCH_LIST)),

  doctorWalletOperationList: wrapReducerState(data(DOCTOR_WALLET.FETCH_WALLET_OPERATION_LIST)),
  doctorWalletDealList:wrapReducerState(pushData(DOCTOR_WALLET.FETCH_WALLET_DEAL_LIST)),
  /*3 订单*/
  qaOrder: wrapReducerState(qaOrder),
  questionAnswerList: wrapReducerState(data(QUESTIONS_ANSWERS.FETCH_LIST)),
  orderOperationList: wrapReducerState(pageList(QUESTIONS_ANSWERS.FETCH_ORDER_OPERATION_LIST)),
  orderDetail: wrapReducerState(data(QUESTIONS_ANSWERS.FETCH_ORDER_DETAIL)),

  telephoneConsult: wrapReducerState(telephoneConsult),
  telephoneConsultList: wrapReducerState(data(TELEPHONE_CONSULT.FETCH_LIST)),
  telephoneConsultDetail: wrapReducerState(data(TELEPHONE_CONSULT.FETCH_CONSULT_DETAIL)),


  userAppeal: wrapReducerState(userAppeal),
  userAppealList: wrapReducerState(data(USER_APPEAL.FETCH_LIST)),
  appealTypeList: wrapReducerState(data(USER_APPEAL.FETCH_APPEAL_TYPE_LIST)),

  /*4 知识库*/
  knowledgeList: wrapReducerState(data(KNOWLEDGE_BASE.FETCH_LIST)),
  knowledgeBase: wrapReducerState(knowledgeBase),
  allTag:wrapReducerState(data(KNOWLEDGE_BASE.FETCH_ALL_TAG)),
  knowledgeBaseDetail:wrapReducerState(data(KNOWLEDGE_BASE.FETCH_KNOWLEDGEBASE_DETAIL)),
  topicOfConversation:wrapReducerState(topicOfConversation),
  topicList:wrapReducerState(data(TOPIC.FETCH_TOPIC_LIST)),
  topicDetail:wrapReducerState(data(TOPIC.FETCH_TOPIC_DETAIL)),
  topicLikeDetail:wrapReducerState(hasMoreList(TOPIC.FETCH_LIKE_DETAIL)),
  topicLikePersonDetail:wrapReducerState(data(TOPIC.FETCH_LIKE_PERSON_DETAIL)),
  discussDetail:wrapReducerState(pageList(TOPIC.FETCH_DISCUSS_DETAIL)),

    /*6 账号管理*/
  accountList: wrapReducerState(data(SYSTEM_MANAGEMENT.FETCH_LIST)),
  accountManagement: wrapReducerState(accountManagement)

} as ReducerType)

export type ReducerType = {
  router: any,
  message: any

  provinceList: any
  cityList: any
  hospitalList: any
  positionList: any

  /*1 患者*/
  patientInfoList: any
  patientInfo: any

  treatSituation: any
  treatSituationList: any
  treatSituationRecordDetail: any

  laboratorySheet: any
  laboratorySheetList: any
  sheetCategoryList: any

  followApply: any
  followApplyList: any

  /*2 医生*/
  doctorAudit: any
  doctorAuditList: any

  hospitalManage: any
  hospitalManageList: any

  clinicDate: any
  clinicDateList: any

  doctorWallet: any
  doctorWalletList: any

  doctorWalletOperationList: any
  /*3 订单*/
  qaOrder: any
  questionAnswerList: any
  orderOperationList: any
  orderDetail: any

  telephoneConsult: any
  telephoneConsultList: any
  telephoneConsultDetail: any

  userAppeal: any
  userAppealList: any
  appealTypeList: any
 /*知识库*/
 knowledgeBase:any
 allTag: any
 topicOfConversation:any
 topicList:any
 topicDetail:any
 topicLikeDetail:any


  /*6 系统管理*/
  accountList: any
  accountManagement: any
  authorityList: any


}
