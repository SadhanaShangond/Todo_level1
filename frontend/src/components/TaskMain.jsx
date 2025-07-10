import React, { useCallback, useEffect, useState } from 'react'
import NoTask from './NoTask';
import CreateTask from './CreateTask';
import ViewTask from './ViewTask.jsx';
import EditTask from './EditTask';
import TaskList from './TaskList';
import Loading from './ui/Loading';
import fetchTaskAPI from './api/fetchTask';

 export const TaskMain = () => {
    const [currComponent, setCurrComponent] = useState("loading");
    const  [activeTask,setActiveTask] = useState([]);
    const [tasks ,setTasks]=useState([]);

    const showNoTaskScreen = useCallback(function () {
      setCurrComponent("noTask");
    },[]);

    const showCreateTaskScreen =useCallback( function () {
      setCurrComponent("createTask");
    },[]
)
    const showTaskListScreen = useCallback(function () {
      setCurrComponent("taskList");
    },[])

    const showEditTaskScreen =useCallback( function () {
      setCurrComponent("editTask");
    },[])

    const showViewTaskScreen = useCallback(function () {
      setCurrComponent("viewTask");
    },[]
)

    const handleResponse = useCallback(function (responseData) {
     
      const extractedTasks = responseData.tasks;
      setTasks(extractedTasks);

      if (extractedTasks.length) {
        showTaskListScreen();
      } else {
        showNoTaskScreen();
      }
    },[showTaskListScreen,showNoTaskScreen]);

    const handleError = useCallback(function (errorMsg) {
      console.log(errorMsg);
    },[]);

    const fetchAllTasks = useCallback(function () {
      fetchTaskAPI(handleResponse, handleError);
    },[handleError,handleResponse]);

    //inital effect
    useEffect(()=>{
      fetchAllTasks();
    },[fetchAllTasks]);
    
  return (
    <>
      {currComponent === "loading" && <Loading />}

      <div className="container-div">
        {currComponent === "noTask" && (
          <NoTask showCreateTaskScreen={showCreateTaskScreen} />
        )}

        {currComponent === "taskList" && (
          <TaskList
            tasks={tasks}
            setActiveTask={setActiveTask}
            fetchAllTasks={fetchAllTasks}
            showCreateTaskScreen={showCreateTaskScreen}
            showViewTaskScreen={showViewTaskScreen}
            showEditTaskScreen={showEditTaskScreen}
          />
        )}

        {currComponent === "createTask" && (
          <CreateTask
            fetchAllTasks={fetchAllTasks}
            showTaskListScreen={showTaskListScreen}
            showNoTaskScreen={showNoTaskScreen}
            tasks={tasks}
          />
        )}

        {currComponent === "viewTask" && (
          <ViewTask
            task={activeTask}
            showTaskListScreen={showTaskListScreen}
            fetchAllTasks={fetchAllTasks}
            setActiveTask={setActiveTask}
            showEditTaskScreen={showEditTaskScreen}
          />
        )}
        {currComponent === "editTask" && (
          <EditTask
            showTaskListScreen={showTaskListScreen}
            task={activeTask}
            fetchAllTasks={fetchAllTasks}
          />
        )}
      </div>
    </>
  );
}

export default TaskMain;

