class Inventory {
    constructor() {
        console.log('Initializing inventory...');
        this.currentCategory = 'all';
        this.inventory = [];
        
        // Initialize default avatars
        this.initializeDefaultAvatars();
        
        this.initializeEventListeners();
        this.loadUserData();
        this.displayItems('all');
    }

    initializeEventListeners() {
        console.log('Setting up event listeners...');
        
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => {
                console.log('Category clicked:', button.dataset.category);
                this.switchCategory(button.dataset.category);
            });
        });
    }

    loadUserData() {
        console.log('Loading user data...');
        // Load inventory
        this.inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
        
        // Load coins
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        this.coins = userData.coins || 0;
        this.updateCoinDisplay();
        
        // Load level
        this.level = userData.level || 1;
        this.updateLevelDisplay();

        // Load current avatar
        this.currentAvatar = localStorage.getItem('currentAvatar');
        this.updateProfileAvatar();
        
        console.log('Loaded inventory items:', this.inventory.length);
    }

    updateCoinDisplay() {
        const coinBalance = document.getElementById('coin-balance');
        if (coinBalance) {
            coinBalance.textContent = this.coins;
        }
    }

    updateLevelDisplay() {
        const levelDisplay = document.getElementById('level-display');
        if (levelDisplay) {
            levelDisplay.textContent = `Level ${this.level}`;
        }
    }

    updateProfileAvatar() {
        const avatarPath = localStorage.getItem('currentAvatarPath');
        if (avatarPath) {
            // Update all profile avatar images
            document.querySelectorAll('.profile-avatar img').forEach(avatar => {
                avatar.src = avatarPath;
            });
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
        const container = document.getElementById('inventory-items');
        if (!container) {
            console.error('Inventory items container not found!');
            return;
        }

        container.innerHTML = '';
        let items = this.inventory.filter(item => item.category === category);

        if (items.length === 0) {
            container.innerHTML = `
                <div class="empty-message">
                    <i class="fas fa-box-open"></i>
                    <p>No items found in this category</p>
                    <p>Visit the shop to get some items!</p>
                </div>
            `;
            return;
        }

        items.forEach(item => {
            const isActive = this.isItemActive(item);
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';

            // Special handling for avatars
            const imageContent = item.category === 'avatars'
                ? `<div class="avatar-image ${isActive ? 'active' : ''}">
                     <img src="${item.imagePath}" alt="${item.name}" onerror="this.src='default-avatar.png'">
                   </div>`
                : `<div class="item-image">
                     <i class="fas ${item.icon}"></i>
                   </div>`;

            itemElement.innerHTML = `
                <span class="rarity-badge rarity-${item.rarity}">${item.rarity}</span>
                ${isActive ? '<span class="active-indicator">Active</span>' : ''}
                ${imageContent}
                <h3 class="item-name">${item.name}</h3>
                <p class="item-description">${item.description}</p>
                <div class="item-status">
                    Purchased: ${new Date(item.purchasedAt).toLocaleDateString()}
                </div>
                <div class="equip-overlay">
                    <button class="use-btn" onclick="inventory.useItem('${item.id}')">
                        ${this.getButtonText(item, isActive)}
                    </button>
                </div>
            `;
            container.appendChild(itemElement);
        });
    }

    isItemActive(item) {
        switch(item.category) {
            case 'powerups':
                const activePowerups = JSON.parse(localStorage.getItem('activePowerups') || '[]');
                return activePowerups.some(p => p.id === item.id);
            case 'companions':
                const activeCompanion = localStorage.getItem('activeCompanion');
                return activeCompanion === item.id;
            case 'themes':
                const currentTheme = localStorage.getItem('currentTheme');
                return currentTheme === item.id;
            case 'avatars':
                return this.currentAvatar === item.id;
            default:
                return false;
        }
    }

    canUseItem(item) {
        return true; // All items can be used in inventory
    }

    getButtonText(item, isActive) {
        if (isActive) {
            switch(item.category) {
                case 'powerups':
                    return 'Active';
                case 'companions':
                    return 'Unequip';
                case 'themes':
                    return 'Current Theme';
                case 'avatars':
                    return 'Current Avatar';
                default:
                    return 'Active';
            }
        } else {
            switch(item.category) {
                case 'powerups':
                    return 'Activate';
                case 'companions':
                    return 'Equip';
                case 'themes':
                    return 'Apply Theme';
                case 'avatars':
                    return 'Use Avatar';
                default:
                    return 'Use';
            }
        }
    }

    useItem(itemId) {
        console.log('Using item:', itemId);
        const item = this.inventory.find(i => i.id === itemId);
        if (!item) {
            console.error('Item not found:', itemId);
            return;
        }

        switch(item.category) {
            case 'powerups':
                this.activatePowerup(item);
                break;
            case 'companions':
                this.toggleCompanion(item);
                break;
            case 'themes':
                this.applyTheme(item);
                break;
            case 'avatars':
                this.equipAvatar(item);
                break;
        }

        // Refresh display
        this.displayItems(this.currentCategory);
    }

    equipAvatar(avatar) {
        this.currentAvatar = avatar.id;
        localStorage.setItem('currentAvatar', avatar.id);
        localStorage.setItem('currentAvatarPath', avatar.imagePath);
        
        // Update all profile avatars across pages
        this.updateProfileAvatar();
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('avatarChanged', { 
            detail: { id: avatar.id, path: avatar.imagePath }
        }));
        
        this.showNotification(`Avatar "${avatar.name}" equipped!`, 'success');
        
        // Refresh the display to update active states
        this.displayItems(this.currentCategory);
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

    initializeDefaultAvatars() {
        const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
        const defaultAvatars = [
            {
                id: 'defaultAvatar1',
                name: 'Default Avatar 1',
                description: 'Your first avatar',
                category: 'avatars',
                rarity: 'common',
                imagePath: 'theme/avatars/avatar1.jpg',
                isDefault: true
            },
            {
                id: 'defaultAvatar2',
                name: 'Default Avatar 2',
                description: 'Your second avatar',
                category: 'avatars',
                rarity: 'common',
                imagePath: 'theme/avatars/avatar2.jpg',
                isDefault: true
            }
        ];

        // Add default avatars if they don't exist
        let updated = false;
        defaultAvatars.forEach(avatar => {
            if (!inventory.some(item => item.id === avatar.id)) {
                inventory.push(avatar);
                updated = true;
            }
        });

        if (updated) {
            localStorage.setItem('inventory', JSON.stringify(inventory));
        }
    }
}

// Initialize inventory when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, initializing inventory...');
    window.inventory = new Inventory();
}); 