/*
    User Story:
        -User types a new todo in the input box and presses enter (submits the form)
            -A new list item is added to the "todo_list"
            -A new list item is added to the array of list items in local storage
            -Each list item should have a name
            -Listen for an event that is a left click:
                -When left click happens, target the element that was clicked and add a class of 'complete'
                -The styling will need to have a strikethrough on the complete class
            -Listen for an even that is a right click:
                -When the right click happens, target the element and remove it from the list in local storage, then re-render
*/

// TARGETED ELEMENTS
const form = document.getElementById("form");
const todoList = document.getElementById("todo_list");

// Get the current list of todo's from local storage
// This should return an array of todo objects
let currentTodoList = JSON.parse(localStorage.getItem("todos"));

// Loop through the currentTodoList and pass each object into the addNewTodo function
if (currentTodoList) {
	currentTodoList.forEach((todo) => addNewTodo(todo));
}

// Handle the submission of a form
function handleFormSubmission(e) {
	e.preventDefault();

	const newTodoObj = {
		text: e.target.todo.value,
		completed: false,
	};

	addNewTodo(newTodoObj);

	e.target.todo.value = "";
}

// If there are any items in the currentTodoList, pass each one into an addTodo function using a forEach loop

// addNewTodo function should take in any todo item and create an element with event handlers for the item
// will also need to update local storage by adding this new todo to the current list
function addNewTodo(todo) {
	const newTodoEl = document.createElement("li");

	const newTodoElText = todo.text;

	if (todo.completed) {
		newTodoEl.classList.add("completed");
	}

	if (currentTodoList === null) {
		currentTodoList = [todo];
		updateLS();
	} else {
		if (!currentTodoList.includes(todo)) currentTodoList.push(todo);
		updateLS();
	}

	newTodoEl.innerText = newTodoElText;

	todoList.appendChild(newTodoEl);

	// Add an event handler that listener for a left click event
	newTodoEl.addEventListener("click", () => {
		// newTodoEl.classList.contains("completed")
		// 	? newTodoEl.classList.remove("completed")
		// 	: newTodoEl.classList.add("completed");
		if (!todo.completed) {
			todo.completed = true;
			newTodoEl.classList.add("completed");

			// target the element in the currentTodoList and update it's completed property to true
			const todoIndex = currentTodoList.indexOf(todo);
			currentTodoList[todoIndex].completed = true;
			updateLS();
		} else {
			todo.completed = false;
			newTodoEl.classList.remove("completed");

			// target the element in the currentTodoList and update it's completed property to false
			const todoIndex = currentTodoList.indexOf(todo);
			currentTodoList[todoIndex].completed = false;
			updateLS();
		}
	});

	// Add an event handler that listens for a right click event
	newTodoEl.addEventListener("contextmenu", () => {
		todoList.removeChild(newTodoEl);
		const index = currentTodoList.indexOf(todo);
		currentTodoList.splice(index, 1);
		updateLS();
	});
}

// Updating local storage with any new todo's
function updateLS() {
	listForLS = JSON.stringify(currentTodoList);
	localStorage.setItem("todos", listForLS);
}

// EVENT HANDLERS
form.addEventListener("submit", handleFormSubmission);
