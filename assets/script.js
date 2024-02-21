// --------------Selectors--------------

const firstName = document.getElementById('name');

const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-button');
const clearAllBtn = document.querySelector('.clear-all');

const todoList = document.querySelector('.todo-list');

// --------------Functions--------------

// fucntion to add tasks to the list
const addTask = (e) => {
  e.preventDefault();

  // check if the input is empty
  if (!todoInput.value) {
    alert('Please enter a task!');
  } else {
    // create the div element for the task container
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    // create list element for the tasks
    const todoTask = document.createElement('li');
    saveToLocal(todoInput.value);
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
  }
};

// fucntion to delete a task from the list
const deleteTask = (e) => {
  const item = e.target;
  const todoContainer = item.closest('.task-container');
  console.log(todoContainer);

  // logic to remove a task
  if (item.classList.contains('delete-button')) {
    // Remove the task container from the UI
    todoContainer.remove();
    // Remove the task content from local storage
    removeFromLocal(todoContainer);
  }

  // logic to complete a task
  const todoTask = todoContainer.querySelector('.todo-task');
  console.log(todoTask);
  item.classList.contains('complete-button') &&
    todoTask.classList.toggle('completed');
};

// function to save list local storage
const saveToLocal = (todo) => {
  let tasks;
  localStorage.getItem('tasks')
    ? (tasks = JSON.parse(localStorage.getItem('tasks')))
    : (tasks = []);
  tasks.push(todo);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// fucntion to remove an item from the local stoarage
const removeFromLocal = (todo) => {
  let tasks;
  localStorage.getItem('tasks')
    ? (tasks = JSON.parse(localStorage.getItem('tasks')))
    : (tasks = []);
  const taskIndex = todo.children[0].innerText;
  tasks.splice(tasks.indexOf(taskIndex), 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// function to get the todo list
const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  todoList.innerHTML = '';
  tasks.forEach((task) => {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    // create list element for the tasks
    const todoTask = document.createElement('li');
    todoTask.innerHTML = task;
    todoTask.classList.add('todo-task');

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
  });
};

// function to clear all tasks
const clearAllTasks = (e) => {
  e.preventDefault();
  const tasks = localStorage.getItem('tasks');
  if (tasks) {
    const check = confirm('Are you sure you want to clear all tasks?');
    if (check) {
      // Clear tasks from local storage
      localStorage.removeItem('tasks');
      loadTasks();
    }
  } else {
    alert('You have no tasks to clear!');
  }
};

// --------------Event Listeners--------------

document.addEventListener('DOMContentLoaded', loadTasks);
todoBtn.addEventListener('click', addTask);
todoList.addEventListener('click', deleteTask);
clearAllBtn.addEventListener('click', clearAllTasks);
