// Function to add a reminder
function addReminder() {
    let reminderText = document.getElementById("reminderText").value.trim();
    let reminderDate = document.getElementById("reminderDate").value;
    let reminderList = document.getElementById("reminderList");

    if (reminderText === "" || reminderDate === "") {
        alert("Please enter a reminder and select a date/time.");
        return;
    }

    // Create new list item
    let li = document.createElement("li");
    li.innerHTML = `
        <span class="reminder-text">${reminderText} - ${new Date(reminderDate).toLocaleString()}</span>
        <div class="buttons">
            <button class="edit-btn" onclick="editReminder(this)">Edit</button>
            <button class="delete-btn" onclick="deleteReminder(this)">Delete</button>
        </div>
    `;

    reminderList.appendChild(li);

    // Clear input fields
    document.getElementById("reminderText").value = "";
    document.getElementById("reminderDate").value = "";
}

// Function to edit a reminder
function editReminder(button) {
    let reminderItem = button.parentElement.parentElement;
    let reminderText = reminderItem.querySelector(".reminder-text");

    let newText = prompt("Edit your reminder:", reminderText.textContent.split(" - ")[0]);

    if (newText !== null && newText.trim() !== "") {
        reminderText.textContent = `${newText} - ${reminderText.textContent.split(" - ")[1]}`;
    }
}

// Function to delete a reminder
function deleteReminder(button) {
    button.parentElement.parentElement.remove();
}
