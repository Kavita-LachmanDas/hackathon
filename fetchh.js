import { db, collection, getDocs, doc, deleteDoc, updateDoc,getDoc } from './firebase.config.js';

// Fetch and display tasks from Firestore
async function displayTasks() {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasksContainer = document.getElementById("tasksContainer");
    const taskCount = querySnapshot.size;

    // Create header
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("tasks-header");
    headerDiv.innerHTML = `
      <h2>My Tasks</h2>
      <span class="tasks-count">${taskCount} tasks</span>
    `;

    // Create table structure
    const tableHTML = `
      <table class="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="tasksTableBody">
        </tbody>
      </table>
    `;
    
    // Create empty state
    const emptyStateHTML = `
      <div class="empty-state" ${taskCount > 0 ? 'style="display: none;"' : ''}>
        <i class="fas fa-tasks"></i>
        <h3>No tasks found</h3>
        <p>Create a new task to get started!</p>
      </div>
    `;

    // Clear previous content and add new structure
    tasksContainer.innerHTML = '';
    tasksContainer.appendChild(headerDiv);
    
    if (taskCount > 0) {
      tasksContainer.innerHTML += tableHTML;
      const tasksTableBody = document.getElementById("tasksTableBody");
      
      querySnapshot.forEach((doc) => {
        const taskData = doc.data();
        const taskId = doc.id;
        
        // Get initials for avatar
        const email = taskData.assignedTo || "example@email.com";
        const initials = getInitialsFromEmail(email);
        
        // Format date if available
        let formattedDate = '';
        if (taskData.createdAt && typeof taskData.createdAt.toDate === 'function') {
          const date = taskData.createdAt.toDate();
          formattedDate = date.toLocaleDateString();
        }
        
        // Determine status class
        let statusClass = "status-todo";
        if (taskData.status === "In Progress") {
          statusClass = "status-progress";
        } else if (taskData.status === "Done") {
          statusClass = "status-done";
        }
        
        // Create row
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>
            <div class="task-title">${taskData.title || "Untitled Task"}</div>
          </td>
          <td>
            <div class="task-description">${taskData.description || "No description"}</div>
          </td>
          <td>
            <span class="status-badge ${statusClass}">${taskData.status || "To Do"}</span>
          </td>
          <td>
            <div class="assigned-to">
              <div class="avatar">${initials}</div>
              <div class="email">${email}</div>
            </div>
          </td>
          <td class="actions-cell">
            <button class="action-btn edit-btn" data-id="${taskId}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" data-id="${taskId}">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        `;
        
        tasksTableBody.appendChild(row);
      });
    } else {
      tasksContainer.innerHTML += emptyStateHTML;
    }

  } catch (error) {
    console.error("Error fetching tasks: ", error);
    const tasksContainer = document.getElementById("tasksContainer");
    tasksContainer.innerHTML = `
      <div class="tasks-header">
        <h2>My Tasks</h2>
        <span class="tasks-count">0 tasks</span>
      </div>
      <div class="empty-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Error loading tasks</h3>
        <p>There was a problem loading your tasks. Please try again later.</p>
      </div>
    `;
  }
}

// Helper function to get initials from email
function getInitialsFromEmail(email) {
  if (!email || typeof email !== 'string') return 'NA';
  
  // Try to extract name part before the @ symbol
  const namePart = email.split('@')[0];
  
  // If there are dots or underscores, use them to extract initials
  if (namePart.includes('.') || namePart.includes('_')) {
    const separators = /[._]/;
    const parts = namePart.split(separators);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
  }
  
  // If it's a single name or couldn't extract properly
  if (namePart.length >= 2) {
    return namePart.substring(0, 2).toUpperCase();
  } else if (namePart.length === 1) {
    return namePart[0].toUpperCase();
  }
  
  return 'NA';
}

// Event delegation for edit and delete buttons
document.getElementById('tasksContainer').addEventListener('click', async function(e) {
  if (e.target && e.target.classList.contains('edit-btn')) {
    const taskId = e.target.getAttribute('data-id');
    
    // Fetch the task details from Firestore
    const taskDoc = await getDoc(doc(db, "tasks", taskId));
    const taskData = taskDoc.data();

    // Populate the form with the task data
    document.getElementById("editTitle").value = taskData.title;
    document.getElementById("editDescription").value = taskData.description;
    document.getElementById("editAssignedTo").value = taskData.assignedTo;
    document.getElementById("editStatus").value = taskData.status;

    // Open the edit form/modal
    document.getElementById("editTaskModal").style.display = "block";

    // Set up the save button to update the task
    document.getElementById("saveEditButton").onclick = async function() {
      const updatedTask = {
        title: document.getElementById("editTitle").value,
        description: document.getElementById("editDescription").value,
        assignedTo: document.getElementById("editAssignedTo").value,
        status: document.getElementById("editStatus").value
      };

      try {
        // Update the task in Firestore
        await updateDoc(doc(db, "tasks", taskId), updatedTask);

        // Close the modal and refresh the task list
        document.getElementById("editTaskModal").style.display = "none";
        displayTasks(); // Refresh the task list
      } catch (error) {
        console.error("Error updating task: ", error);
      }
    };
  }

  if (e.target && e.target.classList.contains('delete-btn')) {
    const taskId = e.target.getAttribute('data-id');
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteDoc(doc(db, "tasks", taskId));
        // Refresh the task list
        displayTasks();
      } catch (error) {
        console.error("Error deleting task: ", error);
        alert("Error deleting task. Please try again.");
      }
    }
  }
});

// Call the displayTasks function when the page loads
window.onload = displayTasks;
