import Task from '../models/Task.js';


const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    const task = new Task({ title, description, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const { sortBy, filterBy } = req.query;
    let query = {};

    if (filterBy) {
      query.status = filterBy;
    }

    const tasks = await Task.find(query).sort(sortBy);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const updateTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
