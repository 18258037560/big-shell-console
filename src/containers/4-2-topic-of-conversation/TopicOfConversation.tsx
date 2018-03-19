/**
 * zhouhangshuai on 2018-3-2
 */
import React from 'react'
import {connect} from 'react-redux';
import Button from '../../components/button/Button'
import SearchBox from '../../components/search/SearchBox'
import FilterItem from '../../components/query-filter/FilterItem'
import FilterOptions from '../../components/query-filter/FilterOptions'
import DateInterval from '../../components/query-filter/extends/DateInterval'
import SelectedItem from '../../components/query-filter/SelectedItem'
import SelectedFilter from '../../components/query-filter/SelectedFilter'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'
import EditRemark from '../../components/EditRemark'
import IconR from '../../components/Icon'
import {getStartEndDateStr, handleListData, haveNotEmptyValue} from "../common/common-helper";
import {filters} from "./topicOfConversation.constant";
import * as actions from "./topicOfConversation.action";
import Data from "../../core/interface/Data";
import addCommonFunction from "../../core/hoc/addCommonFunction";
import CommonFunction from "../../core/interface/CommonFunction";
import TopicDetailDialog from './dialog/TopicDetailDialog'

interface TopicOfConversationProps extends CommonFunction{
    allTag:any
    fetchTopicList:any
    topicList:any
    updateTopicRemark: (id, remark) => void
    fetchLikeDetail:(start,id) => Data<any>
    updateRemarkSuccess:boolean
    showOrderDetail: boolean
}

class TopicOfConversation extends React.Component<TopicOfConversationProps> {

    state = {
        search_key:"",
        index:-1,
        currentPage: 0,
        handleStartDate: null,
        handleEndDate: null,
        yesOrNo: '',
        showEditRemark:false,
        showOrderDetail: false
    }

    clearAllFilter = () => {
        this.setState({
            yesOrNo:'',
            handleStartDate: null,
            handleEndDate: null,
        })
    }

    inspectOrder = (item) => {
        this.setState({showOrderDetail: true})
    }

    updateTopicRemark = (newRemark) => {
        const item = handleListData(this.props.topicList).list[this.state.index]
        this.props.updateTopicRemark(item['topic_id'], newRemark)
    }

    toPage = (newPage?: number) => {
        if (newPage == null) newPage = this.state.currentPage
        if (newPage != this.state.currentPage) {
            this.setState({currentPage: newPage})
        }
        this.props.fetchTopicList({
            "begin_time": this.state.handleStartDate,
            "end_time": this.state.handleEndDate,
            "is_hide": 0,
            "key_words": this.state.search_key,
            "limit": 10,
            "start": newPage
        })

    }

    componentDidMount() {
        this.toPage(0)

    }

    componentWillReceiveProps(nextProps: TopicOfConversationProps) {
        if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
            this.props.showSuccess('更新备注成功！')
            this.toPage()
        }
    }

    render() {
        const {total, list, loading, loaded} = handleListData(this.props.topicList);
        const item = list[this.state.index] || {};
        return (
            <div className="app-function-page">
                {
                    this.state.showEditRemark && (
                        <EditRemark
                            value={item['remark']}
                            updateRemark={this.updateTopicRemark} updateRemarkSuccess={this.props.updateRemarkSuccess} onExited={ () => this.setState({showEditRemark: false}) }/>
                    )
                }
                {
                    this.state.showOrderDetail && (
                        <TopicDetailDialog
                            topicId={item['topic_id'] || '0117110002401'}
                            LikeDetail={this.props.fetchLikeDetail}
                            item={item}
                            onExited={() => this.setState({showOrderDetail: false})}
                        />
                    )
                }
                <div className='toolbar'>

                    <div>
                        <Button disabled={this.state.index == -1} onClick={() => this.setState({showOrderDetail: true})}>查看</Button>
                    </div>
                    <div>
                        <SearchBox label='患者' placeholder='输入手机号码、编号查询'
                                   searchKey={this.state.search_key}
                                   onChange={v => this.setState({search_key: v})}
                                   onSearch={() => this.toPage(0)}
                        />
                        <Button>导出到Excel</Button>
                    </div>
                </div>
                <div className="query-filter">
                    <FilterItem size="big" label="发表时间">
                        <DateInterval
                            startDate={this.state.handleStartDate} endDate={this.state.handleEndDate}
                            onStartDateChange={v => this.setState({handleStartDate: v})} onEndDateChange={v => this.setState({handleEndDate: v})}
                        />
                    </FilterItem>
                    <FilterItem label="是否隐藏">
                        <FilterOptions options={filters.yesOrNo} value={this.state.yesOrNo}
                                       onChange={v => this.setState({yesOrNo: v})}/>
                    </FilterItem>
                    <SelectedFilter
                        notEmpty={haveNotEmptyValue(this.state, ['yesOrNo','handleStartDate','handleEndDate'])}
                        beginFilter={() => this.toPage(0)}
                        clearAll={this.clearAllFilter}
                    >
                        <SelectedItem
                            label="是否隐藏" value={this.state.yesOrNo} options={filters.yesOrNo}
                            onReset={() => this.setState({yesOrNo: ''})}
                        />
                        <SelectedItem
                            label="发表时间" text={getStartEndDateStr(this.state.handleStartDate, this.state.handleEndDate)}
                            onReset={() => this.setState({handleStartDate: null, handleEndDate: null})}
                        />
                    </SelectedFilter>
                </div>
                <FixHeadList total={total} minWidth="1500px" weights={[1,1,1,1,1,1,1,1,1,1]}>
                    <FixHead>
                        <FixHead.Item>患者编号</FixHead.Item>
                        <FixHead.Item>手机号码</FixHead.Item>
                        <FixHead.Item>真实姓名</FixHead.Item>
                        <FixHead.Item>话题内容</FixHead.Item>
                        <FixHead.Item>评论</FixHead.Item>
                        <FixHead.Item>点赞数</FixHead.Item>
                        <FixHead.Item>发表时间</FixHead.Item>
                        <FixHead.Item>备注</FixHead.Item>
                        <FixHead.Item>是否隐藏</FixHead.Item>
                        <FixHead.Item>是否热门</FixHead.Item>
                    </FixHead>
                    <FixBody>
                        {
                            list.map((item, index) => {
                                return (
                                    <FixRow key={item['topic_id']}
                                            onClick={() => this.setState({index})}
                                            selected={this.state.index == index}
                                    >
                                        {/*<FixRow.Item>{getKnowledgeBaseText(item['knowledge_base_type'])}</FixRow.Item>*/}
                                        <FixRow.Item>{item['patient_code']}</FixRow.Item>
                                        <FixRow.Item>{item['user_account']}</FixRow.Item>
                                        <FixRow.Item>{item['real_name']}</FixRow.Item>
                                        <FixRow.Item><a onClick={() => this.inspectOrder(item)}>查看</a></FixRow.Item>
                                        <FixRow.Item>{item['discuss_count']}</FixRow.Item>
                                        <FixRow.Item>{item['like_count']}</FixRow.Item>
                                        <FixRow.Item>{item['create_time']}</FixRow.Item>
                                        <FixRow.Item>
                                            {item['remark']}<IconR type="remark" onClick={() => this.setState({showEditRemark: true})}/>
                                        </FixRow.Item>
                                        <FixRow.Item>{item['is_hide_str']}</FixRow.Item>
                                        <FixRow.Item>{item['is_hot_str']}</FixRow.Item>
                                    </FixRow>
                                )
                            })
                        }
                    </FixBody>
                </FixHeadList>
                <PageCountNav currentPage={this.state.currentPage} total={total} onPageChange={this.toPage}/>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        ...state.topicOfConversation,
        topicList:state.topicList,
        topicOfConversation: state.topicOfConversation,
        updateRemarkSuccess: state.topicOfConversation.updateRemarkSuccess
    }
}
export default connect(mapStateToProps, actions)(addCommonFunction(TopicOfConversation))
