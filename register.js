document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const errorMessage = document.getElementById("error-message");
    const avatarOptions = document.querySelectorAll(".avatar-option");
    const selectedAvatarInput = document.getElementById("selected-avatar");

    let selectedAvatar = {
        id: 'avatar1.jpg', // Default to first avatar
        path: document.querySelector('.avatar-option.selected img').src
    };

    // Handle avatar selection
    avatarOptions.forEach(option => {
        option.addEventListener("click", function() {
            // Remove selected class from all options
            avatarOptions.forEach(opt => opt.classList.remove("selected"));
            // Add selected class to clicked option
            this.classList.add("selected");
            // Update selected avatar
            selectedAvatar = {
                id: this.dataset.avatar,
                path: this.querySelector('img').src
            };
            // Update hidden input
            selectedAvatarInput.value = selectedAvatar.id;
        });
    });

    // Set initial selected avatar
    selectedAvatarInput.value = selectedAvatar.id;

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        errorMessage.style.display = "none";

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const educationLevel = document.getElementById("education-level").value;
        const selectedAvatar = selectedAvatarInput.value || 'default.png';

        if (password !== document.getElementById("confirm-password").value) {
            errorMessage.textContent = "Passwords do not match!";
            errorMessage.style.display = "block";
            return;
        }

        // Check if avatar is selected
        if (!selectedAvatar) {
            errorMessage.textContent = "Please select an avatar!";
            errorMessage.style.display = "block";
            return;
        }

        // Get selected subjects
        const subjects = getSubjectsForClass(parseInt(educationLevel));

        if (subjects.length === 0) {
            errorMessage.textContent = "Please select at least one subject!";
            errorMessage.style.display = "block";
            return;
        }

        const formData = new FormData(registerForm);
        
        // Add user data to localStorage
        const userData = {
            username,
            email,
            password,
            educationLevel: parseInt(educationLevel),
            avatar: selectedAvatar,
            avatarPath: selectedAvatar,
            level: 1,
            experience: 0,
            coins: 1000, // Starting coins
            subjects,
            studyGoals: formData.get("study-goals"),
            achievements: [],
            tasks: [],
            rank: "Novice",
            unlockedAnswers: [], // Track which special challenge answers have been unlocked
            inventory: [],
            createdAt: new Date().toISOString()
        };

        try {
            // Save user data
            localStorage.setItem("userData", JSON.stringify(userData));
            
            // Set initial avatar (will be overridden if shop avatar is equipped)
            localStorage.setItem("currentAvatar", selectedAvatar);
            localStorage.setItem("currentAvatarPath", selectedAvatar);
            localStorage.setItem("defaultAvatarPath", selectedAvatar); // Save default avatar separately

            // Redirect to dashboard
            window.location.href = "index.html";
        } catch (error) {
            errorMessage.textContent = "Error saving user data. Please try again.";
            errorMessage.style.display = "block";
            console.error("Registration error:", error);
        }
    });
});

function getSubjectsForClass(classLevel) {
    const subjects = {
        5: ['Mathematics', 'Science', 'English', 'Nepali', 'Social Studies'],
        6: ['Mathematics', 'Science', 'English', 'Nepali', 'Social Studies'],
        7: ['Mathematics', 'Science', 'English', 'Nepali', 'Social Studies'],
        8: ['Mathematics', 'Science', 'English', 'Nepali', 'Social Studies'],
        9: ['Mathematics', 'Science', 'English', 'Nepali', 'Social Studies', 'Computer Science'],
        10: ['Mathematics', 'Science', 'English', 'Nepali', 'Social Studies', 'Computer Science'],
        11: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'English'],
        12: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'English']
    };
    
    return subjects[classLevel] || [];
}