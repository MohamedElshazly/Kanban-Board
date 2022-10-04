import React from 'react'
import { useDrop } from "react-dnd";

import '../styles/column.css'

export default function KanbanColumn({ accept, status, changeTaskStatus, addTask, children }) {
  const [, drop] = useDrop({
    accept,
    drop(item) {
      changeTaskStatus(item.id, status);
    }
  });
  const handleAdd = (e) => {
    e.preventDefault();
    const name = document.getElementById(`add-${status}`).value;
    const priority = document.getElementById(`prio-${status}`).value;
    document.getElementById(`add-${status}`).value = '';
    addTask(name, status, priority);
  }
  return (
    <div ref={drop}>
      {children}
      <div className="add-task"> 
        <form action="#" onSubmit={handleAdd}>
          <label htmlFor={`add-${status}`}>Add a task!</label>
          <input type="text" name='add' id={`add-${status}`} />
          <label htmlFor={`prio-${status}`}></label>
          <select name="prio" id={`prio-${status}`}>
            <option value="highest">Highest</option>
            <option value="high">High</option>
            <option value="low">Low</option>
            <option value="noprio" selected>No priority</option>
          </select>
          <button type='submit'>Add!</button>
        </form>

      </div>

    </div>
  )
}
