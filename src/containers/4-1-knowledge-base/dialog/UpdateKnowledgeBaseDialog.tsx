/**
 * zhouhangshuai on 2018-1-15
 */
import React from 'react';
import {connect} from 'react-redux'
import Icon from 'antd/lib/icon'
import Radio from 'antd/lib/radio'
import Modal from 'app-core/modal'
import {FlexDiv, Part, Line} from 'app-core/layout/'
import Input from 'app-core/form/Input'
import TextArea from 'app-core/form/TextArea'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import ConfirmDel from 'app-core/common/ConfirmDel'
import ConfirmOrDelete from 'app-core/common/ConfirmOrDelete'
import Button from '../../../components/button/Button'
import LocalImage from '../../../components/media/LocalImage'
import SelectTagDialog from '../dialog/SelectTagDialog'
import {hasSelected} from "../../4-1-knowledge-base/knowledge-base.constant";
import FileUpload from '../../../components/upload/FileUpload'


import {default as index, ReducerType} from '../../../reducers/index'
import Label from '../../../components/element/Label'
import Data from '../../../core/interface/Data'
import ValueText from '../../../core/interface/ValueText'
import {KnowledgeBaseItem} from "./interface/KnowledgeBase";
import {tagFilter} from "../knowledge-base.constant";

interface UpdateKnowledgeBaseDialogProps {
    updateKnowledgeBase: (...options) => void
    updateKnowledgeBaseSuccess: boolean
    deleteKnowledgeBaseSuccess: boolean
    deleteKnowledgeBase: (options) => void
    getKnowledgeBaseList: (options) => void
    onExited: () => void
    fetchAllTag:() => void
    allTag: Data<any>
    knowledgeBaseDetail: Data<any>
    knowledgeBase:KnowledgeBaseItem
}

class UpdateKnowledgeBaseDialog extends React.Component<UpdateKnowledgeBaseDialogProps> {
    state = {
        show: true,
        showAddConfirm: false,
        category:'',
        title:'',
        url:'',
        remark:'',
        id:'',
        bannerIsShow:1,
        imageFile:null,
        knowledgeBaseImageUrl:'',
        slideImageFile:'',
        showTag:false,
        selectedTags:[[],[],[]],
        order:'',
        radioCheck:'',
        showDelete:false,
        slideImageUrl:''
    }
    close = () => {
        this.setState({show: false})
    }

    radioChecked = (e) =>{
        this.setState({
            radioCheck:e.target.value
        })
    }
    handleUploaded = (fileInfo)=> {
        this.setState({knowledgeBaseImageUrl:fileInfo[0].fileUrl})
    }
    handleUploadedConfig = (fileInfo)=> {
        this.setState({slideImageUrl:fileInfo[0].fileUrl})
    }

    updateKnowledgeBase = () =>{
        const selectedTags = this.state.selectedTags;
        let tagIdList = selectedTags[0].concat(selectedTags[1]).concat(selectedTags[2]).map(tag => tag['knowledge_base_tag_value'])
        this.props.updateKnowledgeBase(
            this.state.category,
            this.state.title,
            tagIdList.toString(),
            this.state.knowledgeBaseImageUrl,
            this.state.radioCheck,
            this.state.order,
            this.state.slideImageFile,
            this.state.url,
            this.state.remark,
            this.state.id
            )
    }

    deleteKnowledgeBase = () =>{
        let id = this.props.knowledgeBase['knowledge_base_id']
        this.props.deleteKnowledgeBase(id)
        // this.setState({show: false})
    }

initState(knowledgeBaseDetail) {
    const {
        is_img_config,
        knowledge_base_remark,
        img_config_order,
        img_config_url ,
        knowledge_base_content,
        knowledge_base_picture_url,
        knowledge_base_tags,
        knowledge_base_title,
        knowledge_base_type,
        knowledge_base_url,
    } = knowledgeBaseDetail

    this.setState({
        category:knowledge_base_type,
        title:knowledge_base_title,
        order:img_config_order,
        selectedTags:hasSelected(knowledge_base_tags.split(","),this.state.selectedTags),
        knowledgeBaseImageUrl:knowledge_base_picture_url,
        radioCheck:is_img_config,
        remark:knowledge_base_remark,
        slideImageUrl:img_config_url,
        url:knowledge_base_url,
    })
}
    componentDidMount(){
        if(!this.props.allTag.loaded){
            this.props.fetchAllTag()
        }
        let id = this.props.knowledgeBase['knowledge_base_id']
         this.props.getKnowledgeBaseList(id);
    }
    componentWillReceiveProps(nextProps: UpdateKnowledgeBaseDialogProps) {
        if (!this.props.updateKnowledgeBaseSuccess && nextProps.updateKnowledgeBaseSuccess) {
            this.close()
        }
        if (!this.props.deleteKnowledgeBaseSuccess && nextProps.deleteKnowledgeBaseSuccess) {
            this.close()
        }
        if(!this.props.knowledgeBaseDetail.loaded && nextProps.knowledgeBaseDetail.loaded) {
            console.log(nextProps.knowledgeBaseDetail)
            this.initState(nextProps.knowledgeBaseDetail.data)

        }

    }

    render() {
        // console.log(this.props.knowledgeBaseList['knowledge_base_id']);
        // let id = this.props.knowledgeBaseList['knowledge_base_id'];
        // console.log(this.props)
        return (
            <Modal className="knowledge-base add-knowledgeBase-dialog" show={this.state.show} onHide={this.close}
                   onExited={this.props.onExited}>
                {
                    this.state.showTag && (
                        <SelectTagDialog
                            allTag={this.props.allTag.data || []}
                            initValue={this.state.selectedTags}
                            onConfirm={selectedTags => this.setState({selectedTags})}
                            onExited={() => this.setState({showTag:false})}/>
                    )
                }
                {
                    this.state.showAddConfirm && (
                        <Confirm message="确定要修改知识库？"
                                 onExited={() => this.setState({showAddConfirm: false})}
                                 onConfirm={this.updateKnowledgeBase}/>
                    )
                }
                {
                    this.state.showDelete && (
                        <Confirm message="确定要删除知识库？"
                                 onExited={() => this.setState({showDelete: false})}
                                 onConfirm={this.deleteKnowledgeBase}/>
                    )
                }

                <Modal.Header closeButton={true}>
                    <Modal.Title>编辑知识库</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FlexDiv>
                        <Part>
                            <Label>分类</Label>
                        </Part>
                        <Part>
                            <Select1
                                value={this.state.category}
                                options={[{value:'1',text:'文章'},{value:'2',text:'视频'}]}
                                onChange={value => this.setState({category:value})} />
                        </Part>
                    </FlexDiv>

                    <Line/>

                    <FlexDiv>
                        <Part>
                            <Label>
                                标题
                            </Label>
                        </Part>
                        <Part>
                            <Input
                                placeholder="请输入"
                                value ={this.state.title}
                                onChange ={v => this.setState({title:v.substring(0,50)})} />
                        </Part>
                    </FlexDiv>

                    <Line/>

                    <FlexDiv>
                        <Part>
                            <Label>标签</Label>
                        </Part>
                        <Part>
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
                        </Part>
                    </FlexDiv>

                    <Line/>

                    <FlexDiv>
                        <Part>
                            <Label>图片</Label>
                        </Part>
                        <Part>
                            {
                                this.state.knowledgeBaseImageUrl&&(
                                    <img style={{width:150}} src={this.state.knowledgeBaseImageUrl} />
                                )
                            }
                            <FileUpload onFileUploadSuccess={this.handleUploaded}>
                                <Button>上传</Button>
                            </FileUpload>
                        </Part>
                    </FlexDiv>

                    <Line/>

                    <FlexDiv>
                        <Part>
                            <Label>轮播图(是否同时显示在首页)</Label>
                        </Part>
                        <Part>
                            <Radio.Group onChange={(e) => this.radioChecked(e)} value={this.state.radioCheck}>
                                <Radio value={0}>否</Radio>
                                <Radio value={1}>是</Radio>
                            </Radio.Group>
                        </Part>
                    </FlexDiv>
                    <Line/>

                    <FlexDiv>
                        <Part>
                            <Label>轮播图序号</Label>
                        </Part>
                        <Part>
                            <Select1
                                disabled={this.state.radioCheck == '0'}
                                value={this.state.order}
                                options={[
                                    {value:'1',text:'1'},
                                    {value:'2',text:'2'},
                                    {value:'3',text:'3'},
                                    {value:'4',text:'4'},
                                    {value:'5',text:'5'},
                                    {value:'6',text:'6'},
                                    {value:'7',text:'7'},
                                    {value:'8',text:'8'},
                                    {value:'9',text:'9'},
                                ]}
                                onChange={value => this.setState({order:value})} />
                        </Part>
                    </FlexDiv>
                    <Line/>

                    <FlexDiv>
                        <Part>
                            <Label>轮播图图片</Label>
                        </Part>
                        <Part>
                            {
                                this.state.slideImageUrl&&(
                                    <img style={{width:150}} src={this.state.slideImageUrl} />
                                )
                            }
                            <FileUpload onFileUploadSuccess={this.handleUploadedConfig}>
                                <Button>上传</Button>
                            </FileUpload>
                        </Part>
                    </FlexDiv>
                    <Line/>
                    <FlexDiv>
                        <Part>
                            <Label>知识库URL链接</Label>
                        </Part>
                        <Part>
                            <Input
                                placeholder='请输入'
                                value={this.state.url}
                                onChange={v => this.setState({url: v})}/>
                        </Part>
                    </FlexDiv>

                    <Line/>

                    <FlexDiv>
                        <Part>
                            <Label>备注</Label>
                        </Part>
                        <Part>
                            <TextArea
                                style={{resize:'none'}}
                                placeholder="请输入"
                                rows={3}
                                value={this.state.remark}
                                onChange={v => this.setState({remark:v})}
                            >
                            </TextArea>
                        </Part>
                    </FlexDiv>
                </Modal.Body>
                <Modal.Footer>
                    <ConfirmOrDelete onDelete={() => this.setState({showDelete:true})} onConfirm={() => this.setState({showAddConfirm: true})}/>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default UpdateKnowledgeBaseDialog