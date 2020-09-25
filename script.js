let taskArray = JSON.parse(localStorage.getItem('tasks')) || [];
let stringTaskArray;
const userInput = document.querySelector('.input');
const addTaskButton = document.querySelector('.submit-button');
const taskContainer = document.querySelector('.tasks-container');
const clearStorageButton = document.querySelector('.clear-all-button');

class task {
	constructor(entry){
		this.taskText = entry;
		this.divClass = 'entry';
		this.statusButtonClass = 'far fa-circle left-side';
		this.deleteButtonClass = 'fa fa-trash right-side';
		this.innerTextClass = '';
		this.newTaskDiv = document.createElement('div');
		this.newTaskStatusButton = document.createElement('i');
		this.newTaskInnerText = document.createElement('p');
		this.newTaskDeleteButton = document.createElement('i');
	}
}

const addTask = () => {
	let taskObject = new task(userInput.value);
	taskArray.push(taskObject);
	assignClasses(taskObject);
	renderTasks(taskObject);
	attachEventListeners(taskObject);
}

const assignClasses = (task) => {
	task.newTaskDiv.classList = task.divClass;
	task.newTaskStatusButton.classList = task.statusButtonClass;
	task.newTaskDeleteButton.classList = task.deleteButtonClass;
	task.newTaskInnerText.classList = task.innerTextClass;
	task.newTaskInnerText.innerText = task.taskText;
}

const renderTasks = (task) => {
	task.newTaskDiv.appendChild(task.newTaskStatusButton);
	task.newTaskDiv.appendChild(task.newTaskInnerText);
	task.newTaskDiv.appendChild(task.newTaskDeleteButton);
	taskContainer.insertBefore(task.newTaskDiv, null);
}

const updateStorage = () => {
	stringTaskArray = JSON.stringify(taskArray);
	localStorage.setItem('tasks', stringTaskArray);
}

const attachEventListeners = (task) => {
	task.newTaskStatusButton.addEventListener('click', function(){
		if(task.newTaskInnerText.classList == ''){
			 task.newTaskInnerText.classList.add('strike');
			 task.innerTextClass = 'strike';
			 task.newTaskStatusButton.classList = 'fa fa-check left-side green';
			 task.statusButtonClass = 'fa fa-check left-side green';
			 updateStorage();
		} else {
			 task.newTaskInnerText.classList.remove('strike');
			 task.innerTextClass = '';
			 task.newTaskStatusButton.classList = 'far fa-circle left-side';
			 task.statusButtonClass = 'far fa-circle left-side';
			 updateStorage();
		}
	} )

	task.newTaskDeleteButton.addEventListener('click', function(){
		taskContainer.removeChild(task.newTaskDiv);
		taskArray.splice(taskArray.indexOf(task), 1);
		updateStorage();
	})

}

//Handling new entries
addTaskButton.addEventListener('click', function(){
	addTask();
	stringTaskArray = JSON.stringify(taskArray);
	localStorage.setItem('tasks', stringTaskArray);
});

//clear storage
clearStorageButton.addEventListener('click', function(){
	localStorage.clear();
})

//Handling previous entries
const loadPreviusTasks = () => {
	taskArray.forEach((task) => {
		task.newTaskDiv = document.createElement('div');
		task.newTaskStatusButton = document.createElement('i');
		task.newTaskInnerText = document.createElement('p');
		task.newTaskDeleteButton = document.createElement('i');
		assignClasses(task);
		renderTasks(task);
		attachEventListeners(task);
	})
}

loadPreviusTasks();







