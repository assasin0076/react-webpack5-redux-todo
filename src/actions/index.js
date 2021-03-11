import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD');
export const removeTask = createAction('TASK_REMOVE');
export const completeTask = createAction('TASK_COMPLETE');

export const updateText = createAction('TEXT_UPDATE');
