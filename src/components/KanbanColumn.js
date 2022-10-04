import React from 'react'
import { useDrop } from "react-dnd";
import KanbanItem from './KanbanItem';
import Form from './Form';


import '../styles/column.css'

export default function KanbanColumn({ accept, status, header, tasks, changeTaskStatus, addTask }) {
  const [, drop] = useDrop({
    accept,
    drop(item) {
      changeTaskStatus(item.id, status);
    }
  });
  
  const openForm = () => {
    document.getElementById(`add-task-${status}`).style.display = "block";
    document.getElementById(`add-task-${status}`).classList.add('dim');
  }
  
  return (
    <div ref={drop}>
      <div className="col">
        <div className="col-head">
          <h4>{header}</h4>
          <span onClick={openForm}>+</span>
        </div>
        <div className='tasks'>
          {tasks
            .filter(item => item.status === status)
            .map(item => (
              <KanbanItem key={item.id} item={item} />
            ))
          }
        </div>
      </div>
      <Form status={status} header={header} addTask={addTask}/>

    </div>
  )
}
