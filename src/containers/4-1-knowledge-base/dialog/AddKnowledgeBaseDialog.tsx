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
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import Button from '../../../components/button/Button'
import LocalImage from '../../../components/media/LocalImage'
import SelectTagDialog from '../dialog/SelectTagDialog'
import FileUpload from '../../../components/upload/FileUpload'

import {default as index, ReducerType} from '../../../reducers/index'
import Label from '../../../components/element/Label'
import Data from '../../../core/interface/Data'
import ValueText from '../../../core/interface/ValueText'
import {tagFilter} from "../knowledge-base.constant";

interface AddKnowledgeBaseDialogProps {
    addKnowledgeBase: (...options) => void
    addKnowledgeBaseSuccess: boolean
    onExited: () => void
    fetchAllTag:() => void
    allTag: Data<any>
}

class AddKnowledgeBaseDialog extends React.Component<AddKnowledgeBaseDialogProps> {
    state = {
        show: true,
        showAddConfirm: false,
        category:'',
        title:'',
        url:'',
        remark:'',
        bannerIsShow:1,
        showTag:false,
        selectedTags:[[],[],[]],
        order:'',
        radioCheck:'',
        knowledgeBaseImageUrl:'',
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

    addKnowledgeBase = () =>{
        const selectedTags = this.state.selectedTags;
        let tagIdList = selectedTags[0].concat(selectedTags[1]).concat(selectedTags[2]).map(tag => tag['knowledge_base_tag_value'])
        this.props.addKnowledgeBase(
            this.state.category,
            this.state.title,
            tagIdList.toString(),
            this.state.knowledgeBaseImageUrl,
            this.state.radioCheck,
            this.state.order,
            this.state.slideImageUrl,
            this.state.url,
            this.state.remark
            )
    }

    componentDidMount(){
        if(!this.props.allTag.loaded){
            this.props.fetchAllTag()
        }
    }
    componentWillReceiveProps(nextProps: AddKnowledgeBaseDialogProps) {
        if (!this.props.addKnowledgeBaseSuccess && nextProps.addKnowledgeBaseSuccess) {
            this.close()
        }
    }

    render() {
        console.log(this.state.slideImageUrl);
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
                    <Confirm message="确定要添加知识库？"
                             onExited={() => this.setState({showAddConfirm: false})}
                             onConfirm={this.addKnowledgeBase}/>
                )
            }

                <Modal.Header closeButton={true}>
                    <Modal.Title>新增知识库</Modal.Title>
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
                    <ConfirmOrClose onCancel={this.close} onConfirm={() => this.setState({showAddConfirm: true})}/>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default AddKnowledgeBaseDialog