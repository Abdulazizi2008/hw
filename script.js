const form = document.forms[0];
const taskInput = document.getElementById("task-input");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);

renderTasks();

form.onsubmit = function (event) {
  event.preventDefault();

  const newTask = {
    id: Date.now(),
    text: taskInput.value,
    done: false,
  };

  tasks.push(newTask);
  taskInput.value = "";

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
};

function renderTasks() {
  const container = document.querySelector(".tasks-container");
  container.innerHTML = "";

  tasks.forEach((task, index) => {
    // {}
    const li = document.createElement("li");
    const span = document.createElement("span");

    span.textContent = task.text;
    li.append(span);

    if (task.done == true) {
      span.style.textDecoration = "line-through";
    }

    const button = document.createElement("button");
    button.style.marginRight = "1rem";
    button.textContent = "✔️";
    button.onclick = function () {
      if (tasks[index].done == true) {
        tasks[index].done = false;
      } else {
        tasks[index].done = true;
      }

      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();

      console.log(tasks);
    };

    const delete_btn = document.createElement("button");
    delete_btn.textContent = "🗑️";

    delete_btn.onclick = function () {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log(tasks);
      renderTasks();
    };

    const buttons_container = document.createElement("div");
    buttons_container.append(button);
    buttons_container.append(delete_btn);

    li.append(buttons_container);

    container.append(li);
  });
}
