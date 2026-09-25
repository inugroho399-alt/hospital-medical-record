/**
 * ============================================
 * HMRIS Pengaturan - JavaScript (Modular)
 * ============================================
 */

(function () {
    'use strict';

    // ==================== STORAGE MANAGER ====================
    const Storage = {
        KEYS: {
            USERS: 'hmris_users',
            PATIENTS: 'hmris_patients',
            DOCTORS: 'hmris_doctors',
            RECORDS: 'hmris_records',
            APPOINTMENTS: 'hmris_appointments',
            LABORATORY: 'hmris_laboratory',
            MEDICINES: 'hmris_medicines',
            CURRENT_USER: 'hmris_currentUser',
            HOSPITAL: 'hmris_hospital',
            SETTINGS: 'hmris_settings',
            LAST_BACKUP: 'hmris_last_backup'
        },

        get(key) {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : null;
            } catch (error) {
                console.error('Storage read error:', error);
                return null;
            }
        },

        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('Storage write error:', error);
                return false;
            }
        },

        remove(key) {
            localStorage.removeItem(key);
        },

        clear() {
            localStorage.clear();
        },

        getUsedSpace() {
            let total = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    total += localStorage[key].length + key.length;
                }
            }
            return total;
        }
    };

    // ==================== ROLE CONFIG ====================
    const ROLE_CONFIG = {
    admin: {
        name: 'Administrator',
        icon: 'fa-user-shield',
        menus: [
            { category: 'Utama' },
            { name: 'Dashboard', icon: 'fa-th-large', href: 'dashboard/index.html' },
            { category: 'Manajemen' },
            { name: 'Data Pasien', icon: 'fa-users', href: 'pasien.html', },
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html' },
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' },
            { name: 'Data Perawat', icon: 'fa-user-nurse', href: '#' },
            { name: 'Petugas RM', icon: 'fa-user-tie', href: '#' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' },
            { name: 'Farmasi', icon: 'fa-capsules', href: 'farmasi.html' },
            { name: 'Laboratorium', icon: 'fa-flask', href: 'laboratorium.html' },
            { name: 'Laporan', icon: 'fa-chart-bar', href: 'laporan.html' },
            { name: 'Pengaturan', icon: 'fa-cog', href: 'pengaturan.html' , active: true}
        ]
    },
    dokter: {
        name: 'Dokter',
        icon: 'fa-user-md',
        menus: [
            { category: 'Utama' },
            { name: 'Dashboard', icon: 'fa-th-large', href: 'dashboard/index.html' },
            { category: 'Pelayanan' },
            { name: 'Data Pasien', icon: 'fa-users', href: 'pasien.html' },
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html' },
            { name: 'Resep Obat', icon: 'fa-pills', href: '#' },
            { category: 'Jadwal' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' },
            { name: 'Jadwal Praktik', icon: 'fa-calendar-alt', href: '#' },
            { name: 'Antrian Hari Ini', icon: 'fa-list-ol', href: '#' },
            { category: 'Lainnya' },
            { name: 'Laporan Saya', icon: 'fa-chart-line', href: 'laporan.html' },
            { name: 'Pengaturan', icon: 'fa-cog', href: 'pengaturan.html' , active: true}
        ]
    },
    perawat: {
        name: 'Perawat',
        icon: 'fa-user-nurse',
        menus: [
            { category: 'Utama' },
            { name: 'Dashboard', icon: 'fa-th-large', href: 'dashboard/index.html' },
            { category: 'Pelayanan' },
            { name: 'Data Pasien', icon: 'fa-users', href: 'pasien.html' },
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html' },
            { name: 'Antrian', icon: 'fa-list-ol', href: '#' },
            { name: 'Tindakan Medis', icon: 'fa-stethoscope', href: '#' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' },
            { name: 'Jadwal Shift', icon: 'fa-calendar-alt', href: '#' },
            { name: 'Tanda Vital', icon: 'fa-heartbeat', href: '#' },
            { name: 'Pengaturan', icon: 'fa-cog', href: 'pengaturan.html', active: true }
        ]
    },
    petugas: {
        name: 'Petugas RM',
        icon: 'fa-user-tie',
        menus: [
            { category: 'Utama' },
            { name: 'Dashboard', icon: 'fa-th-large', href: 'dashboard/index.html' },
            { category: 'Rekam Medis' },
            { name: 'Data Pasien', icon: 'fa-users', href: 'pasien.html' },
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html' },
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' },
            { name: 'Laboratorium', icon: 'fa-flask', href: 'laboratorium.html' },
            { name: 'Laporan Harian', icon: 'fa-file-alt', href: 'laporan.html' },
            { name: 'Pengaturan', icon: 'fa-cog', href: 'pengaturan.html' , active: true}
        ]
    },
    pasien: {
        name: 'Pasien',
        icon: 'fa-user-injured',
        menus: [
            { category: 'Utama' },
            { name: 'Dashboard', icon: 'fa-th-large', href: 'dashboard/index.html' },
            { category: 'Layanan Saya' },
            { name: 'Rekam Medis Saya', icon: 'fa-file-medical', href: 'rekam-medis.html' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' },
            { name: 'Hasil Lab Saya', icon: 'fa-flask', href: 'laboratorium.html' },
            { name: 'Antrian Saya', icon: 'fa-list-ol', href: '#' },
            { name: 'Resep Obat', icon: 'fa-pills', href: 'farmasi.html' },
            { category: 'Lainnya' },
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' },
            { name: 'Laporan Medis', icon: 'fa-file-download', href: 'laporan.html' },
            { name: 'Pengaturan', icon: 'fa-cog', href: 'pengaturan.html', active: true }
        ]
    }
};

    // ==================== UI MANAGER ====================
    const UI = {
        showToast(message, type = 'success') {
            // Check if toast is enabled
            const settings = Storage.get(Storage.KEYS.SETTINGS);
            if (settings && settings.toastEnabled === false) return;

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
                <button class="notification-close"><i class="fas fa-times"></i></button>
            `;

            notification.style.cssText = `
                position: fixed; top: 90px; right: 20px;
                padding: 16px 24px; background: ${colors[type]};
                color: white; border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                display: flex; align-items: center; gap: 12px;
                z-index: 10000; animation: slideInRight 0.3s ease;
                font-family: 'Poppins', sans-serif; font-size: 0.9rem; max-width: 400px;
            `;

            document.body.appendChild(notification);
            notification.querySelector('.notification-close').addEventListener('click', () => notification.remove());

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
        },

        showModal(id) {
            document.getElementById(id).classList.add('active');
            document.body.style.overflow = 'hidden';
        },

        hideModal(id) {
            document.getElementById(id).classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // ==================== SETTINGS MANAGER ====================
    class SettingsManager {
        constructor() {
            this.currentUser = null;
            this.hospitalData = null;
            this.settings = null;
            this.logoData = null;
            this.restoreFileData = null;

            this.init();
        }

        init() {
            if (!this.checkAuth()) return;

            this.loadUserData();
            this.renderSidebar();
            this.loadHospitalData();
            this.loadSettings();
            this.loadProfile();
            this.bindEvents();
            this.updateBackupInfo();
            this.updateSystemInfo();
        }

        checkAuth() {
            const user = Storage.get(Storage.KEYS.CURRENT_USER);
            if (!user) {
                UI.showToast('Silakan login terlebih dahulu!', 'error');
                setTimeout(() => { window.location.href = '../login.html'; }, 1000);
                return false;
            }
            this.currentUser = user;
            return true;
        }

        loadUserData() {
            const role = this.currentUser.role;
            const config = ROLE_CONFIG[role] || ROLE_CONFIG.admin;

            document.getElementById('userName').textContent = this.currentUser.nama || this.currentUser.username;
            document.getElementById('userRole').textContent = config.name;
            document.getElementById('dropdownName').textContent = this.currentUser.nama || this.currentUser.username;
            document.getElementById('dropdownEmail').textContent = this.currentUser.email || 'user@hmris.com';
            document.getElementById('roleBadgeText').textContent = config.name;
            document.getElementById('roleBadge').querySelector('i').className = `fas ${config.icon}`;

            const avatar = document.getElementById('userAvatar');
            const dropdownAvatar = document.querySelector('.dropdown-avatar');
            if (this.currentUser.photo) {
                avatar.innerHTML = `<img src="${this.currentUser.photo}" alt="Avatar">`;
                dropdownAvatar.innerHTML = `<img src="${this.currentUser.photo}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
            } else {
                avatar.innerHTML = `<i class="fas ${config.icon}"></i>`;
                dropdownAvatar.innerHTML = `<i class="fas ${config.icon}"></i>`;
            }
        }

        renderSidebar() {
    const role = (this.currentUser.role || '').toLowerCase();
    const config = ROLE_CONFIG[role] || ROLE_CONFIG.admin;
    const navList = document.getElementById('navList');
    navList.innerHTML = '';

    console.log('📋 Rendering sidebar for role:', role);

    config.menus.forEach(item => {
        if (item.category) {
            // Category header
            const el = document.createElement('li');
            el.className = 'nav-category';
            el.textContent = item.category;
            navList.appendChild(el);
        } else {
            // Menu item
            const menuItem = document.createElement('li');
            menuItem.className = 'nav-item';

            const link = document.createElement('a');
            link.href = item.href || '#';
            link.className = 'nav-link' + (item.active ? ' active' : '');
            
            // ✅ SIMPAN DATA PENTING DI DATASET
            link.dataset.menuName = item.name;
            link.dataset.href = item.href || '#';
            
            link.innerHTML = `
                <i class="fas ${item.icon}"></i>
                <span>${item.name}</span>
                ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
            `;

            // ✅ EVENT LISTENER DENGAN NAVIGASI LANGSUNG
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Ambil href dari berbagai sumber (fallback)
                const href = link.dataset.href || link.getAttribute('href') || item.href || '#';
                const menuName = item.name;

                console.log('🖱️ Menu clicked:', menuName, '| href:', href);

                // ✅ VALIDASI HREF
                const isValidHref = href && 
                                   href !== '#' && 
                                   href !== '' && 
                                   href !== 'undefined' && 
                                   href !== 'null' &&
                                   href.trim() !== '';

                if (isValidHref) {
                    console.log('🚀 Navigating to:', href);
                    
                    // Tampilkan toast info
                    if (typeof UI !== 'undefined' && UI.showToast) {
                        UI.showToast(`Mengalihkan ke ${menuName}...`, 'info');
                    }
                    
                    // ✅ LANGSUNG NAVIGASI
                    setTimeout(() => {
                        window.location.href = href;
                    }, 100);
                    return;
                }

                // Jika href tidak valid, tampilkan "akan segera hadir"
                console.log('⏸️ No valid href, showing coming soon toast');
                if (typeof UI !== 'undefined' && UI.showToast) {
                    UI.showToast(`Halaman "${menuName}" akan segera hadir!`, 'info');
                }
            });

            menuItem.appendChild(link);
            navList.appendChild(menuItem);
        }
    });

    console.log('✅ Sidebar rendered successfully');
}

        loadHospitalData() {
            this.hospitalData = Storage.get(Storage.KEYS.HOSPITAL) || {
                nama: 'Rumah Sakit HMRIS',
                alamat: 'Jl. Kesehatan No. 123, Jakarta',
                telepon: '(021) 1234-5678',
                email: 'info@hmris.co.id',
                website: 'https://www.hmris.co.id',
                izin: 'IZIN-2024-001',
                logo: null
            };

            document.getElementById('rsNama').value = this.hospitalData.nama || '';
            document.getElementById('rsAlamat').value = this.hospitalData.alamat || '';
            document.getElementById('rsTelepon').value = this.hospitalData.telepon || '';
            document.getElementById('rsEmail').value = this.hospitalData.email || '';
            document.getElementById('rsWebsite').value = this.hospitalData.website || '';
            document.getElementById('rsIzin').value = this.hospitalData.izin || '';

            if (this.hospitalData.logo) {
                this.logoData = this.hospitalData.logo;
                const preview = document.getElementById('logoPreview');
                preview.innerHTML = `<img src="${this.logoData}" alt="Logo">`;
                preview.classList.add('has-image');
            }
        }

        loadSettings() {
            this.settings = Storage.get(Storage.KEYS.SETTINGS) || {
                theme: 'light',
                animationEnabled: true,
                toastEnabled: true,
                compactSidebar: false
            };

            // Apply theme
            if (this.settings.theme === 'dark') {
                document.body.classList.add('dark-mode');
                document.getElementById('themeDark').checked = true;
            } else {
                document.getElementById('themeLight').checked = true;
            }

            // Apply toggles
            document.getElementById('toggleAnimation').checked = this.settings.animationEnabled !== false;
            document.getElementById('toggleToast').checked = this.settings.toastEnabled !== false;
            document.getElementById('toggleCompact').checked = this.settings.compactSidebar === true;

            if (this.settings.animationEnabled === false) {
                document.body.classList.add('no-animation');
            }
        }

        loadProfile() {
            const users = Storage.get(Storage.KEYS.USERS) || [];
            const user = users.find(u => u.id === this.currentUser.id);
            if (!user) return;

            document.getElementById('profileNama').value = user.nama || '';
            document.getElementById('profileUsername').value = user.username || '';
            document.getElementById('profileEmail').value = user.email || '';
            document.getElementById('profileHP').value = user.noHP || user.phone || '';

            const role = this.currentUser.role;
            const config = ROLE_CONFIG[role] || ROLE_CONFIG.admin;
            document.getElementById('profileRole').value = config.name;
            document.getElementById('profileDisplayName').textContent = user.nama || user.username;
            document.getElementById('profileRoleBadge').textContent = config.name;

            const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID', {
                day: '2-digit', month: 'long', year: 'numeric'
            }) : '-';
            document.getElementById('profileJoinDate').textContent = joinDate;

            const profileAvatar = document.getElementById('profileAvatar');
            if (user.photo) {
                profileAvatar.innerHTML = `<img src="${user.photo}" alt="Avatar">`;
            }
        }

        bindEvents() {
            // Sidebar toggle
            document.getElementById('menuToggle').addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('active');
                document.getElementById('mobileOverlay').classList.toggle('active');
            });

            document.getElementById('mobileOverlay').addEventListener('click', () => {
                document.getElementById('sidebar').classList.remove('active');
                document.getElementById('mobileOverlay').classList.remove('active');
            });

            // User dropdown
            document.getElementById('userProfile').addEventListener('click', (e) => {
                e.stopPropagation();
                document.getElementById('userDropdown').classList.toggle('active');
            });

            document.addEventListener('click', () => {
                document.getElementById('userDropdown').classList.remove('active');
            });

            // Logout
            document.getElementById('btnLogoutSidebar').addEventListener('click', () => this.logout());
            document.getElementById('btnLogoutDropdown').addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });

            // Settings menu navigation
            document.querySelectorAll('.settings-menu-item').forEach(item => {
                item.addEventListener('click', () => {
                    document.querySelectorAll('.settings-menu-item').forEach(i => i.classList.remove('active'));
                    document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
                    item.classList.add('active');
                    const section = item.dataset.section;
                    document.getElementById(`section-${section}`).classList.add('active');
                });
            });

            // Logo upload
            document.getElementById('btnUploadLogo').addEventListener('click', () => {
                document.getElementById('logoInput').click();
            });
            document.getElementById('logoInput').addEventListener('change', (e) => this.handleLogoUpload(e));
            document.getElementById('btnRemoveLogo').addEventListener('click', () => this.removeLogo());

            // Hospital form
            document.getElementById('hospitalForm').addEventListener('submit', (e) => this.saveHospital(e));
            document.getElementById('btnResetHospital').addEventListener('click', () => this.loadHospitalData());

            // Profile form
            document.getElementById('profileForm').addEventListener('submit', (e) => this.saveProfile(e));
            document.getElementById('btnResetProfile').addEventListener('click', () => this.loadProfile());

            // Password form
            document.getElementById('passwordForm').addEventListener('submit', (e) => this.changePassword(e));
            document.getElementById('btnResetPassword').addEventListener('click', () => {
                document.getElementById('passwordForm').reset();
                document.getElementById('passwordStrength').classList.remove('active');
            });

            // Password strength
            document.getElementById('newPassword').addEventListener('input', () => this.checkPasswordStrength());

            // Toggle passwords
            document.querySelectorAll('.toggle-password').forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetId = btn.dataset.target;
                    const input = document.getElementById(targetId);
                    const icon = btn.querySelector('i');
                    if (input.type === 'password') {
                        input.type = 'text';
                        icon.classList.replace('fa-eye', 'fa-eye-slash');
                    } else {
                        input.type = 'password';
                        icon.classList.replace('fa-eye-slash', 'fa-eye');
                    }
                });
            });

            // Backup
            document.getElementById('btnBackup').addEventListener('click', () => this.backupData());

            // Restore
            const restoreInput = document.getElementById('restoreInput');
            const dropZone = document.getElementById('restoreDropZone');

            document.getElementById('btnSelectRestore').addEventListener('click', () => {
                restoreInput.click();
            });

            dropZone.addEventListener('click', (e) => {
                if (e.target === dropZone || e.target.closest('.restore-upload-content')) {
                    restoreInput.click();
                }
            });

            restoreInput.addEventListener('change', (e) => this.handleRestoreFile(e));

            // Drag & drop
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                });
            });

            ['dragenter', 'dragover'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'));
            });

            ['dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'));
            });

            dropZone.addEventListener('drop', (e) => {
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.processRestoreFile(files[0]);
                }
            });

            document.getElementById('btnRemoveRestoreFile').addEventListener('click', () => this.clearRestoreFile());
            document.getElementById('btnCancelRestore').addEventListener('click', () => this.clearRestoreFile());
            document.getElementById('btnStartRestore').addEventListener('click', () => UI.showModal('restoreModal'));

            // Restore modal
            document.getElementById('btnCancelRestoreModal').addEventListener('click', () => UI.hideModal('restoreModal'));
            document.getElementById('btnConfirmRestore').addEventListener('click', () => this.executeRestore());

            // Reset
            const confirmReset1 = document.getElementById('confirmReset1');
            const confirmReset2 = document.getElementById('confirmReset2');
            const confirmResetText = document.getElementById('confirmResetText');
            const btnResetAll = document.getElementById('btnResetAll');

            const checkResetConditions = () => {
                const ok = confirmReset1.checked && confirmReset2.checked && confirmResetText.value === 'RESET';
                btnResetAll.disabled = !ok;
            };

            confirmReset1.addEventListener('change', checkResetConditions);
            confirmReset2.addEventListener('change', checkResetConditions);
            confirmResetText.addEventListener('input', checkResetConditions);

            btnResetAll.addEventListener('click', () => UI.showModal('resetModal'));
            document.getElementById('btnCancelReset').addEventListener('click', () => UI.hideModal('resetModal'));
            document.getElementById('btnConfirmReset').addEventListener('click', () => this.executeReset());

            // Theme
            document.querySelectorAll('.theme-card').forEach(card => {
                card.addEventListener('click', () => {
                    const theme = card.dataset.theme;
                    document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    document.querySelector(`input[value="${theme}"]`).checked = true;
                    this.applyTheme(theme);
                });
            });

            // Initialize selected theme card
            const currentTheme = this.settings.theme || 'light';
            const themeCard = document.querySelector(`.theme-card[data-theme="${currentTheme}"]`);
            if (themeCard) themeCard.classList.add('selected');

            // Toggles
            document.getElementById('toggleAnimation').addEventListener('change', (e) => {
                this.settings.animationEnabled = e.target.checked;
                if (e.target.checked) {
                    document.body.classList.remove('no-animation');
                } else {
                    document.body.classList.add('no-animation');
                }
                Storage.set(Storage.KEYS.SETTINGS, this.settings);
                UI.showToast(`Animasi ${e.target.checked ? 'diaktifkan' : 'dinonaktifkan'}`, 'info');
            });

            document.getElementById('toggleToast').addEventListener('change', (e) => {
                this.settings.toastEnabled = e.target.checked;
                Storage.set(Storage.KEYS.SETTINGS, this.settings);
                UI.showToast(`Notifikasi toast ${e.target.checked ? 'diaktifkan' : 'dinonaktifkan'}`, 'info');
            });

            document.getElementById('toggleCompact').addEventListener('change', (e) => {
                this.settings.compactSidebar = e.target.checked;
                Storage.set(Storage.KEYS.SETTINGS, this.settings);
                UI.showToast(`Sidebar compact ${e.target.checked ? 'diaktifkan' : 'dinonaktifkan'}`, 'info');
            });

            // Resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 992) {
                    document.getElementById('sidebar').classList.remove('active');
                    document.getElementById('mobileOverlay').classList.remove('active');
                }
            });

            // Close modals on ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    ['resetModal', 'restoreModal'].forEach(id => {
                        if (document.getElementById(id).classList.contains('active')) {
                            UI.hideModal(id);
                        }
                    });
                }
            });

            // Close modals on overlay click
            ['resetModal', 'restoreModal'].forEach(id => {
                document.getElementById(id).addEventListener('click', (e) => {
                    if (e.target.id === id) UI.hideModal(id);
                });
            });
        }

        // ==================== LOGO HANDLING ====================
        handleLogoUpload(e) {
            const file = e.target.files[0];
            if (!file) return;

            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                UI.showToast('Format logo harus JPG atau PNG!', 'error');
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                UI.showToast('Ukuran logo maksimal 2MB!', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                this.logoData = event.target.result;
                const preview = document.getElementById('logoPreview');
                preview.innerHTML = `<img src="${this.logoData}" alt="Logo">`;
                preview.classList.add('has-image');
                UI.showToast('Logo berhasil diupload! Jangan lupa simpan.', 'success');
            };
            reader.readAsDataURL(file);
        }

        removeLogo() {
            this.logoData = null;
            const preview = document.getElementById('logoPreview');
            preview.innerHTML = `<i class="fas fa-hospital-alt"></i><span>Logo RS</span>`;
            preview.classList.remove('has-image');
            document.getElementById('logoInput').value = '';
            UI.showToast('Logo dihapus', 'info');
        }

        // ==================== SAVE FUNCTIONS ====================
        saveHospital(e) {
            e.preventDefault();

            const nama = document.getElementById('rsNama').value.trim();
            const alamat = document.getElementById('rsAlamat').value.trim();
            const telepon = document.getElementById('rsTelepon').value.trim();
            const email = document.getElementById('rsEmail').value.trim();

            if (!nama || !alamat || !telepon || !email) {
                UI.showToast('Mohon lengkapi semua field wajib!', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                UI.showToast('Format email tidak valid!', 'error');
                return;
            }

            const hospitalData = {
                nama: nama,
                alamat: alamat,
                telepon: telepon,
                email: email,
                website: document.getElementById('rsWebsite').value.trim(),
                izin: document.getElementById('rsIzin').value.trim(),
                logo: this.logoData,
                updatedAt: new Date().toISOString()
            };

            Storage.set(Storage.KEYS.HOSPITAL, hospitalData);
            this.hospitalData = hospitalData;
            UI.showToast('Profil rumah sakit berhasil disimpan!', 'success');
        }

        saveProfile(e) {
            e.preventDefault();

            const nama = document.getElementById('profileNama').value.trim();
            const email = document.getElementById('profileEmail').value.trim();
            const hp = document.getElementById('profileHP').value.trim();

            if (!nama) {
                UI.showToast('Nama tidak boleh kosong!', 'error');
                return;
            }

            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    UI.showToast('Format email tidak valid!', 'error');
                    return;
                }
            }

            const users = Storage.get(Storage.KEYS.USERS) || [];
            const userIndex = users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                users[userIndex].nama = nama;
                users[userIndex].email = email;
                users[userIndex].noHP = hp;
                users[userIndex].updatedAt = new Date().toISOString();
                Storage.set(Storage.KEYS.USERS, users);

                // Update current user
                this.currentUser.nama = nama;
                this.currentUser.email = email;
                Storage.set(Storage.KEYS.CURRENT_USER, this.currentUser);

                this.loadUserData();
                this.loadProfile();
                UI.showToast('Profil berhasil diupdate!', 'success');
            }
        }

        changePassword(e) {
            e.preventDefault();

            const oldPassword = document.getElementById('oldPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (!oldPassword || !newPassword || !confirmPassword) {
                UI.showToast('Semua field wajib diisi!', 'error');
                return;
            }

            if (newPassword.length < 8) {
                UI.showToast('Password baru minimal 8 karakter!', 'error');
                return;
            }

            if (newPassword !== confirmPassword) {
                UI.showToast('Konfirmasi password tidak cocok!', 'error');
                return;
            }

            // Verify old password (simplified - hash check)
            const users = Storage.get(Storage.KEYS.USERS) || [];
            const user = users.find(u => u.id === this.currentUser.id);

            if (!user) {
                UI.showToast('User tidak ditemukan!', 'error');
                return;
            }

            // Simple hash for demo (same as login.js)
            const hashPassword = (password) => {
                let hash = 0;
                const salt = 'hmris_salt_2024';
                const saltedPassword = password + salt;
                for (let i = 0; i < saltedPassword.length; i++) {
                    const char = saltedPassword.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char;
                    hash = hash & hash;
                }
                return 'hashed_' + Math.abs(hash).toString(16);
            };

            const hashedOld = hashPassword(oldPassword);
            if (user.password !== hashedOld) {
                UI.showToast('Password lama salah!', 'error');
                return;
            }

            // Update password
            const userIndex = users.findIndex(u => u.id === this.currentUser.id);
            users[userIndex].password = hashPassword(newPassword);
            users[userIndex].updatedAt = new Date().toISOString();
            Storage.set(Storage.KEYS.USERS, users);

            document.getElementById('passwordForm').reset();
            document.getElementById('passwordStrength').classList.remove('active');
            UI.showToast('Password berhasil diganti!', 'success');
        }

        checkPasswordStrength() {
            const password = document.getElementById('newPassword').value;
            const strengthEl = document.getElementById('passwordStrength');
            const bar = strengthEl.querySelector('.strength-bar');
            const hint = document.getElementById('passwordHint');

            if (!password) {
                strengthEl.classList.remove('active');
                hint.textContent = 'Masukkan password baru';
                return;
            }

            strengthEl.classList.add('active');

            let strength = 0;
            if (password.length >= 8) strength++;
            if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
            if (/\d/.test(password)) strength++;
            if (/[^a-zA-Z0-9]/.test(password)) strength++;

            bar.className = 'strength-bar';
            if (strength <= 1) {
                bar.classList.add('weak');
                hint.textContent = '⚠️ Password lemah - tambahkan huruf besar & simbol';
            } else if (strength <= 2) {
                bar.classList.add('medium');
                hint.textContent = '🟡 Password cukup - bisa lebih kuat';
            } else {
                bar.classList.add('strong');
                hint.textContent = '✓ Password kuat';
            }
        }

        // ==================== BACKUP & RESTORE ====================
        updateBackupInfo() {
            document.getElementById('backupPatientCount').textContent = `${(Storage.get(Storage.KEYS.PATIENTS) || []).length} data`;
            document.getElementById('backupDoctorCount').textContent = `${(Storage.get(Storage.KEYS.DOCTORS) || []).length} data`;
            document.getElementById('backupRecordCount').textContent = `${(Storage.get(Storage.KEYS.RECORDS) || []).length} data`;
            document.getElementById('backupAppointmentCount').textContent = `${(Storage.get(Storage.KEYS.APPOINTMENTS) || []).length} data`;
            document.getElementById('backupLabCount').textContent = `${(Storage.get(Storage.KEYS.LABORATORY) || []).length} data`;
            document.getElementById('backupMedicineCount').textContent = `${(Storage.get(Storage.KEYS.MEDICINES) || []).length} data`;

            const lastBackup = Storage.get(Storage.KEYS.LAST_BACKUP);
            document.getElementById('lastBackupTime').textContent = lastBackup ?
                new Date(lastBackup).toLocaleString('id-ID') : 'Belum pernah';
        }

        backupData() {
            const backup = {
                version: '1.0.0',
                backupDate: new Date().toISOString(),
                backupBy: this.currentUser.nama || this.currentUser.username,
                data: {
                    patients: Storage.get(Storage.KEYS.PATIENTS) || [],
                    doctors: Storage.get(Storage.KEYS.DOCTORS) || [],
                    records: Storage.get(Storage.KEYS.RECORDS) || [],
                    appointments: Storage.get(Storage.KEYS.APPOINTMENTS) || [],
                    laboratory: Storage.get(Storage.KEYS.LABORATORY) || [],
                    medicines: Storage.get(Storage.KEYS.MEDICINES) || [],
                    users: Storage.get(Storage.KEYS.USERS) || [],
                    hospital: Storage.get(Storage.KEYS.HOSPITAL) || {},
                    settings: Storage.get(Storage.KEYS.SETTINGS) || {}
                }
            };

            const json = JSON.stringify(backup, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
            a.href = url;
            a.download = `backup-hmris-${timestamp}.json`;
            a.click();
            URL.revokeObjectURL(url);

            Storage.set(Storage.KEYS.LAST_BACKUP, new Date().toISOString());
            this.updateBackupInfo();
            UI.showToast('Backup berhasil didownload!', 'success');
        }

        handleRestoreFile(e) {
            const file = e.target.files[0];
            if (file) this.processRestoreFile(file);
        }

        processRestoreFile(file) {
            if (!file.name.endsWith('.json')) {
                UI.showToast('File harus berformat JSON!', 'error');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                UI.showToast('Ukuran file maksimal 10MB!', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);

                    if (!data.version || !data.data) {
                        UI.showToast('Format file backup tidak valid!', 'error');
                        return;
                    }

                    this.restoreFileData = data;

                    // Show file info
                    document.getElementById('restoreUploadContent').style.display = 'none';
                    document.getElementById('restoreFileInfo').style.display = 'flex';
                    document.getElementById('restoreFileName').textContent = file.name;
                    document.getElementById('restoreFileSize').textContent = this.formatFileSize(file.size);

                    // Show preview
                    this.showRestorePreview(data.data);

                    document.getElementById('btnStartRestore').disabled = false;
                    UI.showToast('File backup valid! Siap untuk restore.', 'success');
                } catch (err) {
                    UI.showToast('File JSON tidak valid!', 'error');
                    console.error(err);
                }
            };
            reader.readAsText(file);
        }

        showRestorePreview(data) {
            const preview = document.getElementById('restorePreview');
            const grid = document.getElementById('restorePreviewGrid');

            const items = [
                { icon: 'fa-users', label: 'Pasien', value: (data.patients || []).length },
                { icon: 'fa-user-md', label: 'Dokter', value: (data.doctors || []).length },
                { icon: 'fa-file-medical', label: 'Rekam Medis', value: (data.records || []).length },
                { icon: 'fa-calendar-check', label: 'Janji Temu', value: (data.appointments || []).length },
                { icon: 'fa-flask', label: 'Laboratorium', value: (data.laboratory || []).length },
                { icon: 'fa-capsules', label: 'Farmasi', value: (data.medicines || []).length },
                { icon: 'fa-user-shield', label: 'Users', value: (data.users || []).length }
            ];

            grid.innerHTML = items.map(item => `
                <div class="preview-item">
                    <div class="preview-item-icon"><i class="fas ${item.icon}"></i></div>
                    <div class="preview-item-label">${item.label}</div>
                    <div class="preview-item-value">${item.value}</div>
                </div>
            `).join('');

            preview.style.display = 'block';
        }

        clearRestoreFile() {
            this.restoreFileData = null;
            document.getElementById('restoreInput').value = '';
            document.getElementById('restoreUploadContent').style.display = 'block';
            document.getElementById('restoreFileInfo').style.display = 'none';
            document.getElementById('restorePreview').style.display = 'none';
            document.getElementById('btnStartRestore').disabled = true;
            UI.hideModal('restoreModal');
        }

        executeRestore() {
            if (!this.restoreFileData) return;

            const data = this.restoreFileData.data;

            if (data.patients) Storage.set(Storage.KEYS.PATIENTS, data.patients);
            if (data.doctors) Storage.set(Storage.KEYS.DOCTORS, data.doctors);
            if (data.records) Storage.set(Storage.KEYS.RECORDS, data.records);
            if (data.appointments) Storage.set(Storage.KEYS.APPOINTMENTS, data.appointments);
            if (data.laboratory) Storage.set(Storage.KEYS.LABORATORY, data.laboratory);
            if (data.medicines) Storage.set(Storage.KEYS.MEDICINES, data.medicines);
            if (data.users) Storage.set(Storage.KEYS.USERS, data.users);
            if (data.hospital) Storage.set(Storage.KEYS.HOSPITAL, data.hospital);
            if (data.settings) Storage.set(Storage.KEYS.SETTINGS, data.settings);

            UI.hideModal('restoreModal');
            this.clearRestoreFile();
            this.loadHospitalData();
            this.loadSettings();
            this.loadProfile();
            this.updateBackupInfo();
            this.updateSystemInfo();

            UI.showToast('Restore berhasil! Data telah dikembalikan.', 'success');
        }

        executeReset() {
            // Keep current user and settings
            const currentUser = Storage.get(Storage.KEYS.CURRENT_USER);
            const settings = Storage.get(Storage.KEYS.SETTINGS);

            Storage.clear();

            // Restore essential
            if (currentUser) Storage.set(Storage.KEYS.CURRENT_USER, currentUser);
            if (settings) Storage.set(Storage.KEYS.SETTINGS, settings);

            // Seed default admin
            const defaultAdmin = {
                id: 'USR-ADMIN-001',
                username: 'admin',
                email: 'admin@hmris.com',
                password: 'hashed_admin_default',
                nama: 'Administrator',
                role: 'admin',
                status: 'active',
                createdAt: new Date().toISOString()
            };
            Storage.set(Storage.KEYS.USERS, [defaultAdmin]);

            UI.hideModal('resetModal');
            UI.showToast('Semua data berhasil direset! Halaman akan dimuat ulang...', 'success');

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }

        formatFileSize(bytes) {
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
            return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
        }

        // ==================== THEME ====================
        applyTheme(theme) {
            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            this.settings.theme = theme;
            Storage.set(Storage.KEYS.SETTINGS, this.settings);
            UI.showToast(`Tampilan ${theme === 'dark' ? 'gelap' : 'terang'} diterapkan`, 'success');
        }

        // ==================== SYSTEM INFO ====================
        updateSystemInfo() {
            const used = Storage.getUsedSpace();
            document.getElementById('storageUsed').textContent = this.formatFileSize(used * 2);
            document.getElementById('storageKeys').textContent = Object.keys(localStorage).length;

            document.getElementById('infoPatientCount').textContent = (Storage.get(Storage.KEYS.PATIENTS) || []).length;
            document.getElementById('infoDoctorCount').textContent = (Storage.get(Storage.KEYS.DOCTORS) || []).length;
            document.getElementById('infoRecordCount').textContent = (Storage.get(Storage.KEYS.RECORDS) || []).length;
            document.getElementById('infoAppointmentCount').textContent = (Storage.get(Storage.KEYS.APPOINTMENTS) || []).length;
        }

        logout() {
            Storage.remove(Storage.KEYS.CURRENT_USER);
            UI.showToast('Logout berhasil! Mengalihkan...', 'success');
            setTimeout(() => { window.location.href = '../login.html'; }, 1000);
        }
    }

    // ==================== INITIALIZE ====================
    document.addEventListener('DOMContentLoaded', () => {
        new SettingsManager();
    });

})();