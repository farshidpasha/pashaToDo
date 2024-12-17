'use strict';

// ------ main data ------
let data = [];

// ------ selector variables ------
const taskForm = document.forms['add-task-form'];
const taskName_InputElement = taskForm.taskName;
const taskName_EmptyError_Element = document.getElementById('taskNameEmptyError');
const taskName_SuccessMessage_Element = document.getElementById('taskNameSuccessMessage');

const priority_elements = taskForm.priority;
const priorityEmptyError_element = document.getElementById('priorityEmptyError');
const priorityCorrectMessage_element = document.getElementById('priorityCorrectMessage');

const status_elements = taskForm.status;
const statusEmptyError_element = document.getElementById('statusEpmtyError');
const statusCorrectMessage_element = document.getElementById('statusCorrectMessage');

const deadLine_element = taskForm.deadLine;
const deadLine_errorMessage = document.getElementById('deadLineEmptyError');

const tableBody_element = document.getElementById('tableBody');
const overlay_element = document.getElementById('overlay');
const modal_element = document.getElementById('modal');

// ------ variables ------
let priorityValid = false;
let statusValid = false;
let taskNameValue = null;
let priorityValue = null;
let statusValue = null;
let deadLineValue = null;
let id = null;
let taskData = {
  id: null,
  taskName: null,
  priority: null,
  status: null,
  deadLine: null,
};

// ------ functions ------
const openTaskModal = () => {
  overlay_element.classList.remove('hidden');
  overlay_element.classList.add('block');
  modal_element.classList.remove('hidden');
  modal_element.classList.add('block');
};

const closeModal = () => {
  overlay_element.classList.remove('block');
  overlay_element.classList.add('hidden');
  modal_element.classList.remove('block');
  modal_element.classList.add('hidden');
};

const renderPriorityStyle = (priorityValue) => {
  let priorityBgColorClass = null;
  let priorityTextColorClass = null;

  if (priorityValue === 'low') {
    priorityBgColorClass = 'bg-light-gray-status';
    priorityTextColorClass = 'text-black';
  } else if (priorityValue === 'medium') {
    priorityBgColorClass = 'bg-yellow-status';
    priorityTextColorClass = 'text-black';
  } else if (priorityValue === 'high') {
    priorityBgColorClass = 'bg-red-status';
    priorityTextColorClass = 'text-white';
  }
  return { bgColor: priorityBgColorClass, textColor: priorityTextColorClass };
};

const renderStatusStyle = (statusValue) => {
  let statusBgColorClass = null;
  let statusTextColorClass = null;

  if (statusValue === 'todo') {
    statusBgColorClass = 'bg-red-status';
    statusTextColorClass = 'text-white';
  } else if (statusValue === 'doing') {
    statusBgColorClass = 'bg-yellow-status';
    statusTextColorClass = 'text-black';
  } else if (statusValue === 'done') {
    statusBgColorClass = 'bg-green-status';
    statusTextColorClass = 'text-white';
  }
  return { bgColor: statusBgColorClass, textColor: statusTextColorClass };
};

const addTask = () => {
  let tasksString = localStorage.getItem('data');
  // data value is null fixed
  data = JSON.parse(tasksString) || [];
  tableBody_element.innerHTML = '';
  data.forEach((item) => {
    tableBody_element.innerHTML += `
    <tr class="border border-gray-700 w-full h-12">
    <td class="border border-gray-700 w-1/5 h-12"><p class="w-max">${item.taskName}</p></td>
    <td class="capitalize border border-gray-700 w-1/5 h-12 text-center">
      <p class="py-1 px-2 rounded-2xl ${renderPriorityStyle(item.priority).bgColor} ${
      renderPriorityStyle(item.priority).textColor
    } w-max mx-auto">${item.priority}</p>
    </td>
    <td class="capitalize border border-gray-700 w-1/5 h-12 text-center">
      <p class="py-1 px-2 rounded-2xl ${renderStatusStyle(item.status).bgColor} ${
      renderStatusStyle(item.status).textColor
    } w-max mx-auto">${item.status}</p>
    </td>
    <td class="border border-gray-700 w-1/5 h-12"><p class="w-max mx-auto px-4 py-1 border border-blue-500 rounded-3xl">${
      item.deadLine
    }</p></td>
    <td class="border border-gray-700 w-1/5 h-12">
      <div class="flex gap-2 w-max mx-auto">
        <i onclick="deleteTask('${
          item.id
        }')" class="fa-solid fa-trash w-10 h-7 text-xs rounded-md bg-red-status text-white flex justify-center items-center cursor-pointer"></i>
        <i onclick="editTask('${
          item.id
        }')" class="fa-solid fa-pen w-10 h-7 text-xs rounded-md bg-blue-status text-white flex justify-center items-center cursor-pointer"></i>
        <i onclick="viewTask('${
          item.id
        }')" class="fa-solid fa-eye w-10 h-7 text-xs rounded-md bg-gray-status text-white flex justify-center items-center cursor-pointer"></i>
      </div>
    </td>
  </tr>
    `;
  });
};

const deleteTask = (id) => {
  data.filter((item, index) => {
    if (item.id === id) {
      data.splice(index, 1);
    }
  });
  localStorage.setItem('data', JSON.stringify(data));
  addTask();
};

const editTask = (id) => {
  const editCase = data.find((item) => {
    if (item.id === id) {
      console.log(item);
      return item;
    }
  });
  taskName_InputElement.value = editCase.taskName;
  deadLine_element.value = editCase.deadLine;
  taskForm.addEventListener('submit', (e) => {
    editCase.taskName = taskName_InputElement.value;
    editCase.deadLine = deadLine_element.value;
  });
};

// main scripts
function renderAddTask() {
  //Validation *** TASKNAME ***
  if (taskName_InputElement.value === '') {
    taskName_EmptyError_Element.classList.remove('hidden');
    taskName_EmptyError_Element.classList.add('block');
    taskNameValue = taskName_InputElement.value;
  } else {
    taskName_EmptyError_Element.classList.remove('block');
    taskName_EmptyError_Element.classList.add('hidden');
    taskNameValue = taskName_InputElement.value;
  }

  //Validation *** PRIORITY ***
  priority_elements.forEach((item) => {
    if (item.checked) {
      priorityValid = true;
      priorityValue = item.value;
      priorityEmptyError_element.classList.add('hidden');
      priorityEmptyError_element.classList.remove('block');
    }
  });
  if (!priorityValid) {
    priorityEmptyError_element.classList.remove('hidden');
    priorityEmptyError_element.classList.add('block');
  }

  //Validation *** STATUS ***
  status_elements.forEach((item) => {
    if (item.checked) {
      statusValid = true;
      statusValue = item.value;
    }
  });
  if (statusValid === true) {
    statusEmptyError_element.classList.remove('block');
    statusEmptyError_element.classList.add('hidden');
  } else {
    statusEmptyError_element.classList.remove('hidden');
    statusEmptyError_element.classList.add('block');
  }

  //validation *** DATE ***
  if (deadLine_element.value === '') {
    deadLine_errorMessage.classList.remove('hidden');
    deadLine_errorMessage.classList.add('block');
    deadLineValue = deadLine_element.value;
  } else {
    deadLine_errorMessage.classList.remove('block');
    deadLine_errorMessage.classList.add('hidden');
    deadLineValue = deadLine_element.value;
  }

  //send data to localStorage if all is validate
  if (statusValid === true && priorityValid === true && taskNameValue !== '' && deadLineValue !== '') {
    taskData = {
      id: String(Date.now()),
      taskName: taskNameValue,
      priority: priorityValue,
      status: statusValue,
      deadLine: deadLineValue,
    };
    data.push(taskData);
    localStorage.setItem('data', JSON.stringify(data));
    taskForm.reset();
    taskName_EmptyError_Element.classList.remove('block');
    taskName_EmptyError_Element.classList.add('hidden');
    priorityEmptyError_element.classList.add('hidden');
    priorityEmptyError_element.classList.remove('block');
    statusEmptyError_element.classList.remove('block');
    statusEmptyError_element.classList.add('hidden');
    deadLine_errorMessage.classList.remove('block');
    deadLine_errorMessage.classList.add('hidden');
    closeModal();
  }
}

taskForm.addEventListener('submit', (e) => {
  //form preventDefault fixed ***
  e.preventDefault();
  renderAddTask();
  addTask();
});

addTask();
