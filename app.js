document.addEventListener('DOMContentLoaded', () => {
    // Task input functionality
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.querySelector('.button-container .circle-button:nth-child(2)');
    
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addNewTask(taskText);
        taskInput.value = '';
      }
    });
    
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && taskInput.value.trim()) {
        addNewTask(taskInput.value.trim());
        taskInput.value = '';
      }
    });
    
    // Add task functionality
    function addNewTask(title) {
      const taskList = document.querySelector('.task-list');
      
      const taskItem = document.createElement('div');
      taskItem.className = 'task-item';
      taskItem.style.opacity = '0';
      taskItem.style.transform = 'translateY(20px)';
      
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = days[tomorrow.getDay()];
      const hours = Math.floor(Math.random() * 12) + 1;
      const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
      
      taskItem.innerHTML = `
        <div class="task-checkbox">
          <input type="checkbox">
        </div>
        <div class="task-content">
          <div class="task-title">${title}</div>
          <div class="task-description">${dayName} ${hours}${ampm}</div>
        </div>
        <div class="task-actions">
          <div class="task-action-btn" style="background-color: #e6f4ff;">
            <i class="fas fa-cloud" style="color: #66a5ff;"></i>
          </div>
          <div class="task-action-btn" style="background-color: #f0e6ff;">
            <i class="fas fa-edit" style="color: #9966ff;"></i>
          </div>
        </div>
      `;
      
      taskList.prepend(taskItem);
      
      // Animation
      setTimeout(() => {
        taskItem.style.transition = 'all 0.3s ease';
        taskItem.style.opacity = '1';
        taskItem.style.transform = 'translateY(0)';
      }, 10);
      
      // Update task counter
      const taskCounter = document.querySelector('.section-header span:first-child');
      const currentCount = parseInt(taskCounter.textContent.match(/\d+/)[0]);
      taskCounter.textContent = `TASKS (${currentCount + 1})`;
    }
    
    // Make checkboxes interactive
    document.querySelectorAll('.task-checkbox input').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const taskItem = this.closest('.task-item');
        if (this.checked) {
          taskItem.style.opacity = '0.5';
          taskItem.querySelector('.task-title').style.textDecoration = 'line-through';
        } else {
          taskItem.style.opacity = '1';
          taskItem.querySelector('.task-title').style.textDecoration = 'none';
        }
      });
    });
    
    // Make nav items interactive
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
      });
    });
    
    // Make filter pills interactive
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', function() {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
      });
    });
  });