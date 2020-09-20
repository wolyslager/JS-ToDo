//load previous tasks from local storage
const storedSession = document.querySelector('.tasks-container').innerHTML = localStorage.getItem('userItemList');

//HANDLING PREVIOUS TASKS ---- 
const previousTasks = document.querySelectorAll('.entry')
const previousTasksCheckButtons = document.querySelectorAll('.far');
const previousTasksDeleteButtons = document.querySelectorAll('.fa-trash')
const previousTasksText = document.querySelectorAll('p');

let taskContainer = document.querySelector('.tasks-container');
let containerHTML = taskContainer.innerHTML;

console.log('previous checked buttons', previousTasksCheckButtons);

const clearAll = document.querySelector('.clear-all-button');
clearAll.addEventListener('click', () =>{
	localStorage.clear();
})

console.log(previousTasksText.length, previousTasksCheckButtons.length)

for(let i=0;i<previousTasksCheckButtons.length;i++){
	//eventListener for checking strikethrough text
	previousTasksCheckButtons[i].addEventListener('click', (e) => {
		if(window.getComputedStyle(previousTasksText[i], null).getPropertyValue("text-decoration") =='none solid rgb(0, 0, 0)'){
			previousTasksText[i].style.textDecoration = 'line-through';
			previousTasksCheckButtons[i].className = "fa fa-check far";
			previousTasksCheckButtons[i].style.color = 'green';
			containerHTML = taskContainer.innerHTML;
			localStorage.setItem("userItemList", containerHTML);
		} else {
			previousTasksCheckButtons[i].className = "far fa-circle";
			previousTasksCheckButtons[i].style.color = 'black';
			previousTasksText[i].style.textDecoration = 'none';
			containerHTML = taskContainer.innerHTML;
			localStorage.setItem("userItemList", containerHTML);
		}
	})
}

for(let i=0;i<previousTasksDeleteButtons.length;i++){
	//eventListener for delete buttons 
	previousTasksDeleteButtons[i].addEventListener('click', (e) => {
		previousTasks[i].parentNode.removeChild(previousTasks[i]);
		taskContainer = document.querySelector('.tasks-container');
		containerHTML = taskContainer.innerHTML;
		localStorage.setItem("userItemList", containerHTML);
		console.log(containerHTML);
	})
}

//HANDLING NEW TASKS ---- 
const button = document.getElementById('button').addEventListener("click", (e) => {
	//create div
	const newTask = document.createElement('div');
	newTask.className = 'entry';

	let taskCompleted = document.createElement('i');
	taskCompleted.className = "far fa-circle";
	taskCompleted.style.transform = 'scale(1.5)'
	taskCompleted.style.marginLeft = '10px';

	let taskText = document.createElement('p');
	const enteredText = document.getElementById('input').value;
	const textNode = document.createTextNode(enteredText);
	taskText.appendChild(textNode);

	const deleteTask = document.createElement('i');
	deleteTask.className = "fa fa-trash";
	deleteTask.style.transform = 'scale(1.5)'
	deleteTask.style.color = 'red';
	deleteTask.style.marginRight = '10px';

	taskContainer = document.querySelector('.tasks-container');
	newTask.appendChild(taskCompleted);
	newTask.appendChild(taskText);
	newTask.appendChild(deleteTask); 

	taskContainer.insertBefore(newTask, null);
	containerHTML = taskContainer.innerHTML;
	console.log("userItemList", containerHTML);

	let strike = false;
	taskCompleted.addEventListener('click', (e) => {
		if(!strike){
			taskText.style.textDecoration = 'line-through';
			taskCompleted.className = "fa fa-check far";
			taskCompleted.style.color = 'green';
			containerHTML = taskContainer.innerHTML;
			localStorage.setItem("userItemList", containerHTML);
			
		} else {
			taskCompleted.className = "far fa-circle";
			taskCompleted.style.color = 'black';
			taskText.style.textDecoration = 'none';
			containerHTML = taskContainer.innerHTML;
			localStorage.setItem("userItemList", containerHTML);
		}
		strike = !strike;
	})

	deleteTask.addEventListener('click', (e) => {
		newTask.parentNode.removeChild(newTask);
		containerHTML = taskContainer.innerHTML;
	})

	localStorage.setItem("userItemList", containerHTML);
});
