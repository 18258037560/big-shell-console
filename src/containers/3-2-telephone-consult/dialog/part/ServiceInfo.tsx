/**
 * Created by jiangyukun on 2017/11/8.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Popover} from 'antd';

import Confirm from 'app-core/common/Confirm'

import OrderCategoryTitle from '../../../common/OrderCategoryTitle'
import PartContent from '../../../common/PartContent'
import AddServiceInfoDialog from '../AddServiceInfoDialog'
interface ServiceInfoProps {
  serviceRecords: [any]

  addServiceInfo: (reamark, status, time) => void
  deleteServiceInfo: (service_info_id) => void
  updateServiceInfoSuccess: boolean
}

class ServiceInfo extends React.Component<ServiceInfoProps> {

  state = {
    showAddServiceInfoDialog: false,
    showDeleteConfirm: false,
    shouldDeleteServiceInfoId: ''
  }

  addServiceInfo = (remark, status, time) => {
    this.props.addServiceInfo(remark, status, time)
  }

  deleteServiceInfo = () => {
    this.props.deleteServiceInfo(this.state.shouldDeleteServiceInfoId)
  }

  componentWillReceiveProps(nextProps: ServiceInfoProps) {
    if (!this.props.updateServiceInfoSuccess && nextProps.updateServiceInfoSuccess) {
      this.setState({showAddServiceInfoDialog: false})
    }
  }

  render() {
    let records = this.props.serviceRecords || []
    return (
      <section className="big-category service-info">
        {
          this.state.showAddServiceInfoDialog && (
            <AddServiceInfoDialog onExited={() => this.setState({showAddServiceInfoDialog: false})} addServiceInfo={(remark, status, time) => this.addServiceInfo(remark, status, time)}/>
          )
        }
        {
          this.state.showDeleteConfirm && (
            <Confirm message="确定要删除此条服务信息吗？"
                     onExited={() => this.setState({showDeleteConfirm: false})}
                     onConfirm={() => this.deleteServiceInfo()}/>
          )
        }

        <OrderCategoryTitle src={require('../icon/telephone.svg')} title="服务信息"/>
        <PartContent status={records.length > 0} noDataTxt="暂无服务">
          <div className="service-info-main">
            <div className="flex1">
              {
                records.map((item, index) => {
                  return (
                    <Popover key={index} placement="left" title={<span>服务备注</span>} content={<div>
                      <p>{item['phone_service_remark']}</p>
                    </div>}>
                      <div className="service-info-item">

                        <div className="content">
                          {item['phone_service_status_desc']}
                        </div>
                        {item['create_time']}
                        &nbsp;&nbsp;
                        {
                          item['phone_service_status_id'].length != 0 && (
                            <button onClick={() => this.setState({
                              showDeleteConfirm: true,
                              shouldDeleteServiceInfoId: item['phone_service_status_id']
                            })}>删除
                            </button>
                          )
                        }
                      </div>
                    </Popover>
                  )
                })
              }
            </div>
            <div className="add-service-info">
              <button onClick={() => this.setState({showAddServiceInfoDialog: true})}>添加服务信息</button>
            </div>
          </div>
        </PartContent>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    updateServiceInfoSuccess: state.telephoneConsult.updateServiceInfoSuccess
  }
}

export default connect(mapStateToProps, {})(ServiceInfo)
