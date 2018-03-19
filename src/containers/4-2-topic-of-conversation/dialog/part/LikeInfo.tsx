/**
 * Created by zhouhangshuai on 2018/3/9.
 */
import React from 'react'
import {Line} from 'app-core/layout/'
import Button from '../../../../components/button/Button'
import LikeDetail from '../../../common/LikeDetail'
import Data from '../../../../core/interface/Data';
import {Popover} from 'antd'
import {handlePageListData} from '../../../common/common-helper';

interface LikeInfoProps {
  likeDetail: any
  count: any
  topicLikePersonDetail: any
  getLikePersonDetail: (user_account) => Data<any>
  fetchLoad: (start, id) => Data<any>
  topicId: string
}

class LikeInfo extends React.Component<LikeInfoProps> {
  startIndex = 1
  state = {
    showRefund: false,
  }

  likePersonDetail = (user_account) => {
    this.props.getLikePersonDetail(user_account)
  }

  loadMoreList = () => {
    this.load()
  }

  load = () =>{
      this.props.fetchLoad(this.startIndex,this.props.topicId)
      this.startIndex ++
      // console.log(this.startIndex)
  }

  render() {
    const imgUrlList = this.props.likeDetail.list || []
    const {patient_code, user_account, real_name, nick_name, register_time, like_time, photo_url} = this.props.topicLikePersonDetail.data || '';
    const title = '患者点赞信息'
    const content = (
      <div>
        <p className='titleInfo'>患者编号：{patient_code}</p>
        <p className='titleInfo'>手机号码：{user_account}</p>
        <img className='like-Hover-Photo' src={photo_url} alt=""/>
        <p className='titleInfo'>姓名：{real_name}</p>
        <p className='titleInfo'>昵称：{nick_name}</p>
        <p style={{paddingTop: '5px'}}>注册时间：{register_time}</p>
        <Line/>
        <p style={{paddingBottom: '5px'}}>点赞时间：{like_time}</p>
      </div>
    )
    return (
      <section className="qa-big-category payment-info">
        <LikeDetail count={this.props.count} src={require('../icon/like.svg')} title="点赞"/>
        {
          imgUrlList.map((item, index) => {
            const url = item.photo_url
            return <Popover title={title} content={content} key={index} trigger="hover">
              <img className='like-count-avator' key={index}
                   onMouseOver={() => this.likePersonDetail(item.user_account)} src={url}/>
            </Popover>
          })
        }
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '10px'}}>
          {
            this.props.likeDetail.hasMore && (<Button onClick={this.loadMoreList}>加载更多</Button>)
          }
        </div>
      </section>
    )
  }
}

export default LikeInfo
