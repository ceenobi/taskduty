import express from "express";
import {
  createTask,
  getTask,
  deleteTask,
  updateTask,
  getAllTask,
} from "../controllers/task.js";
import verifyToken from "../middleware/verifyAuth.js";

const router = express.Router();

router.post("/create-task", verifyToken, createTask);
router.get("/get", verifyToken, getTask);
router.get("/", getAllTask);
router.delete("/:id", verifyToken, deleteTask);
// always use ":" for params
router.patch("/:id", verifyToken, updateTask);

export default router;
