const API = "https://task-manager-2rwy.onrender.com/tasks";

let allTasks = [];

// Save to localStorage
function saveToLocal() {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

// Load from localStorage
function loadFromLocal() {
  const data = localStorage.getItem("tasks");
  if (data) {
    allTasks = JSON.parse(data);
    renderTasks(allTasks);
  } else {
    fetchTasks(); // fallback to backend
  }
}

// Fetch from backend
async function fetchTasks() {
  const res = await fetch(API);
  allTasks = await res.json();
  saveToLocal();
  renderTasks(allTasks);
}

// Render
function renderTasks(tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
        ${task.title}
      </span>
      <div>
        <button onclick="toggleTask(${task.id})">✔</button>
        <button onclick="deleteTask(${task.id})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });
}

// Add
async function addTask() {
  const input = document.getElementById("taskInput");

  if (!input.value.trim()) return;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value })
  });

  input.value = "";
  fetchTasks();
}

// Toggle
async function toggleTask(id) {
  await fetch(`${API}/${id}`, {
    method: "PATCH"
  });

  fetchTasks();
}

// Delete
async function deleteTask(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  fetchTasks();
}

// Filter
function filterTasks(type) {
  if (type === "completed") {
    renderTasks(allTasks.filter(t => t.completed));
  } else if (type === "pending") {
    renderTasks(allTasks.filter(t => !t.completed));
  } else {
    renderTasks(allTasks);
  }
}

// Initial load
loadFromLocal();