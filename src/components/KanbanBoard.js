import React, { useState, useCallback, useEffect, useRef } from 'react';
import KanbanColumn from './KanbanColumn';
import { ItemTypes } from './ItemTypes';
import update from 'immutability-helper';
import { v4 as uuidv4 } from 'uuid';
import '../styles/board.css';

//define our state 
const tasksList = [
    { id: uuidv4(), name: "do something1", status: "backlog", priority: "highest" },
    { id: uuidv4(), name: "do something2", status: "backlog", priority: "noprio" },
    { id: uuidv4(), name: "do something3", status: "backlog", priority: "high" },
    { id: uuidv4(), name: "do something4", status: "todo", priority: "noprio" },
    { id: uuidv4(), name: "do something5", status: "todo", priority: "high" },
    { id: uuidv4(), name: "do something6", status: "in_progress", priority: "highest" },
    { id: uuidv4(), name: "do something7", status: "in_progress", priority: "noprio" },
    { id: uuidv4(), name: "do something8", status: "in_review", priority: "noprio" },
    { id: uuidv4(), name: "do something9", status: "in_review", priority: "low" },
    { id: uuidv4(), name: "do something10", status: "done", priority: "low" },
];

const labels = {
    backlog: 'Backlog',
    todo: 'ToDo',
    in_progress: 'In Progress',
    in_review: 'In Review',
    done: 'Done'
};
const priorities = ['highest', 'high', 'low', 'noprio']

export default function KanbanBoard() {
    const [columns] = useState([
        { title: 'backlog', accepts: [ItemTypes.BACKLOG, ItemTypes.TODO, ItemTypes.IN_REVIEW, ItemTypes.IN_PROGRESS] },
        { title: 'todo', accepts: [ItemTypes.BACKLOG, ItemTypes.TODO, ItemTypes.IN_REVIEW, ItemTypes.IN_PROGRESS] },
        { title: 'in_progress', accepts: [ItemTypes.BACKLOG, ItemTypes.TODO, ItemTypes.IN_REVIEW, ItemTypes.IN_PROGRESS] },
        { title: 'in_review', accepts: [ItemTypes.BACKLOG, ItemTypes.TODO, ItemTypes.IN_REVIEW, ItemTypes.IN_PROGRESS] },
        { title: 'done', accepts: [ItemTypes.IN_REVIEW] },
    ]);
    const [tasks, setTaskStatus] = useState(tasksList);

    useEffect(() => {
        let orderedTasks = [...tasks].sort((a, b) => priorities.indexOf(a.priority) - priorities.indexOf(b.priority))
        setTaskStatus(orderedTasks);
    }, [])

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
        let task = { id: uuidv4(), name: name, status: status, priority: priority };
        let newTasks = update(tasks, { $push: [task] });
        let orderedTasks = [...newTasks].sort((a, b) => priorities.indexOf(a.priority) - priorities.indexOf(b.priority))
        setTaskStatus(orderedTasks);
    }, [tasks]);

    const downloadFile = () => {

        const fileName = "data";
        const json = JSON.stringify(tasks, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }

    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = event => {

        const fileReader = new FileReader();
        const { files } = event.target;

        fileReader.readAsText(files[0], "UTF-8");
        fileReader.onload = e => {
            const content = JSON.parse(e.target.result);
            setTaskStatus(content);
        };
    };

        return (
            <div className="board">
                <div className="header">
                    <h1 className="font-black">Kanban Board</h1>
                    <div className="links">
                        <ul>
                            <li className="export" onClick={downloadFile}>Export to JSON</li>
                            <input
                                style={{ display: 'none' }}
                                ref={inputRef}
                                type="file"
                                onChange={handleFileChange}
                            />
                            <li className="import" onClick={handleClick}>Import from JSON</li>
                        </ul>
                    </div>
                </div>
                <div className="kanban">
                    {columns.map(({ title, accepts }, index) => (
                        <KanbanColumn key={index}
                            accept={accepts}
                            status={title}
                            header={labels[title]}
                            tasks={tasks}
                            changeTaskStatus={changeTaskStatus}
                            addTask={addTask} />
                    ))}
                </div>
                
            </div>
        )
    }
