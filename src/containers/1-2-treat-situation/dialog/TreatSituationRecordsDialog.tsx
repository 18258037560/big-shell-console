import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import ScrollContainer from 'app-core/core/ScrollContainer'
import Confirm from 'app-core/common/Confirm'
import FullDialogContent from 'app-core/common/content/FullDialogContent'
import Label from '../../../components/element/Label'
import Button from '../../../components/button/Button'

import Data from '../../../core/interface/Data'

import {handlePageListData, handleListData} from '../../common/common-helper'
import TreatSituationRecordItem from '../interface/TreatSituationRecordItem'

interface TreatSituationRecordsDialogProps {
  fetchTreatSituationRecord: (type, start, options) => void
  treatSituationRecordList: any

  onExited: () => void

  patient_info_id: string
  patient_name: string
  patient_phone: string
}

class TreatSituationRecordsDialog extends React.Component<TreatSituationRecordsDialogProps> {
  start = 0
  state = {
    show: true,
  }

  close = () => {
    this.setState({show: false})
  }

  loadMoreList = () => {
    let {list, total} = handleListData(this.props.treatSituationRecordList)
    if (total != -1 && list.length == total) {
      return
    }
    this.load()
  }

  load = () => {
    this.props.fetchTreatSituationRecord(this.props.patient_info_id, this.start, 10)
    this.start++
  }

  search = () => {
    this.start = 0
    this.load()
  }

  componentDidMount() {
    this.load()
  }

  componentWillReceiveProps(nextProps: TreatSituationRecordsDialogProps) {
    // this.load()
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.treatSituationRecordList)
    return (
      <Modal contentComponent={FullDialogContent} style={{width: '650px'}} className="qa-operation-list-dialog"
             show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >
        {/*{*/}
          {/*this.state.showAddConfirm && (*/}
            {/*<Confirm message={'确定要将医生' + card_owner + '的共计' + '￥' + this.getAmount() + (this.props.type == DOCTOR_WALLET_TYPE_MAPPER.has_deal ? '已' : '未') + '处理提现申请改为' + (this.props.type == DOCTOR_WALLET_TYPE_MAPPER.has_deal ? '未' : '已') + '处理吗？'}*/}
                     {/*onExited={() => this.setState({showAddConfirm: false})}*/}
                     {/*onConfirm={this.dealDealList}/>*/}
          {/*)*/}
        {/*}*/}

        <Modal.Header closeButton={true}>
          <Modal.Title>{this.props.patient_name + this.props.patient_phone + '的治疗情况记录'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="order-operation-box">

            <ScrollContainer onScrollBottom={this.loadMoreList} className="order-item-wrap">
              {
                list.map((item, index) => {
                  return (
                    <div className="wallet-record-list-container" key={index}>

                      <div>
                        <div className="wallet-record-list">
                          {item.create_time}
                        </div>
                        <div className="wallet-record-list">
                          {item.record_name}
                        </div>
                      </div>

                      <div>
                        <div className="wallet-record-list">
                          {item.create_person}
                        </div>
                        <div className="wallet-record-list">
                          {item.record_type}
                        </div>
                      </div>

                    </div>
                  )
                })
              }
            </ScrollContainer>

            <div className="bank-info-select-info-container">
              <div className="bank-info-container">
                <div className="bank-info-item">
                  {'其它：'}
                </div>
              </div>

              <div className="select-item-container">
                <Label>备注</Label>
                <div className="select-info-item">
                  20170916 已删除
                </div>
              </div>

            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    treatSituationRecordList: state.treatSituationRecordDetail
  }
}

export default connect(mapStateToProps, {})(TreatSituationRecordsDialog)
