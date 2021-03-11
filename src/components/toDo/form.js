import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash'
import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../../actions/index.js';
import Task from './Task.js'

const actionCreators = {
    removeTask: actions.removeTask,
    addTask: actions.addTask,
    updateText: actions.updateText,
  }

const mapStateToProps = (state) => {
    // BEGIN (write your solution here)
    const { tasks, text } = state;
    return {
      tasks,
      text,
    }
    // END
  };




const Form = ({ 
    tasks,
    text,
    removeTask,
    addTask,
    updateText,
    }) => {
    const addHandler = (e) => {
        e.preventDefault()
        const task = {
            text,
            id: _.uniqueId(),
            status: 'active',
        };
        addTask({ task });
    };

    const updateTextHandler = (e) => {
        updateText({ text: e.target.value });
    }

    

    return (
        <div className="container">
            <form>
                <div className="mb-3">
                    <label className="form-label">Какие планы?</label>
                    <input onChange={ updateTextHandler } type="text" value={text} className="form-control" placeholder="Сходить в кино..." />
                </div>
                <button type="submit" onClick={addHandler} className="btn btn-primary">Добавить</button>
            </form>
            <div className="m-5">
                <ul className="pl-0">
                    {tasks.allIds.map((id) => {
                        return <Task key={id} task={ tasks.byId[id] } />
                    })}
                </ul>
            </div>
        </div>
    );
}
//actionCreators?
export default connect(mapStateToProps, actionCreators)(Form);