import express from "express";
import {
    getTasks,
    getTasksById,
    createTasks,
    updateTasks,
    deleteTasks
} from "../controller/Tasks.js";
import {verifyUser} from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/tasks', verifyUser, getTasks); //this is the endpoint
router.get('/tasks/:id',verifyUser, getTasksById);
router.post('/tasks',verifyUser, createTasks);
router.patch('/tasks/:id',verifyUser,updateTasks);
router.delete('/tasks/:id',verifyUser,deleteTasks);
export default router;