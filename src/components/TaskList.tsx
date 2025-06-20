import {useState} from "react";
import {FiCheckSquare, FiTrash} from "react-icons/fi";

import "../styles/tasklist.scss";

interface Task {
	id: number;
	title: string;
	isComplete: boolean;
}

export function TaskList() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskTitle, setNewTaskTitle] = useState("");
	
	function handleCreateNewTask() {
		if (!newTaskTitle.trim()) return;
		
		const newTask: Task = {
			id: Math.floor(Math.random() * 10000),
			title: newTaskTitle,
			isComplete: false,
		};
		
		setTasks([...tasks, newTask]);
		setNewTaskTitle(""); // Limpa o input após a criação
	}
	
	function handleToggleTaskCompletion(id: number) {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id ? {...task, isComplete: !task.isComplete} : task
			)
		);
	}
	
	function handleRemoveTask(id: number) {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
	}
	
	return (
		<section className="task-list container">
			<header>
				<h2>My Tasks</h2>
				
				<div className="input-group">
					<input
						type="text"
						placeholder="Add new to do"
						onChange={(e) => setNewTaskTitle(e.target.value)}
						value={newTaskTitle}
					/>
					<button
						type="submit"
						data-testid="add-task-button"
						onClick={handleCreateNewTask}
					>
						<FiCheckSquare size={16} color="#fff"/>
					</button>
				</div>
			</header>
			
			<main>
				<ul>
					{tasks.map((task) => (
						<li key={task.id}>
							<div
								className={task.isComplete ? "completed" : ""}
								data-testid={`task-${task.id}`}
							>
								<label className="checkbox-container">
									<input
										type="checkbox"
										readOnly
										checked={task.isComplete}
										onClick={() => handleToggleTaskCompletion(task.id)}
									/>
									<span className="checkmark"></span>
								</label>
								<p>{task.title}</p>
							</div>
							
							<button
								type="button"
								data-testid="remove-task-button"
								onClick={() => handleRemoveTask(task.id)}
							>
								<FiTrash size={16}/>
							</button>
						</li>
					))}
				</ul>
			</main>
		</section>
	);
}
