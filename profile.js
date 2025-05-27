// Profile Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    loadUserData();
    
    // Load achievements
    loadAchievements();
    
    // Load study history
    loadStudyHistory();
    
    // Load favorite subjects
    loadFavoriteSubjects();
});

function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const studyData = JSON.parse(localStorage.getItem('studyData')) || getDefaultStudyData();

    if (userData) {
        // Update profile information
        document.getElementById('profile-username').textContent = userData.username;
        document.getElementById('username-display').textContent = userData.username;
        document.getElementById('level-number').textContent = userData.level || 1;
        document.getElementById('experience').textContent = userData.experience || 0;
        document.getElementById('next-level').textContent = (userData.level || 1) * 100;
        document.getElementById('coins').textContent = userData.coins || 0;
        
        // Update experience bar
        updateExperienceBar(userData.experience || 0, userData.level || 1);
        
        // Update rank display
        updateRankDisplay(userData.level || 1, userData.experience || 0);
        
        // Update stats
        document.getElementById('streak-count').textContent = studyData.currentStreak || 0;
        document.getElementById('total-study-time').textContent = formatStudyTime(studyData.totalStudyTime || 0);
        document.getElementById('completed-tasks').textContent = studyData.completedTasks || 0;
        
        // Update progress bars
        updateProgressBar('weekly-progress', studyData.weeklyProgress || 0);
        updateProgressBar('monthly-progress', studyData.monthlyProgress || 0);
        
        // Update streaks
        document.getElementById('current-streak').textContent = studyData.currentStreak || 0;
        document.getElementById('best-streak').textContent = studyData.bestStreak || 0;
    }
}

function getDefaultStudyData() {
    return {
        currentStreak: 0,
        bestStreak: 0,
        totalStudyTime: 0,
        completedTasks: 0,
        weeklyProgress: 0,
        monthlyProgress: 0,
        studyHistory: [],
        favoriteSubjects: []
    };
}

function loadAchievements() {
    const achievements = JSON.parse(localStorage.getItem('achievements')) || getDefaultAchievements();
    const achievementsGrid = document.getElementById('achievements-grid');
    
    achievementsGrid.innerHTML = '';
    
    achievements.forEach(achievement => {
        const achievementElement = createAchievementElement(achievement);
        achievementsGrid.appendChild(achievementElement);
    });
}

function getDefaultAchievements() {
    return [
        {
            id: 'first_study',
            name: 'First Study Session',
            description: 'Complete your first study session',
            icon: 'fa-book',
            progress: 0,
            maxProgress: 1,
            unlocked: false
        },
        {
            id: 'streak_7',
            name: '7-Day Streak',
            description: 'Maintain a 7-day study streak',
            icon: 'fa-fire',
            progress: 0,
            maxProgress: 7,
            unlocked: false
        },
        {
            id: 'study_master',
            name: 'Study Master',
            description: 'Complete 100 study sessions',
            icon: 'fa-graduation-cap',
            progress: 0,
            maxProgress: 100,
            unlocked: false
        },
        {
            id: 'perfect_day',
            name: 'Perfect Day',
            description: 'Complete all daily tasks',
            icon: 'fa-star',
            progress: 0,
            maxProgress: 1,
            unlocked: false
        }
    ];
}

function createAchievementElement(achievement) {
    const div = document.createElement('div');
    div.className = 'achievement-item';
    
    const progress = achievement.unlocked ? 100 : (achievement.progress / achievement.maxProgress) * 100;
    
    div.innerHTML = `
        <div class="achievement-icon" style="opacity: ${achievement.unlocked ? 1 : 0.5}">
            <i class="fas ${achievement.icon}"></i>
        </div>
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-progress">
            ${achievement.progress}/${achievement.maxProgress}
        </div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
    `;
    
    return div;
}

function loadStudyHistory() {
    const studyData = JSON.parse(localStorage.getItem('studyData')) || getDefaultStudyData();
    const historyTimeline = document.getElementById('study-history');
    
    historyTimeline.innerHTML = '';
    
    if (studyData.studyHistory && studyData.studyHistory.length > 0) {
        studyData.studyHistory.forEach(history => {
            const historyElement = createHistoryElement(history);
            historyTimeline.appendChild(historyElement);
        });
    } else {
        historyTimeline.innerHTML = '<div class="history-item">No study history yet</div>';
    }
}

function createHistoryElement(history) {
    const div = document.createElement('div');
    div.className = 'history-item';
    
    div.innerHTML = `
        <div class="history-date">${formatDate(history.date)}</div>
        <div class="history-content">${history.content}</div>
    `;
    
    return div;
}

function loadFavoriteSubjects() {
    const studyData = JSON.parse(localStorage.getItem('studyData')) || getDefaultStudyData();
    const subjectsGrid = document.getElementById('favorite-subjects');
    
    subjectsGrid.innerHTML = '';
    
    if (studyData.favoriteSubjects && studyData.favoriteSubjects.length > 0) {
        studyData.favoriteSubjects.forEach(subject => {
            const subjectElement = createSubjectElement(subject);
            subjectsGrid.appendChild(subjectElement);
        });
    } else {
        subjectsGrid.innerHTML = '<div class="subject-item">No favorite subjects yet</div>';
    }
}

function createSubjectElement(subject) {
    const div = document.createElement('div');
    div.className = 'subject-item';
    
    div.innerHTML = `
        <div class="subject-icon">
            <i class="fas ${getSubjectIcon(subject.name)}"></i>
        </div>
        <div class="subject-name">${subject.name}</div>
        <div class="subject-stats">
            ${subject.studyTime} hours studied
        </div>
    `;
    
    return div;
}

// Utility Functions
function formatStudyTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function updateProgressBar(elementId, progress) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.width = `${progress}%`;
        element.nextElementSibling.textContent = `${Math.round(progress)}%`;
    }
}

function getSubjectIcon(subjectName) {
    const icons = {
        'Mathematics': 'fa-square-root-alt',
        'Physics': 'fa-atom',
        'Chemistry': 'fa-flask',
        'Biology': 'fa-dna',
        'History': 'fa-landmark',
        'Literature': 'fa-book',
        'Computer Science': 'fa-code',
        'default': 'fa-book'
    };
    
    return icons[subjectName] || icons.default;
} 