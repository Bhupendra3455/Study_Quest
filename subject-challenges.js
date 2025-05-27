// Subject Challenges Class
class SubjectChallenges {
    constructor() {
        this.challenges = [];
        this.currentSubject = 'all';
        this.currentChallenge = null;
        this.currentQuestionIndex = 0;
        this.modal = document.getElementById('challenge-modal');
        this.challengeDetails = document.getElementById('challenge-details');
        this.aiAssistant = document.getElementById('ai-assistant');
        this.aiMessages = document.getElementById('ai-messages');
        this.aiInput = document.getElementById('ai-input');
        
        this.initializeEventListeners();
        this.loadChallenges();
        this.updateUI();
        this.loadUserProfile();
    }

    initializeEventListeners() {
        // Subject category buttons
        document.querySelectorAll('.subject-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentSubject = btn.dataset.subject;
                document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.updateUI();
            });
        });

        // Modal close buttons
        document.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('close-challenge').addEventListener('click', () => this.closeModal());

        // Start challenge button
        document.getElementById('start-challenge').addEventListener('click', () => this.beginChallenge());

        // AI Assistant
        document.getElementById('toggle-ai').addEventListener('click', () => this.toggleAI());
        document.getElementById('send-ai-message').addEventListener('click', () => this.sendAIMessage());
        this.aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendAIMessage();
        });
    }

    loadChallenges() {
        this.challenges = [
            {
                id: 1,
                subject: 'math',
                title: 'Quadratic Equations Master',
                description: 'Solve 10 quadratic equations with increasing difficulty.',
                difficulty: 'medium',
                type: 'quadratic',
                questionCount: 10,
                rewards: {
                    coins: 100,
                    xp: 200
                },
                requirements: {
                    level: 1,
                    time: '15 minutes'
                }
            },
            {
                id: 2,
                subject: 'science',
                title: 'Physics Problem Solver',
                description: 'Solve 10 physics problems about motion and forces.',
                difficulty: 'hard',
                type: 'physics',
                questionCount: 10,
                rewards: {
                    coins: 150,
                    xp: 300
                },
                requirements: {
                    level: 2,
                    time: '20 minutes'
                }
            },
            {
                id: 3,
                subject: 'english',
                title: 'Grammar Challenge',
                description: 'Correct 10 sentences with grammar mistakes.',
                difficulty: 'easy',
                type: 'grammar',
                questionCount: 10,
                rewards: {
                    coins: 80,
                    xp: 150
                },
                requirements: {
                    level: 1,
                    time: '10 minutes'
                }
            }
        ];
    }

    updateUI() {
        const challengesGrid = document.querySelector('.challenges-grid');
        challengesGrid.innerHTML = '';

        const filteredChallenges = this.currentSubject === 'all' 
            ? this.challenges 
            : this.challenges.filter(c => c.subject === this.currentSubject);

        filteredChallenges.forEach(challenge => {
            const card = this.createChallengeCard(challenge);
            challengesGrid.appendChild(card);
        });
    }

    createChallengeCard(challenge) {
        const card = document.createElement('div');
        card.className = 'challenge-card';
        card.innerHTML = `
            <h3>${challenge.title}</h3>
            <p>${challenge.description}</p>
            <div class="challenge-rewards">
                <div class="reward-item">
                    <i class="fas fa-coins"></i>
                    <span>${challenge.rewards.coins}</span>
                </div>
                <div class="reward-item">
                    <i class="fas fa-star"></i>
                    <span>${challenge.rewards.xp} XP</span>
                </div>
            </div>
            <div class="challenge-requirements">
                <p><i class="fas fa-clock"></i> ${challenge.requirements.time}</p>
                <p><i class="fas fa-level-up-alt"></i> Level ${challenge.requirements.level}</p>
                <p><i class="fas fa-tasks"></i> ${challenge.questionCount} Questions</p>
            </div>
            <button class="btn primary-btn" onclick="subjectChallenges.startChallenge(${challenge.id})">
                Start Challenge
            </button>
        `;
        return card;
    }

    startChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (!challenge) return;

        // Check if user meets requirements
        const userLevel = parseInt(document.getElementById('level-display').textContent.split(' ')[1]) || 1;
        if (userLevel < challenge.requirements.level) {
            this.showMessage('You need to reach level ' + challenge.requirements.level + ' to start this challenge!');
            return;
        }

        this.currentChallenge = challenge;
        this.currentQuestionIndex = 0;
        this.showChallengeDetails(challenge);
        this.modal.style.display = 'block';
    }

    showChallengeDetails(challenge) {
        this.challengeDetails.innerHTML = `
            <h2>${challenge.title}</h2>
            <p>${challenge.description}</p>
            <div class="challenge-info">
                <h3>Challenge Details</h3>
                <ul>
                    <li>Number of Questions: ${challenge.questionCount}</li>
                    <li>Time Limit: ${challenge.requirements.time}</li>
                    <li>Difficulty: ${challenge.difficulty}</li>
                </ul>
                <h3>Rewards</h3>
                <ul>
                    <li>Coins: ${challenge.rewards.coins}</li>
                    <li>XP: ${challenge.rewards.xp}</li>
                </ul>
            </div>
        `;
    }

    async beginChallenge() {
        if (!this.currentChallenge) return;

        // Generate the first question
        await this.generateQuestion();
        
        // Update modal content to show question interface
        document.getElementById('start-challenge').style.display = 'none';
        document.getElementById('close-challenge').textContent = 'Give Up';
    }

    async generateQuestion() {
        const challenge = this.currentChallenge;
        let prompt = '';

        switch (challenge.type) {
            case 'quadratic':
                prompt = `Generate a quadratic equation problem with the following requirements:
                - Difficulty: ${challenge.difficulty}
                - Question number: ${this.currentQuestionIndex + 1} of ${challenge.questionCount}
                - Format: Return a JSON object with:
                  {
                    "question": "The quadratic equation problem",
                    "answer": "The correct answer",
                    "hint": "A helpful hint for solving",
                    "explanation": "Step-by-step solution"
                  }
                - Make sure the question is clear and solvable
                - Include coefficients that result in whole number solutions for easier validation`;
                break;
            case 'physics':
                prompt = `Generate a physics problem about motion and forces with the following requirements:
                - Difficulty: ${challenge.difficulty}
                - Question number: ${this.currentQuestionIndex + 1} of ${challenge.questionCount}
                - Format: Return a JSON object with:
                  {
                    "question": "The physics problem",
                    "answer": "The correct answer with units",
                    "hint": "A helpful hint for solving",
                    "explanation": "Step-by-step solution"
                  }
                - Focus on basic motion and forces concepts
                - Use simple numbers for easier calculations`;
                break;
            case 'grammar':
                prompt = `Generate a sentence with grammar mistakes with the following requirements:
                - Difficulty: ${challenge.difficulty}
                - Question number: ${this.currentQuestionIndex + 1} of ${challenge.questionCount}
                - Format: Return a JSON object with:
                  {
                    "question": "The sentence with grammar mistakes",
                    "answer": "The corrected sentence",
                    "hint": "A helpful hint about the grammar rules",
                    "explanation": "Explanation of the corrections"
                  }
                - Include 2-3 common grammar mistakes
                - Make the mistakes clear but not too obvious`;
                break;
        }

        try {
            // Show loading state
            this.challengeDetails.innerHTML = `
                <h2>Question ${this.currentQuestionIndex + 1} of ${challenge.questionCount}</h2>
                <div class="question-container">
                    <div class="loading-message">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Generating your question...</p>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${(this.currentQuestionIndex / challenge.questionCount) * 100}%"></div>
                </div>
            `;

            // Get the API key from localStorage
            const apiKey = localStorage.getItem('geminiApiKey');
            if (!apiKey) {
                throw new Error('API key not found. Please set up your Gemini API key.');
            }

            // Make API request to Gemini
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error('Failed to generate question');
            }

            const data = await response.json();
            const generatedContent = data.candidates[0].content.parts[0].text;
            
            // Parse the JSON response
            const questionData = JSON.parse(generatedContent);

            // Store the current question data
            this.currentQuestion = questionData;

            // Show the question in the challenge modal
            this.challengeDetails.innerHTML = `
                <h2>Question ${this.currentQuestionIndex + 1} of ${challenge.questionCount}</h2>
                <div class="question-container">
                    <p class="question-text">${questionData.question}</p>
                    <div class="hint-section">
                        <button class="btn secondary-btn" onclick="subjectChallenges.showHint()">
                            <i class="fas fa-lightbulb"></i> Show Hint
                        </button>
                    </div>
                    <div class="answer-input">
                        <input type="text" id="answer-input" placeholder="Enter your answer...">
                        <button class="btn primary-btn" onclick="subjectChallenges.submitAnswer()">Submit Answer</button>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${(this.currentQuestionIndex / challenge.questionCount) * 100}%"></div>
                </div>
            `;
        } catch (error) {
            console.error('Error generating question:', error);
            this.showMessage('Failed to generate question. Please try again.');
        }
    }

    showHint() {
        if (this.currentQuestion && this.currentQuestion.hint) {
            this.showMessage(`Hint: ${this.currentQuestion.hint}`);
        }
    }

    async submitAnswer() {
        const answer = document.getElementById('answer-input').value.trim();
        if (!answer) return;

        // Compare the answer with the correct answer (case-insensitive)
        const isCorrect = answer.toLowerCase() === this.currentQuestion.answer.toLowerCase();

        if (isCorrect) {
            this.currentQuestionIndex++;
            if (this.currentQuestionIndex >= this.currentChallenge.questionCount) {
                this.completeChallenge();
            } else {
                await this.generateQuestion();
            }
        } else {
            this.showMessage('That\'s not correct. Try again!');
        }
    }

    completeChallenge() {
        const challenge = this.currentChallenge;
        this.challengeDetails.innerHTML = `
            <h2>Challenge Completed!</h2>
            <div class="completion-message">
                <p>Congratulations! You've completed the ${challenge.title}!</p>
                <div class="rewards-earned">
                    <h3>Rewards Earned:</h3>
                    <p><i class="fas fa-coins"></i> ${challenge.rewards.coins} coins</p>
                    <p><i class="fas fa-star"></i> ${challenge.rewards.xp} XP</p>
                </div>
            </div>
            <button class="btn primary-btn" onclick="subjectChallenges.closeModal()">Close</button>
        `;

        // Update user's coins and XP
        const coinBalance = document.getElementById('coin-balance');
        const currentCoins = parseInt(coinBalance.textContent);
        coinBalance.textContent = currentCoins + challenge.rewards.coins;

        this.showMessage(`Congratulations! You've earned ${challenge.rewards.coins} coins and ${challenge.rewards.xp} XP!`);
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.currentChallenge = null;
        this.currentQuestionIndex = 0;
    }

    toggleAI() {
        const content = this.aiAssistant.querySelector('.ai-content');
        const isVisible = content.style.display !== 'none';
        content.style.display = isVisible ? 'none' : 'block';
        this.aiAssistant.querySelector('#toggle-ai i').className = 
            isVisible ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
    }

    async sendAIMessage() {
        const message = this.aiInput.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage('user', message);
        this.aiInput.value = '';

        // Here you would integrate with your AI service to get help with the current question
        // For now, we'll simulate an AI response
        const responses = [
            "Let me help you break down this problem...",
            "Here's a hint: try using the quadratic formula...",
            "Remember, when solving quadratic equations...",
            "Think about the steps we need to take..."
        ];

        setTimeout(() => {
            this.addMessage('ai', responses[Math.floor(Math.random() * responses.length)]);
        }, 1000);
    }

    addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas ${type === 'user' ? 'fa-user' : 'fa-robot'}"></i>
                <p>${content}</p>
            </div>
        `;
        this.aiMessages.appendChild(messageDiv);
        this.aiMessages.scrollTop = this.aiMessages.scrollHeight;
    }

    showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-info-circle"></i>
                <p>${message}</p>
            </div>
        `;
        this.aiMessages.appendChild(messageDiv);
        this.aiMessages.scrollTop = this.aiMessages.scrollHeight;
    }

    loadUserProfile() {
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('userData')) || {};
        const currentAvatar = localStorage.getItem('currentAvatar') || 'theme/avatars/avatar1.png';
        
        // Update profile avatar
        const profileAvatar = document.getElementById('profile-avatar');
        if (profileAvatar) {
            profileAvatar.src = currentAvatar;
        }

        // Update coin balance
        const coinBalance = document.getElementById('coin-balance');
        if (coinBalance) {
            coinBalance.textContent = userData.coins || 1000;
        }

        // Update level display
        const levelDisplay = document.getElementById('level-display');
        if (levelDisplay) {
            levelDisplay.textContent = `Level ${userData.level || 1}`;
        }
    }
}

// Initialize the subject challenges
const subjectChallenges = new SubjectChallenges(); 