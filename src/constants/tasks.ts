import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types';

export const TASKS_LIST: Task[] = [
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

export const LABELS = {
	backlog: 'Backlog',
	todo: 'ToDo',
	in_progress: 'In Progress',
	in_review: 'In Review',
	done: 'Done'
};
export const PRIORITIES = ['highest', 'high', 'low', 'noprio']

export const ITEM_TYPES = {
	"BACKLOG": 'backlog',
	"TODO": 'todo',
	"IN_PROGRESS": 'in_progress',
	"IN_REVIEW": 'in_review',
	"DONE": 'done'
}