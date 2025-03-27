document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login');
    const signupForm = document.getElementById('signup');
    const showSignupLink = document.getElementById('showSignup');
    const showLoginLink = document.getElementById('showLogin');
    const loginContainer = document.getElementById('loginForm');
    const signupContainer = document.getElementById('signupForm');
    const signupPassword = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const signupEmail = document.getElementById('signupEmail');

    // Toggle between login and signup forms
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Password validation
    signupPassword.addEventListener('input', validatePassword);

    function validatePassword() {
        const password = signupPassword.value;
        const email = signupEmail.value;

        const rules = {
            length: password.length >= 8 && password.length <= 20,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
            noSpaces: !/\s/.test(password),
            notEmail: !password.includes(email)
        };

        Object.keys(rules).forEach(rule => {
            const ruleElement = document.getElementById(`${rule}Rule`);
            ruleElement.classList.toggle('valid', rules[rule]);
        });
    }

    // Form submissions (basic validation, replace with your backend logic)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Add login validation logic here
        alert('Logged in successfully !!!');

        // Add login validation logic here
        const isValidLogin = true; // Replace with actual validation logic
        if (isValidLogin) {
            // Redirect to the to-do page
            window.location.href = 'to-do/index.html';
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = signupEmail.value;
        const password = signupPassword.value;
        const confirmPasswordValue = confirmPassword.value;

        // Check if passwords match
        if (password !== confirmPasswordValue) {
            alert('Passwords do not match. Please try again.');
            return;
        }
        // Ensure all password rules are met
        const passwordRules = {
            length: password.length >= 8 && password.length <= 20,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
            noSpaces: !/\s/.test(password),
            notEmail: !password.includes(email)
        };

        const allRulesPassed = Object.values(passwordRules).every(rule => rule);

        if (!allRulesPassed) {
            alert('Please meet all password requirements!');
            return;
        }

        // Add signup validation logic here
        alert('Successfully Signed in !!!');

        // Add signup validation logic here
        const isValidSignup = true; // Replace with actual validation logic
        if (isValidSignup) {
            // Redirect to the to-do page
            window.location.href = 'to-do/index.html';
        } else {
            alert('Signup failed. Please try again.');
        }

        
    });
});