/**
 * Created by jiangyukun on 2017/10/17.
 */
import React from 'react'
import classnames from 'classnames'
import {Link} from 'react-router-dom'
import Menu from 'antd/lib/menu'

import {getPath} from '../../core/env'
import {PAGES} from '../../core/constants/pages'

interface LeftProps {
  currentPath: string
}

class Left extends React.Component<LeftProps> {
  state = {
    open: true
  }

  render() {
    const SubMenu = Menu.SubMenu

    const patientInfo = getPath(PAGES.PATIENT_INFO)
    const treatSituation = getPath(PAGES.TREAT_SITUATION)
    const laboratorySheet = getPath(PAGES.LABORATORY_SHEET)
    const followApply = getPath(PAGES.FOLLOW_APPLY)
    const doctorAudit = getPath(PAGES.DOCTOR_AUDIT)
    const hospitalManage = getPath(PAGES.HOSPITAL_MANAGE)
    const clinicDate = getPath(PAGES.CLINIC_DATE)
    const doctorWallet = getPath(PAGES.DOCTOR_WALLET)
    const qAOrder = getPath(PAGES.QA_ORDER)
    const telephoneConsult = getPath(PAGES.TELEPHONE_CONSULT)
    const userAppeal = getPath(PAGES.USER_APPEAL)
    const knowledgeBase = getPath(PAGES.KNOWLEDGE_BASE)
    const topicOfConversation = getPath(PAGES.TOPIC_OF_CONVERSATION)
    const chatSystem = getPath(PAGES.CHAT_SYSTEM)
    const accountManagement = getPath(PAGES.ACCOUNT_MANAGEMENT)
    const jurisdictionManagement = getPath(PAGES.JURISDICTION_MANAGEMENT)


    return (
      <div className="app-left">
        <div className="app-user">
          <div className="user-name">admin</div>
        </div>
        <div className="app-nav">
          <Menu
            defaultSelectedKeys={[this.props.currentPath]}
            defaultOpenKeys={['sub1', 'sub2', 'sub3','sub4','sub5','sub6']}
            mode="inline"
            theme="dark"
          >
            <SubMenu key="sub1" title={<span><span>患者管理</span></span>}>
              <Menu.Item key={patientInfo}>
                <Link to={patientInfo}>患者信息</Link>
              </Menu.Item>
              <Menu.Item key={treatSituation}>
                <Link to={treatSituation}>治疗情况</Link>
              </Menu.Item>
              <Menu.Item key={laboratorySheet}>
                <Link to={laboratorySheet}>化验单</Link>
              </Menu.Item>
              <Menu.Item key={followApply}>
                <Link to={followApply}>关注申请</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><span>医生管理</span></span>}>
              <Menu.Item key={doctorAudit}>
                <Link to={doctorAudit}>医生审核</Link>
              </Menu.Item>
              <Menu.Item key={hospitalManage}>
                <Link to={hospitalManage}>医院管理</Link>
              </Menu.Item>
              <Menu.Item key={clinicDate}>
                <Link to={clinicDate}>门诊时间</Link>
              </Menu.Item>
              <Menu.Item key={doctorWallet}>
                <Link to={doctorWallet}>医生钱包</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><span>订单管理</span></span>}>
              <Menu.Item key={qAOrder}>
                <Link to={qAOrder}>问答订单</Link>
              </Menu.Item>
              <Menu.Item key={telephoneConsult}>
                <Link to={telephoneConsult}>电话咨询订单</Link>
              </Menu.Item>
              <Menu.Item key={userAppeal}>
                <Link to={userAppeal}>用户申诉</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<span><span>App维护</span></span>}>
                <Menu.Item key={knowledgeBase}>
                    <Link to={knowledgeBase}>知识库</Link>
                </Menu.Item>
                <Menu.Item key={topicOfConversation}>
                    <Link to={topicOfConversation}>话题</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" title={<span><span>聊天系统</span></span>}>
                <Menu.Item key={chatSystem}>
                  <Link to={chatSystem}>聊天系统</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" title={<span><span>系统管理</span></span>}>
                <Menu.Item key={accountManagement}>
                    <Link to={accountManagement}>账号管理</Link>
                </Menu.Item>
                <Menu.Item key={jurisdictionManagement}>
                    <Link to={jurisdictionManagement}>权限管理</Link>
                </Menu.Item>
            </SubMenu>
          </Menu>

        </div>
      </div>
    )
  }
}

export default Left
