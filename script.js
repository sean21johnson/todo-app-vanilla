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

let currentList = JSON.parse(localStorage.getItem("todos"));
