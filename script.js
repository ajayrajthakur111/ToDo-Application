// const inputElem = document.getElementById("form-input");
// const btnElem = document.getElementById("form-btn");
// const listElem = document.getElementById("items-list");
// const formElem = document.getElementsByTagName("form")[0];
// const dateElm = document.getElementById("date-btn");

// console.log(dateElm.value);
// console.log(inputElem.value);

// const todos = [];
// console.log(todos);

// function handleCheckBox() {
//   console.log("checkbox changed");
// }
// renderTodos = () => {
//   listElem.innerHTML = "";

//   todos.map((todo) => {
//     const liElem = document.createElement("li");
//     const labelElem = document.createElement("label");
//     const checkboxElem = document.createElement("input");
//     const createDataElm = document.createElement("span");
//     const createDivElm = document.createElement("div");
//     createDivElm.setAttribute("class", "date-label-div");
//     checkboxElem.setAttribute("type", "checkbox");
//     checkboxElem.checked = todo.completed;
//     labelElem.innerText = todo.text;
//     createDataElm.innerText = todo.date;
//     liElem.appendChild(checkboxElem);

//     createDivElm.appendChild(labelElem);
//     createDivElm.appendChild(createDataElm);
//     liElem.appendChild(createDivElm);
//     listElem.appendChild(liElem);
//     console.log(listElem);
//   });
// };

// inputElem.addEventListener("change", (e) => {
//   inputElem.setAttribute("value", e.target.value);
// });

// dateElm.addEventListener("change", (e) => {
//   dateElm.setAttribute("value", e.target.value);
// });

// formElem.addEventListener("submit", (e) => {
//   e.preventDefault();
  // const liElem = document.createElement("li");
  // const labelElem = document.createElement("label");

  // const checkboxElem = document.createElement("input");
  // checkboxElem.setAttribute("type", "checkbox");
  // checkboxElem.addEventListener("change", () => handleCheckBox());
  // checkboxElem.checked = false;
  // console.log(checkboxElem);

  // labelElem.innerText = inputElem.value;
  // listElem.appendChild(liElem);
  // liElem.appendChild(checkboxElem);
  // liElem.appendChild(labelElem);
  // listElem.appendChild(liElem);

  // todos.push({
  //   text: inputElem.value,
  //   date: dateElm.value,
  //   completed: false,
  // });
  // renderTodos();
  // console.log(todos);

  // console.log(liElem, todos);
//   inputElem.value = "";
//   dateElm.value = "";
// });

// Getting DOM elements
const inputElem = document.getElementById('form-input'); // Input field
const btnElem = document.getElementById('form-btn'); // Button
const listElem = document.getElementById('items-list'); // List container
const formElem = document.getElementsByTagName('form')[0]; // Form
const searchInput = document.getElementById('search-box'); // Search input
const allTodoBtn = document.getElementById('all-todo-btn'); // "All" filter button
const activeTodoBtn = document.getElementById('active-todo-btn'); // "Active" filter button
const completedTodoBtn = document.getElementById('completed-todo-btn'); // "Completed" filter button

// Initializing variables
const todoList = []; // Array to store todos
const ACTIVE_TODO = 'ACTIVE'; // Constant for active todos
const ALL_TODO = 'ALL'; // Constant for all todos
const COMPLETED_TODO = 'COMPLETED'; // Constant for completed todos
const EDIT_BTN_TEXT = 'Edit'; // Text for edit button
const SUBMIT_BTN_TEXT = 'Submit'; // Text for submit button
let editTodoIndex; // Index of todo being edited

// Event listener for input field change
inputElem.addEventListener('change', (e) => {
  inputElem.setAttribute('value', e.target.value);
});

// Function to handle checkbox click
const handleCheckbox = (todoId) => {
  const todoIndex = todoList.findIndex((todo) => todo.id === todoId);
  const currentTodo = todoList[todoIndex];
  currentTodo.completed = !currentTodo.completed;
  renderTodos(todoList);
};

// Function to delete a todo
const deleteTodo = (todoId) => {
  const todoIndex = todoList.findIndex((todo) => todo.id === todoId);
  todoList.splice(todoIndex, 1);
  renderTodos(todoList);
};

// Function to edit a todo
const editTodo = (todoId) => {
  const todoIndex = todoList.findIndex((todo) => todo.id === todoId);
  editTodoIndex = todoIndex;
  inputElem.value = todoList[todoIndex].text;
  btnElem.innerText = EDIT_BTN_TEXT;
};

// Function to render todos
const renderTodos = (todoListArray) => {
  listElem.innerHTML = '';
  todoListArray.forEach((todo, index) => {
    const liElem = document.createElement('li');
    const checkboxElem = document.createElement('input');
    const labelElem = document.createElement('label');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    // Add text to the buttons
    deleteBtn.innerText = 'Delete';
    editBtn.innerText = 'Edit';
    checkboxElem.type = 'checkbox';

    // Attach events for all the buttons
    checkboxElem.addEventListener('change', () => handleCheckbox(todo.id));
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    editBtn.addEventListener('click', () => editTodo(todo.id));
    checkboxElem.checked = todo.completed;
    labelElem.innerText = todo.text;

    // Append with the list element
    liElem.appendChild(checkboxElem);
    liElem.appendChild(labelElem);
    liElem.appendChild(editBtn);
    liElem.appendChild(deleteBtn);

    // Append with list parent
    listElem.appendChild(liElem);
  });
};

// Event listener for form submission
formElem.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputElem.value === '') {
    return;
  }
  if (btnElem.innerText === EDIT_BTN_TEXT) {
    todoList[editTodoIndex].text = inputElem.value;
    renderTodos(todoList);
    btnElem.innerText = SUBMIT_BTN_TEXT;
    inputElem.value = '';
  } else {
    todoList.push({
      id: Date.now(),
      text: inputElem.value,
      completed: false,
    });
    renderTodos(todoList);
    inputElem.value = '';
  }
});

// Event listener for search input
searchInput.addEventListener('keyup', () => {
  const searchInputValue = searchInput.value;
  const filterData = [];
  for (let i = 0; i < todoList.length; i++) {
    const currentTodo = todoList[i];
    if (currentTodo.text.includes(searchInputValue)) {
      filterData.push(currentTodo);
    }
  }
  renderTodos(filterData);
});

// Function to filter todos
const filterTodos = (filterType) => {
  if (filterType === ACTIVE_TODO) {
    const filterAllTodos = todoList.filter((todo) => !todo.completed);
    renderTodos(filterAllTodos);
  } else if (filterType === COMPLETED_TODO) {
    const filterAllTodos = todoList.filter((todo) => todo.completed);
    renderTodos(filterAllTodos);
  } else {
    renderTodos(todoList);
  }
};

// Event listeners for filter buttons
allTodoBtn.addEventListener('click', () => filterTodos(ALL_TODO));
activeTodoBtn.addEventListener('click', () => filterTodos(ACTIVE_TODO));
completedTodoBtn.addEventListener('click', () => filterTodos(COMPLETED_TODO));
