const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const tasks=[{
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
    priority: "medium",
    createdAt: new Date().toISOString()
  },
]

// GET /tasks with filtering and sorting
app.get("/tasks",(req,res)=>{
    let result = [...tasks];
    // Filter by completion status
    if (req.query.completed !== undefined) {
        const completed = req.query.completed === 'true';
        result = result.filter(t => t.completed === completed);
    }
    // Sort by creation date (descending by default)
    if (req.query.sort === 'asc') {
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    res.status(200).send(result);
})

// GET /tasks/priority/:level
app.get("/tasks/priority/:level", (req, res) => {
    const level = req.params.level.toLowerCase();
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(level)) {
        return res.status(400).send({ error: "Invalid priority level." });
    }
    const filtered = tasks.filter(t => t.priority === level);
    res.status(200).send(filtered);
});

app.post("/tasks",(req,res)=>{
    const { title, description, completed, priority } = req.body;
    // Input validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).send({ error: "Title is required and cannot be empty." });
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
        return res.status(400).send({ error: "Description is required and cannot be empty." });
    }
    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).send({ error: "Completed must be a boolean value." });
    }
    const validPriorities = ['low', 'medium', 'high'];
    const taskPriority = priority ? priority.toLowerCase() : 'medium';
    if (!validPriorities.includes(taskPriority)) {
        return res.status(400).send({ error: "Priority must be one of: low, medium, high." });
    }
    const newTask = {
        id: tasks.length + 1,
        title: title.trim(),
        description: description.trim(),
        completed: completed || false,
        priority: taskPriority,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    res.status(201).send(newTask);
})
app.put("/tasks/:id",(req,res)=>{
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).send({ error: "Task not found" });
    }
    const { title, description, completed, priority } = req.body;
    // Input validation
    if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
        return res.status(400).send({ error: "Title cannot be empty if provided." });
    }
    if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
        return res.status(400).send({ error: "Description cannot be empty if provided." });
    }
    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).send({ error: "Completed must be a boolean value if provided." });
    }
    const validPriorities = ['low', 'medium', 'high'];
    let updatedPriority = tasks[taskIndex].priority;
    if (priority !== undefined) {
        if (typeof priority !== 'string' || !validPriorities.includes(priority.toLowerCase())) {
            return res.status(400).send({ error: "Priority must be one of: low, medium, high." });
        }
        updatedPriority = priority.toLowerCase();
    }
    const updatedTask = {
        ...tasks[taskIndex],
        title: title !== undefined ? title.trim() : tasks[taskIndex].title,
        description: description !== undefined ? description.trim() : tasks[taskIndex].description,
        completed: completed !== undefined ? completed : tasks[taskIndex].completed,
        priority: updatedPriority
    };
    tasks[taskIndex] = updatedTask;
    res.status(200).send(updatedTask);
});
app.get("/tasks/:id",(req,res)=>{
    const taskId= parseInt(req.params.id);
    const task= tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).send({ error: "Task not found" });
    }
    res.status(200).send(task);
})
app.delete("/tasks/:id",(req,res)=>{
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).send({ error: "Task not found" });
    }
    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    res.status(200).send(deletedTask);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;