let tasks = [
  { id: 1, title: "Búa til innkaupalista fyrir matarinnkaup", done: true },
  { id: 2, title: "Þvo bílinn að innan og að utan", done: false },
  { id: 3, title: "Ekki gleyma því að brosa framan í lífið", done: true },
];

const formEl = document.querySelector("#task-form");
const inputEl = document.querySelector("#task");
const listEl = document.querySelector("#task-list");
const totalEl = document.querySelector("#total");
const doneEl = document.querySelector("#done");
const notDoneEl = document.querySelector("#not-done");

function renderTasks() {
  listEl.innerHTML = "";

  for (const task of tasks) {
    const li = document.createElement("li");
    const titleEl = document.createElement("span");
    titleEl.textContent = task.title;
    li.appendChild(titleEl);
    listEl.appendChild(li);
    if (task.done) {
      li.classList.add("done");
    }
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Lokið";
    li.appendChild(doneBtn);
    doneBtn.addEventListener("click", () => {
      toggleTask(task.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eyða";
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });
  }
  updateStats();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  task.done = !task.done;
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  renderTasks();
}

function updateStats() {
  const total = tasks.length;
  const doneCount = tasks.filter((t) => t.done).length;
  const notDoneCount = total - doneCount;

  totalEl.textContent = total;
  doneEl.textContent = doneCount;
  notDoneEl.textContent = notDoneCount;
}

renderTasks();

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = inputEl.value.trim();
  if (title === "") {
    return;
  }
  const newTask = { id: Date.now(), title: title, done: false };
  tasks.push(newTask);
  inputEl.value = "";
  renderTasks();
});
