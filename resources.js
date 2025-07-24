// Resources Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Load user data
    loadUserData();
    
    // Initialize file upload
    initializeFileUpload();
    
    // Load resources
    loadResources();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Initialize logout
    initializeLogout();
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

// File Upload Functions
function initializeFileUpload() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    
    // Handle click to upload
    dropZone.addEventListener('click', () => fileInput.click());
    
    // Handle file selection
    fileInput.addEventListener('change', handleFileSelect);
    
    // Handle drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
}

function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    const resourceType = document.getElementById('resource-type').value;
    const subject = document.getElementById('subject').value;
    
    Array.from(files).forEach(file => {
        const resource = {
            id: Date.now() + Math.random(),
            name: file.name,
            type: resourceType,
            subject: subject,
            fileType: getFileType(file.name),
            size: formatFileSize(file.size),
            uploadDate: new Date().toISOString(),
            file: file
        };
        
        // Save resource to localStorage
        saveResource(resource);
        
        // Add resource to display
        addResourceToDisplay(resource);
    });
}

function getFileType(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    switch (extension) {
        case 'pdf':
            return 'pdf';
        case 'doc':
        case 'docx':
            return 'doc';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return 'img';
        default:
            return 'other';
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Resource Management Functions
function saveResource(resource) {
    const resources = JSON.parse(localStorage.getItem('studyResources') || '[]');
    resources.push(resource);
    localStorage.setItem('studyResources', JSON.stringify(resources));
}

function loadResources() {
    const resources = JSON.parse(localStorage.getItem('studyResources') || '[]');
    const resourcesGrid = document.getElementById('resources-grid');
    resourcesGrid.innerHTML = '';
    
    resources.forEach(resource => addResourceToDisplay(resource));
}

function addResourceToDisplay(resource) {
    const resourcesGrid = document.getElementById('resources-grid');
    const resourceCard = document.createElement('div');
    resourceCard.className = 'resource-card';
    
    const fileIconClass = `file-icon ${resource.fileType}`;
    
    resourceCard.innerHTML = `
        <div class="${fileIconClass}">
            <i class="fas ${getFileIcon(resource.fileType)}"></i>
        </div>
        <div class="resource-info">
            <div class="resource-name">${resource.name}</div>
            <div class="resource-meta">
                <span>${resource.type}</span>
                <span>${resource.size}</span>
            </div>
        </div>
        <div class="resource-actions">
            <button onclick="downloadResource('${resource.id}')" title="Download">
                <i class="fas fa-download"></i>
            </button>
            <button onclick="deleteResource('${resource.id}')" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    resourcesGrid.appendChild(resourceCard);
}

function getFileIcon(fileType) {
    switch (fileType) {
        case 'pdf':
            return 'fa-file-pdf';
        case 'doc':
            return 'fa-file-word';
        case 'img':
            return 'fa-file-image';
        default:
            return 'fa-file';
    }
}

function downloadResource(resourceId) {
    const resources = JSON.parse(localStorage.getItem('studyResources') || '[]');
    const resource = resources.find(r => r.id === resourceId);
    
    if (resource) {
        const url = URL.createObjectURL(resource.file);
        const a = document.createElement('a');
        a.href = url;
        a.download = resource.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

function deleteResource(resourceId) {
    if (confirm('Are you sure you want to delete this resource?')) {
        const resources = JSON.parse(localStorage.getItem('studyResources') || '[]');
        const filteredResources = resources.filter(r => r.id !== resourceId);
        localStorage.setItem('studyResources', JSON.stringify(filteredResources));
        loadResources();
    }
}

// Filter Functions
function initializeFilters() {
    const filterType = document.getElementById('filter-type');
    const filterSubject = document.getElementById('filter-subject');
    const searchInput = document.getElementById('search-resources');
    
    filterType.addEventListener('change', applyFilters);
    filterSubject.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);
}

function applyFilters() {
    const filterType = document.getElementById('filter-type').value;
    const filterSubject = document.getElementById('filter-subject').value;
    const searchQuery = document.getElementById('search-resources').value.toLowerCase();
    
    const resources = JSON.parse(localStorage.getItem('studyResources') || '[]');
    const filteredResources = resources.filter(resource => {
        const matchesType = filterType === 'all' || resource.type === filterType;
        const matchesSubject = filterSubject === 'all' || resource.subject === filterSubject;
        const matchesSearch = resource.name.toLowerCase().includes(searchQuery);
        
        return matchesType && matchesSubject && matchesSearch;
    });
    
    const resourcesGrid = document.getElementById('resources-grid');
    resourcesGrid.innerHTML = '';
    filteredResources.forEach(resource => addResourceToDisplay(resource));
} 