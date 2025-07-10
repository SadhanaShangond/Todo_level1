import React, { useCallback } from "react";
import folderImg from "../assets/folder-white.svg";
import { TaskTile } from "./TaskTile";


// let tasks = [
//   {
//     id: 1,
//     title: "WSA data",
//     description: "all things are imp.",
//     due_date: "05 Jun 2026",
//   },
//   {
//     id: 2,
//     title: "web stack data",
//     description: "all things are imp.",
//     due_date: "05 Jun 2026",
//   },
//   {
//     id: 3,
//     title: "Web data",
//     description: "all things are imp.",
//     due_date: "05 Jun 2026",
//   },
// ];


export const TaskList = ({
  tasks,setActiveTask ,fetchAllTasks, showCreateTaskScreen , showViewTaskScreen,
  showEditTaskScreen}) => {
    const viewTask = useCallback(
      (task) => {
        setActiveTask(task);
        showViewTaskScreen();
      },
      [setActiveTask, showCreateTaskScreen]
    );
  return (
  

    <div className="task-list-screen content-section">
      <div className="content-section-container">
        <div className="task-list-header-main">
          <p className="task-heading">🔥 Task</p>
          <button className="add-task-btn cursor-pointer" onClick={showCreateTaskScreen}>
            <img src={folderImg} alt="add task icon" />
            Add New Task
          </button>
        </div>

        {/* Task List */}
        <div className="task-list-container">
          {tasks.map((task) => (
            <TaskTile key={task._id +"-task-tile"} task={task} fetchAllTasks={fetchAllTasks} setActiveTask={setActiveTask} showEditTaskScreen={showEditTaskScreen}
            onClick={()=>viewTask(task)} />
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default TaskList;