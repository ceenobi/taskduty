import createHttpError from "http-errors";
import Task from "../models/task.js";

export const createTask = async (req, res, next) => {
  const { id: userId } = req.user;
  const { title, description, tags } = req.body;
  try {
    if (!title && !description && !tags) {
      return next(createHttpError(400, "form fields cannot be empty"));
    }
    const task = await Task.create({
      userId,
      title,
      description,
      tags,
    });
    res.status(201).json({ task, msg: "Task successfully created" });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  const { id: userId } = req.user;
  try {
    const task = await Task.find({ userId: userId }).sort({ _id: -1 });
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const getAllTask = async (req, res, next) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: taskId } = req.params;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return next(createHttpError(400, "Task not found"));
    }
    if (!task.userId.equals(userId)) {
      return next(createHttpError(400, "You cannot delete this task"));
    }
    res.status(200).send("Task deleted");
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: taskId } = req.params;
  const { title, description, tags } = req.body;
  try {
    if (!title && !description && !tags) {
      return next(createHttpError(400, "form fields cannot be empty"));
    }
    const task = await Task.findById(taskId);
    if (!task.userId.equals(userId)) {
      return next(createHttpError(400, "You cannot update this task"));
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.tags = tags || task.tags;
    const updatedTask = await task.save();
    res.status(200).json({ updatedTask, msg: "task updated" });
    // const updatedTask = {
    //     title,
    //     description,
    // };
    // Object.keys(updatedTask).forEach(
    //     (key) =>
    //         updatedTask[key] === " " || undefined && delete updatedTask[key]
    // );
  } catch (error) {
    next(error);
  }
};
