/**
 * zhouhangshuai on 2018-1-18
 */
import React from 'react'
import Modal from 'app-core/modal'
import classnames from 'classnames'
import Data from "../../../core/interface/Data";

interface SelectTagDialogProps{
    allTag: any,
    //应该是数组
    initValue: any[],
    //应该是数组
    onConfirm: (v) => void
    onExited:() => void
}

class SelectTagDialog extends React.Component<SelectTagDialogProps,any>{
    constructor(props) {
        super(props)
        let selectedTags = props.initValue.map(tagCategory => tagCategory.map(tag => ({...tag, selected: true})))
        // console.log('selectedTags',selectedTags)
        //选择的
        this.state = {
            show: true,
            selectedTags,
        }
    }

    close = () => {
        this.setState({show: false})
    }
    handleTagClick = (i, currentTag) => {
        let selectedTags = this.state.selectedTags
        let matchTag = selectedTags[i].find(tag => (tag['knowledge_base_tag_value'] == currentTag['knowledge_base_tag_value']))
        // console.log('matchTag',matchTag)
        if (!matchTag) {
            selectedTags[i].push({...currentTag, selected: true})
    //         // console.log(selectedTags)
        } else {
            matchTag.selected = !matchTag.selected
        }
        this.setState({selectedTags})
    //     // console.log(i)
    //     console.log("currentTag",currentTag)
    //     // console.log(this.props)
    }

    handleConfirm = () => {
        let r = this.state.selectedTags.map(tags => tags.filter(tag => tag.selected == true))
        this.props.onConfirm(r)
        this.close()
    }

    render() {
        // console.log("log",this.props.initValue)
        return (
            <Modal
                className="select-tag"
                show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>选择标签</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.allTag.map((tag, index1) => {
                            // console.log(tag)
                            return (
                                <section key={index1} className="tag-category">
                                    <header>{tag.tagTitle}：</header>
                                    <div className="mt-5">
                                        {
                                            tag.tagList.map((item, index2) => {
                                                let selected = this.state.selectedTags[index1].find(tag => tag['knowledge_base_tag_value'] == item['knowledge_base_tag_value'])
                                                return (
                                                    <div key={index2} className={classnames('tag', {'selected': selected && selected.selected})}
                                                         onClick={() => this.handleTagClick(index1, item)}>
                                                        {item['knowledge_base_tag_value']}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </section>
                            )
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-info" onClick={this.handleConfirm}>确定</button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default SelectTagDialog
