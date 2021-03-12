import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/index.js';
import _ from 'lodash';

const tasks = handleActions({
    [actions.addTask](state, { payload: { task } }) {
      const { byId, allIds } = state;
      return {
        byId: { ...byId, [task.id]: task },
        allIds: [task.id, ...allIds],
      };
    },
    [actions.removeTask](state, { payload }) {
      const id = payload
        return {
            byId: _.omit(state.byId, id),
            allIds: state.allIds.filter((el) => el != id),
        }
    },
    [actions.completeTask](state, { payload }) {
      const id = payload;
      const mapping = {
        'active': 'complete',
        'complete': 'active',
      }
      const selected = state.byId[id];
      const newByid = {...state.byId, [id]: { ...selected, status: ( mapping[selected.status] ) } };
      return {
        byId: newByid,
        allIds: state.allIds,
      }
    }
  }, { byId: {}, allIds: [] });

const text = handleActions({
    [actions.updateText](state, { payload: { text = '' } } ) {
      console.log(state);
        return {
          ...state,
          taskText: text,
        };
    }
}, { taskText:'', descText:'' });

const UIState = handleActions({
  [actions.reverseShowState](state, { payload }) {
    return {
      ...state,
      desc: {
        ...state.desc,
        show: state.desc.show == 'no' ? 'yes' : 'no' 
      }
    }
  }
}, 
{ 
  desc: {
    show: 'no'
} 
})

const rootReducer = combineReducers({
    tasks,
    text,
    UIState
});

export default rootReducer;