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
    }
  }, { byId: {}, allIds: [] });

const text = handleActions({
    [actions.updateText](state, { payload: { text = '' } } ) {
        return text;
    }
}, '');

const rootReducer = combineReducers({
    tasks,
    text
});

export default rootReducer;