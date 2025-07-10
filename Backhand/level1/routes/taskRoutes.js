import express from "express";
import {newTask,getTasks, updatedTask, deleteTask} from "../controllers/taskControllers.js";

const router = express.Router();

router.post("/task",newTask);
router.get("/tasks",getTasks);
router.put("/task/:id",updatedTask);
router.delete("/task/:id",deleteTask);

export default router;