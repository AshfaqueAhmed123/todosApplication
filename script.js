const input = document.getElementById("input");
const addBtn = document.getElementById("add-btn");
const todoContainer = document.getElementById("todos-container");

function createTodo(content) {
  let todo = document.createElement("div");
  todo.classList.add("todo");
  todo.innerHTML = `
    <div class="status" onclick="markDone(this)">
    <img src="" />
  </div>
  <p class="content">${content}</p>
  <div class="remove-btn">
    <img src="/assets/trash-solid.svg"  onclick="deleteTodo(this.parentElement.parentElement)" />
  </div>
    `;
  return todo;
}

function addTodo(todo) {
  todoContainer.appendChild(todo);
  input.value = "";
  delEmptyContainerMsg();
  saveTodos();
}

function deleteTodo(todo) {
  todo.remove();
  if (todoContainer.children.length == 0) {
    emptyContainerMsg();
  }
  saveTodos();
}

function markDone(status) {
  status.classList.toggle("mark-todo-done");
  saveTodos();
}

function emptyContainerMsg() {
  let msg = document.createElement("h1");
  msg.innerHTML = "nothing to diaply...";
  msg.classList.add("empty-container-msg");
  todoContainer.appendChild(msg);
}

function delEmptyContainerMsg() {
  document.querySelector(".empty-container-msg").remove();
}

function saveTodos() {
  let data = todoContainer.innerHTML;
  localStorage.setItem("data", data);
}

function retriveTodos() {
  let data = localStorage.getItem("data");
  if (data != null) {
    todoContainer.innerHTML = data;
  }
}

addBtn.onclick = function () {
  if (input.value != "") {
    let todo = createTodo(input.value);
    addTodo(todo);
    return;
  }
  alert("enter some content!");
};

window.onload = function () {
  if (todoContainer.children.length == 0) {
    emptyContainerMsg();
  }
  retriveTodos();
};
