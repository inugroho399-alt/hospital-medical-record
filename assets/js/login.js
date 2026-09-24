/**
 * ============================================
 * HMRIS Login Page - JavaScript
 * Hospital Medical Record Information System
 * Version: 2.0.0 (with Account Lockout)
 * ============================================
 */

(function () {
    'use strict';

    // ==================== CONSTANTS ====================
    const MAX_ATTEMPTS = 3;
    const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 menit dalam milidetik

    const STORAGE_KEYS = {
        USERS: 'hmris_users',
        PATIENTS: 'hmris_patients',
        CURRENT_USER: 'hmris_currentUser',
        REMEMBER_ME: 'hmris_rememberMe',
        LOGIN_ATTEMPTS: 'hmris_login_attempts'
    };

    // Default accounts
    const DEFAULT_ACCOUNTS = [
        {
            id: 'USR-ADMIN-001',
            username: 'admin',
            email: 'admin@hmris.com',
            password: 'admin123',
            nama: 'Administrator',
            role: 'admin',
            photo: null,
            status: 'active',
            createdAt: new Date().toISOString()
        },
        {
            id: 'USR-DOCTOR-001',
            username: 'dokter',
            email: 'dokter@hmris.com',
            password: 'dokter123',
            nama: 'dr. Ahmad Fauzi',
            role: 'dokter',
            photo: null,
            status: 'active',
            createdAt: new Date().toISOString()
        },
        {
            id: 'USR-NURSE-001',
            username: 'perawat',
            email: 'perawat@hmris.com',
            password: 'perawat123',
            nama: 'Siti Nurhaliza, A.Md.Kep',
            role: 'perawat',
            photo: null,
            status: 'active',
            createdAt: new Date().toISOString()
        },
        {
            id: 'USR-STAFF-001',
            username: 'petugas',
            email: 'petugas@hmris.com',
            password: 'petugas123',
            nama: 'Budi Santoso',
            role: 'petugas',
            photo: null,
            status: 'active',
            createdAt: new Date().toISOString()
        }
    ];

    const ROLE_REDIRECTS = {
        admin: 'pages/dashboard/index.html',
        dokter: 'pages/dashboard/index.html',
        perawat: 'pages/dashboard/index.html',
        petugas: 'pages/dashboard/index.html',
        pasien: 'pages/dashboard/index.html'
    };

    // ==================== LOGIN ATTEMPTS MANAGER ====================
    const LoginAttempts = {
        getAttempts() {
            try {
                const data = localStorage.getItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
                return data ? JSON.parse(data) : {};
            } catch {
                return {};
            }
        },

        saveAttempts(attempts) {
            try {
                localStorage.setItem(STORAGE_KEYS.LOGIN_ATTEMPTS, JSON.stringify(attempts));
            } catch (e) {
                console.error('Failed to save attempts:', e);
            }
        },

        get(username) {
            const attempts = this.getAttempts();
            return attempts[username] || { count: 0, lastAttempt: null, blockedUntil: null };
        },

        isBlocked(username) {
            const attempt = this.get(username);
            if (!attempt.blockedUntil) return false;

            const now = Date.now();
            if (now >= attempt.blockedUntil) {
                // Auto-unlock
                this.reset(username);
                return false;
            }
            return true;
        },

        getRemainingTime(username) {
            const attempt = this.get(username);
            if (!attempt.blockedUntil) return 0;

            const remaining = attempt.blockedUntil - Date.now();
            return Math.max(0, remaining);
        },

        increment(username) {
            const attempts = this.getAttempts();
            const current = attempts[username] || { count: 0, lastAttempt: null, blockedUntil: null };

            current.count += 1;
            current.lastAttempt = Date.now();

            if (current.count >= MAX_ATTEMPTS) {
                current.blockedUntil = Date.now() + LOCKOUT_DURATION;
            }

            attempts[username] = current;
            this.saveAttempts(attempts);

            return current;
        },

        reset(username) {
            const attempts = this.getAttempts();
            delete attempts[username];
            this.saveAttempts(attempts);
        },

        getRemainingAttempts(username) {
            const attempt = this.get(username);
            return Math.max(0, MAX_ATTEMPTS - attempt.count);
        }
    };

    // ==================== DOM ELEMENTS ====================
    const form = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const btnSubmit = document.getElementById('btnSubmit');
    const demoAccounts = document.querySelectorAll('.demo-account');
    const blockedAlert = document.getElementById('blockedAlert');
    const warningAlert = document.getElementById('warningAlert');
    const warningMessage = document.getElementById('warningMessage');
    const remainingAttemptsEl = document.getElementById('remainingAttempts');
    const countdownMinutes = document.getElementById('countdownMinutes');
    const countdownSeconds = document.getElementById('countdownSeconds');

    let countdownInterval = null;

    // ==================== STORAGE HELPERS ====================
    function getFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    }

    function hashPassword(password) {
        let hash = 0;
        const salt = 'hmris_salt_2024';
        const saltedPassword = password + salt;
        for (let i = 0; i < saltedPassword.length; i++) {
            const char = saltedPassword.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return 'hashed_' + Math.abs(hash).toString(16);
    }

    // ==================== UI HELPERS ====================
    function showNotification(message, type = 'success') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const colors = { success: '#059669', error: '#DC2626', info: '#0D9488', warning: '#D97706' };
        const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icons[type]}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        notification.style.cssText = `
            position: fixed; top: 100px; right: 20px;
            padding: 16px 24px; background: ${colors[type]};
            color: white; border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.15);
            display: flex; align-items: center; gap: 12px;
            z-index: 10000; animation: slideInRight 0.3s ease;
            font-family: 'Poppins', sans-serif; font-size: 0.9rem; max-width: 400px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 4000);

        if (!document.getElementById('notif-styles')) {
            const style = document.createElement('style');
            style.id = 'notif-styles';
            style.textContent = `
                @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
                .notification-content { display: flex; align-items: center; gap: 10px; }
                .notification-close { background: rgba(255,255,255,0.2); border: none; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.7rem; }
                .notification-close:hover { background: rgba(255,255,255,0.4); }
            `;
            document.head.appendChild(style);
        }
    }

    function showError(fieldId, message) {
        const errorEl = document.getElementById(`error-${fieldId}`);
        const inputWrapper = document.getElementById(fieldId)?.closest('.input-with-icon');

        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }
        if (inputWrapper) inputWrapper.classList.add('error');
    }

    function clearError(fieldId) {
        const errorEl = document.getElementById(`error-${fieldId}`);
        const inputWrapper = document.getElementById(fieldId)?.closest('.input-with-icon');

        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('show');
        }
        if (inputWrapper) inputWrapper.classList.remove('error');
    }

    function resetSubmitButton() {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = '<i class="fas fa-sign-in-alt"></i> <span>Masuk</span>';
    }

    // ==================== BLOCKED UI ====================
    function showBlockedAlert(username) {
        blockedAlert.style.display = 'flex';
        warningAlert.style.display = 'none';
        form.classList.add('is-blocked');
        btnSubmit.disabled = true;

        startCountdown(username);
    }

    function hideBlockedAlert() {
        blockedAlert.style.display = 'none';
        form.classList.remove('is-blocked');
        btnSubmit.disabled = false;
        stopCountdown();
    }

    function showWarningAlert(remainingAttempts) {
        warningAlert.style.display = 'flex';
        blockedAlert.style.display = 'none';
        remainingAttemptsEl.textContent = remainingAttempts;
    }

    function hideWarningAlert() {
        warningAlert.style.display = 'none';
    }

    function hideAllAlerts() {
        hideBlockedAlert();
        hideWarningAlert();
    }

    function startCountdown(username) {
        stopCountdown();

        const updateCountdown = () => {
            const remaining = LoginAttempts.getRemainingTime(username);

            if (remaining <= 0) {
                // Auto-unlock
                hideBlockedAlert();
                showNotification('Akun Anda telah dibuka. Silakan coba login kembali.', 'success');
                return;
            }

            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);

            countdownMinutes.textContent = String(minutes).padStart(2, '0');
            countdownSeconds.textContent = String(seconds).padStart(2, '0');
        };

        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    function stopCountdown() {
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }

    // ==================== SEED DEFAULT ACCOUNTS ====================
    function seedDefaultAccounts() {
        const users = getFromStorage(STORAGE_KEYS.USERS) || [];
        const hasAdmin = users.some(u => u.username === 'admin');

        if (!hasAdmin) {
            DEFAULT_ACCOUNTS.forEach(account => {
                users.push({
                    ...account,
                    password: hashPassword(account.password)
                });
            });
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        }
    }

    // ==================== AUTHENTICATION ====================
    function authenticateUser(usernameOrEmail, password) {
        const users = getFromStorage(STORAGE_KEYS.USERS) || [];
        const patients = getFromStorage(STORAGE_KEYS.PATIENTS) || [];

        const input = usernameOrEmail.toLowerCase().trim();
        const hashedPassword = hashPassword(password);

        let user = users.find(u =>
            (u.username.toLowerCase() === input || u.email.toLowerCase() === input) &&
            u.password === hashedPassword &&
            u.status === 'active'
        );

        if (!user) {
            const patient = patients.find(p =>
                (p.username?.toLowerCase() === input || p.email?.toLowerCase() === input) &&
                p.password === hashedPassword &&
                p.status === 'active'
            );

            if (patient) {
                user = {
                    id: patient.id,
                    username: patient.username,
                    email: patient.email,
                    nama: patient.nama,
                    role: patient.role,
                    photo: patient.photo,
                    status: patient.status,
                    noRM: patient.noRM
                };
            }
        }

        return user || null;
    }

    // ==================== FORM HANDLING ====================
    function handleSubmit(e) {
        e.preventDefault();

        const username = usernameInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        // Validate inputs
        if (!username) {
            showError('username', 'Username atau email wajib diisi');
            return;
        }

        if (!password) {
            showError('password', 'Password wajib diisi');
            return;
        }

        // CHECK IF BLOCKED
        if (LoginAttempts.isBlocked(username)) {
            showBlockedAlert(username);
            showNotification('Akun Anda sedang diblokir. Harap tunggu.', 'error');
            form.classList.add('shake-hard');
            setTimeout(() => form.classList.remove('shake-hard'), 600);
            return;
        }

        // Show loading
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Memverifikasi...</span>';

        setTimeout(() => {
            try {
                const user = authenticateUser(username, password);

                if (user) {
                    // SUCCESS - Reset attempts & login
                    LoginAttempts.reset(username);
                    hideAllAlerts();
                    handleLoginSuccess(user);
                } else {
                    // FAILED - Increment attempts
                    const attemptData = LoginAttempts.increment(username);
                    handleLoginFailed(username, attemptData);
                }
            } catch (error) {
                console.error('Login error:', error);
                showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
                resetSubmitButton();
            }
        }, 1000);
    }

    function handleLoginSuccess(user) {
        const sessionData = {
            id: user.id,
            username: user.username,
            email: user.email,
            nama: user.nama,
            role: user.role,
            photo: user.photo,
            noRM: user.noRM || null,
            loginAt: new Date().toISOString()
        };

        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionData));

        if (rememberMeCheckbox.checked) {
            localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, JSON.stringify({ username: user.username }));
        } else {
            localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
        }

        const roleNames = {
            admin: 'Administrator',
            dokter: 'Dokter',
            perawat: 'Perawat',
            petugas: 'Petugas Rekam Medis',
            pasien: 'Pasien'
        };

        showNotification(`Login berhasil! Selamat datang, ${user.nama}. Role: ${roleNames[user.role]}`, 'success');

        setTimeout(() => {
            const redirectUrl = ROLE_REDIRECTS[user.role];
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        }, 1500);
    }

    function handleLoginFailed(username, attemptData) {
        const remaining = MAX_ATTEMPTS - attemptData.count;

        if (attemptData.blockedUntil) {
            // BLOCKED
            showBlockedAlert(username);
            showNotification(`Akun "${username}" telah diblokir selama 15 menit karena terlalu banyak percobaan gagal.`, 'error');
            form.classList.add('shake-hard');
            setTimeout(() => form.classList.remove('shake-hard'), 600);
        } else {
            // WARNING - Show remaining attempts
            showWarningAlert(remaining);

            const messages = {
                2: `Password salah. Anda memiliki 2 percobaan tersisa.`,
                1: `⚠️ PERINGATAN: Password salah. Hanya 1 percobaan tersisa sebelum akun diblokir!`
            };

            warningMessage.innerHTML = messages[remaining] || `Password salah. ${remaining} percobaan tersisa.`;

            showNotification(messages[remaining], remaining === 1 ? 'warning' : 'error');

            form.classList.add('shake');
            setTimeout(() => form.classList.remove('shake'), 500);
        }

        resetSubmitButton();
        passwordInput.value = '';
        passwordInput.focus();

        // Clear password error
        clearError('password');
        clearError('username');
    }

    // ==================== EVENT LISTENERS ====================
    function setupEventListeners() {
        // Toggle password
        togglePasswordBtn.addEventListener('click', function () {
            const icon = this.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });

        // Clear alerts on input change
        usernameInput.addEventListener('input', () => {
            clearError('username');
            const newUsername = usernameInput.value.trim().toLowerCase();

            // Check if new username is blocked
            if (newUsername && LoginAttempts.isBlocked(newUsername)) {
                showBlockedAlert(newUsername);
            } else {
                hideBlockedAlert();
            }
        });

        passwordInput.addEventListener('input', () => clearError('password'));

        // Enter key
        passwordInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit(e);
            }
        });

        usernameInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                passwordInput.focus();
            }
        });

        // Demo accounts
        demoAccounts.forEach(account => {
            account.addEventListener('click', function () {
                const code = this.querySelector('code').textContent;
                const [username, password] = code.split(' / ');

                // Check if demo account is blocked
                if (LoginAttempts.isBlocked(username.toLowerCase())) {
                    showBlockedAlert(username.toLowerCase());
                    showNotification('Akun demo ini sedang diblokir. Coba akun lain atau tunggu.', 'warning');
                    return;
                }

                usernameInput.value = username;
                passwordInput.value = password;
                clearError('username');
                clearError('password');
                hideAllAlerts();

                this.style.transform = 'scale(0.95)';
                setTimeout(() => { this.style.transform = ''; }, 150);

                const remaining = LoginAttempts.getRemainingAttempts(username.toLowerCase());
                if (remaining < MAX_ATTEMPTS) {
                    showWarningAlert(remaining);
                }

                showNotification(`Akun ${username} dipilih. Klik "Masuk" untuk login.`, 'success');
            });
        });

        // Form submit
        form.addEventListener('submit', handleSubmit);
    }

    // ==================== LOAD REMEMBERED USER ====================
    function loadRememberedUser() {
        const remembered = getFromStorage(STORAGE_KEYS.REMEMBER_ME);
        if (remembered && remembered.username) {
            usernameInput.value = remembered.username;
            rememberMeCheckbox.checked = true;

            // Check if remembered user is blocked
            if (LoginAttempts.isBlocked(remembered.username.toLowerCase())) {
                showBlockedAlert(remembered.username.toLowerCase());
            }
        }
    }

    // ==================== CHECK EXISTING SESSION ====================
    function checkExistingSession() {
        const currentUser = getFromStorage(STORAGE_KEYS.CURRENT_USER);
        if (currentUser && currentUser.status !== 'blocked') {
            showNotification('Anda sudah login. Mengalihkan ke dashboard...', 'success');
            setTimeout(() => {
                const redirectUrl = ROLE_REDIRECTS[currentUser.role];
                if (redirectUrl) window.location.href = redirectUrl;
            }, 1000);
        }
    }

    // ==================== INITIALIZE ====================
    function init() {
        seedDefaultAccounts();
        setupEventListeners();
        loadRememberedUser();
        checkExistingSession();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();