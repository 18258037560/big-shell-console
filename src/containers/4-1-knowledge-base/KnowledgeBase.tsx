/**
 * zhouhangshuai on 2018-1-5
 */
import React from 'react';
import {connect} from 'react-redux';
import Icon from 'antd/lib/icon';

import IconR from '../../components/Icon'
import Button from '../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'
import SearchBox from '../../components/search/SearchBox'
import FilterItem from '../../components/query-filter/FilterItem'
import DateInterval from '../../components/query-filter/extends/DateInterval'
import FilterOptions from '../../components/query-filter/FilterOptions'
import SelectedFilter from '../../components/query-filter/SelectedFilter'
import EditRemark from '../../components/EditRemark'
import SelectedItem from '../../components/query-filter/SelectedItem'
import {categoryFilter, filters} from "../4-1-knowledge-base/knowledge-base.constant";
import {getStartEndDateStr, handleListData, haveNotEmptyValue} from "../common/common-helper";
import AppFunctionPage from "../../core/interface/AppFunctionPage";
import Data from "../../core/interface/Data";
import {getDateStr} from "../../core/utils/dateUtils";
import {getKnowledgeBaseText} from "./knowledge-base.helper";
import {_get} from "../../core/http";
import * as actions from "./knowledge-base.action";
import addCommonFunction from "../../core/hoc/addCommonFunction";
import AddKnowledgeBaseDialog from './dialog/AddKnowledgeBaseDialog'
import UpdateKnowledgeBaseDialog from './dialog/UpdateKnowledgeBaseDialog'
import SelectTagDialog from './dialog/SelectTagDialog'


interface KnowledgeBaseProps extends AppFunctionPage {
    knowledgeList: Data<any[]>
    userAppealList: Data<any[]>
    remarks: Data<any[]>
    updateRemark: (id, remark) => void
    updateRemarkSuccess: boolean
    fetchAllTag:() => void
    allTag:any
    knowledgeBaseDetail:Data<any[]>
    addKnowledgeBase:() => void
    updateKnowledgeBase:() => void
    deleteKnowledgeBase:() => void
    getKnowledgeBaseList:() => void
    addKnowledgeBaseSuccess:boolean
    updateKnowledgeBaseSuccess:boolean
    deleteKnowledgeBaseSuccess:boolean
    knowledgeBaseList:Data<any>
}

class KnowledgeBase extends React.Component<KnowledgeBaseProps> {

    state = {
        currentPage: 0,
        index: -1,
        showEdit:false,
        showEditRemark: false,
        showAdd:false,

        searchKey: '',
        orderType: '',
        slideShow:'',
        appealType: '',
        search_key:'',
        appealStartDate: null,
        appealEndDate: null,
        handleResult: '',
        handleStartDate: null,
        handleEndDate: null,
        showTag:false,
        selectedTags:[[],[],[]],
        addKnowledgeBaseSuccess:false,
        updateKnowledgeBaseSuccess:false,
        deleteKnowledgeBaseSuccess:false

    }
    clearAllFilter = () => {
        this.setState({
            searchKey: '',
            orderType: '',
            appealType: '',
            slideShow: '',
            appealStartDate: null,
            appealEndDate: null,
            handleResult: '',
            handleStartDate: null,
            handleEndDate: null,
            selectedTags:[[],[],[]],
        })
    }

    toPage = (newPage?: number) => {
        if (newPage == null) newPage = this.state.currentPage
        if (newPage != this.state.currentPage) {
            this.setState({currentPage: newPage})
        }
        let selectedTagTransform =  this.state.selectedTags[0].concat(this.state.selectedTags[1]).concat(this.state.selectedTags[2]).map(tag => tag['knowledge_base_tag_value']).toString()
        this.props.fetchList({
            "begin_time": this.state.handleStartDate,
            "end_time": this.state.handleEndDate,
            "is_img_config": this.state.slideShow,
            "key_words": this.state.search_key,
            "knowledge_base_tag": selectedTagTransform,
            "knowledge_base_type": this.state.orderType,
            "limit": 10,
            "start": newPage
        })
    }
    updateRemark = (newRemark) => {
        const item = handleListData(this.props.knowledgeList).list[this.state.index]
        this.props.updateRemark(item['knowledge_base_id'], newRemark)
    }

    componentDidMount() {
        this.toPage(0)

        if(!this.props.allTag.loaded){
            this.props.fetchAllTag()
        }
    }
    componentWillReceiveProps(nextProps: KnowledgeBaseProps) {
        if (!this.props.updateRemarkSuccess && nextProps.updateRemarkSuccess) {
            this.props.showSuccess('更新备注成功！')
            this.toPage()
        }

        if (!this.props.addKnowledgeBaseSuccess && nextProps.addKnowledgeBaseSuccess) {
            this.props.showSuccess('添加知识库成功！')
            this.toPage(0)
        }
        if (!this.props.updateKnowledgeBaseSuccess && nextProps.updateKnowledgeBaseSuccess) {
            this.props.showSuccess('更新知识库成功！')
            this.toPage()
        }
        if (!this.props.deleteKnowledgeBaseSuccess && nextProps.deleteKnowledgeBaseSuccess) {
            this.props.showSuccess('删除知识库成功！')
            this.toPage()
        }
    }
    render(){
        const {total, list, loading, loaded} = handleListData(this.props.knowledgeList);
        const item = list[this.state.index] || {};
        console.log(this.props.updateRemarkSuccess)
        return(
            <div className='app-function-page'>
                {
                    this.state.showAdd &&  (
                        <AddKnowledgeBaseDialog
                            addKnowledgeBase={this.props.addKnowledgeBase}
                            addKnowledgeBaseSuccess={this.props.addKnowledgeBaseSuccess}
                            fetchAllTag = {this.props.fetchAllTag}
                            allTag = {this.props.allTag}
                            onExited={() => this.setState({showAdd: false})} />
                    )
                }
                {
                    this.state.showEdit && this.state.index != -1 &&(
                        <UpdateKnowledgeBaseDialog
                        updateKnowledgeBase={this.props.updateKnowledgeBase}
                        updateKnowledgeBaseSuccess={this.props.updateKnowledgeBaseSuccess}
                        deleteKnowledgeBaseSuccess={this.props.deleteKnowledgeBaseSuccess}
                        deleteKnowledgeBase={this.props.deleteKnowledgeBase}
                        getKnowledgeBaseList={this.props.getKnowledgeBaseList}
                        knowledgeBaseDetail={this.props.knowledgeBaseDetail}
                        fetchAllTag = {this.props.fetchAllTag}
                        allTag = {this.props.allTag}
                        knowledgeBase = {item}
                        onExited={() => this.setState({showEdit:false})}
                        />
                    )
                }
                {
                    this.state.showEditRemark && (
                        <EditRemark
                            value={item['knowledge_base_remark']}
                            updateRemark={this.updateRemark} updateRemarkSuccess={this.props.updateRemarkSuccess} onExited={ () => this.setState({showEditRemark: false}) }/>
                    )
                }
                {
                    this.state.showTag && (
                        <SelectTagDialog
                            allTag={this.props.allTag.data || []}
                            initValue={this.state.selectedTags}
                            onConfirm={selectedTags => this.setState({selectedTags})}
                            onExited={() => this.setState({showTag:false})}/>
                    )
                }
                <div className='toolbar'>

                    <div>
                        <Button onClick={() => this.setState({showAdd:true})}>新增</Button>
                        <Button disabled = {this.state.index == -1} onClick={() => this.setState({showEdit:true}) }>查看</Button>
                    </div>
                    <div>
                        <SearchBox label='标题' placeholder='输入标题查询'
                                   searchKey={this.state.search_key}
                                   onChange={v => this.setState({search_key: v})}
                                   onSearch={() => this.toPage(0)}
                        />
                        <Button>导出到Excel</Button>
                    </div>
                </div>
                <div className="query-filter">

                    <FilterItem label="分类">
                        <FilterOptions options={filters.orderType} value={this.state.orderType}
                                       onChange={v => this.setState({orderType: v})}/>
                    </FilterItem>

                    <FilterItem label="轮播图">
                        <FilterOptions options={filters.slideShow} value={this.state.slideShow}
                                       onChange={v => this.setState({slideShow: v})}/>
                    </FilterItem>

                    <FilterItem label="标签">
                        {
                            this.state.selectedTags.map((tagCategory,index1) =>{
                                return tagCategory.map((tag,index2) => {
                                    return (
                                        <div key={tag['knowledge_base_tag_value']} className='tag'>{tag['knowledge_base_tag_value']}</div>
                                    )
                                })
                            })
                        }
                        <div className='add-tag' onClick={(e) => this.setState({showTag:true})}>
                            <Icon className='iconPlus' type="plus-square" />
                        </div>
                    </FilterItem>

                    <FilterItem size="big" label="创建日期">
                        <DateInterval
                            startDate={this.state.handleStartDate} endDate={this.state.handleEndDate}
                            onStartDateChange={v => this.setState({handleStartDate: v})} onEndDateChange={v => this.setState({handleEndDate: v})}
                        />
                    </FilterItem>
                    <SelectedFilter
                        notEmpty={haveNotEmptyValue(this.state, ['orderType', 'appealType', 'appealStartDate', 'appealEndDate', 'handleResult', 'handleStartDate', 'handleEndDate'])}
                        beginFilter={() => this.toPage(0)}
                        clearAll={this.clearAllFilter}
                    >
                        <SelectedItem
                            label="分类" value={this.state.orderType} options={filters.orderType}
                            onReset={() => this.setState({orderType: ''})}
                        />
                        <SelectedItem
                            label="轮播图" value={this.state.slideShow} options={filters.slideShow}
                            onReset={() => this.setState({slideShow: ''})}
                        />

                        <SelectedItem
                            label="创建时间" text={getStartEndDateStr(this.state.handleStartDate, this.state.handleEndDate)}
                            onReset={() => this.setState({handleStartDate: null, handleEndDate: null})}
                        />
                    </SelectedFilter>
                </div>
                <FixHeadList total={total} minWidth="1500px" weights={[1,1, 1,3, 1,1,1,2]}>
                    <FixHead>
                        <FixHead.Item>分类</FixHead.Item>
                        <FixHead.Item>标题</FixHead.Item>
                        <FixHead.Item>标签</FixHead.Item>
                        <FixHead.Item>URL链接</FixHead.Item>
                        <FixHead.Item>轮播图</FixHead.Item>
                        <FixHead.Item>轮播图序号</FixHead.Item>
                        <FixHead.Item>备注</FixHead.Item>
                        <FixHead.Item>创建时间</FixHead.Item>
                    </FixHead>
                    <FixBody>
                        {
                            list.map((item, index) => {
                                return (
                                    <FixRow key={item['knowledge_base_id']}
                                            onClick={() => this.setState({index})}
                                            selected={this.state.index == index}
                                    >
                                        <FixRow.Item>{getKnowledgeBaseText(item['knowledge_base_type'])}</FixRow.Item>
                                        <FixRow.Item>{item['knowledge_base_title']}</FixRow.Item>
                                        <FixRow.Item>{item['knowledge_base_tags']}</FixRow.Item>
                                        <FixRow.Item>{item['knowledge_base_url']}</FixRow.Item>
                                        <FixRow.Item>{item['is_img_config']}</FixRow.Item>
                                        <FixRow.Item>{item['img_config_order']}</FixRow.Item>
                                        <FixRow.Item>
                                            {item['knowledge_base_remark']}<IconR type="remark" onClick={() => this.setState({showEditRemark: true})}/>
                                        </FixRow.Item>
                                        <FixRow.Item>{item['create_time']}</FixRow.Item>
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
        ...state.knowledgeBase,
        knowledgeList: state.knowledgeList,
        updateRemarkSuccess: state.knowledgeBase.updateRemarkSuccess,
        addKnowledgeBaseSuccess: state.knowledgeBase.addKnowledgeBaseSuccess,
        updateKnowledgeBaseSuccess: state.knowledgeBase.updateKnowledgeBaseSuccess,
        deleteKnowledgeBaseSuccess: state.knowledgeBase.deleteKnowledgeBaseSuccess,
        knowledgeBaseDetail:state.knowledgeBaseDetail,
        allTag:state.allTag
    }
}
export default connect(mapStateToProps, actions)(addCommonFunction(KnowledgeBase))


