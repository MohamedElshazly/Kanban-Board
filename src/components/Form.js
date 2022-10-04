import React from 'react';

import '../styles/form.css';

export default function Form({ status, header, addTask }) {
    const handleAdd = (e) => {
        e.preventDefault();
        console.log(status)
        const name = document.getElementById(`add-${status}`).value;
        const priority = document.getElementById(`prio-${status}`).value;
        document.getElementById(`add-${status}`).value = '';
        addTask(name, status, priority);
        closeForm();
    }
    const closeForm = () => {
        document.getElementById(`add-task-${status}`).style.display = "none";
        document.getElementById(`add-task-${status}`).classList.remove('dim');
    }
    return (
        <div className="popup">
            <form action="#" id={`add-task-${status}`} className="add-task" onSubmit={handleAdd}>
                <fieldset>
                    <legend>{header}</legend>
                    <div className="form-content">
                        <div className="fields">
                            <p>
                                <label htmlFor={`add-${status}`}>Add a task!</label>
                                <input type="text" name='add' id={`add-${status}`} required />
                            </p>

                            <p>
                                <label htmlFor={`prio-${status}`}>Priority</label>
                                <select name="prio" id={`prio-${status}`}>
                                    <option value="highest">Highest</option>
                                    <option value="high">High</option>
                                    <option value="low">Low</option>
                                    <option value="noprio" selected>No priority</option>
                                </select>
                                <span></span>
                            </p>

                        </div>
                        <p className="btns">
                            <button type='submit' className='add'>Add!</button>
                            <button type="reset" className='close' onClick={closeForm}>Close</button>
                        </p>
                    </div>
                </fieldset>

            </form>

        </div>
    )
}
