import { Task } from "../types";

export const downloadFile = (tasks: Task[]) => {

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