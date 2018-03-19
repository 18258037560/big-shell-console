/**
 * Created by zhouhangshuai on 2018/3/9.
 */
import React from 'react'

import Label from '../../../../components/element/Label'
import DiscussDetail from '../../../common/DiscussDetail'
import PartContent from '../../../common/PartContent'
import Data from '../../../../core/interface/Data'
import index from '../../../../reducers'
import Button from '../../../../components/button/Button'

interface DiscussProps {
  topicId:string
  fetchDiscussDetail:(start, id) => Data<any>
  discussDetail:any
}

class Discuss extends React.Component<DiscussProps> {
  startIndex = 0;
  componentDidMount() {
    this.props.fetchDiscussDetail(this.startIndex, this.props.topicId)
    this.startIndex ++
  }

  loadMoreList = () => {
    this.load()
  }

  load = () =>{
    this.props.fetchDiscussDetail(this.startIndex,this.props.topicId)
    this.startIndex ++
  }


  render() {
    const discuss = this.props.discussDetail || ''
    const total = discuss['total']
    const discussList = discuss['list'] || []
    return (
      <section className="rate-info qa-big-category">
        <DiscussDetail total={total}  src={require('../icon/discuss.svg')} title="评论"/>
        {
          discussList.map((discussant,index)=>{
            const {comment_content,comment_time,comment_to,comment_to_nick_name,is_hide,nick_name,photo_url,real_name,user_account} = discussList[index]
            return <div key={discussant['user_account']+index} className="rate-info-item category-item">
                      <div style={{float:'left',width:'10%'}}>
                        <img style={{width:'30px',height:'30px',border:'none',borderRadius:'100%',margin:'10px 0 0 10px'}} src={photo_url} />
                      </div>
                      <div style={{float:'left',width:'60%'}}>
                        <p style={{height:'20px',marginTop:'15px'}}>
                          {real_name}&nbsp;&nbsp;&nbsp;{'('+nick_name+')'}&nbsp;&nbsp;&nbsp;{user_account}
                        </p>
                        {comment_to_nick_name && (<p style={{marginTop:'10px'}}>回复&nbsp;<span style={{color:'#009933',fontWeight:'bolder'}}>{ nick_name }</span>:&nbsp;{comment_to_nick_name}</p>)}
                        <p style={{margin:'10px 0 10px 0',width:"100%",whiteSpace:'pre-wrap',wordWrap:'break-word'}}>
                          {comment_content}
                        </p>
                      </div>
                      <div style={{float:'left',width:'30%'}}>
                        <p style={{textAlign:'center',marginTop:'15px'}}>{comment_time}</p>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'8px',borderLeft:'1px solid #D1D1D1'}}>
                          <div style={{width:'80%',height:'30px',textAlign:'center',lineHeight:'30px',backgroundColor:"#33CCFF",color:'#fff'}}>
                            {(is_hide == 0)?"已显示":"已隐藏"}
                          </div>
                        </div>

                      </div>
                    </div>
          })
        }
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}}>
              {
                total > discussList.length ? (<Button onClick={this.loadMoreList}>加载更多</Button>) : ''
              }

            </div>
      </section>
    )
  }
}

export default Discuss
