(function () {
    'use strict';

    // ==================== STORAGE MANAGER ====================
    const Storage = {
        KEYS: {
            USERS: 'hmris_users',
            PATIENTS: 'hmris_patients',
            CURRENT_USER: 'hmris_currentUser'
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
            { name: 'Data Pasien', icon: 'fa-users', href: 'pasien.html', active: true },
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html' },
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' },
            { name: 'Data Perawat', icon: 'fa-user-nurse', href: '#' },
            { name: 'Petugas RM', icon: 'fa-user-tie', href: '#' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' },
            { name: 'Farmasi', icon: 'fa-capsules', href: 'farmasi.html' },
            { name: 'Laboratorium', icon: 'fa-flask', href: 'laboratorium.html' },
            { name: 'Laporan', icon: 'fa-chart-bar', href: 'laporan.html' },
            { name: 'Pengaturan', icon: 'fa-cog', href: 'pengaturan.html' }
        ]
    },
    dokter: {
        name: 'Dokter',
        icon: 'fa-user-md',
        menus: [
            { category: 'Utama' },
            { name: 'Dashboard', icon: 'fa-th-large', href: 'dashboard/index.html' },
            { category: 'Pelayanan' },
            { name: 'Data Pasien', icon: 'fa-users', href: 'pasien.html' , active: true},
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html' },
            { name: 'Resep Obat', icon: 'fa-pills', href: '#' },
            { category: 'Jadwal' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' },
            { name: 'Jadwal Praktik', icon: 'fa-calendar-alt', href: '#' },
            { name: 'Antrian Hari Ini', icon: 'fa-list-ol', href: '#' },
            { category: 'Lainnya' },
            { name: 'Laporan Saya', icon: 'fa-chart-line', href: 'laporan.html' },
            { name: 'Pengaturan', icon: 'fa-cog', href: 'pengaturan.html' }
        ]
    },
    perawat: {
        name: 'Perawat',
        icon: 'fa-user-nurse',
        menus: [
            { category: 'Utama' },
            { name: 'Dashboard', icon: 'fa-th-large', href: 'dashboard/index.html' },
            { category: 'Pelayanan' },
            { name: 'Data Pasien', icon: 'fa-users', href: 'pasien.html', active: true },
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html' },
            { name: 'Antrian', icon: 'fa-list-ol', href: '#' },
            { name: 'Tindakan Medis', icon: 'fa-stethoscope', href: '#' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' },
            { name: 'Jadwal Shift', icon: 'fa-calendar-alt', href: '#' },
            { name: 'Tanda Vital', icon: 'fa-heartbeat', href: '#' },
            { name: 'Pengaturan', icon: 'fa-cog', href: 'pengaturan.html' }
        ]
    },
    petugas: {
        name: 'Petugas RM',
        icon: 'fa-user-tie',
        menus: [
            { category: 'Utama' },
            { name: 'Dashboard', icon: 'fa-th-large', href: 'dashboard/index.html' },
            { category: 'Rekam Medis' },
            { name: 'Data Pasien', icon: 'fa-users', href: 'pasien.html' , active: true},
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html' },
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' },
            { name: 'Laboratorium', icon: 'fa-flask', href: 'laboratorium.html' },
            { name: 'Laporan Harian', icon: 'fa-file-alt', href: 'laporan.html' },
            { name: 'Pengaturan', icon: 'fa-cog', href: 'pengaturan.html' }
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
            { name: 'Pengaturan', icon: 'fa-cog', href: 'pengaturan.html' }
        ]
    }
};

    // ==================== VALIDATORS ====================
    const Validator = {
        NIK: /^\d{16}$/,
        EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        PHONE: /^(\+62|62|0)[0-9]{9,13}$/,
        NAME: /^[a-zA-Z\s'.]{3,50}$/,

        validate(field, value) {
            switch (field) {
                case 'nik':
                    if (!value) return 'NIK wajib diisi';
                    if (!this.NIK.test(value)) return 'NIK harus 16 digit angka';
                    return '';

                case 'nama':
                    if (!value) return 'Nama wajib diisi';
                    if (value.length < 3) return 'Nama minimal 3 karakter';
                    return '';

                case 'tempatLahir':
                    if (!value) return 'Tempat lahir wajib diisi';
                    if (value.length < 3) return 'Tempat lahir minimal 3 karakter';
                    return '';

                case 'tanggalLahir':
                    if (!value) return 'Tanggal lahir wajib diisi';
                    if (new Date(value) > new Date()) return 'Tanggal lahir tidak valid';
                    return '';

                case 'alamat':
                    if (!value) return 'Alamat wajib diisi';
                    if (value.length < 10) return 'Alamat minimal 10 karakter';
                    return '';

                case 'noHP':
                    if (!value) return 'No HP wajib diisi';
                    if (!this.PHONE.test(value)) return 'Format no HP tidak valid';
                    return '';

                case 'email':
                    if (!value) return 'Email wajib diisi';
                    if (!this.EMAIL.test(value)) return 'Format email tidak valid';
                    return '';

                case 'pekerjaan':
                    if (!value) return 'Pekerjaan wajib diisi';
                    return '';

                case 'jenisKelamin':
                    if (!value) return 'Jenis kelamin wajib dipilih';
                    return '';

                case 'golonganDarah':
                    if (!value) return 'Golongan darah wajib dipilih';
                    return '';

                case 'agama':
                    if (!value) return 'Agama wajib dipilih';
                    return '';

                case 'statusNikah':
                    if (!value) return 'Status pernikahan wajib dipilih';
                    return '';

                case 'jenisPembayaran':
                    if (!value) return 'Jenis pembayaran wajib dipilih';
                    return '';

                case 'statusPasien':
                    if (!value) return 'Status pasien wajib dipilih';
                    return '';

                default:
                    return '';
            }
        }
    };

    // ==================== UI MANAGER ====================
    const UI = {
        showToast(message, type = 'success') {
            const existing = document.querySelector('.notification');
            if (existing) existing.remove();

            const colors = {
                success: '#059669',
                error: '#DC2626',
                info: '#0D9488',
                warning: '#D97706'
            };

            const icons = {
                success: 'fa-check-circle',
                error: 'fa-exclamation-circle',
                info: 'fa-info-circle',
                warning: 'fa-exclamation-triangle'
            };

            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas ${icons[type]}"></i>
                    <span>${message}</span>
                </div>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            `;

            notification.style.cssText = `
                position: fixed;
                top: 90px;
                right: 20px;
                padding: 16px 24px;
                background: ${colors[type]};
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

            notification.querySelector('.notification-close').addEventListener('click', () => {
                notification.remove();
            });

            setTimeout(() => {
                if (notification.parentElement) {
                    notification.style.animation = 'slideOutRight 0.3s ease forwards';
                    setTimeout(() => notification.remove(), 300);
                }
            }, 4000);

            // Add animation styles
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

    // ==================== PATIENT MANAGER ====================
    class PatientManager {
        constructor() {
            this.patients = Storage.get(Storage.KEYS.PATIENTS) || [];
            this.filteredPatients = [...this.patients];
            this.currentPage = 1;
            this.itemsPerPage = 10;
            this.sortField = 'createdAt';
            this.sortDirection = 'desc';
            this.searchTerm = '';
            this.filters = { gender: '', payment: '', status: '' };
            this.editingId = null;
            this.deletingId = null;
            this.currentPhotoData = null;

            this.init();
        }

        init() {
            if (!this.checkAuth()) return;

            this.loadUserData();
            this.renderSidebar();
            this.bindEvents();
            this.refresh();
            this.updateStats();
        }

        checkAuth() {
            const user = Storage.get(Storage.KEYS.CURRENT_USER);
            if (!user) {
                UI.showToast('Silakan login terlebih dahulu!', 'error');
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1000);
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

            // Add patient button
            document.getElementById('btnAddPatient').addEventListener('click', () => this.openAddModal());

            // Modal close buttons
            document.getElementById('btnCloseModal').addEventListener('click', () => this.closeModal('patientModal'));
            document.getElementById('btnCancelForm').addEventListener('click', () => this.closeModal('patientModal'));
            document.getElementById('btnCloseDetail').addEventListener('click', () => this.closeModal('detailModal'));
            document.getElementById('btnCloseDetail2').addEventListener('click', () => this.closeModal('detailModal'));
            document.getElementById('btnClosePhoto').addEventListener('click', () => this.closeModal('photoModal'));
            document.getElementById('btnCancelDelete').addEventListener('click', () => this.closeModal('deleteModal'));

            // Close modal on overlay click
            ['patientModal', 'detailModal', 'photoModal', 'deleteModal'].forEach(id => {
                document.getElementById(id).addEventListener('click', (e) => {
                    if (e.target.id === id) this.closeModal(id);
                });
            });

            // Escape key to close modals
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    ['patientModal', 'detailModal', 'photoModal', 'deleteModal'].forEach(id => {
                        if (document.getElementById(id).classList.contains('active')) {
                            this.closeModal(id);
                        }
                    });
                }
            });

            // Photo upload
            document.getElementById('btnUploadPhoto').addEventListener('click', () => {
                document.getElementById('photoInput').click();
            });

            document.getElementById('photoPreview').addEventListener('click', () => {
                document.getElementById('photoInput').click();
            });

            document.getElementById('photoInput').addEventListener('change', (e) => this.handlePhotoUpload(e));

            document.getElementById('btnRemovePhoto').addEventListener('click', () => this.removePhoto());

            // Calculate age on date change
            document.getElementById('tanggalLahir').addEventListener('change', () => this.calculateAge());

            // Show/hide BPJS fields
            document.getElementById('jenisPembayaran').addEventListener('change', (e) => {
                const showBPJS = e.target.value === 'BPJS';
                document.getElementById('bpjsNumberGroup').style.display = showBPJS ? 'flex' : 'none';
                document.getElementById('bpjsClassGroup').style.display = showBPJS ? 'flex' : 'none';
            });

            // Real-time validation
            const fields = ['nik', 'nama', 'tempatLahir', 'noHP', 'email', 'pekerjaan', 'alamat'];
            fields.forEach(field => {
                const el = document.getElementById(field);
                if (el) {
                    el.addEventListener('blur', () => this.validateField(field));
                    el.addEventListener('input', () => this.clearError(field));
                }
            });

            // Search (debounced)
            let searchTimeout;
            document.getElementById('searchInput').addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.searchTerm = e.target.value.toLowerCase().trim();
                    this.currentPage = 1;
                    this.applyFilters();
                }, 300);
            });

            // Filters
            document.getElementById('filterGender').addEventListener('change', (e) => {
                this.filters.gender = e.target.value;
                this.currentPage = 1;
                this.applyFilters();
            });

            document.getElementById('filterPayment').addEventListener('change', (e) => {
                this.filters.payment = e.target.value;
                this.currentPage = 1;
                this.applyFilters();
            });

            document.getElementById('filterStatus').addEventListener('change', (e) => {
                this.filters.status = e.target.value;
                this.currentPage = 1;
                this.applyFilters();
            });

            // Sorting
            document.querySelectorAll('.sortable').forEach(th => {
                th.addEventListener('click', () => {
                    const field = th.getAttribute('data-sort');
                    if (this.sortField === field) {
                        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
                    } else {
                        this.sortField = field;
                        this.sortDirection = 'asc';
                    }
                    this.updateSortUI(th);
                    this.applyFilters();
                });
            });

            // Form submit
            document.getElementById('patientForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

            // Action buttons
            document.getElementById('btnEditFromDetail').addEventListener('click', () => {
                const currentId = document.getElementById('detailModal').dataset.patientId;
                this.closeModal('detailModal');
                this.openEditModal(currentId);
            });

            document.getElementById('btnConfirmDelete').addEventListener('click', () => this.confirmDelete());

            // Toolbar buttons
            document.getElementById('btnExportExcel').addEventListener('click', () => this.exportExcel());
            document.getElementById('btnExportPDF').addEventListener('click', () => this.exportPDF());
            document.getElementById('btnPrint').addEventListener('click', () => this.printTable());
            document.getElementById('btnRefresh').addEventListener('click', () => {
                this.refresh();
                UI.showToast('Data berhasil di-refresh!', 'success');
            });

            // Window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 992) {
                    document.getElementById('sidebar').classList.remove('active');
                    document.getElementById('mobileOverlay').classList.remove('active');
                }
            });
        }

        refresh() {
            this.patients = Storage.get(Storage.KEYS.PATIENTS) || [];
            this.applyFilters();
            this.updateStats();
        }

        updateStats() {
            const total = this.patients.length;
            const thisMonth = new Date().getMonth();
            const thisYear = new Date().getFullYear();
            const newPatients = this.patients.filter(p => {
                const date = new Date(p.createdAt);
                return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
            }).length;

            // Simulate rawat jalan vs rawat inap (50-50 for demo)
            const outpatient = Math.floor(total * 0.7);
            const inpatient = total - outpatient;

            this.animateCounter('statTotal', total);
            this.animateCounter('statNew', newPatients);
            this.animateCounter('statOutpatient', outpatient);
            this.animateCounter('statInpatient', inpatient);
        }

        animateCounter(elementId, target) {
            const el = document.getElementById(elementId);
            if (!el) return;

            const duration = 800;
            const increment = target / (duration / 16);
            let current = 0;

            const update = () => {
                current += increment;
                if (current < target) {
                    el.textContent = Math.ceil(current).toLocaleString('id-ID');
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target.toLocaleString('id-ID');
                }
            };

            update();
        }

        applyFilters() {
            let filtered = [...this.patients];

            // Search
            if (this.searchTerm) {
                filtered = filtered.filter(p =>
                    (p.nama || '').toLowerCase().includes(this.searchTerm) ||
                    (p.nik || '').includes(this.searchTerm) ||
                    (p.noRM || '').toLowerCase().includes(this.searchTerm) ||
                    (p.noHP || '').includes(this.searchTerm) ||
                    (p.email || '').toLowerCase().includes(this.searchTerm)
                );
            }

            // Filters
            if (this.filters.gender) {
                filtered = filtered.filter(p => p.jenisKelamin === this.filters.gender);
            }
            if (this.filters.payment) {
                filtered = filtered.filter(p => p.jenisPembayaran === this.filters.payment);
            }
            if (this.filters.status) {
                filtered = filtered.filter(p => (p.status || p.statusPasien) === this.filters.status);
            }

            // Sort
            filtered.sort((a, b) => {
                let aVal = a[this.sortField];
                let bVal = b[this.sortField];

                if (typeof aVal === 'string') aVal = aVal.toLowerCase();
                if (typeof bVal === 'string') bVal = bVal.toLowerCase();

                if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });

            this.filteredPatients = filtered;
            this.renderTable();
            this.renderPagination();
        }

        renderTable() {
            const tableBody = document.getElementById('tableBody');
            const emptyState = document.getElementById('emptyState');

            if (this.filteredPatients.length === 0) {
                tableBody.innerHTML = '';
                emptyState.style.display = 'block';
                return;
            }

            emptyState.style.display = 'none';

            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            const pageData = this.filteredPatients.slice(startIndex, endIndex);

            tableBody.innerHTML = pageData.map(patient => `
                <tr data-id="${patient.id}">
                    <td><code style="background: var(--gray-100); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">${patient.noRM}</code></td>
                    <td>
                        <div class="patient-avatar" data-photo="${patient.photo || ''}" data-name="${patient.nama}">
                            ${patient.photo ? `<img src="${patient.photo}" alt="${patient.nama}">` : `<i class="fas fa-user"></i>`}
                        </div>
                    </td>
                    <td>
                        <div class="patient-info">
                            <div class="patient-details">
                                <div class="patient-name">${patient.nama}</div>
                                <div class="patient-noRM">${patient.nik || '-'}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="gender-badge ${patient.jenisKelamin === 'Laki-laki' ? 'male' : 'female'}">
                            <i class="fas ${patient.jenisKelamin === 'Laki-laki' ? 'fa-mars' : 'fa-venus'}"></i>
                            ${patient.jenisKelamin || '-'}
                        </span>
                    </td>
                    <td>${patient.noHP || '-'}</td>
                    <td>
                        <span class="payment-badge ${(patient.jenisPembayaran || '').toLowerCase()}">
                            ${patient.jenisPembayaran || '-'}
                        </span>
                    </td>
                    <td>
                        <span class="status-badge ${(patient.status || patient.statusPasien) === 'Aktif' ? 'active' : 'inactive'}">
                            <i class="fas fa-circle"></i>
                            ${patient.status || patient.statusPasien || 'Aktif'}
                        </span>
                    </td>
                    <td class="text-center">
                        <div class="action-buttons">
                            <button class="action-btn view" data-action="view" data-id="${patient.id}" title="Detail">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn edit" data-action="edit" data-id="${patient.id}" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete" data-action="delete" data-id="${patient.id}" data-name="${patient.nama}" title="Hapus">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');

            // Bind action buttons
            tableBody.querySelectorAll('[data-action]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const action = btn.getAttribute('data-action');
                    const id = btn.getAttribute('data-id');

                    if (action === 'view') this.viewPatient(id);
                    if (action === 'edit') this.openEditModal(id);
                    if (action === 'delete') this.openDeleteModal(id, btn.getAttribute('data-name'));
                });
            });

            // Bind avatar click
            tableBody.querySelectorAll('.patient-avatar').forEach(avatar => {
                avatar.addEventListener('click', () => {
                    const photo = avatar.getAttribute('data-photo');
                    if (photo) {
                        document.getElementById('photoPreviewLarge').src = photo;
                        UI.showModal('photoModal');
                    } else {
                        UI.showToast('Tidak ada foto', 'info');
                    }
                });
            });

            // Update table info
            document.getElementById('showingStart').textContent = this.filteredPatients.length > 0 ? startIndex + 1 : 0;
            document.getElementById('showingEnd').textContent = Math.min(endIndex, this.filteredPatients.length);
            document.getElementById('showingTotal').textContent = this.filteredPatients.length;
        }

        renderPagination() {
            const pagination = document.getElementById('pagination');
            const totalPages = Math.ceil(this.filteredPatients.length / this.itemsPerPage);

            if (totalPages <= 1) {
                pagination.innerHTML = '';
                return;
            }

            let html = '';

            // Prev button
            html += `<button class="page-btn" ${this.currentPage === 1 ? 'disabled' : ''} data-page="${this.currentPage - 1}">
                <i class="fas fa-chevron-left"></i>
            </button>`;

            // Page numbers
            const maxVisiblePages = 5;
            let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            if (startPage > 1) {
                html += `<button class="page-btn" data-page="1">1</button>`;
                if (startPage > 2) html += `<span style="padding: 0 8px; color: var(--gray-400);">...</span>`;
            }

            for (let i = startPage; i <= endPage; i++) {
                html += `<button class="page-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) html += `<span style="padding: 0 8px; color: var(--gray-400);">...</span>`;
                html += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
            }

            // Next button
            html += `<button class="page-btn" ${this.currentPage === totalPages ? 'disabled' : ''} data-page="${this.currentPage + 1}">
                <i class="fas fa-chevron-right"></i>
            </button>`;

            pagination.innerHTML = html;

            // Bind pagination clicks
            pagination.querySelectorAll('.page-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const page = parseInt(btn.getAttribute('data-page'));
                    if (!isNaN(page) && page >= 1 && page <= totalPages) {
                        this.currentPage = page;
                        this.renderTable();
                        this.renderPagination();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                });
            });
        }

        updateSortUI(activeTh) {
            document.querySelectorAll('.sortable').forEach(th => {
                th.classList.remove('sort-asc', 'sort-desc');
            });
            activeTh.classList.add(this.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
        }

        generateNoRM() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const todayPrefix = `RM-${year}${month}${day}`;
            const todayCount = this.patients.filter(p => p.noRM && p.noRM.startsWith(todayPrefix)).length;
            const sequence = String(todayCount + 1).padStart(3, '0');
            return `${todayPrefix}-${sequence}`;
        }

        calculateAge() {
            const birthDate = document.getElementById('tanggalLahir').value;
            if (!birthDate) {
                document.getElementById('umur').value = '';
                return;
            }

            const birth = new Date(birthDate);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const monthDiff = today.getMonth() - birth.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                age--;
            }

            document.getElementById('umur').value = `${age} tahun`;
        }

        handlePhotoUpload(e) {
            const file = e.target.files[0];
            if (!file) return;

            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                UI.showToast('Format foto harus JPG atau PNG!', 'error');
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                UI.showToast('Ukuran foto maksimal 2MB!', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                this.currentPhotoData = event.target.result;
                document.getElementById('photoPreview').innerHTML = `<img src="${this.currentPhotoData}" alt="Preview">`;
                document.getElementById('photoPreview').classList.add('has-image');
                document.getElementById('btnRemovePhoto').style.display = 'inline-flex';
            };
            reader.readAsDataURL(file);
        }

        removePhoto() {
            this.currentPhotoData = null;
            document.getElementById('photoInput').value = '';
            document.getElementById('photoPreview').innerHTML = `
                <i class="fas fa-camera"></i>
                <span>Upload Foto</span>
            `;
            document.getElementById('photoPreview').classList.remove('has-image');
            document.getElementById('btnRemovePhoto').style.display = 'none';
        }

        openAddModal() {
            this.editingId = null;
            this.currentPhotoData = null;
            document.getElementById('patientForm').reset();
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-user-plus"></i><span>Tambah Pasien Baru</span>';
            document.getElementById('btnSubmitForm').innerHTML = '<i class="fas fa-save"></i><span>Simpan Data</span>';
            document.getElementById('noRM').value = this.generateNoRM();
            this.removePhoto();
            this.clearAllErrors();

            // Set default status
            document.getElementById('statusPasien').value = 'Aktif';

            // Hide BPJS fields by default
            document.getElementById('bpjsNumberGroup').style.display = 'none';
            document.getElementById('bpjsClassGroup').style.display = 'none';

            UI.showModal('patientModal');
        }

        openEditModal(id) {
            const patient = this.patients.find(p => p.id === id);
            if (!patient) return;

            this.editingId = id;
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-user-edit"></i><span>Edit Data Pasien</span>';
            document.getElementById('btnSubmitForm').innerHTML = '<i class="fas fa-save"></i><span>Update Data</span>';

            // Populate form
            document.getElementById('noRM').value = patient.noRM || '';
            document.getElementById('nik').value = patient.nik || '';
            document.getElementById('nama').value = patient.nama || '';
            document.getElementById('tempatLahir').value = patient.tempatLahir || '';
            document.getElementById('tanggalLahir').value = patient.tanggalLahir || '';
            document.getElementById('golonganDarah').value = patient.golonganDarah || '';
            document.getElementById('agama').value = patient.agama || '';
            document.getElementById('statusNikah').value = patient.statusNikah || patient.statusPernikahan || '';
            document.getElementById('pekerjaan').value = patient.pekerjaan || '';
            document.getElementById('noHP').value = patient.noHP || '';
            document.getElementById('email').value = patient.email || '';
            document.getElementById('alamat').value = patient.alamat || '';
            document.getElementById('jenisPembayaran').value = patient.jenisPembayaran || '';
            document.getElementById('nomorBPJS').value = patient.nomorBPJS || '';
            document.getElementById('kelasBPJS').value = patient.kelasBPJS || '';
            document.getElementById('statusPasien').value = patient.status || patient.statusPasien || 'Aktif';

            // Set gender radio
            const genderRadio = document.querySelector(`input[name="jenisKelamin"][value="${patient.jenisKelamin}"]`);
            if (genderRadio) genderRadio.checked = true;

            // Calculate age
            this.calculateAge();

            // Show BPJS fields if needed
            const showBPJS = patient.jenisPembayaran === 'BPJS';
            document.getElementById('bpjsNumberGroup').style.display = showBPJS ? 'flex' : 'none';
            document.getElementById('bpjsClassGroup').style.display = showBPJS ? 'flex' : 'none';

            // Load photo
            if (patient.photo) {
                this.currentPhotoData = patient.photo;
                document.getElementById('photoPreview').innerHTML = `<img src="${patient.photo}" alt="Preview">`;
                document.getElementById('photoPreview').classList.add('has-image');
                document.getElementById('btnRemovePhoto').style.display = 'inline-flex';
            } else {
                this.removePhoto();
            }

            this.clearAllErrors();
            UI.showModal('patientModal');
        }

        viewPatient(id) {
            const patient = this.patients.find(p => p.id === id);
            if (!patient) return;

            document.getElementById('detailModal').dataset.patientId = id;

            const age = this.calculateAgeFromDate(patient.tanggalLahir);

            const detailBody = document.getElementById('detailBody');
            detailBody.innerHTML = `
                <div class="detail-header">
                    <div class="detail-avatar" id="detailAvatar" data-photo="${patient.photo || ''}">
                        ${patient.photo ? `<img src="${patient.photo}" alt="${patient.nama}">` : `<i class="fas fa-user"></i>`}
                    </div>
                    <div class="detail-main-info">
                        <h2>${patient.nama}</h2>
                        <div class="noRM">${patient.noRM}</div>
                        <div class="detail-badges">
                            <span class="status-badge ${(patient.status || patient.statusPasien) === 'Aktif' ? 'active' : 'inactive'}">
                                <i class="fas fa-circle"></i> ${patient.status || patient.statusPasien || 'Aktif'}
                            </span>
                            <span class="payment-badge ${(patient.jenisPembayaran || '').toLowerCase()}">
                                ${patient.jenisPembayaran || '-'}
                            </span>
                            <span class="gender-badge ${patient.jenisKelamin === 'Laki-laki' ? 'male' : 'female'}">
                                <i class="fas ${patient.jenisKelamin === 'Laki-laki' ? 'fa-mars' : 'fa-venus'}"></i>
                                ${patient.jenisKelamin || '-'}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="detail-grid">
                    <div class="detail-item">
                        <label>NIK</label>
                        <span>${patient.nik || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Tempat, Tanggal Lahir</label>
                        <span>${patient.tempatLahir || '-'}, ${this.formatDate(patient.tanggalLahir)} ${age ? `(${age})` : ''}</span>
                    </div>
                    <div class="detail-item">
                        <label>Golongan Darah</label>
                        <span>${patient.golonganDarah || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Agama</label>
                        <span>${patient.agama || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Status Pernikahan</label>
                        <span>${patient.statusNikah || patient.statusPernikahan || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Pekerjaan</label>
                        <span>${patient.pekerjaan || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <label>No HP</label>
                        <span>${patient.noHP || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Email</label>
                        <span>${patient.email || '-'}</span>
                    </div>
                    <div class="detail-item full-width">
                        <label>Alamat</label>
                        <span>${patient.alamat || '-'}</span>
                    </div>
                    ${patient.jenisPembayaran === 'BPJS' ? `
                    <div class="detail-item">
                        <label>Nomor BPJS</label>
                        <span>${patient.nomorBPJS || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Kelas BPJS</label>
                        <span>Kelas ${patient.kelasBPJS || '-'}</span>
                    </div>
                    ` : ''}
                    <div class="detail-item full-width">
                        <label>Terdaftar Sejak</label>
                        <span>${this.formatDateTime(patient.createdAt)}</span>
                    </div>
                </div>
            `;

            // Bind avatar click
            setTimeout(() => {
                const avatar = document.getElementById('detailAvatar');
                if (avatar) {
                    avatar.addEventListener('click', () => {
                        if (patient.photo) {
                            document.getElementById('photoPreviewLarge').src = patient.photo;
                            UI.showModal('photoModal');
                        }
                    });
                }
            }, 100);

            UI.showModal('detailModal');
        }

        openDeleteModal(id, name) {
            this.deletingId = id;
            document.getElementById('deletePatientName').textContent = name;
            UI.showModal('deleteModal');
        }

        confirmDelete() {
            if (!this.deletingId) return;

            const patient = this.patients.find(p => p.id === this.deletingId);
            if (!patient) return;

            // Remove from patients array
            this.patients = this.patients.filter(p => p.id !== this.deletingId);
            Storage.set(Storage.KEYS.PATIENTS, this.patients);

            // Also remove from users (if exists)
            const users = Storage.get(Storage.KEYS.USERS) || [];
            const updatedUsers = users.filter(u => u.id !== this.deletingId);
            Storage.set(Storage.KEYS.USERS, updatedUsers);

            this.closeModal('deleteModal');
            UI.showToast(`Data pasien "${patient.nama}" berhasil dihapus!`, 'success');
            this.deletingId = null;
            this.refresh();
        }

        validateField(fieldId) {
            const field = document.getElementById(fieldId);
            if (!field) return true;

            let value = field.value.trim();

            // Special case for radio
            if (fieldId === 'jenisKelamin') {
                const selected = document.querySelector('input[name="jenisKelamin"]:checked');
                value = selected ? selected.value : '';
            }

            const error = Validator.validate(fieldId, value);
            if (error) {
                this.showError(fieldId, error);
                return false;
            }

            this.clearError(fieldId);
            return true;
        }

        showError(fieldId, message) {
            const errorEl = document.getElementById(`error-${fieldId}`);
            if (errorEl) {
                errorEl.textContent = message;
                errorEl.classList.add('show');
            }
        }

        clearError(fieldId) {
            const errorEl = document.getElementById(`error-${fieldId}`);
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('show');
            }
        }

        clearAllErrors() {
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
                el.classList.remove('show');
            });
        }

        handleFormSubmit(e) {
            e.preventDefault();

            // Validate all fields
            let isValid = true;
            const fields = ['nik', 'nama', 'tempatLahir', 'tanggalLahir', 'alamat', 'noHP', 'email', 'pekerjaan', 'jenisKelamin', 'golonganDarah', 'agama', 'statusNikah', 'jenisPembayaran', 'statusPasien'];

            fields.forEach(field => {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                document.getElementById('patientForm').classList.add('shake');
                setTimeout(() => document.getElementById('patientForm').classList.remove('shake'), 400);
                UI.showToast('Mohon lengkapi semua data dengan benar!', 'error');
                return;
            }

            // Check email duplicate (except for editing)
            const email = document.getElementById('email').value.trim().toLowerCase();
            const duplicate = this.patients.find(p =>
                p.email.toLowerCase() === email &&
                (!this.editingId || p.id !== this.editingId)
            );
            if (duplicate) {
                this.showError('email', 'Email sudah digunakan');
                UI.showToast('Email sudah terdaftar!', 'error');
                return;
            }

            // Check NIK duplicate
            const nik = document.getElementById('nik').value.trim();
            const nikDuplicate = this.patients.find(p =>
                p.nik === nik &&
                (!this.editingId || p.id !== this.editingId)
            );
            if (nikDuplicate) {
                this.showError('nik', 'NIK sudah terdaftar');
                UI.showToast('NIK sudah terdaftar!', 'error');
                return;
            }

            // Collect data
            const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked').value;

            const patientData = {
                id: this.editingId || 'PAT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                noRM: document.getElementById('noRM').value,
                nik: nik,
                nama: document.getElementById('nama').value.trim(),
                tempatLahir: document.getElementById('tempatLahir').value.trim(),
                tanggalLahir: document.getElementById('tanggalLahir').value,
                jenisKelamin: jenisKelamin,
                golonganDarah: document.getElementById('golonganDarah').value,
                agama: document.getElementById('agama').value,
                statusNikah: document.getElementById('statusNikah').value,
                pekerjaan: document.getElementById('pekerjaan').value.trim(),
                noHP: document.getElementById('noHP').value.trim(),
                email: email,
                alamat: document.getElementById('alamat').value.trim(),
                jenisPembayaran: document.getElementById('jenisPembayaran').value,
                nomorBPJS: document.getElementById('nomorBPJS').value.trim(),
                kelasBPJS: document.getElementById('kelasBPJS').value,
                status: document.getElementById('statusPasien').value,
                statusPasien: document.getElementById('statusPasien').value,
                photo: this.currentPhotoData,
                role: 'pasien',
                createdAt: this.editingId ? (this.patients.find(p => p.id === this.editingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            if (this.editingId) {
                // Update existing
                const index = this.patients.findIndex(p => p.id === this.editingId);
                if (index !== -1) {
                    this.patients[index] = patientData;

                    // Also update users if exists
                    const users = Storage.get(Storage.KEYS.USERS) || [];
                    const userIndex = users.findIndex(u => u.id === this.editingId);
                    if (userIndex !== -1) {
                        users[userIndex] = {
                            ...users[userIndex],
                            nama: patientData.nama,
                            email: patientData.email,
                            photo: patientData.photo,
                            updatedAt: patientData.updatedAt
                        };
                        Storage.set(Storage.KEYS.USERS, users);
                    }
                }
                UI.showToast('Data pasien berhasil diupdate!', 'success');
            } else {
                // Add new
                this.patients.push(patientData);

                // Also add to users
                const users = Storage.get(Storage.KEYS.USERS) || [];
                users.push({
                    id: patientData.id,
                    username: patientData.email.split('@')[0],
                    email: patientData.email,
                    password: 'hashed_temp_password',
                    nama: patientData.nama,
                    role: 'pasien',
                    photo: patientData.photo,
                    status: 'active',
                    createdAt: patientData.createdAt
                });
                Storage.set(Storage.KEYS.USERS, users);

                UI.showToast('Pasien baru berhasil ditambahkan!', 'success');
            }

            Storage.set(Storage.KEYS.PATIENTS, this.patients);
            this.closeModal('patientModal');
            this.refresh();
        }

        closeModal(id) {
            UI.hideModal(id);
        }

        logout() {
            Storage.remove(Storage.KEYS.CURRENT_USER);
            UI.showToast('Logout berhasil! Mengalihkan...', 'success');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
        }

        // ==================== EXPORT FUNCTIONS ====================
        exportExcel() {
            if (this.filteredPatients.length === 0) {
                UI.showToast('Tidak ada data untuk di-export!', 'warning');
                return;
            }

            // Generate CSV
            const headers = ['No RM', 'NIK', 'Nama', 'Jenis Kelamin', 'Tempat Lahir', 'Tanggal Lahir', 'No HP', 'Email', 'Jenis Pembayaran', 'Status'];
            const rows = this.filteredPatients.map(p => [
                p.noRM,
                p.nik,
                p.nama,
                p.jenisKelamin,
                p.tempatLahir,
                p.tanggalLahir,
                p.noHP,
                p.email,
                p.jenisPembayaran,
                p.status || p.statusPasien
            ]);

            const csv = [
                headers.join(','),
                ...rows.map(row => row.map(cell => `"${cell || ''}"`).join(','))
            ].join('\n');

            // Download as CSV
            const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `data-pasien-hmris-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);

            UI.showToast('Data berhasil di-export ke Excel (CSV)!', 'success');
        }

        exportPDF() {
            if (this.filteredPatients.length === 0) {
                UI.showToast('Tidak ada data untuk di-export!', 'warning');
                return;
            }

            // Open print window with formatted HTML
            const printWindow = window.open('', '_blank');
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Laporan Data Pasien - HMRIS</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: 'Arial', sans-serif; padding: 20px; color: #333; }
                        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #0D9488; padding-bottom: 20px; }
                        .header h1 { color: #0D9488; font-size: 24px; margin-bottom: 5px; }
                        .header p { color: #666; font-size: 12px; }
                        .info { margin-bottom: 20px; font-size: 12px; }
                        table { width: 100%; border-collapse: collapse; font-size: 11px; }
                        th { background: #0D9488; color: white; padding: 10px 8px; text-align: left; }
                        td { padding: 8px; border: 1px solid #ddd; }
                        tr:nth-child(even) { background: #f9f9f9; }
                        .footer { margin-top: 30px; text-align: right; font-size: 11px; }
                        .signature { margin-top: 50px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>HOSPITAL MEDICAL RECORD INFORMATION SYSTEM</h1>
                        <p>Laporan Data Pasien</p>
                    </div>
                    <div class="info">
                        <p><strong>Tanggal:</strong> ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Total Data:</strong> ${this.filteredPatients.length} pasien</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>No RM</th>
                                <th>NIK</th>
                                <th>Nama</th>
                                <th>JK</th>
                                <th>TTL</th>
                                <th>No HP</th>
                                <th>Pembayaran</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.filteredPatients.map((p, i) => `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${p.noRM}</td>
                                    <td>${p.nik}</td>
                                    <td>${p.nama}</td>
                                    <td>${p.jenisKelamin === 'Laki-laki' ? 'L' : 'P'}</td>
                                    <td>${p.tempatLahir}, ${this.formatDate(p.tanggalLahir)}</td>
                                    <td>${p.noHP}</td>
                                    <td>${p.jenisPembayaran}</td>
                                    <td>${p.status || p.statusPasien}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="signature">
                        <p>Dicetak oleh: ${this.currentUser.nama || this.currentUser.username}</p>
                        <p>Role: ${ROLE_CONFIG[this.currentUser.role]?.name || this.currentUser.role}</p>
                    </div>
                    <div class="footer">
                        <p>© 2024 HMRIS - Hospital Medical Record Information System</p>
                    </div>
                </body>
                </html>
            `;
            printWindow.document.write(html);
            printWindow.document.close();
            setTimeout(() => {
                printWindow.print();
            }, 500);

            UI.showToast('Laporan PDF dibuka di tab baru!', 'success');
        }

        printTable() {
            window.print();
            UI.showToast('Mempersiapkan print...', 'info');
        }

        // ==================== UTILITIES ====================
        formatDate(dateString) {
            if (!dateString) return '-';
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
        }

        formatDateTime(dateString) {
            if (!dateString) return '-';
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', {
                day: '2-digit', month: 'long', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        }

        calculateAgeFromDate(dateString) {
            if (!dateString) return '';
            const birth = new Date(dateString);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const monthDiff = today.getMonth() - birth.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                age--;
            }

            return `${age} tahun`;
        }
    }

    // ==================== INITIALIZE ====================
    document.addEventListener('DOMContentLoaded', () => {
        new PatientManager();
    });

})();