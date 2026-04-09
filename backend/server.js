const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());



let tasks = [];

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: Date.now(),
    title,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH task
app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = !task.completed;
  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: "Task deleted" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});