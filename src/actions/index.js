import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD');
export const removeTask = createAction('TASK_REMOVE');
export const completeTask = createAction('TASK_COMPLETE');

export const updateDescText = createAction('TEXT_DESC_UPDATE');
export const updateText = createAction('TEXT_UPDATE');

export const reverseShowState = createAction('DESC_REVERSE_SHOW_STATE');