document.addEventListener('DOMContentLoaded', () => {
    const addTaskForm = document.getElementById('add-task-form');
    const taskTitleInput = document.getElementById('task-title');
    const taskPriorityInput = document.getElementById('task-priority');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const taskListDiv = document.getElementById('task-list');

    const editModal = document.getElementById('edit-modal');
    const editTaskForm = document.getElementById('edit-task-form');
    const editTaskIdInput = document.getElementById('edit-task-id');
    const editTaskTitleInput = document.getElementById('edit-task-title');
    const editTaskPriorityInput = document.getElementById('edit-task-priority');
    const editTaskDeadlineInput = document.getElementById('edit-task-deadline');
    const closeButton = document.querySelector('.popup .close-btn');

    const filterStatusSelect = document.getElementById('filter-status');
    const filterPrioritySelect = document.getElementById('filter-priority');
    const sortTasksSelect = document.getElementById('sort-tasks');
    const themeToggleButton = document.getElementById('theme-toggle');

    let tasks = [];
    let currentEditTaskId = null;

   
    function getDateLocal(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        const localDate = new Date(year, month - 1, day);
        localDate.setHours(0, 0, 0, 0);
        return localDate;
    }

    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
    }

    
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleButton.textContent = '☀️';
            themeToggleButton.title = "Switch to Light Theme";
        } else {
            document.body.classList.remove('dark-theme');
            themeToggleButton.textContent = '🌓';
            themeToggleButton.title = "Switch to Dark Theme";
        }
    }

    function switchTheme() {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        setTheme(currentTheme);
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    }
    
    themeToggleButton.addEventListener('click', switchTheme);

    
    function showTasks() {
        taskListDiv.innerHTML = '';

        let filteredTasks = [...tasks];

        
        const statusFilter = filterStatusSelect.value;
        if (statusFilter === 'pending') {
            filteredTasks = filteredTasks.filter(task => !task.completed);
        } else if (statusFilter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.completed);
        }

        const priorityFilter = filterPrioritySelect.value;
        if (priorityFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
        }

        const sortBy = sortTasksSelect.value;
        filteredTasks.sort((a, b) => {
            if (sortBy === 'deadline') {
                return getDateLocal(a.deadline) - getDateLocal(b.deadline);
            } else if (sortBy === 'priority') {
                const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            } else if (sortBy === 'added') {
                return a.id - b.id;
            }
            return 0;
        });

        if (filteredTasks.length === 0) {
            const filterActive = statusFilter !== 'all' || priorityFilter !== 'all';
            taskListDiv.innerHTML = `<p class="no-tasks">${filterActive ? 'No tasks match your filters.' : 'No tasks yet. Add some!'}</p>`;
            return;
        }

        filteredTasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
            taskCard.classList.add(`priority-${task.priority}`);
            taskCard.dataset.id = task.id;

            if (task.completed) {
                taskCard.classList.add('completed');
            }

            const today = new Date();
            today.setHours(0,0,0,0); 
            const deadlineDate = getDateLocal(task.deadline);
            
            let overdue = false;
            if (!task.completed && deadlineDate < today) {
                taskCard.classList.add('overdue');
                overdue = true;
            }

            let countdownText = '';
            if (!task.completed) {
                const diffTime = deadlineDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays === 0) {
                    countdownText = 'Due today!';
                } else if (diffDays === 1) {
                    countdownText = 'Due tomorrow!';
                } else if (diffDays > 1) {
                    countdownText = `Due in ${diffDays} days`;
                } else if (diffDays < 0) {
                    countdownText = `Overdue by ${Math.abs(diffDays)} day(s)`;
                }
            }

            taskCard.innerHTML = `
                <div class="task-details">
                    <h3>${task.title}</h3>
                    <p class="priority">Priority: ${task.priority}</p>
                    <p class="deadline">Deadline: ${deadlineDate.toLocaleDateString()} ${overdue ? '<strong>(Overdue!)</strong>' : ''}</p>
                    <p class="status">Status: ${task.completed ? 'Completed' : 'Pending'}</p>
                    ${countdownText ? `<p class="countdown">${countdownText}</p>` : ''}
                </div>
                <div class="task-actions">
                    <label class="complete-label" title="${task.completed ? 'Mark as Pending' : 'Mark as Complete'}">
                        <input type="checkbox" class="complete-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                        <span class="checkmark-custom"></span>
                    </label>
                    <button class="btn edit-btn" data-id="${task.id}" title="Edit Task">Edit</button>
                    <button class="btn delete-btn" data-id="${task.id}" title="Delete Task">Delete</button>
                </div>
            `;
            taskListDiv.appendChild(taskCard);
        });
    }

    function addTask(e) {
        e.preventDefault();
        const title = taskTitleInput.value.trim();
        const priority = taskPriorityInput.value;
        const deadline = taskDeadlineInput.value;

        if (!title || !deadline) {
            alert('Please provide a title and a deadline for the task.');
            return;
        }
        
        const today = new Date();
        today.setHours(0,0,0,0);
        const deadlineDate = getDateLocal(deadline);

        if (deadlineDate < today) {
            alert('Deadline cannot be in the past.');
            return;
        }

        const newTask = {
            id: Date.now(), 
            title,
            priority,
            deadline,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        showTasks();
        addTaskForm.reset(); 
        taskPriorityInput.value = 'Medium';
        taskDeadlineInput.value = '';
        taskDeadlineInput.setAttribute('min', new Date().toISOString().split('T')[0]);
    }

    function handleTaskButtons(e) {
        const target = e.target;
        const taskCard = target.closest('.task-card');
        if (!taskCard && !target.classList.contains('complete-checkbox')) return;

        const taskId = target.dataset.id || (taskCard ? taskCard.dataset.id : null);
        if (!taskId) return;

        if (target.classList.contains('complete-checkbox')) {
            markDone(taskId);
        } else if (target.classList.contains('edit-btn')) {
            openEditPopup(taskId);
        } else if (target.classList.contains('delete-btn')) {
            removeTask(taskId);
        }
    }

    function markDone(taskId) {
        const task = tasks.find(t => t.id == taskId);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            showTasks();
        }
    }

    function removeTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks = tasks.filter(t => t.id != taskId);
            saveTasks();
            showTasks();
        }
    }

    function openEditPopup(taskId) {
        const task = tasks.find(t => t.id == taskId);
        if (task) {
            currentEditTaskId = taskId;
            editTaskIdInput.value = task.id;
            editTaskTitleInput.value = task.title;
            editTaskPriorityInput.value = task.priority;
            editTaskDeadlineInput.value = task.deadline;
            editModal.style.display = 'block';
            editTaskTitleInput.focus();
        }
    }

    function closeEditPopup() {
        editModal.style.display = 'none';
        currentEditTaskId = null;
        editTaskForm.reset();
    }

    function saveEditTask(e) {
        e.preventDefault();
        const title = editTaskTitleInput.value.trim();
        const priority = editTaskPriorityInput.value;
        const deadline = editTaskDeadlineInput.value;

        if (!title || !deadline) {
            alert('Please provide a title and a deadline.');
            return;
        }
        
        const today = new Date();
        today.setHours(0,0,0,0);
        const newDeadlineDate = getDateLocal(deadline);

        const originalTask = tasks.find(t => t.id == currentEditTaskId);
        const originalDeadlineDate = getDateLocal(originalTask.deadline);

        if (newDeadlineDate < today && originalDeadlineDate >= today) {
            alert('Cannot set deadline to a past date for a task that is not already overdue.');
            return;
        }

        const taskIndex = tasks.findIndex(t => t.id == currentEditTaskId);
        if (taskIndex > -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                title,
                priority,
                deadline
            };
            saveTasks();
            showTasks();
            closeEditPopup();
        }
    }

    addTaskForm.addEventListener('submit', addTask);
    taskListDiv.addEventListener('click', handleTaskButtons);
    
    editTaskForm.addEventListener('submit', saveEditTask);
    closeButton.addEventListener('click', closeEditPopup);
    window.addEventListener('click', (event) => { 
        if (event.target == editModal) {
            closeEditPopup();
        }
    });

    filterStatusSelect.addEventListener('change', showTasks);
    filterPrioritySelect.addEventListener('change', showTasks);
    sortTasksSelect.addEventListener('change', showTasks);

    loadTheme(); 
    loadTasks();
    
    taskDeadlineInput.setAttribute('min', new Date().toISOString().split('T')[0]);
    
    showTasks();
});