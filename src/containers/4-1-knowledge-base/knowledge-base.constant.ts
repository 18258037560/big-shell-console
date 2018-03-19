/**
 * zhouhangshuai on 2018-1-5
 */
import {fromJS} from 'immutable'
import {getFilterItem} from '../../core/utils/utils'
export const categoryFilter = getFilterItem('category', '分类', [{value: '1', text: '文章'}, {value: '2', text: '视频'}])
export const tagFilter = getFilterItem('tag', '标签', [])
export const createTimeFilter = getFilterItem('createTime', '创建日期', [])

export const filters = {
  orderType: [
    {value: '1', text: '文章'},
    {value: '2', text: '视频'}
  ],

  slideShow: [
    {value: '1', text: '是'},
    {value: '2', text: '否'}
  ],

    transformWord:{
    1:"文章",
    2:"视频"
    }
}

export const KNOWLEDGE_BASE_TYPE_CODE_TEXT = {
  1: '文章',
  2: '视频'
}

const tag1 = [
  '备孕',
  '怀孕',
  '产后',
  '妈妈',
  '宝宝',
  '家属',
  '大三阳',
  '小三阳',
  '携带者'
]

const tag2 = [
  '孕产',
  '免疫',
  '抗病毒',
  '肝功能',
  '方法',
  '误区',
  '饮食',
  '养肝护肝',
  '心理健康'
]

const tag3 = [
  '症状',
  '传染',
  '诊断',
  '检查',
  '用药',
  '治疗',
  '预防',
  '护理',
  '保健'
]



export const tags = [
  {title: '身份', list: tag1.map(t => ({value: t, text: t}))},
  {title: '热敏词', list: tag2.map(t => ({value: t, text: t}))},
  {title: '行为', list: tag3.map(t => ({value: t, text: t}))}
]

//查看的时候筛选已经被选中的
export function selectedTransform(word) {
    const data = [
        {
            knowledge_base_tag_type: 1,
            list: [
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 1, knowledge_base_tag_value: "备孕"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 1, knowledge_base_tag_value: "怀孕"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 1, knowledge_base_tag_value: "产后"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 1, knowledge_base_tag_value: "妈妈"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 1, knowledge_base_tag_value: "宝宝"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 1, knowledge_base_tag_value: "家属"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 1, knowledge_base_tag_value: "大三阳"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 1, knowledge_base_tag_value: "小三阳"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 1, knowledge_base_tag_value: "携带者"},
            ]
        },
        {
            knowledge_base_tag_type: 2,
            list: [
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 2, knowledge_base_tag_value: "孕产"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 2, knowledge_base_tag_value: "免疫"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 2, knowledge_base_tag_value: "抗病毒"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 2, knowledge_base_tag_value: "肝功能"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 2, knowledge_base_tag_value: "方法"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 2, knowledge_base_tag_value: "误区"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 2, knowledge_base_tag_value: "饮食"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 2, knowledge_base_tag_value: "养肝护肝"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 2, knowledge_base_tag_value: "心理健康"}
            ]
        },
        {
            knowledge_base_tag_type: 3,
            list: [
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 3, knowledge_base_tag_value: "症状"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 3, knowledge_base_tag_value: "传染"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 3, knowledge_base_tag_value: "诊断"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 3, knowledge_base_tag_value: "检查"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 3, knowledge_base_tag_value: "用药"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 3, knowledge_base_tag_value: "治疗"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 3, knowledge_base_tag_value: "预防"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 3, knowledge_base_tag_value: "护理"},
                {knowledge_base_tag_id: "", knowledge_base_tag_type: 3, knowledge_base_tag_value: "保健"}
            ]
        }
    ]
    let obj = null
    data.map((tag1,index1) =>{
        tag1.list.map((tag2,index2)=>{
            if( word === tag2['knowledge_base_tag_value']){
                obj = tag2
            }
        })
    })
    return obj
}

export function hasSelected(ary1,ary2) {
    ary1.map(tag=>{
        ary2[selectedTransform(tag)['knowledge_base_tag_type']-1].push(selectedTransform(tag))
    })
    return ary2
}

