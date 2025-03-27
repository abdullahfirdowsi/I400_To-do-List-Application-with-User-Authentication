class Task {
    constructor(name, description, dueDate, reminderTime, repeatSchedule) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.reminderTime = reminderTime; // Store reminder time
        this.repeatSchedule = repeatSchedule; // Store repeat schedule
        this.completed = false;
    }
}

class TaskList {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
}

let lists = JSON.parse(localStorage.getItem('taskLists')) || [];
let currentListIndex = 0;

// Ensure there is at least one default list
if (lists.length === 0) {
    lists.push(new TaskList("ToDo"));
    saveLists();
}

// Display the list of task lists
function displayTaskLists() {
    const listContainer = document.getElementById('listContainer');
    listContainer.innerHTML = '';

    lists.forEach((list, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerText = list.name;
        listItem.onclick = () => {
            currentListIndex = index;
            displayTasks();
        };
        listContainer.appendChild(listItem);
    });

    toggleResetButton(); // Update the visibility of the Reset All button
    toggleActionButtons(); // Update the visibility of the action buttons
}

// Display tasks for the selected list
function displayTasks() {
    const currentListTitle = document.getElementById('currentListTitle');
    currentListTitle.innerText = lists[currentListIndex]?.name || 'Tasks';
    const taskListDiv = document.getElementById('taskList');
    taskListDiv.innerHTML = '';

    if (lists[currentListIndex]) {
        lists[currentListIndex].tasks.forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.className = `task ${task.completed ? 'completed' : ''}`;
            taskDiv.innerHTML = `
                <h3>${task.name}</h3>
                <p>Description: ${task.description}</p>
                <p>Due: ${task.dueDate}</p>
                <p>Reminder: ${task.reminderTime ? new Date(task.reminderTime).toLocaleString() : 'No Reminder Set'}</p>
                <p>Repeat: ${task.repeatSchedule}</p>
                <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskListDiv.appendChild(taskDiv);
        });
    } else {
        taskListDiv.innerHTML = '<p>No tasks in this list.</p>';
    }

    toggleActionButtons(); // Update the visibility of the action buttons
}

// Function to add a new task to the current list
function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7); // Example: Default due date to 7 days later
    const reminderTime = document.getElementById('reminderTime').value;
    const repeatSchedule = document.getElementById('repeatSchedule').value;

    if (taskName) {
        // Ensure there is a default list if none exists
        if (!lists[currentListIndex]) {
            lists.push(new TaskList("ToDo"));
            currentListIndex = lists.length - 1;
        }

        const newTask = new Task(taskName, taskDescription, dueDate.toLocaleDateString(), reminderTime, repeatSchedule);
        lists[currentListIndex].tasks.push(newTask);
        saveLists();
        displayTasks();
        clearTaskInputs();
    } else {
        alert('Please fill out the task name!');
    }
}

// Toggle task status
function toggleTask(index) {
    lists[currentListIndex].tasks[index].completed = !lists[currentListIndex].tasks[index].completed;
    saveLists();
    displayTasks();
}

// Edit an existing task
function editTask(index) {
    const task = lists[currentListIndex].tasks[index];
    const newName = prompt("Edit Task Name", task.name);
    const newDescription = prompt("Edit Task Description", task.description);
    const newDueDate = prompt("Edit Due Date (YYYY-MM-DD)", task.dueDate);
    const newReminderTime = prompt("Edit Reminder Time (YYYY-MM-DDTHH:MM)", task.reminderTime);
    const newRepeatSchedule = prompt("Edit Repeat Schedule (none/daily/weekdays/weekends)", task.repeatSchedule);

    if (newName && newDescription) {
        task.name = newName;
        task.description = newDescription;
        task.dueDate = newDueDate;
        task.reminderTime = newReminderTime;
        task.repeatSchedule = newRepeatSchedule;
        saveLists();
        displayTasks();
    }
}

// Delete an existing task
function deleteTask(index) {
    lists[currentListIndex].tasks.splice(index, 1);
    saveLists();
    displayTasks();
}

// Save lists to localStorage
function saveLists() {
    localStorage.setItem('taskLists', JSON.stringify(lists));
}

// Clear task input fields
function clearTaskInputs() {
    document.getElementById('taskName').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('reminderTime').value = '';
    document.getElementById('repeatSchedule').value = 'none';
}

// Function to reset all tasks and lists
function resetAll() {
    if (confirm("Are you sure you want to reset all tasks and lists? This action cannot be undone.")) {
        lists = []; // Clear the lists array
        saveLists(); // Save the empty state to localStorage
        displayTaskLists(); // Refresh the task lists display
        document.getElementById('taskList').innerHTML = ''; // Clear the task display
        document.getElementById('currentListTitle').innerText = 'Tasks'; // Reset the title
        alert("All tasks and lists have been reset.");
    }
}

// Function to toggle the visibility of the Reset All button
function toggleResetButton() {
    const resetButton = document.getElementById('resetAllBtn');
    if (lists.length > 0) {
        resetButton.style.display = 'block'; // Show the button
    } else {
        resetButton.style.display = 'none'; // Hide the button
    }
}

// Function to toggle the visibility of the action buttons
function toggleActionButtons() {
    const applyFiltersButton = document.querySelector("button[onclick*='views.html']");
    const viewRemindersButton = document.querySelector("button[onclick*='reminders.html']");

    if (lists.length > 0 && lists[currentListIndex]?.tasks.length > 0) {
        applyFiltersButton.style.display = 'block'; // Show the Apply Filters button
        viewRemindersButton.style.display = 'block'; // Show the View Reminders button
    } else {
        applyFiltersButton.style.display = 'none'; // Hide the Apply Filters button
        viewRemindersButton.style.display = 'none'; // Hide the View Reminders button
    }
}

// Attach the resetAll function to the Reset All button
document.getElementById('resetAllBtn').onclick = resetAll;

// Add a new task list
document.getElementById('addListBtn').onclick = () => {
    const listName = document.getElementById('listName').value;
    if (listName) {
        lists.push(new TaskList(listName));
        saveLists();
        displayTaskLists();
        document.getElementById('listName').value = '';
    } else {
        alert('Please enter a list name!');
    }
};

// Add a new task
document.getElementById('addTaskBtn').onclick = addTask;

// Initialize the app
displayTaskLists();
if (lists.length > 0) {
    displayTasks();
}

// Function to check reminders and alert the user
function checkReminders() {
    const now = new Date();
    lists.forEach((list) => {
        list.tasks.forEach((task) => {
            if (task.reminderTime) {
                const reminderTime = new Date(task.reminderTime);
                if (
                    reminderTime <= now &&
                    !task.reminderTriggered &&
                    shouldTriggerReminder(task.repeatSchedule, now)
                ) {
                    alert(`Reminder: ${task.name}\n${task.description}`);
                    task.reminderTriggered = true; // Mark reminder as triggered
                    saveLists();
                }
            }
        });
    });
}

// Helper function to check if a reminder should trigger based on repeat schedule
function shouldTriggerReminder(repeatSchedule, now) {
    if (repeatSchedule === "none") return true;
    if (repeatSchedule === "daily") return true;
    if (repeatSchedule === "weekdays" && now.getDay() >= 1 && now.getDay() <= 5) return true;
    if (repeatSchedule === "weekends" && (now.getDay() === 0 || now.getDay() === 6)) return true;
    return false;
}

// Set an interval to check reminders every minute
setInterval(checkReminders, 60000);