/**
 * Created by jiangyukun on 2017/10/18.
 */
import React from 'react'
import {Route} from 'react-router-dom'

import PatientInfo from '../1-1-patient-info/PatientInfo'
import TreatSituation from '../1-2-treat-situation/TreatSituation'
import LaboratorySheet from '../1-3-laboratory-sheet/LaboratorySheet'
import DoctorAudit from '../2-1-doctor-audit/DoctorAudit'
import HospitalManage from '../2-2-hospital-manage/HospitalManage'
import QuestionsAndAnswers from '../3-1-questions-answers/QuestionsAndAnswers'
import TelephoneConsult from '../3-2-telephone-consult/TelephoneConsult'
import UserAppeal from '../3-3-user-appeal/UserAppeal'

import {PAGES} from '../../core/constants/pages'
import FollowApply from '../1-4-follow-apply/FollowApply'
import ClinicDate from '../2-3-clinic-date/ClinicDate'
import DoctorWallet from '../2-4-doctor-wallet/DoctorWallet'
import KnowledgeBase from '../4-1-knowledge-base/KnowledgeBase'
import TopicOfConversation from '../4-2-topic-of-conversation/TopicOfConversation'
import AccountManagement from '../6-1-account-management/AccountManagement'
interface ContentProps {
  match: any
}

class Content extends React.Component<ContentProps> {
  render() {
    const {match} = this.props
    let urlPrefix = match.url
    if (urlPrefix == '/') {
      urlPrefix = ''
    }

    return (
      <div className="page-content">
        <Route path={`${urlPrefix}/${PAGES.PATIENT_INFO}`} component={PatientInfo}/>
        <Route path={`${urlPrefix}/${PAGES.TREAT_SITUATION}`} component={TreatSituation}/>
        <Route path={`${urlPrefix}/${PAGES.LABORATORY_SHEET}`} component={LaboratorySheet}/>
        <Route path={`${urlPrefix}/${PAGES.FOLLOW_APPLY}`} component={FollowApply}/>

        <Route path={`${urlPrefix}/${PAGES.DOCTOR_AUDIT}`} component={DoctorAudit}/>
        <Route path={`${urlPrefix}/${PAGES.HOSPITAL_MANAGE}`} component={HospitalManage}/>
        <Route path={`${urlPrefix}/${PAGES.CLINIC_DATE}`} component={ClinicDate}/>
        <Route path={`${urlPrefix}/${PAGES.DOCTOR_WALLET}`} component={DoctorWallet}/>

        <Route path={`${urlPrefix}/${PAGES.QA_ORDER}`} component={QuestionsAndAnswers}/>
        <Route path={`${urlPrefix}/${PAGES.TELEPHONE_CONSULT}`} component={TelephoneConsult}/>
        <Route path={`${urlPrefix}/${PAGES.USER_APPEAL}`} component={UserAppeal}/>

        <Route path={`${urlPrefix}/${PAGES.KNOWLEDGE_BASE}`} component={KnowledgeBase}/>
        <Route path={`${urlPrefix}/${PAGES.TOPIC_OF_CONVERSATION}`} component={TopicOfConversation}/>

        {/*<Route path={`${urlPrefix}/${PAGES.CHAT_SYSTEM}`} component={ChatSystem}/>*/}

        <Route path={`${urlPrefix}/${PAGES.ACCOUNT_MANAGEMENT}`} component={AccountManagement}/>
        {/*<Route path={`${urlPrefix}/${PAGES.JURISDICTION_MANAGEMENT}`} component={JurisdictionManagement}/>*/}
      </div>
    )
  }
}

export default Content
