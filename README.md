<<<<<<< HEAD
# TodoList
It is a Todo List Application to manage tasks according to priority and status
=======
# To-Do List Manager

A full-featured To-Do List Manager application that allows users to add, edit, delete, and mark tasks as complete. Tasks include priority levels and deadlines, are stored in Local Storage, and can be organized by status or urgency.

## Features

### Core Features:
*   **Add Task**:
    *   Input for task title.
    *   Dropdown for priority (High, Medium, Low).
    *   Date picker for deadline (cannot be in the past for new tasks).
    *   "Add Task" button.
*   **Display Tasks**:
    *   Tasks displayed as cards.
    *   Each task shows:
        *   Title
        *   Priority (color-coded: Red for High, Orange for Medium, Green for Low)
        *   Deadline
        *   Status (Pending / Completed)
*   **Mark as Completed**:
    *   Custom checkbox to toggle a task's completion status.
    *   Completed tasks are visually distinct (faded, strikethrough).
*   **Edit Task**:
    *   Option to update task title, priority, or deadline via a modal.
*   **Delete Task**:
    *   Delete button for each task with a confirmation prompt.
*   **Local Storage**:
    *   Tasks are stored in the browser's localStorage.
    *   Tasks persist after page reload.

### Advanced Features:
*   **Filter Tasks**:
    *   Filter tasks by status (All, Pending, Completed).
    *   Filter tasks by priority (All, High, Medium, Low).
*   **Highlight Overdue Tasks**:
    *   Tasks whose deadline has passed and are not completed are highlighted in red.
*   **Countdown for Deadlines**:
    *   Displays messages like "Due today!", "Due tomorrow!", "Due in X days", or "Overdue by X day(s)".
*   **Dark/Light Theme Toggle**:
    *   Button to switch between dark and light themes.
    *   Theme preference is saved in localStorage.
*   **Task Sorting**:
    *   Sort tasks by:
        *   Deadline (earliest first)
        *   Priority (High > Medium > Low)
        *   Date Added (oldest first)

## Tech Stack
*   **HTML**: Page layout and structure.
*   **CSS**: Styling, responsive design, and animations.
*   **JavaScript**: DOM manipulation, localStorage interaction, and application logic.

## UI/UX Guidelines Followed
*   **Responsive Design**: The application layout adapts to different screen sizes.
*   **Clean and Modern UI**: Aimed for a user-friendly and visually appealing interface.
*   **Visual Distinctions**:
    *   Overdue tasks are highlighted in red.
    *   High-priority tasks have a distinct red accent.
    *   Medium-priority tasks have an orange accent.
    *   Low-priority tasks have a green accent.
    *   Completed tasks are faded and have strikethrough text.

## How to Run Locally
1.  Clone the repository or download the files (`index.html`, `style.css`, `script.js`).
2.  Place all three files in the same folder.
3.  Open `index.html` in your web browser.

## Screenshots (Optional)
*(You can add screenshots of your application here)*

**Light Theme:**
![Light Theme Screenshot](link_to_light_theme_screenshot.png)

**Dark Theme:**
![Dark Theme Screenshot](link_to_dark_theme_screenshot.png)

**Task Card Examples:**
![Task Card Screenshot](link_to_task_card_screenshot.png)
>>>>>>> ff7d92f (Initial commit: To-Do List project)
