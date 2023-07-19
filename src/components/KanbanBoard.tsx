import React, { useState, useCallback, useEffect, useRef } from 'react';
import KanbanColumn from './KanbanColumn';

import update from 'immutability-helper';
import { v4 as uuidv4 } from 'uuid';

import '../styles/board.css';
import { ITEM_TYPES, LABELS, PRIORITIES, TASKS_LIST } from '../constants';
import { Task } from '../types';
import { downloadFile } from '../utils';



export default function KanbanBoard() {
    const [columns] = useState([
        { title: 'backlog', accepts: [ITEM_TYPES.BACKLOG, ITEM_TYPES.TODO, ITEM_TYPES.IN_REVIEW, ITEM_TYPES.IN_PROGRESS] },
        { title: 'todo', accepts: [ITEM_TYPES.BACKLOG, ITEM_TYPES.TODO, ITEM_TYPES.IN_REVIEW, ITEM_TYPES.IN_PROGRESS] },
        { title: 'in_progress', accepts: [ITEM_TYPES.BACKLOG, ITEM_TYPES.TODO, ITEM_TYPES.IN_REVIEW, ITEM_TYPES.IN_PROGRESS] },
        { title: 'in_review', accepts: [ITEM_TYPES.BACKLOG, ITEM_TYPES.TODO, ITEM_TYPES.IN_REVIEW, ITEM_TYPES.IN_PROGRESS] },
        { title: 'done', accepts: [ITEM_TYPES.IN_REVIEW] },
    ]);
    const [tasks, setTasks] = useState<Task[]>(TASKS_LIST);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let orderedTasks = [...tasks].sort((a, b) => PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority))
        setTasks(orderedTasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const changeTaskStatus = useCallback((id: string, status: string) => {
        let task = tasks.find(task => task.id === id) || {} as Task;
        const taskIndex = tasks.indexOf(task);
        task = { ...task, status };
        let newTasks = update(tasks, {
            [taskIndex]: { $set: task }
        });
        setTasks(newTasks);
    }, [tasks]);

    const addTask = useCallback((name: string, status: string, priority: string) => {
        let task = { id: uuidv4(), name: name, status: status, priority: priority };
        let newTasks = update(tasks, { $push: [task] });
        let orderedTasks = [...newTasks].sort((a, b) => PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority))
        setTasks(orderedTasks);
    }, [tasks]);

    const handleClick = () => {
        inputRef?.current?.click();
    };

    const handleFileChange = (event: { target: { files: any; }; }) => {
        const fileReader = new FileReader();
        const { files } = event.target;

        fileReader.readAsText(files[0], "UTF-8");
        fileReader.onload = e => {
            const content = JSON.parse(e?.target?.result as string);
            setTasks(content);
        };
    };

        return (
            <div className="board">
                <div className="header">
                    <h1 className="font-black">Kanban Board</h1>
                    <div className="links">
                        <ul>
                            <li className="export" onClick={() => downloadFile(tasks)}>Export to JSON</li>
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
                            header={LABELS[title]}
                            tasks={tasks}
                            changeTaskStatus={changeTaskStatus}
                            addTask={addTask} />
                    ))}
                </div>
                
            </div>
        )
    }
