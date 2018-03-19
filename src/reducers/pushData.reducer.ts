import {fromJS} from 'immutable'
import phase from '../core/constants/phase'

const pushDataInitValue = {
  loading: false,
  loaded: false,
  data: {
    list: [],
    total: 0
  }
}

const pushData = fetchType => (iState = fromJS(pushDataInitValue), action) => {
  let nextIState = iState

  switch (action.type) {
    case fetchType + phase.START:
      nextIState = nextIState.set('loaded', false).set('loading', true)
      break

    case fetchType + phase.SUCCESS:
      const lastData = nextIState.get('data').toJS()
      const list = lastData.list.concat(action.data.list)
      nextIState = nextIState.set('loaded', true).set('loading', false).set('data', {
        list: list,
        total: action.data.total
      })
      break

    case fetchType + phase.FAILURE:
      nextIState = nextIState.set('loaded', false).set('loading', false).set('data', null)
      break

    default:
      break
  }

  return nextIState
}

export default pushData
