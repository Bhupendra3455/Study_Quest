// Study Room Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Load user data
    loadUserData();
    
    // Initialize timer
    initializeTimer();
    
    // Initialize ambient sounds
    initializeAmbientSounds();
    
    // Initialize task list
    initializeTaskList();
    
    // Load study session data
    loadStudySessionData();
    
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Initialize logout
    initializeLogout();
    
    // Initialize session time tracking
    initializeSessionTimeTracking();
    
    // Initialize study streak calendar
    initializeStudyCalendar();
});

// Theme Functions
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Update navbar background based on theme
    const navbar = document.querySelector('.navbar');
    navbar.style.background = savedTheme === 'dark' ? 
        'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
}

function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.checked = localStorage.getItem('theme') === 'dark';
        
        themeToggle.addEventListener('change', () => {
            const theme = themeToggle.checked ? 'dark' : 'light';
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            // Update navbar background based on theme
            const navbar = document.querySelector('.navbar');
            navbar.style.background = theme === 'dark' ? 
                'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
        });
    }
}

// Logout Function
function initializeLogout() {
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Clear session data
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('currentUser');
            
            // Redirect to login page
            window.location.href = 'log.html';
        });
    }
}

// Session Time Tracking
let sessionStartTime = null;
let sessionTimeInterval = null;

function initializeSessionTimeTracking() {
    // Start tracking session time
    sessionStartTime = new Date();
    updateSessionTime();
    
    // Update session time every second
    sessionTimeInterval = setInterval(updateSessionTime, 1000);
}

function updateSessionTime() {
    if (!sessionStartTime) return;
    
    const currentTime = new Date();
    const timeDiff = currentTime - sessionStartTime;
    
    // Convert to minutes and seconds
    const minutes = Math.floor(timeDiff / 60000);
    const seconds = Math.floor((timeDiff % 60000) / 1000);
    
    // Update display
    const sessionTimeElement = document.getElementById('session-time');
    if (sessionTimeElement) {
        sessionTimeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Clean up session time tracking when leaving the page
window.addEventListener('beforeunload', () => {
    if (sessionTimeInterval) {
        clearInterval(sessionTimeInterval);
    }
});

// User Data Functions
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        // Update profile information
        document.getElementById('username-display').textContent = userData.username;
        document.getElementById('level-number').textContent = userData.level || 1;
        document.getElementById('experience').textContent = userData.experience || 0;
        document.getElementById('next-level').textContent = (userData.level || 1) * 100;
        document.getElementById('coins').textContent = userData.coins || 0;
        
        // Update experience bar
        updateExperienceBar(userData.experience || 0, userData.level || 1);
        
        // Update rank display
        updateRankDisplay(userData.level || 1, userData.experience || 0);
    }
}

function updateExperienceBar(experience, level) {
    const maxExperience = level * 100;
    const percentage = (experience / maxExperience) * 100;
    const experienceFill = document.getElementById('experience-fill');
    if (experienceFill) {
        experienceFill.style.width = `${percentage}%`;
    }
}

function updateRankDisplay(level, experience) {
    const rankImage = document.getElementById('rank-image');
    const rankName = document.getElementById('rank-name');
    const rankProgressFill = document.getElementById('rank-progress-fill');
    const rankProgressText = document.getElementById('rank-progress-text');
    
    // Define ranks based on level
    const ranks = [
        { name: 'Novice', image: 'novice.png', minLevel: 1 },
        { name: 'Apprentice', image: 'apprentice.png', minLevel: 5 },
        { name: 'Scholar', image: 'scholar.png', minLevel: 10 },
        { name: 'Expert', image: 'expert.png', minLevel: 20 },
        { name: 'Master', image: 'master.png', minLevel: 30 }
    ];
    
    // Find current rank
    const currentRank = ranks.reduce((prev, curr) => {
        return level >= curr.minLevel ? curr : prev;
    });
    
    // Find next rank
    const nextRank = ranks.find(rank => rank.minLevel > level) || currentRank;
    
    // Calculate progress to next rank
    const progress = level >= nextRank.minLevel ? 100 : 
        ((level - currentRank.minLevel) / (nextRank.minLevel - currentRank.minLevel)) * 100;
    
    // Update rank display
    if (rankImage) rankImage.src = `theme/ranks/${currentRank.image}`;
    if (rankName) rankName.textContent = currentRank.name;
    if (rankProgressFill) rankProgressFill.style.width = `${progress}%`;
    if (rankProgressText) rankProgressText.textContent = `${Math.round(progress)}%`;
}

// Timer Variables
let timerInterval;
let timeLeft;
let isRunning = false;
let currentMode = 'study';
let studyTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60;  // 5 minutes in seconds

function initializeTimer() {
    const startBtn = document.getElementById('start-timer');
    const pauseBtn = document.getElementById('pause-timer');
    const resetBtn = document.getElementById('reset-timer');
    const modeBtns = document.querySelectorAll('.mode-btn');
    
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMode = btn.dataset.mode;
            resetTimer();
        });
    });
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        document.getElementById('start-timer').disabled = true;
        document.getElementById('pause-timer').disabled = false;
        document.querySelector('.timer-circle').classList.add('active');
        
        timeLeft = currentMode === 'study' ? studyTime : breakTime;
        updateTimerDisplay();
        
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                timerComplete();
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        document.getElementById('start-timer').disabled = false;
        document.getElementById('pause-timer').disabled = true;
        document.querySelector('.timer-circle').classList.remove('active');
    }
}

function resetTimer() {
    pauseTimer();
    timeLeft = currentMode === 'study' ? studyTime : breakTime;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

function timerComplete() {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById('start-timer').disabled = false;
    document.getElementById('pause-timer').disabled = true;
    document.querySelector('.timer-circle').classList.remove('active');
    
    // Play notification sound
    playNotificationSound();
    
    if (currentMode === 'study') {
        // Update study session data
        updateStudySessionData();
        // Switch to break mode
        document.querySelector('[data-mode="break"]').click();
    } else {
        // Switch back to study mode
        document.querySelector('[data-mode="study"]').click();
    }
}

// Ambient Sounds
let currentSound = null;
let audioContext = null;

function initializeAmbientSounds() {
    const soundBtns = document.querySelectorAll('.sound-btn');
    const volumeSlider = document.getElementById('volume-slider');
    
    soundBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sound = btn.dataset.sound;
            toggleSound(sound);
        });
    });
    
    volumeSlider.addEventListener('input', (e) => {
        if (currentSound) {
            currentSound.volume = e.target.value / 100;
        }
    });
}

function toggleSound(soundName) {
    const soundBtns = document.querySelectorAll('.sound-btn');
    soundBtns.forEach(btn => btn.classList.remove('active'));
    
    if (currentSound) {
        currentSound.pause();
        currentSound = null;
    }
    
    if (soundName) {
        const btn = document.querySelector(`[data-sound="${soundName}"]`);
        btn.classList.add('active');
        
        // Create and play the sound
        currentSound = new Audio(`sounds/ambient/${soundName}.mp3`);
        currentSound.loop = true;
        currentSound.volume = document.getElementById('volume-slider').value / 100;
        
        // Handle missing sound files gracefully
        currentSound.onerror = () => {
            console.log(`Sound file ${soundName}.mp3 not found. Ambient sounds are disabled.`);
            btn.classList.remove('active');
            currentSound = null;
        };
        
        currentSound.play().catch(error => {
            console.log('Error playing sound:', error);
            btn.classList.remove('active');
            currentSound = null;
        });
    }
}

function playNotificationSound() {
    const notification = new Audio('sounds/notification.mp3');
    notification.onerror = () => {
        console.log('Notification sound not found. Sound notifications are disabled.');
    };
    notification.play().catch(error => {
        console.log('Error playing notification:', error);
    });
}

// Task List
function initializeTaskList() {
    const addTaskBtn = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const tasksList = document.getElementById('tasks-list');
    
    // Load saved tasks
    const savedTasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
    savedTasks.forEach(task => addTaskToList(task));
    
    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            addTaskToList(task);
            saveTasks();
            newTaskInput.value = '';
        }
    });
    
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });
}

function addTaskToList(task) {
    const tasksList = document.getElementById('tasks-list');
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;
    
    li.innerHTML = `
        <span>${task.text}</span>
        <div class="task-actions">
            <button onclick="toggleTask(${task.id})">
                <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
            </button>
            <button onclick="deleteTask(${task.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    tasksList.appendChild(li);
}

function toggleTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        updateTaskList();
    }
}

function deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem('studyTasks', JSON.stringify(filteredTasks));
    updateTaskList();
}

function updateTaskList() {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
    tasks.forEach(task => addTaskToList(task));
}

function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('.task-item')).map(item => ({
        id: parseInt(item.dataset.id),
        text: item.querySelector('span').textContent,
        completed: item.classList.contains('completed')
    }));
    localStorage.setItem('studyTasks', JSON.stringify(tasks));
}

// Study Session Data
function loadStudySessionData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const studyData = JSON.parse(localStorage.getItem('studyData')) || getDefaultStudyData();
    
    if (userData && studyData) {
        // Update session info
        document.getElementById('current-streak').textContent = studyData.currentStreak || 0;
        document.getElementById('daily-study-time').textContent = formatStudyTime(studyData.totalStudyTime || 0);
        document.getElementById('daily-goal').textContent = `${studyData.dailyGoal || 4}h`;
    }
}

function updateStudySessionData() {
    const studyData = JSON.parse(localStorage.getItem('studyData')) || getDefaultStudyData();
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    // Update study time
    studyData.totalStudyTime = (studyData.totalStudyTime || 0) + studyTime;
    
    // Update streak
    const today = new Date().toDateString();
    if (studyData.lastStudyDate !== today) {
        studyData.currentStreak = (studyData.currentStreak || 0) + 1;
        studyData.lastStudyDate = today;
    }
    
    // Update experience
    userData.experience = (userData.experience || 0) + 10; // 10 XP per study session
    
    // Save data
    localStorage.setItem('studyData', JSON.stringify(studyData));
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Update display
    loadStudySessionData();
    updateUserInterface(userData);
}

function getDefaultStudyData() {
    return {
        currentStreak: 0,
        bestStreak: 0,
        totalStudyTime: 0,
        dailyGoal: 4,
        lastStudyDate: null
    };
}

// Utility Functions
function formatStudyTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}

function updateUserInterface(userData) {
    // Update level and experience
    document.getElementById('level-number').textContent = userData.level || 1;
    document.getElementById('experience').textContent = userData.experience || 0;
    document.getElementById('next-level').textContent = (userData.level || 1) * 100;
    
    // Update experience bar
    updateExperienceBar(userData.experience || 0, userData.level || 1);
    
    // Update rank display
    updateRankDisplay(userData.level || 1, userData.experience || 0);
}

// Study Calendar Feature
function initializeStudyCalendar() {
    const calendarContainer = document.createElement('div');
    calendarContainer.className = 'study-calendar';
    calendarContainer.innerHTML = `
        <h3>Study Streak Calendar</h3>
        <div class="calendar-grid"></div>
        <div class="calendar-legend">
            <div class="legend-item">
                <span class="legend-color no-study"></span>
                <span>No Study</span>
            </div>
            <div class="legend-item">
                <span class="legend-color low-study"></span>
                <span>1-2h</span>
            </div>
            <div class="legend-item">
                <span class="legend-color medium-study"></span>
                <span>2-4h</span>
            </div>
            <div class="legend-item">
                <span class="legend-color high-study"></span>
                <span>4h+</span>
            </div>
        </div>
    `;
    
    // Insert calendar after the session info section
    const sessionInfo = document.querySelector('.session-info');
    sessionInfo.parentNode.insertBefore(calendarContainer, sessionInfo.nextSibling);
    
    // Generate calendar grid
    generateCalendarGrid();
}

function generateCalendarGrid() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const today = new Date();
    const daysToShow = 365; // Show last year of activity
    
    // Get study data
    const studyData = JSON.parse(localStorage.getItem('studyData')) || {};
    const dailyStudyTimes = studyData.dailyStudyTimes || {};
    
    for (let i = daysToShow - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Get study time for this day
        const studyTime = dailyStudyTimes[dateStr] || 0;
        
        // Set color based on study time
        if (studyTime === 0) {
            dayElement.classList.add('no-study');
        } else if (studyTime < 7200) { // Less than 2 hours
            dayElement.classList.add('low-study');
        } else if (studyTime < 14400) { // Less than 4 hours
            dayElement.classList.add('medium-study');
        } else {
            dayElement.classList.add('high-study');
        }
        
        // Add tooltip with date and study time
        const hours = Math.floor(studyTime / 3600);
        const minutes = Math.floor((studyTime % 3600) / 60);
        dayElement.title = `${dateStr}\nStudy Time: ${hours}h ${minutes}m`;
        
        calendarGrid.appendChild(dayElement);
    }
}

// Update calendar when study session ends
function updateStudyCalendar(studyTime) {
    const today = new Date().toISOString().split('T')[0];
    const studyData = JSON.parse(localStorage.getItem('studyData')) || {};
    const dailyStudyTimes = studyData.dailyStudyTimes || {};
    
    // Add study time to today's total
    dailyStudyTimes[today] = (dailyStudyTimes[today] || 0) + studyTime;
    
    // Update storage
    studyData.dailyStudyTimes = dailyStudyTimes;
    localStorage.setItem('studyData', JSON.stringify(studyData));
    
    // Regenerate calendar
    generateCalendarGrid();
} 