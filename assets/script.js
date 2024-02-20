// --------------Selectors--------------

const firstName = document.getElementById('name');

const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-button');
const todoFilter = document.querySelector('.filter-todo');

const todoList = document.querySelector('.todo-list');

// --------------Functions--------------

// fucntion to add tasks to the list
const addTask = (e) => {
  e.preventDefault();

  // create the div element for the task container
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task-container');

  // create list element for the tasks
  const todoTask = document.createElement('li');
  todoTask.innerHTML = todoInput.value;
  todoTask.classList.add('todo-task');
  todoInput.value = '';

  // create div element for buttons
  const btnContainer = document.createElement('div');
  // create button elements for completion and deletion
  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = 'complete';
  completeBtn.classList.add('complete-button');
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'delete';
  deleteBtn.classList.add('delete-button');

  // add buttons to the btnContainer
  btnContainer.appendChild(completeBtn);
  btnContainer.appendChild(deleteBtn);

  // add task and button cotainer to the task container
  taskContainer.appendChild(todoTask);
  taskContainer.appendChild(btnContainer);

  // add task container to the todo list
  todoList.appendChild(taskContainer);
};

// fucntion to delete a task from the list
const deleteTask = (e) => {
  const item = e.target;
  const todoContainer = item.closest('.task-container');
  console.log(todoContainer);

  // logic to remove a task
  item.classList.contains('delete-button') && todoContainer.remove();

  // logic to complete a task
  const todoTask = todoContainer.querySelector('.todo-task');
  console.log(todoTask);
  item.classList.contains('complete-button') &&
    todoTask.classList.toggle('completed');
};



// --------------Event Listeners--------------

todoBtn.addEventListener('click', addTask);
todoList.addEventListener('click', deleteTask);
