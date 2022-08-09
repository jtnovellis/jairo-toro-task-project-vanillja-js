const tasks = [];
const inputTask = document.querySelector('.input-task');
const addButton = document.querySelector('.add-button');
const form = document.querySelector('#form');

addButton.addEventListener('click', event => {
  event.preventDefault();
  if (inputTask.value !== '') {
    handleSubmit(inputTask.value);
    inputTask.value = ''
    renderTask();
  };
});

function handleSubmit(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false
  };
  tasks.unshift(newTask);
};

function renderTask() {
  const html = tasks.map(task => {
    return `
    <div class="each-task">
      <div class="in-check">
        <input type="checkbox" name="checkbox" id="${task.id}">
        <label for="${task.id}" class="check"></label>
      </div> 
      <div class="task">${task.title}</div>
    </div><hr>
    `;
  });
  const allTasks = document.querySelector('.all-tasks');
  allTasks.innerHTML = html.join('');
  
  const checkbox = document.querySelectorAll('input[name=checkbox]');
  checkbox.forEach(check => {
    check.addEventListener('change', event => {
      event.preventDefault();
      let proof = event.target.checked
      if (proof) {
        handleCheckTask(check.id, proof);
        check.classList.add('is-completed');
      } else {
        handleCheckTask(check.id, proof);
        check.classList.remove('is-completed');        
      };
    });
  });
};

  

function handleCheckTask(id, event) {
  tasks.forEach(task => {
    if (task.id === id && event === true) {
      task.completed = true;
    } else if (task.id === id && event === false) {
      task.completed = false;
    };
  });
};

const deleteButton = document.querySelector('.delete-button');
deleteButton.addEventListener('click', event => {
  handleDelete();
  renderTask();
});

function handleDelete() {
  tasks.map(task => {
    if (task.completed === true) {
      const index = tasks.indexOf(task)
      for (let i = 0; i < tasks.length; i++) {
        if (i === index)
        tasks.splice(index,1);
      };
    };
  });
};
