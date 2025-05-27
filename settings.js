// Settings Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load user settings
    loadUserSettings();
    
    // Add event listeners for settings changes
    setupSettingsListeners();
});

function loadUserSettings() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const settings = JSON.parse(localStorage.getItem('userSettings')) || getDefaultSettings();

    if (userData) {
        // Update profile information
        document.getElementById('username-display').textContent = userData.username;
        document.getElementById('username').value = userData.username;
        document.getElementById('email').value = userData.email || '';
        
        // Update level and experience
        document.getElementById('level-number').textContent = userData.level || 1;
        document.getElementById('experience').textContent = userData.experience || 0;
        document.getElementById('next-level').textContent = (userData.level || 1) * 100;
        
        // Update coins
        document.getElementById('coins').textContent = userData.coins || 0;
        
        // Update experience bar
        updateExperienceBar(userData.experience || 0, userData.level || 1);
        
        // Update rank display
        updateRankDisplay(userData.level || 1, userData.experience || 0);
    }

    // Load saved settings
    document.getElementById('challenge-notifications').checked = settings.notifications.challenges;
    document.getElementById('level-up-notifications').checked = settings.notifications.levelUp;
    document.getElementById('daily-goals-notifications').checked = settings.notifications.dailyGoals;
    
    document.getElementById('study-duration').value = settings.studyPreferences.studyDuration;
    document.getElementById('break-duration').value = settings.studyPreferences.breakDuration;
    document.getElementById('daily-goal').value = settings.studyPreferences.dailyGoal;
    
    document.getElementById('profile-visibility').checked = settings.privacy.publicProfile;
    document.getElementById('progress-sharing').checked = settings.privacy.shareProgress;
    document.getElementById('achievement-sharing').checked = settings.privacy.shareAchievements;
}

function getDefaultSettings() {
    return {
        notifications: {
            challenges: true,
            levelUp: true,
            dailyGoals: true
        },
        studyPreferences: {
            studyDuration: 25,
            breakDuration: 5,
            dailyGoal: 4
        },
        privacy: {
            publicProfile: true,
            shareProgress: true,
            shareAchievements: true
        }
    };
}

function setupSettingsListeners() {
    // Add listeners for all settings changes
    const settingsInputs = document.querySelectorAll('.settings-group input');
    settingsInputs.forEach(input => {
        input.addEventListener('change', () => {
            saveSettings();
        });
    });
}

function saveSettings() {
    const settings = {
        notifications: {
            challenges: document.getElementById('challenge-notifications').checked,
            levelUp: document.getElementById('level-up-notifications').checked,
            dailyGoals: document.getElementById('daily-goals-notifications').checked
        },
        studyPreferences: {
            studyDuration: parseInt(document.getElementById('study-duration').value),
            breakDuration: parseInt(document.getElementById('break-duration').value),
            dailyGoal: parseInt(document.getElementById('daily-goal').value)
        },
        privacy: {
            publicProfile: document.getElementById('profile-visibility').checked,
            shareProgress: document.getElementById('progress-sharing').checked,
            shareAchievements: document.getElementById('achievement-sharing').checked
        }
    };

    localStorage.setItem('userSettings', JSON.stringify(settings));
    showSuccessMessage('Settings saved successfully!');
}

// Account Settings Functions
function updateUsername() {
    const newUsername = document.getElementById('username').value.trim();
    if (!newUsername) {
        showErrorMessage('Username cannot be empty');
        return;
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        userData.username = newUsername;
        localStorage.setItem('userData', JSON.stringify(userData));
        document.getElementById('username-display').textContent = newUsername;
        showSuccessMessage('Username updated successfully!');
    }
}

function updateEmail() {
    const newEmail = document.getElementById('email').value.trim();
    if (!newEmail || !isValidEmail(newEmail)) {
        showErrorMessage('Please enter a valid email address');
        return;
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        userData.email = newEmail;
        localStorage.setItem('userData', JSON.stringify(userData));
        showSuccessMessage('Email updated successfully!');
    }
}

function updatePassword() {
    const newPassword = document.getElementById('password').value;
    if (!newPassword || newPassword.length < 6) {
        showErrorMessage('Password must be at least 6 characters long');
        return;
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        userData.password = newPassword; // In a real app, this should be hashed
        localStorage.setItem('userData', JSON.stringify(userData));
        document.getElementById('password').value = '';
        showSuccessMessage('Password updated successfully!');
    }
}

function saveStudyPreferences() {
    const studyDuration = parseInt(document.getElementById('study-duration').value);
    const breakDuration = parseInt(document.getElementById('break-duration').value);
    const dailyGoal = parseInt(document.getElementById('daily-goal').value);

    if (studyDuration < 5 || studyDuration > 120) {
        showErrorMessage('Study duration must be between 5 and 120 minutes');
        return;
    }

    if (breakDuration < 1 || breakDuration > 30) {
        showErrorMessage('Break duration must be between 1 and 30 minutes');
        return;
    }

    if (dailyGoal < 1 || dailyGoal > 12) {
        showErrorMessage('Daily goal must be between 1 and 12 hours');
        return;
    }

    saveSettings();
}

// Data Management Functions
function exportData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const settings = JSON.parse(localStorage.getItem('userSettings'));
    
    const exportData = {
        userData,
        settings
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'study-focus-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function clearData() {
    showConfirmationDialog(
        'Clear All Data',
        'Are you sure you want to clear all your data? This action cannot be undone.',
        () => {
            localStorage.clear();
            window.location.href = 'log.html';
        }
    );
}

// Utility Functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(successMessage);

    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

function showErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'success-message';
    errorMessage.style.background = 'var(--danger-color)';
    errorMessage.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.remove();
    }, 3000);
}

function showConfirmationDialog(title, message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const dialog = document.createElement('div');
    dialog.className = 'confirmation-dialog';
    dialog.innerHTML = `
        <h3>${title}</h3>
        <p>${message}</p>
        <div class="confirmation-buttons">
            <button class="confirm">Confirm</button>
            <button class="cancel">Cancel</button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(dialog);

    dialog.querySelector('.confirm').addEventListener('click', () => {
        overlay.remove();
        dialog.remove();
        onConfirm();
    });

    dialog.querySelector('.cancel').addEventListener('click', () => {
        overlay.remove();
        dialog.remove();
    });
} 