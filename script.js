function saveToLocalStorage() {
  const todos = [];
  document.querySelectorAll("#todoUl li").forEach((todoItem) => {
    const text = todoItem.querySelector("span").innerText;
    const isCompleted = todoItem.querySelector(".check").checked;
    todos.push({ text, isCompleted });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadFromLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("listTodo");
    todoItem.innerHTML = `
        <div class='listTodo'>
            <div class='left'>
                <input class='check' type='checkbox' ${
                  todo.isCompleted ? "checked" : ""
                } />
                <span style="text-decoration: ${
                  todo.isCompleted ? "line-through" : "none"
                }; color: ${todo.isCompleted ? "grey" : "black"}">${
      todo.text
    }</span>
            </div>
            <button class='delBtn'>-</button>
        </div>
      `;
    newTodo.appendChild(todoItem);

    // event listener untuk check box
    const checkBox = todoItem.querySelector(".check");
    const checkItem = todoItem.querySelector("span");

    checkBox.addEventListener("change", () => {
      if (checkBox.checked) {
        checkItem.style.textDecoration = "line-through";
        checkItem.style.color = "grey";
      } else {
        checkItem.style.textDecoration = "none";
        checkItem.style.color = "black";
      }
      saveToLocalStorage();
    });

    const deleteButton = todoItem.querySelector(".delBtn");
    deleteButton.addEventListener("click", () => {
      todoItem.remove();
      saveToLocalStorage();
    });
  });
}

// muat data dari local storage
document.addEventListener("DOMContentLoaded", loadFromLocalStorage);

const todoInput = document.getElementById("todo");
const addButton = document.getElementById("btn");
const newTodo = document.getElementById("todoUl");

addButton.addEventListener("click", () => {
  //function popup if input is empty
  const popup = document.getElementById("popup");
  function showPopup() {
    popup.classList.remove("hide");
    setTimeout(() => {
      popup.classList.add("hide");
    }, 2500);
  }

  //condition input
  if (todoInput.value === "") {
    showPopup();
    return;
  } else {
    const todoItem = document.createElement("li");

    // function create task
    function newTodoItem() {
      todoItem.classList.add("listTodo");
      todoItem.innerHTML = `
        <div class='listTodo'>
            <div class='left'>
                <input class='check' type='checkbox' />
                <span>${todoInput.value}</span>
            </div>
            <button class='delBtn'>-</button>
        </div>
    `;
      newTodo.appendChild(todoItem);
      todoInput.value = "";
      todoInput.focus();
      saveToLocalStorage();
      return;
    }
    newTodoItem();

    // function click checkbox
    function checkBox() {
      const checkBox = todoItem.querySelector(".check");
      const checkItem = todoItem.querySelector("span");

      checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
          checkItem.style.textDecoration = "line-through";
          checkItem.style.color = "grey";
        } else {
          checkItem.style.textDecoration = "none";
          checkItem.style.color = "black";
        }
        saveToLocalStorage();
      });
    }
    checkBox();

    // function delete task
    function deleteTodo() {
      const deleteButton = todoItem.querySelector(".delBtn");

      deleteButton.addEventListener("click", () => {
        todoItem.remove();
        saveToLocalStorage();
      });
    }
    deleteTodo();
  }
});
