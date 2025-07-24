// User Profile and Authentication
document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM Content Loaded');
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (userData) {
        console.log('User data loaded:', userData);
        updateUserInterface(userData);
        
        // Show logout button
        document.getElementById("logout").style.display = "inline-block";
    } else {
        console.log('No user data, redirecting to login');
        window.location.href = 'log.html';
    }

    // Listen for avatar changes from inventory or shop
    window.addEventListener('avatarChanged', function(event) {
        updateAvatar(event.detail.path || event.detail.imagePath);
    });

    // Initial avatar setup
    const currentAvatarPath = localStorage.getItem('currentAvatarPath');
    if (currentAvatarPath) {
        updateAvatar(currentAvatarPath);
    }

    // Initialize experience bar
    initializeExperienceBar();

    // Add test button
    const testButton = document.createElement('button');
    testButton.textContent = 'Test XP Gain';
    testButton.onclick = () => {
        console.log('Test button clicked');
        gainExperience(25);
    };
    testButton.style.position = 'fixed';
    testButton.style.bottom = '20px';
    testButton.style.left = '20px';
    testButton.style.zIndex = '1000';
    testButton.style.padding = '10px 20px';
    testButton.style.background = 'var(--primary-color)';
    testButton.style.color = 'white';
    testButton.style.border = 'none';
    testButton.style.borderRadius = '5px';
    testButton.style.cursor = 'pointer';
    document.body.appendChild(testButton);
});

function updateUserInterface(userData) {
    // Update username display
    document.getElementById("username-display").textContent = `Hi, ${userData.username}`;
    
    // Update avatar
    updateAvatar(localStorage.getItem('currentAvatarPath') || userData.avatarPath);
    
    // Update level and experience
    document.getElementById("level-number").textContent = userData.level || 1;
    document.getElementById("experience").textContent = userData.experience || 0;
    document.getElementById("next-level").textContent = (userData.level || 1) * 100;
    
    // Update experience bar
    updateExperienceBar(userData.experience || 0, userData.level || 1);
    
    // Update rank display
    updateRankDisplay(userData.level || 1, userData.experience || 0);
}

function updateAvatar(avatarPath) {
    console.log('Updating avatar with path:', avatarPath);
    if (!avatarPath) {
        console.log('No avatar path provided, using default');
        avatarPath = localStorage.getItem('defaultAvatarPath') || 'theme/avatars/default.png';
    }

    const avatarImg = document.getElementById("user-avatar");
    if (avatarImg) {
        avatarImg.src = avatarPath;
        avatarImg.onerror = function() {
            console.log('Error loading avatar, using default');
            this.src = "theme/avatars/default.png";
            // If the current avatar is invalid, revert to default
            if (avatarPath === localStorage.getItem('currentAvatarPath')) {
                localStorage.setItem('currentAvatarPath', this.src);
            }
        };
    } else {
        console.error('Avatar image element not found');
    }
}

    // Logout functionality
    document.getElementById('logout').addEventListener('click', () => {
      localStorage.removeItem('userData');
      window.location.href = 'log.html';
  });

// Experience System
function gainExperience(exp) {
    console.log('Gaining experience:', exp);
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        console.error('No user data found');
        return;
    }

    userData.experience = (userData.experience || 0) + exp;
    const maxExperience = (userData.level || 1) * 100;

    console.log('Current experience:', userData.experience);
    console.log('Max experience:', maxExperience);

    if (userData.experience >= maxExperience) {
        levelUp(userData);
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    updateDisplay(userData);
}

function levelUp(userData) {
    userData.level += 1;
    userData.experience = 0;
    showLevelUpNotification(userData.level);
}

function updateDisplay(userData) {
    document.getElementById("level-number").textContent = userData.level;
    document.getElementById("experience").textContent = userData.experience;
    document.getElementById("next-level").textContent = userData.level * 100;
    updateExperienceBar(userData.experience, userData.level);
    updateRankDisplay(userData.level, userData.experience);
}

function updateExperienceBar(experience, level) {
    console.log('Updating XP bar:', { experience, level });
    const maxExperience = level * 100;
    const progress = (experience / maxExperience) * 100;
    console.log('Calculated progress:', progress);
    
    // Get all experience-related elements
    const experienceFill = document.getElementById("experience-fill");
    const experienceText = document.getElementById("experience");
    const nextLevelText = document.getElementById("next-level");
    
    console.log('Experience elements found:', {
        fill: experienceFill,
        text: experienceText,
        nextLevel: nextLevelText
    });

    if (experienceFill) {
        // Ensure the width is set with a unit
        experienceFill.style.width = `${progress}%`;
        console.log('XP bar width set to:', `${progress}%`);
        
        // Add a class to ensure visibility
        experienceFill.classList.add('active');
    } else {
        console.error('Experience fill element not found');
    }

    // Update the text displays
    if (experienceText) {
        experienceText.textContent = experience;
    }
    if (nextLevelText) {
        nextLevelText.textContent = maxExperience;
    }
}

// Add this function to initialize the experience bar
function initializeExperienceBar() {
    console.log('Initializing experience bar');
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        console.log('User data found:', userData);
        updateExperienceBar(userData.experience || 0, userData.level || 1);
    } else {
        console.log('No user data found, setting default values');
        updateExperienceBar(0, 1);
    }
}

function updateRankDisplay(level, experience) {
    const rankInfo = calculateRank(level, experience);
    const rankImage = document.getElementById("rank-image");
    
    // Update rank image with error handling
    if (rankImage) {
        // Log the current rank and image path for debugging
        console.log('Current rank:', rankInfo.rank);
        console.log('Attempting to load rank image:', rankInfo.imagePath);
        
        // First try the theme/ranks directory
        rankImage.src = `theme/ranks/${rankInfo.imagePath}`;
        rankImage.onerror = function() {
            console.log('Failed to load from theme/ranks, trying root directory...');
            // Try loading from root directory if theme/ranks fails
            rankImage.src = rankInfo.imagePath;
            rankImage.onerror = function() {
                console.log('Failed to load from root directory, trying alternate path...');
                // Try loading from current directory if root fails
                rankImage.src = `./${rankInfo.imagePath}`;
                rankImage.onerror = function() {
                    console.error('All attempts to load rank image failed');
                    this.src = 'theme/ranks/novice.png'; // Final fallback
                };
            };
        };
    } else {
        console.error('Rank image element not found in the DOM');
    }
    
    // Update other rank elements
    const rankName = document.getElementById("rank-name");
    const progressFill = document.getElementById("rank-progress-fill");
    const progressText = document.getElementById("rank-progress-text");
    
    if (rankName) rankName.textContent = rankInfo.rank;
    if (progressFill) progressFill.style.width = `${rankInfo.progress}%`;
    if (progressText) progressText.textContent = `${Math.round(rankInfo.progress)}%`;
}

function calculateRank(level, experience) {
    const ranks = {
        'Novice': { 
            minLevel: 1, 
            maxLevel: 5, 
            xpRequired: 1000,
            imagePath: 'novice.png'
        },
        'Apprentice': { 
            minLevel: 6, 
            maxLevel: 10, 
            xpRequired: 2500,
            imagePath: 'apprentice.png'
        },
        'Scholar': { 
            minLevel: 11, 
            maxLevel: 15, 
            xpRequired: 5000,
            imagePath: 'scholar.png'
        },
        'Master': { 
            minLevel: 16, 
            maxLevel: 20, 
            xpRequired: 10000,
            imagePath: 'master.png'
        },
        'Grandmaster': { 
            minLevel: 21, 
            maxLevel: 25, 
            xpRequired: 20000,
            imagePath: 'grandmaster.png'
        }
    };

    // Log current level and experience for debugging
    console.log('Calculating rank for:', { level, experience });

    for (const [rank, requirements] of Object.entries(ranks)) {
        if (level >= requirements.minLevel && level <= requirements.maxLevel) {
            const progress = (experience / requirements.xpRequired) * 100;
            console.log('Found rank:', rank, 'with progress:', progress);
            return {
                rank,
                progress: Math.min(progress, 100),
                nextRank: getNextRank(rank),
                imagePath: requirements.imagePath
            };
        }
    }

    return {
        rank: 'Grandmaster',
        progress: 100,
        nextRank: null,
        imagePath: ranks['Grandmaster'].imagePath
    };
}

function getNextRank(currentRank) {
    const ranks = ['Novice', 'Apprentice', 'Scholar', 'Master', 'Grandmaster'];
    const currentIndex = ranks.indexOf(currentRank);
    return currentIndex < ranks.length - 1 ? ranks[currentIndex + 1] : null;
}

function showLevelUpNotification(newLevel) {
    const notification = document.createElement('div');
    notification.className = 'level-up-notification';
    notification.innerHTML = `
        <h2>🎉 Level Up! 🎉</h2>
        <p>Congratulations! You've reached level ${newLevel}!</p>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
themeToggle.checked = savedTheme === 'dark';

// Theme toggle event listener
themeToggle.addEventListener('change', () => {
    const theme = themeToggle.checked ? 'dark' : 'light';
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update navbar background based on theme
    const navbar = document.querySelector('.navbar');
    navbar.style.background = theme === 'dark' ? 
        'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
});

// ... existing code ...

// Chatbot Dialog Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotDialog = document.getElementById('chatbot-dialog');
    const chatbotTrigger = document.getElementById('chatbot-trigger');
    const closeChat = document.getElementById('close-chat');
    const minimizeChat = document.getElementById('minimize-chat');
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotSendBtn = document.querySelector('.chatbot-send-btn');
    const chatbotMessages = document.querySelector('.chatbot-messages');

    // Dragging functionality
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const chatbotHeader = document.querySelector('.chatbot-header');

    chatbotHeader.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === chatbotHeader || e.target.parentNode === chatbotHeader) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, chatbotDialog);
        }
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    // Chatbot visibility controls
    chatbotTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        chatbotDialog.classList.add('active');
        addResizeHandles();
    });

    closeChat.addEventListener('click', () => {
        chatbotDialog.classList.remove('active');
        removeResizeHandles();
    });

    minimizeChat.addEventListener('click', () => {
        chatbotDialog.classList.remove('active');
        removeResizeHandles();
    });

    function addResizeHandles() {
        const handles = [
            { class: 'nw', position: 'top-left' },
            { class: 'n', position: 'top' },
            { class: 'ne', position: 'top-right' },
            { class: 'e', position: 'right' },
            { class: 'se', position: 'bottom-right' },
            { class: 's', position: 'bottom' },
            { class: 'sw', position: 'bottom-left' },
            { class: 'w', position: 'left' }
        ];

        handles.forEach(handle => {
            const div = document.createElement('div');
            div.className = `resize-handle ${handle.class}`;
            chatbotDialog.appendChild(div);
        });
    }

    function removeResizeHandles() {
        const handles = document.querySelectorAll('.resize-handle');
        handles.forEach(handle => handle.remove());
    }

    // Resize functionality
    let isResizing = false;
    let currentHandle = null;
    let startX, startY, startWidth, startHeight;

    document.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('resize-handle')) {
            isResizing = true;
            currentHandle = e.target;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = chatbotDialog.offsetWidth;
            startHeight = chatbotDialog.offsetHeight;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isResizing && currentHandle) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            const handleClass = currentHandle.className.split(' ')[1];
            
            switch(handleClass) {
                case 'se':
                    chatbotDialog.style.width = `${startWidth + deltaX}px`;
                    chatbotDialog.style.height = `${startHeight + deltaY}px`;
                    break;
                case 'sw':
                    chatbotDialog.style.width = `${startWidth - deltaX}px`;
                    chatbotDialog.style.height = `${startHeight + deltaY}px`;
                    chatbotDialog.style.left = `${startX + deltaX}px`;
                    break;
                case 'ne':
                    chatbotDialog.style.width = `${startWidth + deltaX}px`;
                    chatbotDialog.style.height = `${startHeight - deltaY}px`;
                    chatbotDialog.style.top = `${startY + deltaY}px`;
                    break;
                case 'nw':
                    chatbotDialog.style.width = `${startWidth - deltaX}px`;
                    chatbotDialog.style.height = `${startHeight - deltaY}px`;
                    chatbotDialog.style.left = `${startX + deltaX}px`;
                    chatbotDialog.style.top = `${startY + deltaY}px`;
                    break;
                case 'n':
                    chatbotDialog.style.height = `${startHeight - deltaY}px`;
                    chatbotDialog.style.top = `${startY + deltaY}px`;
                    break;
                case 's':
                    chatbotDialog.style.height = `${startHeight + deltaY}px`;
                    break;
                case 'e':
                    chatbotDialog.style.width = `${startWidth + deltaX}px`;
                    break;
                case 'w':
                    chatbotDialog.style.width = `${startWidth - deltaX}px`;
                    chatbotDialog.style.left = `${startX + deltaX}px`;
                    break;
            }
        }
    });

    document.addEventListener('mouseup', () => {
        isResizing = false;
        currentHandle = null;
    });

    // Handle message sending
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAd09_-8GWw-auFFTya4uvp-sXto8k8rqk';

    async function generateApiResponse(message) {
        // Check for various ways of asking about creation/developer
        const creationKeywords = [
            "who created you",
            "who made you",
            "who developed you",
            "who built you",
            "who designed you",
            "who programmed you",
            "who is your creator",
            "who is your developer",
            "who is your maker",
            "who is your designer",
            "who is your programmer",
            "tell me about your creator",
            "tell me about your developer",
            "tell me about your maker",
            "tell me about your designer",
            "tell me about your programmer",
            "who are you created by",
            "who are you made by",
            "who are you developed by",
            "who are you built by",
            "who are you designed by",
            "who are you programmed by",
            "your creator",
            "your developer",
            "your maker",
            "your designer",
            "your programmer",
            "created you",
            "developed you",
            "made you",
            "built you",
            "designed you",
            "programmed you"
        ];

        const messageLower = message.toLowerCase();
        if (creationKeywords.some(keyword => messageLower.includes(keyword))) {
            return "I am developed by Bhupendra Lekhak";
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        "role": "user",
                        "parts": [{ 
                            text: `You are an expert study assistant AI for the Study Focus application, designed to help students learn and maintain focus while studying. Your responses should be:

1. Educational and study-focused
2. Clear and concise (max 100 words)
3. Formatted in bullet points
4. Relevant to academic subjects and study techniques
5. Encouraging and motivating
6. Practical and actionable

Please provide a helpful response to this question:

${message}

Remember to:
• Keep responses under 100 words
• Use bullet points
• Focus on study-related content
• Be encouraging and supportive
• Provide practical advice when applicable`
                        }]
                    }]
                })
            });
            const data = await response.json();
            let responseText = data?.candidates[0].content.parts[0].text;
            
            // Format the response to ensure bullet points
            if (!responseText.includes('•')) {
                // Split the response into sentences and add bullet points
                const sentences = responseText.split(/[.!?]+/).filter(s => s.trim());
                responseText = sentences.map(s => `• ${s.trim()}`).join('\n');
            }
            
            return responseText;
        } catch (error) {
            console.error('Error:', error);
            return "I apologize, but I'm having trouble connecting to the AI service right now. Please try again later.";
        }
    }

    async function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            // Add user message to chat
            addMessage(message, 'user');
            chatbotInput.value = '';

            // Show loading message
            const loadingDiv = document.createElement('div');
            loadingDiv.classList.add('message', 'bot-message');
            loadingDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thinking...';
            chatbotMessages.appendChild(loadingDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            // Get AI response
            const response = await generateApiResponse(message);
            
            // Remove loading message
            loadingDiv.remove();
            
            // Add AI response
            addMessage(response, 'bot');
        }
    }

    chatbotSendBtn.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        // Add avatar for bot messages
        if (sender === 'bot') {
            const avatarDiv = document.createElement('div');
            avatarDiv.classList.add('message-avatar');
            avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
            messageDiv.appendChild(avatarDiv);
        }
        
        const textDiv = document.createElement('div');
        textDiv.classList.add('message-text');
        textDiv.textContent = text;
        messageDiv.appendChild(textDiv);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Add welcome message when chatbot is first opened
    chatbotTrigger.addEventListener('click', () => {
        if (!chatbotMessages.children.length) {
            addMessage('Hello! I\'m your study assistant. How can I help you today?', 'bot');
        }
    });
});

// ... existing code ...