import Task from "../models/taskModels.js";

const newTask = async (req, res) => {
  try {
    //1. Extract data from body
    const { title, description, due_date } = req.body;

    //2. Validation on the incomming data
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description not found" });
    }

    //3. Create document based on the schema
    const newTask = await Task.create({ title, description, due_date });

    //Success Response
    res.status(200).json({
      success: true,
      message: "Task Created successfully",
      task: newTask,
    });
  } 
  catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "Failed to Create task",
    });
  }
};


const getTasks = async(req,res)=>{
  try {
    //Get all the task from mongodb
    const tasks = await Task.find({});
    res.status(200).json({
      success:true,tasks,message:"fetched all task successfully"
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "failed to fetch task",
    });
  }
 
}


const updatedTask =async(req,res)=>{
 

try {
  //get the id from params
  const { id } = req.params;
  //get the data to update from body
  const { title, description, due_date } = req.body;

  //validate on body and id
  if (!id) {
    return res.status(400).json({ message: "task id required" });
  }
  //find the document according to id
  const task = await Task.findById(id);
  //update the document
  if (title) task.title = title;
  if (description) task.description = description;
  if (due_date) task.due_date = due_date;
  if (!due_date) task.due_date = null;
  //save the document
  const updatedTask = await task.save();
  //6.save the document
  // const updatedTask = await task.save();
  //ORR
  // const updatedTask = await Task.findByIdAndUpdate(
  //   id,
  //   {
  //     title,
  //     description,
  //     due_date: due_date || null,
  //   },
  //   { returnDocument: "after" }
  // );
  //send a response
  res.status(200).json({
    success: true,
    task: updatedTask,
    message: "updated the task successfully",
  });
} catch (error) {
  console.log("task not updated",error.message);
  res.status(400).json({
    success: false,
    message: "failed to update the task",
  });
}
}


const deleteTask = async (req,res)=>{
try {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "task id required" });
  }
  await Task.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
  
    message: "deleted task successfully",
  });
}
  
 catch (error) {
  console.log("delete the task", error.message);
  res.status(400).json({
    success: false,
    message: " deleted the task unsuccesfull",
  });
}
}


export {newTask,getTasks,updatedTask,deleteTask};

