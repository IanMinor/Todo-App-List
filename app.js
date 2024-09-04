const taskInput = document.querySelector('.add-task__new-task');
const taskCheck = document.querySelector('.add-task__task-status');
const tasksContainer = document.querySelector('.tasks__container');
const templateTask = document.querySelector('#template-task');

let itemsLeft = document.querySelector('.tasks-left__item-left');
const completeAll = document.getElementById('complete-all');

const clearTasks = document.getElementById('clear');
const tasksFilter = document.querySelector('.tasks-filter');

let tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];

tasks.forEach((task) => {
    renderTask(task);
});

// Actualizar el numero de tareas
itemsLeft.innerText = `${tasks.length} items left`;

// function currentItemsLeft() {
//     tasks === 0 ? itemsLeft.innerText = '0 items left' : itemsLeft.innerText = `${tasks.length} items left`;
// }

// Agregar tareas
function addTask() {
    const currentValueInput = taskInput.value.trim();
    if (currentValueInput && taskCheck.checked) {
        const newTask = createTask(currentValueInput);
        renderTask(newTask);
        // taskInput.reset();
        tasks.push(newTask);
        // currentItemsLeft();
        itemsLeft.innerText = `${tasks.length} items left`;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));

}


// Crear tareas
function createTask(taskName) {
    return {
        name: taskName,
        completed: false,
        id: Math.floor(Math.random() * 100)
    }
}

// Renderizar tareas
function renderTask(task) {
    const taskTemplate = templateTask.content.cloneNode(true);
    const { name, completed: state, id } = task;

    if (state) {
        taskTemplate.querySelector('.task').dataset.state = 'complete';
        taskTemplate.querySelector('.task__checked').checked = true;
    } else {
        taskTemplate.querySelector('.task').dataset.state = 'incomplete';

    }

    taskTemplate.querySelector('.task__name').textContent = name;
    taskTemplate.querySelector('.task').id = id;
    tasksContainer.prepend(taskTemplate);
}

// Actualizar el estado de la tarea y el nombre
tasksContainer.addEventListener('input', (e) => {
    const currentTask = e.target.closest('.task');
    const currentId = currentTask.id;

    if (e.target.matches('.task__name')) {

        const newTaskName = e.target.textContent;
        updateTaskName(currentId, newTaskName);

    } else if (e.target.matches('.task__checked')) {
        updateTaskState(currentId, currentTask, e.target.checked);
    }
});

// Obtener tarea mediante su ID
function getTaskById(id) {
    const currentId = parseInt(id);
    return tasks.filter((task) => task.id === currentId);
}

// Eliminar tarea del arreglo de tareas
function deleteTask(currentTaskElement) {

    const currentId = parseInt(currentTaskElement.id);
    const newTasks = tasks.filter((task) => task.id !== currentId);

    tasks = newTasks;
    itemsLeft.innerText = `${tasks.length} items left`;
    // currentItemsLeft();

    localStorage.setItem('tasks', JSON.stringify(tasks));

    currentTaskElement.remove();
}

// Eliminar todas las tareas del arreglo de tareas
function deleteTasks() {
    const currentTasks = document.querySelectorAll('.task');

    tasks = [];

    currentTasks.forEach((task) => {
        task.remove();
    });

    itemsLeft.innerText = `${tasks.length} items left`;

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Determinar los filtros
tasksFilter.addEventListener('click', (e) => {

    tasksContainer.className = 'tasks';

    const currentFilter = e.target.dataset.value ?? 'all';

    if (currentFilter === 'completed') {
        tasksContainer.classList.add('tasks--complete');
    } else if (currentFilter === 'active') {
        tasksContainer.classList.add('tasks--incomplete');
    }
});

// Actualizar el estado de la tarea
function updateTaskState(id, currentTaskElement, taskStatus) {
    const [currentTask] = getTaskById(id);
    const taskName = currentTaskElement.querySelector('.task__name');

    currentTask.completed = taskStatus;

    if (taskStatus) {
        currentTaskElement.dataset.state = 'complete';
    } else {
        currentTaskElement.dataset.state = 'incomplete';
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Actualizar a completado el estado de todas las tareas
// function updateTaskStates() {
//     const allTasks = document.querySelectorAll('.task');
//     // const taskCheck = tasksContainer.querySelectorAll('.task__checked');
//     // const taskCheck = allTasks.querySelectorAll('.task__checked');
//     if (completeAll.classList.contains('yes')) {
//         // const allTasks = document.querySelectorAll('.task');
//         allTasks.forEach((task) => {
//             // const taskCheck = task.querySelector('.task__checked');
//             taskCheck.checked = true;
//             task.dataset.state = 'complete';
//         });

//         tasks.forEach((task) => {
//             task.completed = true;
//         });

//     } else {
//         allTasks.forEach((task) => {
//             // const taskCheck = task.querySelector('.task__checked');
//             taskCheck.checked = false;
//             task.dataset.state = 'incomplete';
//         });

//         tasks.forEach((task) => {
//             task.completed = false;
//         });
//     }
//     console.log(tasks)
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }


// Actualizar el nombre de la tarea
function updateTaskName(id, value) {
    const [currentTask] = getTaskById(id);
    currentTask.name = value;

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Agregar tarea
taskInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

//Eliminar tarea 
tasksContainer.addEventListener('click', (e) => {
    if (e.target.matches('.delete-task', '.delete-task *')) {
        const currentTask = e.target.closest('.task');
        deleteTask(currentTask);
    }
});

// Limpiar tareas
clearTasks.addEventListener('click', (e) => {
    deleteTasks();
});

// Completar todas las tareas
completeAll.addEventListener('click', (e) => {
    completeAll.classList.toggle('yes');
    updateTaskStates();
});


// darkmode
let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
}

if (darkmode === 'active') {
    enableDarkMode();
}

themeSwitch.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== 'active' ? enableDarkMode() : disableDarkMode();
});



