/**
 * ============================================
 * HMRIS Signup Page - JavaScript
 * Hospital Medical Record Information System
 * ============================================
 */

(function () {
    'use strict';

    // ==================== CONSTANTS ====================
    const STORAGE_KEYS = {
        USERS: 'hmris_users',
        PATIENTS: 'hmris_patients'
    };

    const VALIDATORS = {
        NIK: /^\d{16}$/,
        EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        PHONE: /^(\+62|62|0)[0-9]{9,13}$/,
        USERNAME: /^[a-zA-Z0-9_]{4,20}$/,
        PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        NAME: /^[a-zA-Z\s'.]{3,50}$/
    };

    // ==================== DOM ELEMENTS ====================
    const form = document.getElementById('signupForm');
    const photoInput = document.getElementById('photo');
    const photoPreview = document.getElementById('photoPreview');
    const btnUploadPhoto = document.getElementById('btnUploadPhoto');
    const btnRemovePhoto = document.getElementById('btnRemovePhoto');
    const noRMInput = document.getElementById('noRM');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const strengthBar = passwordStrength.querySelector('.strength-bar');
    const btnSubmit = document.getElementById('btnSubmit');

    let photoData = null; // Store base64 image

    // ==================== INITIALIZE ====================
    function init() {
        generateNoRM();
        setupEventListeners();
        setMaxDate();
    }

    // Set max date for birthdate (today)
    function setMaxDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('tanggalLahir').setAttribute('max', today);
    }

    // ==================== GENERATE NOMOR RM ====================
    function generateNoRM() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        // Get count of patients today for sequence
        const patients = getFromStorage(STORAGE_KEYS.PATIENTS) || [];
        const todayPrefix = `RM-${year}${month}${day}`;
        const todayCount = patients.filter(p => p.noRM.startsWith(todayPrefix)).length;
        const sequence = String(todayCount + 1).padStart(3, '0');

        noRMInput.value = `${todayPrefix}-${sequence}`;
    }

    // ==================== EVENT LISTENERS ====================
    function setupEventListeners() {
        // Photo upload
        btnUploadPhoto.addEventListener('click', () => photoInput.click());
        photoPreview.addEventListener('click', () => photoInput.click());
        photoInput.addEventListener('change', handlePhotoUpload);
        btnRemovePhoto.addEventListener('click', removePhoto);

        // Toggle password visibilitykk 11
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', function () {
                const targetId = this.getAttribute('data-target');
                const input = document.getElementById(targetId);
                const icon = this.querySelector('i');

                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });

        // Password strength meter
        passwordInput.addEventListener('input', checkPasswordStrength);

        // Real-time validation on blur
        const fieldsToValidate = ['nik', 'nama', 'tempatLahir', 'tanggalLahir', 'alamat', 'noHP', 'email', 'username', 'password', 'confirmPassword'];
        fieldsToValidate.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => validateField(fieldId));
                field.addEventListener('input', () => {
                    // Clear error on input
                    clearError(fieldId);
                });
            }
        });

        // Radio validation
        document.querySelectorAll('input[name="jenisKelamin"]').forEach(radio => {
            radio.addEventListener('change', () => clearError('jenisKelamin'));
        });

        // Select validation
        document.getElementById('golonganDarah').addEventListener('change', () => clearError('golonganDarah'));

        // Checkbox validation
        document.getElementById('terms').addEventListener('change', () => clearError('terms'));

        // Form submit
        form.addEventListener('submit', handleSubmit);
    }

    // ==================== PHOTO HANDLING ====================
    function handlePhotoUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            showNotification('Format foto harus JPG atau PNG!', 'error');
            photoInput.value = '';
            return;
        }

        // Validate file size (max 2MB)
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            showNotification('Ukuran foto maksimal 2MB!', 'error');
            photoInput.value = '';
            return;
        }

        // Read file as base64
        const reader = new FileReader();
        reader.onload = function (event) {
            photoData = event.target.result;
            photoPreview.innerHTML = `<img src="${photoData}" alt="Preview">`;
            photoPreview.classList.add('has-image');
            btnRemovePhoto.style.display = 'inline-flex';
        };
        reader.readAsDataURL(file);
    }

    function removePhoto() {
        photoData = null;
        photoInput.value = '';
        photoPreview.innerHTML = `
            <i class="fas fa-camera"></i>
            <span>Upload Foto</span>
        `;
        photoPreview.classList.remove('has-image');
        btnRemovePhoto.style.display = 'none';
    }

    // ==================== PASSWORD STRENGTH ====================
    function checkPasswordStrength() {
        const password = passwordInput.value;

        if (!password) {
            passwordStrength.classList.remove('active');
            strengthBar.className = 'strength-bar';
            return;
        }

        passwordStrength.classList.add('active');

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        strengthBar.className = 'strength-bar';
        if (strength <= 1) {
            strengthBar.classList.add('weak');
        } else if (strength <= 2) {
            strengthBar.classList.add('medium');
        } else {
            strengthBar.classList.add('strong');
        }
    }

    // ==================== VALIDATION ====================
    function validateField(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return true;

        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (fieldId) {
            case 'nik':
                if (!value) {
                    errorMessage = 'NIK wajib diisi';
                    isValid = false;
                } else if (!VALIDATORS.NIK.test(value)) {
                    errorMessage = 'NIK harus 16 digit angka';
                    isValid = false;
                }
                break;

            case 'nama':
                if (!value) {
                    errorMessage = 'Nama wajib diisi';
                    isValid = false;
                } else if (!VALIDATORS.NAME.test(value)) {
                    errorMessage = 'Nama minimal 3 karakter, hanya huruf';
                    isValid = false;
                }
                break;

            case 'tempatLahir':
                if (!value) {
                    errorMessage = 'Tempat lahir wajib diisi';
                    isValid = false;
                } else if (value.length < 3) {
                    errorMessage = 'Tempat lahir minimal 3 karakter';
                    isValid = false;
                }
                break;

            case 'tanggalLahir':
                if (!value) {
                    errorMessage = 'Tanggal lahir wajib diisi';
                    isValid = false;
                } else {
                    const birthDate = new Date(value);
                    const today = new Date();
                    if (birthDate > today) {
                        errorMessage = 'Tanggal lahir tidak valid';
                        isValid = false;
                    }
                }
                break;

            case 'alamat':
                if (!value) {
                    errorMessage = 'Alamat wajib diisi';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Alamat minimal 10 karakter';
                    isValid = false;
                }
                break;

            case 'noHP':
                if (!value) {
                    errorMessage = 'Nomor HP wajib diisi';
                    isValid = false;
                } else if (!VALIDATORS.PHONE.test(value)) {
                    errorMessage = 'Format nomor HP tidak valid (contoh: 08123456789)';
                    isValid = false;
                }
                break;

            case 'email':
                if (!value) {
                    errorMessage = 'Email wajib diisi';
                    isValid = false;
                } else if (!VALIDATORS.EMAIL.test(value)) {
                    errorMessage = 'Format email tidak valid';
                    isValid = false;
                } else {
                    // Check duplicate email
                    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
                    if (users.some(u => u.email.toLowerCase() === value.toLowerCase())) {
                        errorMessage = 'Email sudah terdaftar';
                        isValid = false;
                    }
                }
                break;

            case 'username':
                if (!value) {
                    errorMessage = 'Username wajib diisi';
                    isValid = false;
                } else if (!VALIDATORS.USERNAME.test(value)) {
                    errorMessage = 'Username 4-20 karakter, hanya huruf, angka, underscore';
                    isValid = false;
                } else {
                    // Check duplicate username
                    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
                    if (users.some(u => u.username.toLowerCase() === value.toLowerCase())) {
                        errorMessage = 'Username sudah digunakan';
                        isValid = false;
                    }
                }
                break;

            case 'password':
                if (!value) {
                    errorMessage = 'Password wajib diisi';
                    isValid = false;
                } else if (value.length < 8) {
                    errorMessage = 'Password minimal 8 karakter';
                    isValid = false;
                } else if (!VALIDATORS.PASSWORD.test(value)) {
                    errorMessage = 'Password harus mengandung huruf besar, kecil, dan angka';
                    isValid = false;
                }
                break;

            case 'confirmPassword':
                if (!value) {
                    errorMessage = 'Konfirmasi password wajib diisi';
                    isValid = false;
                } else if (value !== passwordInput.value) {
                    errorMessage = 'Password tidak cocok';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            showError(fieldId, errorMessage);
        } else {
            clearError(fieldId);
        }

        return isValid;
    }

    function validateRadioGroup(name) {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        if (!selected) {
            showError(name, 'Jenis kelamin wajib dipilih');
            return false;
        }
        clearError(name);
        return true;
    }

    function validateSelect(id) {
        const field = document.getElementById(id);
        if (!field.value) {
            showError(id, 'Golongan darah wajib dipilih');
            return false;
        }
        clearError(id);
        return true;
    }

    function validateCheckbox(id) {
        const field = document.getElementById(id);
        if (!field.checked) {
            showError(id, 'Anda harus menyetujui syarat & ketentuan');
            return false;
        }
        clearError(id);
        return true;
    }

    function showError(fieldId, message) {
        const errorEl = document.getElementById(`error-${fieldId}`);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }

        // Add error class to input
        const field = document.getElementById(fieldId);
        if (field && (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA' || field.tagName === 'SELECT')) {
            field.style.borderColor = 'var(--accent-red)';
        }
    }

    function clearError(fieldId) {
        const errorEl = document.getElementById(`error-${fieldId}`);
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('show');
        }

        const field = document.getElementById(fieldId);
        if (field && (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA' || field.tagName === 'SELECT')) {
            field.style.borderColor = '';
        }
    }

    // ==================== FORM SUBMIT ====================
    function handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;

        const fieldsToValidate = ['nik', 'nama', 'tempatLahir', 'tanggalLahir', 'alamat', 'noHP', 'email', 'username', 'password', 'confirmPassword'];
        fieldsToValidate.forEach(fieldId => {
            if (!validateField(fieldId)) {
                isValid = false;
            }
        });

        if (!validateRadioGroup('jenisKelamin')) isValid = false;
        if (!validateSelect('golonganDarah')) isValid = false;
        if (!validateCheckbox('terms')) isValid = false;

        if (!isValid) {
            showNotification('Mohon lengkapi semua data dengan benar!', 'error');
            // Scroll to first error
            const firstError = document.querySelector('.error-message.show');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Disable submit button
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Memproses...</span>';

        // Simulate processing delay
        setTimeout(() => {
            try {
                // Collect form data
                const formData = collectFormData();

                // Save to LocalStorage
                saveToStorage(formData);

                // Show success notification
                showNotification('Registrasi berhasil! Silakan login dengan akun Anda.', 'success');

                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);

            } catch (error) {
                console.error('Error saving data:', error);
                showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = '<i class="fas fa-user-plus"></i> <span>Daftar Sekarang</span>';
            }
        }, 1500);
    }

    // ==================== COLLECT FORM DATA ====================
    function collectFormData() {
        const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked').value;

        return {
            id: generateId(),
            noRM: noRMInput.value,
            nik: document.getElementById('nik').value.trim(),
            nama: document.getElementById('nama').value.trim(),
            tempatLahir: document.getElementById('tempatLahir').value.trim(),
            tanggalLahir: document.getElementById('tanggalLahir').value,
            jenisKelamin: jenisKelamin,
            golonganDarah: document.getElementById('golonganDarah').value,
            alamat: document.getElementById('alamat').value.trim(),
            noHP: document.getElementById('noHP').value.trim(),
            email: document.getElementById('email').value.trim().toLowerCase(),
            username: document.getElementById('username').value.trim().toLowerCase(),
            password: hashPassword(document.getElementById('password').value),
            photo: photoData,
            role: 'pasien',
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    // ==================== LOCAL STORAGE ====================
    function getFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading from storage:', error);
            return null;
        }
    }

    function saveToStorage(formData) {
        // Save to users collection
        const users = getFromStorage(STORAGE_KEYS.USERS) || [];
        const userData = {
            id: formData.id,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            photo: formData.photo,
            status: formData.status,
            createdAt: formData.createdAt
        };
        users.push(userData);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

        // Save to patients collection
        const patients = getFromStorage(STORAGE_KEYS.PATIENTS) || [];
        patients.push(formData);
        localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    }

    // ==================== UTILITIES ====================
    function generateId() {
        return 'USR-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    function hashPassword(password) {
        // Simple hash for demo purposes (NOT for production!)
        // In production, use bcrypt or similar
        let hash = 0;
        const salt = 'hmris_salt_2024';
        const saltedPassword = password + salt;

        for (let i = 0; i < saltedPassword.length; i++) {
            const char = saltedPassword.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }

        return 'hashed_' + Math.abs(hash).toString(16);
    }

    // ==================== NOTIFICATION SYSTEM ====================
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add styles dynamically
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#059669' : '#DC2626'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            font-family: 'Poppins', sans-serif;
            font-size: 0.9rem;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 4000);
    }

    // Add notification animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification-close {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 0.7rem;
            transition: 0.2s ease;
        }
        .notification-close:hover {
            background: rgba(255,255,255,0.4);
        }
    `;
    document.head.appendChild(style);

    // ==================== INITIALIZE ON LOAD ====================
    init();

})();