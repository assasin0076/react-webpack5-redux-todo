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
    updateDescText: actions.updateDescText,
    reverseShowState: actions.reverseShowState,
  }

const mapStateToProps = (state) => {
    // BEGIN (write your solution here)
    const { tasks, text, UIState } = state;
    return {
      tasks,
      text,
      UIState,
    }
    // END
  };




const Form = ({ 
    tasks,
    text,
    UIState,
    removeTask,
    addTask,
    updateText,
    updateDescText,
    reverseShowState,
    }) => {
    const addHandler = (e) => {
        e.preventDefault()
        const task = {
            text: text.taskText,
            descText: UIState.desc.show == 'no' ? 'none' : text.descText,
            id: _.uniqueId(),
            state: {
                status: 'active',
                descStatus: 'hidden',
            },
        };
        addTask({ task });
    };

    const updateTextHandler = (e) => {
        updateText({ text: e.target.value });
    }
    const showDescHandler = (e) => {
        reverseShowState();
    }
    const updateDescTextHandler = (e) => {
        updateDescText({ text: e.target.value })
    }
    const descFieldClasses = cn({
        "mb-3": true,
    })

    return (
        <div className="container mt-4">
            <form>
                <div className="mb-3">
                    <label className="form-label">Какие планы?</label>
                    <input onChange={ updateTextHandler } type="text" value={text.taskText} className="form-control" placeholder="Сходить в кино..." />
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" value="" onChange={ showDescHandler }/>
                    <label className="form-check-label" for="flexCheckDefault">
                        Добавить описание
                    </label>
                </div>
                <div hidden={ UIState.desc.show == 'no' ? 'Hide' : '' } className={descFieldClasses}>
                    <textarea onChange={updateDescTextHandler} className="form-control" rows="2" placeholder='Описание'></textarea>
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