// Function to add a task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    // Create new list item
    let li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskInput.value}</span>
        <div class="task-buttons">
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="complete-btn" onclick="toggleComplete(this)">✓</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    taskList.appendChild(li);
    taskInput.value = ""; // Clear input field
}

// Function to edit a task
function editTask(button) {
    let taskText = button.parentElement.previousElementSibling;
    let newText = prompt("Edit your task:", taskText.textContent);

    if (newText !== null && newText.trim() !== "") {
        taskText.textContent = newText;
    }
}

// Function to mark a task as completed
function toggleComplete(button) {
    let taskItem = button.parentElement.parentElement;
    taskItem.classList.toggle("completed");
}

// Function to delete a task
function deleteTask(button) {
    button.parentElement.parentElement.remove();
}
