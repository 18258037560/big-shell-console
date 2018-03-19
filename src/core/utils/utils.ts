/**
 * Created by zhouhangshuai on 2018/2/5.
 */
import {fromJS} from 'immutable'
import constants from '../constants/constants'


export function getFilterItem(typeCode,typeText,typeItemList){
    if(!typeItemList){
        typeItemList = [
            {value:constants.yesOrNo.yes,text:'是'},{value:constants.yesOrNo.no,text:'否'}
        ]
    }
    return{
        typeCode:typeCode,
        typeText:typeText,
        typeItemList:typeItemList
    }
}