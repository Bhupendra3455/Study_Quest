// Shop Items Data
const shopItems = {
    pets: [
        {
            id: 'study-owl',
            name: 'Study Owl',
            description: 'A wise companion that boosts your focus and learning speed.',
            price: 2000,
            rarity: 'epic',
            imagePath: 'theme/pets/owl.png',
            category: 'pets',
            stats: {
                loyalty: 95,
                energy: 80,
                boost: 15
            }
        },
        {
            id: 'math-cat',
            name: 'Math Cat',
            description: 'A clever feline that helps with mathematical calculations.',
            price: 1500,
            rarity: 'rare',
            imagePath: 'theme/pets/cat.png',
            category: 'pets',
            stats: {
                loyalty: 85,
                energy: 90,
                boost: 12
            }
        },
        {
            id: 'science-dragon',
            name: 'Science Dragon',
            description: 'A magical dragon that enhances your scientific understanding.',
            price: 3000,
            rarity: 'legendary',
            imagePath: 'theme/pets/dragon.png',
            category: 'pets',
            stats: {
                loyalty: 100,
                energy: 100,
                boost: 20
            }
        },
        {
            id: 'time-fox',
            name: 'Time Fox',
            description: 'A mystical fox that helps you manage your study time better.',
            price: 2500,
            rarity: 'epic',
            imagePath: 'theme/pets/fox.png',
            category: 'pets',
            stats: {
                loyalty: 90,
                energy: 95,
                boost: 18
            }
        },
        {
            id: 'coding-penguin',
            name: 'Coding Penguin',
            description: 'A tech-savvy penguin that assists with programming tasks.',
            price: 2800,
            rarity: 'epic',
            imagePath: 'theme/pets/penguin.png',
            category: 'pets',
            stats: {
                loyalty: 92,
                energy: 88,
                boost: 16
            }
        }
    ],
    powerups: [
        {
            id: 'focus-boost',
            name: 'Focus Boost',
            description: 'Increases focus and concentration for 30 minutes.',
            price: 500,
            rarity: 'common',
            icon: 'fa-bullseye',
            category: 'powerups',
            stats: {
                duration: 30,
                effect: 25
            }
        },
        {
            id: 'memory-enhance',
            name: 'Memory Enhancement',
            description: 'Improves memory retention for 1 hour.',
            price: 800,
            rarity: 'rare',
            icon: 'fa-brain',
            category: 'powerups',
            stats: {
                duration: 60,
                effect: 35
            }
        },
        {
            id: 'time-warp',
            name: 'Time Warp',
            description: 'Slows down perceived time during study sessions.',
            price: 1200,
            rarity: 'epic',
            icon: 'fa-clock',
            category: 'powerups',
            stats: {
                duration: 45,
                effect: 50
            }
        },
        {
            id: 'knowledge-surge',
            name: 'Knowledge Surge',
            description: 'Doubles experience gained for 20 minutes.',
            price: 1000,
            rarity: 'epic',
            icon: 'fa-bolt',
            category: 'powerups',
            stats: {
                duration: 20,
                effect: 100
            }
        },
        {
            id: 'energy-potion',
            name: 'Energy Potion',
            description: 'Instantly restores study energy.',
            price: 300,
            rarity: 'common',
            icon: 'fa-flask',
            category: 'powerups',
            stats: {
                duration: 0,
                effect: 100
            }
        },
        {
            id: 'streak-shield',
            name: 'Streak Shield',
            description: 'Protects your study streak for 24 hours.',
            price: 1500,
            rarity: 'legendary',
            icon: 'fa-shield-alt',
            category: 'powerups',
            stats: {
                duration: 1440,
                effect: 100
            }
        }
    ],
    themes: [
        {
            id: 'cyber-study',
            name: 'Cyber Study',
            description: 'A futuristic theme with neon accents.',
            price: 1000,
            rarity: 'epic',
            category: 'themes',
            previewPath: 'theme/previews/cyber.png'
        },
        {
            id: 'nature-focus',
            name: 'Nature Focus',
            description: 'Calming nature-inspired design.',
            price: 800,
            rarity: 'rare',
            category: 'themes',
            previewPath: 'theme/previews/nature.png'
        },
        {
            id: 'space-learning',
            name: 'Space Learning',
            description: 'Study among the stars with this cosmic theme.',
            price: 1500,
            rarity: 'legendary',
            category: 'themes',
            previewPath: 'theme/previews/space.png'
        }
    ],
    companions: [
        {
            id: 'wisdomOwl',
            name: 'Wisdom Owl',
            description: '+10% XP gain permanently',
            price: 2000,
            icon: 'fa-owl',
            rarity: 'legendary',
            category: 'companions'
        },
        {
            id: 'focusCat',
            name: 'Focus Cat',
            description: '+5% focus duration',
            price: 1000,
            icon: 'fa-cat',
            rarity: 'epic',
            category: 'companions'
        },
        {
            id: 'studyFox',
            name: 'Study Fox',
            description: '+15% coin gain',
            price: 1500,
            icon: 'fa-fox',
            rarity: 'epic'
        },
        {
            id: 'timeRabbit',
            name: 'Time Rabbit',
            description: '+10% study speed',
            price: 1200,
            icon: 'fa-rabbit',
            rarity: 'rare'
        }
    ],
    avatars: {
        student: [
            {
                id: 'masterScholar',
                name: 'Master Scholar',
                description: 'Show your mastery',
                price: 1500,
                rarity: 'epic',
                category: 'avatars',
                imagePath: 'avatar11.jpg'
            },
            {
                id: 'techWizard',
                name: 'Tech Wizard',
                description: 'Digital excellence',
                price: 1500,
                rarity: 'epic',
                category: 'avatars',
                imagePath: 'theme/avatars/avatar17.jpg'
            },
            {
                id: 'scienceGenius',
                name: 'Science Genius',
                description: 'Scientific brilliance',
                price: 1200,
                rarity: 'rare',
                category: 'avatars',
                imagePath: 'theme/avatars/avatar3.jpg'
            }
        ],
        fantasy: [
            {
                id: 'wizardScholar',
                name: 'Wizard Scholar',
                description: 'Magical learning powers',
                price: 2000,
                rarity: 'legendary',
                category: 'avatars',
                imagePath: 'theme/avatars/avatar4.jpg'
            },
            {
                id: 'dragonStudent',
                name: 'Dragon Student',
                description: 'Fierce determination',
                price: 1800,
                rarity: 'epic',
                category: 'avatars',
                imagePath: 'theme/avatars/avatar6.jpg'
            }
        ],
        professional: [
            {
                id: 'businessPro',
                name: 'Business Pro',
                description: 'Professional look',
                price: 1000,
                rarity: 'rare',
                category: 'avatars',
                imagePath: 'theme/avatars/avatar6.jpg'
            },
            {
                id: 'teacherAvatar',
                name: 'Teacher',
                description: 'Share knowledge',
                price: 1200,
                rarity: 'rare',
                category: 'avatars',
                imagePath: 'theme/avatars/avatar7.jpg'
            }
        ],
        cosmic: [
            {
                id: 'DarkgalaxyExplorer',
                name: 'Galaxy Explorer',
                description: 'Explore knowledge',
                price: 2000,
                rarity: 'legendary',
                category: 'avatars',
                imagePath: 'theme/avatars/avatar9.jpg'
            },
            {
                id: 'starStudent',
                name: 'Star Student',
                description: 'Shine bright',
                price: 1500,
                rarity: 'epic',
                category: 'avatars',
                imagePath: 'theme/avatars/avatar8.png'
            }
        ]
    }
};

// Shop functionality
class Shop {
    constructor() {
        console.log('Initializing shop...');
        this.shopItems = shopItems;
        this.currentCategory = 'pets';
        this.coins = 1000;
        
        // Initialize the shop
        this.initializeEventListeners();
        this.loadUserData();
        this.loadCurrentAvatar();
        this.displayItems('pets');
    }

    initializeEventListeners() {
        console.log('Setting up event listeners...');
        
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                console.log('Category clicked:', category);
                this.switchCategory(category);
            });
        });

        // Purchase buttons using event delegation
        document.getElementById('shop-items').addEventListener('click', (e) => {
            const buyButton = e.target.closest('.buy-btn');
            if (buyButton) {
                const itemId = buyButton.dataset.itemId;
                console.log('Buy button clicked for item:', itemId);
                this.showPurchaseModal(itemId);
            }
        });

        // Modal buttons
        document.getElementById('confirm-purchase').addEventListener('click', () => {
            console.log('Confirming purchase...');
            this.completePurchase();
        });

        document.getElementById('cancel-purchase').addEventListener('click', () => {
            console.log('Cancelling purchase...');
            this.closeModal();
        });

        // Listen for coin updates from challenges
        window.addEventListener('coinsUpdated', (event) => {
            this.updateCoins(event.detail.coins);
        });
    }

    loadUserData() {
        console.log('Loading user data...');
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        this.coins = userData.coins || 1000;
        this.updateCoinDisplay();
        console.log('Loaded coins:', this.coins);
    }

    updateCoins(newAmount) {
        this.coins = newAmount;
        this.updateCoinDisplay();
        
        // Update userData in localStorage
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        userData.coins = this.coins;
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Update userCoins for inventory
        localStorage.setItem('userCoins', this.coins.toString());
    }

    updateCoinDisplay() {
        const coinBalance = document.getElementById('coin-balance');
        if (coinBalance) {
            coinBalance.textContent = this.coins;
            console.log('Updated coin display:', this.coins);
        }
    }

    switchCategory(category) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-category="${category}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        this.currentCategory = category;
        this.displayItems(category);
    }

    displayItems(category) {
        console.log('Displaying items for category:', category);
        const container = document.getElementById('shop-items');
        if (!container) {
            console.error('Shop items container not found!');
            return;
        }

        container.innerHTML = '';
        let items = [];

        if (category === 'avatars') {
            // Flatten all avatar subcategories into a single array
            Object.values(this.shopItems.avatars).forEach(subcategory => {
                items = items.concat(subcategory);
            });
        } else {
            items = this.shopItems[category] || [];
        }

        if (items.length === 0) {
            container.innerHTML = `
                <div class="empty-message">
                    <i class="fas fa-box-open"></i>
                    <p>No items available in this category</p>
                </div>
            `;
            return;
        }

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = `shop-item ${category}-card`;
            if (item.rarity === 'legendary') {
                itemElement.classList.add('legendary-item');
            }

            // Different card layouts based on category
            let cardContent = '';
            switch(category) {
                case 'pets':
                    cardContent = this.createPetCard(item);
                    break;
                case 'powerups':
                    cardContent = this.createPowerupCard(item);
                    break;
                case 'themes':
                    cardContent = this.createThemeCard(item);
                    break;
                case 'avatars':
                    cardContent = this.createAvatarCard(item);
                    break;
                default:
                    cardContent = this.createDefaultCard(item);
            }

            itemElement.innerHTML = cardContent;
            container.appendChild(itemElement);
        });
    }

    createPetCard(item) {
        return `
            <span class="rarity-badge rarity-${item.rarity}">${item.rarity}</span>
            <div class="pet-image-container">
                <img src="${item.imagePath}" alt="${item.name}" onerror="this.src='theme/pets/default-pet.png'">
            </div>
            <h3 class="item-name">${item.name}</h3>
            <p class="item-description">${item.description}</p>
            <div class="item-stats">
                <div class="stat">
                    <div class="stat-label">Loyalty</div>
                    <div class="stat-value">${item.stats?.loyalty || '100'}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Energy</div>
                    <div class="stat-value">${item.stats?.energy || '100'}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Boost</div>
                    <div class="stat-value">+${item.stats?.boost || '10'}%</div>
                </div>
            </div>
            <div class="item-price">
                <i class="fas fa-coins"></i>
                <span>${item.price}</span>
            </div>
            <button class="buy-btn" data-item-id="${item.id}">
                Adopt Pet
            </button>
        `;
    }

    createPowerupCard(item) {
        return `
            <span class="rarity-badge rarity-${item.rarity}">${item.rarity}</span>
            <div class="powerup-icon">
                <i class="fas ${item.icon}"></i>
            </div>
            <h3 class="item-name">${item.name}</h3>
            <p class="item-description">${item.description}</p>
            <div class="item-stats">
                <div class="stat">
                    <div class="stat-label">Duration</div>
                    <div class="stat-value">${item.stats?.duration || '30'}m</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Effect</div>
                    <div class="stat-value">+${item.stats?.effect || '25'}%</div>
                </div>
            </div>
            <div class="item-price">
                <i class="fas fa-coins"></i>
                <span>${item.price}</span>
            </div>
            <button class="buy-btn" data-item-id="${item.id}">
                Purchase Power-up
            </button>
        `;
    }

    createThemeCard(item) {
        return `
            <span class="rarity-badge rarity-${item.rarity}">${item.rarity}</span>
            <div class="theme-preview" style="background-image: url('${item.previewPath}')"></div>
            <h3 class="item-name">${item.name}</h3>
            <p class="item-description">${item.description}</p>
            <div class="item-price">
                <i class="fas fa-coins"></i>
                <span>${item.price}</span>
            </div>
            <button class="buy-btn" data-item-id="${item.id}">
                Get Theme
            </button>
        `;
    }

    createAvatarCard(item) {
        const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
        const isPurchased = inventory.some(i => i.id === item.id);
        
        return `
            <span class="rarity-badge rarity-${item.rarity}">${item.rarity}</span>
            <div class="avatar-image">
                <img src="${item.imagePath}" alt="${item.name}" onerror="this.src='theme/avatars/default.png'">
            </div>
            <h3 class="item-name">${item.name}</h3>
            <p class="item-description">${item.description}</p>
            <div class="item-price">
                <i class="fas fa-coins"></i>
                <span>${item.price}</span>
            </div>
            <button class="buy-btn ${isPurchased ? 'purchased' : ''}" data-item-id="${item.id}" ${isPurchased ? 'disabled' : ''}>
                ${isPurchased ? 'Purchased' : 'Purchase Avatar'}
            </button>
        `;
    }

    createDefaultCard(item) {
        return `
            <span class="rarity-badge rarity-${item.rarity}">${item.rarity}</span>
            <div class="item-image">
                <i class="fas ${item.icon || 'fa-gem'}"></i>
            </div>
            <h3 class="item-name">${item.name}</h3>
            <p class="item-description">${item.description}</p>
            <div class="item-price">
                <i class="fas fa-coins"></i>
                <span>${item.price}</span>
            </div>
            <button class="buy-btn" data-item-id="${item.id}">
                Purchase
            </button>
        `;
    }

    showPurchaseModal(itemId) {
        console.log('Showing purchase modal for item:', itemId);
        const item = this.findItem(itemId);
        if (!item) {
            console.error('Item not found:', itemId);
            return;
        }

        const modal = document.getElementById('purchase-modal');
        const message = document.getElementById('modal-message');
        if (!modal || !message) {
            console.error('Modal elements not found!');
            return;
        }

        message.innerHTML = `
            Are you sure you want to purchase ${item.name} for ${item.price} coins?
            <br><br>
            <strong>${item.description}</strong>
        `;
        modal.style.display = 'flex';
        this.currentItem = item;
    }

    closeModal() {
        const modal = document.getElementById('purchase-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        this.currentItem = null;
    }

    completePurchase() {
        console.log('Completing purchase...', this.currentItem);
        if (!this.currentItem) {
            console.error('No item selected for purchase!');
            return;
        }

        if (this.coins >= this.currentItem.price) {
            // Deduct coins
            this.coins -= this.currentItem.price;
            this.updateCoinDisplay();
            
            // Save to localStorage
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            userData.coins = this.coins;
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Add to inventory
            this.addToInventory(this.currentItem);
            
            // Play success sound
            const purchaseSound = document.getElementById('purchase-sound');
            if (purchaseSound) {
                purchaseSound.play().catch(err => console.log('Could not play sound:', err));
            }
            
            this.showNotification(`Successfully purchased ${this.currentItem.name}!`, 'success');
        } else {
            // Play error sound
            const errorSound = document.getElementById('error-sound');
            if (errorSound) {
                errorSound.play().catch(err => console.log('Could not play sound:', err));
            }
            
            this.showNotification('Not enough coins!', 'error');
        }

        this.closeModal();
    }

    findItem(itemId) {
        // First check regular categories
        for (const category in this.shopItems) {
            if (Array.isArray(this.shopItems[category])) {
                const item = this.shopItems[category].find(item => item.id === itemId);
                if (item) return item;
            } else if (typeof this.shopItems[category] === 'object') {
                // Check nested categories (like avatars)
                for (const subcategory in this.shopItems[category]) {
                    const items = this.shopItems[category][subcategory];
                    if (Array.isArray(items)) {
                        const item = items.find(item => item.id === itemId);
                        if (item) return item;
                    }
                }
            }
        }
        return null;
    }

    addToInventory(item) {
        console.log('Adding item to inventory:', item);
        const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
        
        // Add purchase timestamp and ensure category is set
        const purchasedItem = {
            ...item,
            purchasedAt: new Date().toISOString()
        };
        
        inventory.push(purchasedItem);
        localStorage.setItem('inventory', JSON.stringify(inventory));
        
        // If it's an avatar, equip it automatically
        if (item.category === 'avatars') {
            console.log('Equipping new avatar:', item.imagePath);
            localStorage.setItem('currentAvatar', item.id);
            localStorage.setItem('currentAvatarPath', item.imagePath);
            this.updateProfileAvatar(item.imagePath);
            
            // Dispatch avatar equipped event
            const event = new CustomEvent('avatarEquipped', { 
                detail: { avatar: item }
            });
            window.dispatchEvent(event);
        }
    }

    loadCurrentAvatar() {
        // Try to load the current avatar from localStorage
        const currentAvatarPath = localStorage.getItem('currentAvatarPath');
        const defaultAvatarPath = 'theme/avatars/default.png';
        
        if (currentAvatarPath) {
            console.log('Loading saved avatar:', currentAvatarPath);
            this.updateProfileAvatar(currentAvatarPath);
        } else {
            console.log('Using default avatar');
            this.updateProfileAvatar(defaultAvatarPath);
        }
    }

    updateProfileAvatar(imagePath) {
        console.log('Updating profile avatar to:', imagePath);
        
        // Update all profile avatar images on the page
        const profileAvatars = document.querySelectorAll('.profile-avatar img, #profile-avatar');
        profileAvatars.forEach(avatar => {
            if (avatar) {
                avatar.src = imagePath;
                // Add error handling
                avatar.onerror = () => {
                    console.log('Failed to load avatar image, using default');
                    avatar.src = 'theme/avatars/default.png';
                };
            }
        });

        // Store the current avatar path
        localStorage.setItem('currentAvatarPath', imagePath);

        // Dispatch an event to notify other components
        const event = new CustomEvent('profileAvatarChanged', { 
            detail: { imagePath: imagePath }
        });
        window.dispatchEvent(event);
    }

    showNotification(message, type) {
        console.log('Showing notification:', message, type);
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    padding: 15px 25px;
                    border-radius: 10px;
                    color: white;
                    font-weight: 500;
                    z-index: 1000;
                    animation: slideIn 0.5s ease-out;
                }
                .notification.success {
                    background: var(--success-color, #48bb78);
                }
                .notification.error {
                    background: var(--danger-color, #f56565);
                }
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    onItemPurchased(item) {
        // Handle specific item effects
        switch(item.category) {
            case 'powerups':
                this.activatePowerup(item);
                break;
            case 'companions':
                this.equipCompanion(item);
                break;
            case 'themes':
                this.applyTheme(item);
                break;
            case 'avatars':
                this.equipAvatar(item);
                break;
        }
    }

    activatePowerup(powerup) {
        const activePowerups = JSON.parse(localStorage.getItem('activePowerups') || '[]');
        activePowerups.push({
            id: powerup.id,
            name: powerup.name,
            startTime: new Date().toISOString(),
            duration: this.getPowerupDuration(powerup)
        });
        localStorage.setItem('activePowerups', JSON.stringify(activePowerups));
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('powerupActivated', { detail: powerup }));
    }

    getPowerupDuration(powerup) {
        // Duration in minutes
        switch(powerup.id) {
            case 'timeBooster':
                return 30;
            case 'focusShield':
                return 60;
            case 'brainBoost':
                return 20;
            case 'streakProtector':
                return 1440; // 24 hours
            case 'doubleCoins':
                return 15;
            default:
                return 0;
        }
    }

    equipCompanion(companion) {
        localStorage.setItem('activeCompanion', JSON.stringify(companion));
        window.dispatchEvent(new CustomEvent('companionEquipped', { detail: companion }));
    }

    applyTheme(theme) {
        localStorage.setItem('currentTheme', theme.id);
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
    }

    equipAvatar(avatar) {
        localStorage.setItem('currentAvatar', avatar.id);
        window.dispatchEvent(new CustomEvent('avatarChanged', { detail: avatar }));
    }
}

// Initialize shop when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, initializing shop...');
    window.shop = new Shop();
});