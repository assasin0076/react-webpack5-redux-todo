import React from 'react';
import style from './Task.module.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/index.js';
import cn from 'classnames';
import { uniqueId } from 'lodash';

const actionCreators = {
    removeTask: actions.removeTask,
    completeTask: actions.completeTask,
  }

const mapStateToProps = (state) => {
    // BEGIN (write your solution here)
    const { tasks } = state;
    return {
      tasks,
    }
    // END
  };

const Task = ({ removeTask, completeTask, task }) => {
    const { text, id, status } = task;

    
    const completeHandler = (id) => (e) => {
        completeTask(id);
    }

    const mappingChangeStatusIcon = {
        'active': 
        (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
            </svg>
        ),
        'complete': 
        (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"></path>
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"></path>
            </svg>
        )
    }
    const changeStatusIcon = {
        action: completeHandler(id),
        icon: (mappingChangeStatusIcon[status])
    };

    const removeHandler = (id) => (e) => {
        removeTask(id);
    }

    const removeIcon = 
        {
            action: removeHandler(id),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-x-circle-fill" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                </svg>
            )
        };


    const icons = [removeIcon, changeStatusIcon]

    const mappingAllertClasses = {
        'active': 'alert-primary',
        'complete': 'alert-success',
    }
    const alertClasses = cn({
        [mappingAllertClasses[status]]: true,
        'alert d-flex flex-row align-items-center justify-content-between': true,
    })

    return (
        <li className={style.listItem} >
            <div className={alertClasses} role="alert">
                <div className='p-1'>
                    <p className="m-0">{text}</p>
                </div>
                <div className={`d-flex justify-content-between ${style.buttonsGroup}`}>
                    {icons.map(({ action = () => {}, icon }) => {
                        return <div key={uniqueId()} className={style.taskButton} onClick={action}>{icon}</div>
                    })}
                </div>
            </div>
            
        </li>
    )
}

export default connect(mapStateToProps, actionCreators)(Task);