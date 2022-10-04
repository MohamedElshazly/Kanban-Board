import React, { useState, useCallback, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';
import KanbanItem from './KanbanItem';
import update from 'immutability-helper';
import {v4 as uuidv4} from 'uuid';
import '../styles/board.css';

//define our state 
const tasksList = [
    { id: uuidv4(), name: "do something1", status: "backlog", priority: "highest" },
    { id: uuidv4(), name: "do something2", status: "backlog", priority: "noprio"},
    { id: uuidv4(), name: "do something3", status: "backlog", priority: "high"},
    { id: uuidv4(), name: "do something4", status: "todo", priority: "noprio"},
    { id: uuidv4(), name: "do something5", status: "todo", priority: "high"},
    { id: uuidv4(), name: "do something6", status: "in_progress", priority: "highest"},
    { id: uuidv4(), name: "do something7", status: "in_progress", priority: "noprio"},
    { id: uuidv4(), name: "do something8", status: "in_review", priority: "noprio"},
    { id: uuidv4(), name: "do something9", status: "in_review", priority: "low"},
    { id: uuidv4(), name: "do something10", status: "done", priority: "low"},
];
const columns = ['backlog', 'todo', 'in_progress', 'in_review', 'done'];
const labels = {
    backlog: 'Backlog',
    todo: 'ToDo',
    in_progress: 'In Progress',
    in_review: 'In Review',
    done: 'Done'
};
const priorities = ['highest', 'high', 'low', 'noprio']

export default function KanbanBoard() {
    const [tasks, setTaskStatus] = useState(tasksList);

    useEffect(() => {
        let orderedTasks = [...tasks].sort((a, b) =>  priorities.indexOf(a.priority) - priorities.indexOf(b.priority) )
        setTaskStatus(orderedTasks);
    }, [tasks])

    const changeTaskStatus = useCallback((id, status) => {
        let task = tasks.find(task => task.id === id);
        const taskIndex = tasks.indexOf(task);
        task = { ...task, status };
        let newTasks = update(tasks, {
            [taskIndex]: { $set: task }
        });
        setTaskStatus(newTasks);
    }, [tasks]);
    const addTask = useCallback((name, status, priority) => {
        let task = {id: uuidv4(), name:name, status:status, priority: priority};
        let newTasks = update(tasks, {$push: [task]});
        setTaskStatus(newTasks);
    }, [tasks]);

    return (
        <div className="board">
            {columns.map(column => (
                <KanbanColumn key={column}
                    status={column}
                    changeTaskStatus={changeTaskStatus}
                    addTask={addTask}>

                    <div className="col">
                        <div className="col-head">{labels[column]}</div>
                        <div className='tasks'>
                            {tasks 
                                .filter(item => item.status === column)
                                .map(item => (
                                    <KanbanItem key={item.id} item={item} />
                                ))
                            }
                        </div>
                    </div>
                </KanbanColumn>
            ))}
            
        </div>
    )
}
