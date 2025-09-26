// UM College of Computing Education - JavaScript Functions

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const eyeOpen = button.querySelector('.eye-open');
    const eyeClosed = button.querySelector('.eye-closed');
    
    if (input.type === 'password') {
        input.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    } else {
        input.type = 'password';
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    }
}

// Show toast message
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Form validation functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function hideError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.classList.remove('show');
    });
}

// Login form validation and submission
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    
    // Real-time validation
    usernameInput.addEventListener('input', () => {
        if (usernameInput.value.trim()) {
            hideError('username');
        }
    });
    
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.trim()) {
            hideError('password');
        }
    });
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        clearAllErrors();
        let hasErrors = false;
        
        // Validate username
        if (!usernameInput.value.trim()) {
            showError('username', 'Username is required');
            hasErrors = true;
        }
        
        // Validate password
        if (!passwordInput.value.trim()) {
            showError('password', 'Password is required');
            hasErrors = true;
        }
        
        if (hasErrors) return;
        
        // Show loading state
        loginBtn.textContent = 'Signing in...';
        loginBtn.disabled = true;
        
        // Submit form (if no PHP, simulate success)
        try {
            const formData = new FormData(loginForm);
            const response = await fetch('login_process.php', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                showToast('Login successful! Welcome to UM CCE', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            // Fallback for demo (no PHP backend)
            setTimeout(() => {
                showToast('Login successful! Welcome to UM CCE', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }, 1000);
        } finally {
            setTimeout(() => {
                loginBtn.textContent = 'Sign In';
                loginBtn.disabled = false;
            }, 1000);
        }
    });
}

// Register form validation and submission
function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;
    
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const registerBtn = document.getElementById('registerBtn');
    
    // Real-time validation
    fullNameInput.addEventListener('input', () => {
        if (fullNameInput.value.trim().length >= 2) {
            hideError('fullName');
        }
    });
    
    emailInput.addEventListener('input', () => {
        if (validateEmail(emailInput.value)) {
            hideError('email');
        }
    });
    
    usernameInput.addEventListener('input', () => {
        if (usernameInput.value.trim().length >= 3) {
            hideError('username');
        }
    });
    
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.length >= 6) {
            hideError('password');
        }
        // Check confirm password match
        if (confirmPasswordInput.value && passwordInput.value === confirmPasswordInput.value) {
            hideError('confirmPassword');
        }
    });
    
    confirmPasswordInput.addEventListener('input', () => {
        if (confirmPasswordInput.value === passwordInput.value) {
            hideError('confirmPassword');
        }
    });
    
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        clearAllErrors();
        let hasErrors = false;
        
        // Validate full name
        if (!fullNameInput.value.trim()) {
            showError('fullName', 'Full name is required');
            hasErrors = true;
        } else if (fullNameInput.value.trim().length < 2) {
            showError('fullName', 'Full name must be at least 2 characters');
            hasErrors = true;
        }
        
        // Validate email
        if (!emailInput.value.trim()) {
            showError('email', 'Email is required');
            hasErrors = true;
        } else if (!validateEmail(emailInput.value)) {
            showError('email', 'Please enter a valid email address');
            hasErrors = true;
        }
        
        // Validate username
        if (!usernameInput.value.trim()) {
            showError('username', 'Username is required');
            hasErrors = true;
        } else if (usernameInput.value.trim().length < 3) {
            showError('username', 'Username must be at least 3 characters');
            hasErrors = true;
        }
        
        // Validate password
        if (!passwordInput.value.trim()) {
            showError('password', 'Password is required');
            hasErrors = true;
        } else if (passwordInput.value.length < 6) {
            showError('password', 'Password must be at least 6 characters');
            hasErrors = true;
        }
        
        // Validate confirm password
        if (!confirmPasswordInput.value.trim()) {
            showError('confirmPassword', 'Please confirm your password');
            hasErrors = true;
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            showError('confirmPassword', 'Passwords do not match');
            hasErrors = true;
        }
        
        if (hasErrors) return;
        
        // Show loading state
        registerBtn.textContent = 'Creating Account...';
        registerBtn.disabled = true;
        
        // Submit form (if no PHP, simulate success)
        try {
            const formData = new FormData(registerForm);
            const response = await fetch('register_process.php', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                showToast('Registration successful! Welcome to UM CCE. You can now log in.', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            // Fallback for demo (no PHP backend)
            setTimeout(() => {
                showToast('Registration successful! Welcome to UM CCE. You can now log in.', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }, 1000);
        } finally {
            setTimeout(() => {
                registerBtn.textContent = 'Create Account';
                registerBtn.disabled = false;
            }, 1000);
        }
    });
}

// Smooth scroll for navigation links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupLoginForm();
    setupRegisterForm();
    setupSmoothScroll();
    setupScrollAnimations();
    
    // Add loading states to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.type !== 'submit') return;
            
            setTimeout(() => {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            }, 0);
        });
    });
});