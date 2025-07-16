window.onload = () => {
  loadTasks();
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  createTaskElement(taskText, false);
  saveTask(taskText, false);
  taskInput.value = "";
}

function createTaskElement(text, completed = false) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = completed;

  const span = document.createElement("span");
  span.textContent = text;
  span.className = "task-text";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    li.remove();
    updateStorage();
  };

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }
    updateStorage();
  });

  if (completed) {
    li.classList.add("completed");
  }

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);
}

function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function updateStorage() {
  const listItems = document.querySelectorAll("#taskList li");
  const tasks = [];

  listItems.forEach(li => {
    const text = li.querySelector(".task-text").textContent;
    const completed = li.querySelector(".task-checkbox").checked;
    tasks.push({ text, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAll() {
  if (confirm("Clear all tasks?")) {
    localStorage.removeItem("tasks");
    document.getElementById("taskList").innerHTML = "";
  }
}


const themeToggle = document.getElementById("themeToggle");
window.onload = () => {
  loadTasks();
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);
};
themeToggle.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light") ? "dark" : "light";
  setTheme(newTheme);
});
function setTheme(mode) {
  document.body.classList.toggle("light", mode === "light");
  themeToggle.textContent = mode === "light" ? "☾" : "☀︎";
  localStorage.setItem("theme", mode);
}
