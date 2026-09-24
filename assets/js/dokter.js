

(function () {
    'use strict';

    // ==================== STORAGE MANAGER ====================
    const Storage = {
        KEYS: {
            USERS: 'hmris_users',
            PATIENTS: 'hmris_patients',
            DOCTORS: 'hmris_doctors',
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
            { name: 'Data Pasien', icon: 'fa-users', href: 'pasien.html', },
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html' },
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html', active: true },
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
            { name: 'Data Pasien', icon: 'fa-users', href: 'pasien.html' },
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
            { name: 'Data Pasien', icon: 'fa-users', href: 'pasien.html' },
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
            { name: 'Data Pasien', icon: 'fa-users', href: 'pasien.html' },
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html' },
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' , active: true},
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
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' , active: true},
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

                case 'nomorSIP':
                    if (!value) return 'Nomor SIP wajib diisi';
                    if (value.length < 5) return 'Nomor SIP minimal 5 karakter';
                    return '';

                case 'nomorSTR':
                    if (!value) return 'Nomor STR wajib diisi';
                    if (value.length < 5) return 'Nomor STR minimal 5 karakter';
                    return '';

                case 'spesialis':
                    if (!value) return 'Spesialis wajib dipilih';
                    return '';

                case 'poli':
                    if (!value) return 'Poli wajib dipilih';
                    return '';

                case 'jenisKelamin':
                    if (!value) return 'Jenis kelamin wajib dipilih';
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

                case 'pendidikan':
                    if (!value) return 'Pendidikan wajib diisi';
                    return '';

                case 'universitas':
                    if (!value) return 'Universitas wajib diisi';
                    return '';

                case 'pengalaman':
                    if (!value && value !== 0) return 'Pengalaman wajib diisi';
                    if (parseInt(value) < 0) return 'Pengalaman tidak valid';
                    return '';

                case 'hariPraktik':
                    if (!value || value.length === 0) return 'Minimal pilih 1 hari praktik';
                    return '';

                case 'jamMulai':
                    if (!value) return 'Jam mulai wajib diisi';
                    return '';

                case 'jamSelesai':
                    if (!value) return 'Jam selesai wajib diisi';
                    return '';

                case 'status':
                    if (!value) return 'Status wajib dipilih';
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

    // ==================== DOCTOR MANAGER ====================
    class DoctorManager {
        constructor() {
            this.doctors = Storage.get(Storage.KEYS.DOCTORS) || [];
            this.filteredDoctors = [...this.doctors];
            this.currentPage = 1;
            this.itemsPerPage = 10;
            this.sortField = 'createdAt';
            this.sortDirection = 'desc';
            this.searchTerm = '';
            this.filters = { specialist: '', poli: '', status: '' };
            this.editingId = null;
            this.deletingId = null;
            this.currentPhotoData = null;

            // Seed default doctors if empty
            if (this.doctors.length === 0) {
                this.seedDefaultDoctors();
            }

            this.init();
        }

        seedDefaultDoctors() {
            const defaultDoctors = [
                {
                    id: 'DR-20240101-001',
                    nik: '3201234567890001',
                    nama: 'dr. Ahmad Fauzi, Sp.PD',
                    nomorSIP: 'SIP-2024-001',
                    nomorSTR: 'STR-2024-001',
                    spesialis: 'Penyakit Dalam',
                    poli: 'Poli Spesialis',
                    jenisKelamin: 'Laki-laki',
                    tanggalLahir: '1975-05-15',
                    alamat: 'Jl. Sudirman No. 123, Jakarta',
                    noHP: '081234567890',
                    email: 'ahmad.fauzi@hmris.com',
                    pendidikan: 'Spesialis Penyakit Dalam',
                    universitas: 'Universitas Indonesia',
                    pengalaman: 15,
                    hariPraktik: ['Senin', 'Rabu', 'Jumat'],
                    jamMulai: '08:00',
                    jamSelesai: '14:00',
                    status: 'Aktif',
                    photo: null,
                    createdAt: '2024-01-01T08:00:00.000Z'
                },
                {
                    id: 'DR-20240101-002',
                    nik: '3201234567890002',
                    nama: 'dr. Siti Nurhaliza, Sp.A',
                    nomorSIP: 'SIP-2024-002',
                    nomorSTR: 'STR-2024-002',
                    spesialis: 'Anak',
                    poli: 'Poli Anak',
                    jenisKelamin: 'Perempuan',
                    tanggalLahir: '1980-08-22',
                    alamat: 'Jl. Gatot Subroto No. 45, Jakarta',
                    noHP: '081234567891',
                    email: 'siti.nurhaliza@hmris.com',
                    pendidikan: 'Spesialis Anak',
                    universitas: 'Universitas Gadjah Mada',
                    pengalaman: 12,
                    hariPraktik: ['Selasa', 'Kamis', 'Sabtu'],
                    jamMulai: '09:00',
                    jamSelesai: '15:00',
                    status: 'Aktif',
                    photo: null,
                    createdAt: '2024-01-02T08:00:00.000Z'
                },
                {
                    id: 'DR-20240101-003',
                    nik: '3201234567890003',
                    nama: 'dr. Budi Santoso, Sp.B',
                    nomorSIP: 'SIP-2024-003',
                    nomorSTR: 'STR-2024-003',
                    spesialis: 'Bedah',
                    poli: 'Rawat Inap',
                    jenisKelamin: 'Laki-laki',
                    tanggalLahir: '1972-03-10',
                    alamat: 'Jl. Thamrin No. 78, Jakarta',
                    noHP: '081234567892',
                    email: 'budi.santoso@hmris.com',
                    pendidikan: 'Spesialis Bedah',
                    universitas: 'Universitas Airlangga',
                    pengalaman: 20,
                    hariPraktik: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
                    jamMulai: '07:00',
                    jamSelesai: '16:00',
                    status: 'Jaga',
                    photo: null,
                    createdAt: '2024-01-03T08:00:00.000Z'
                },
                {
                    id: 'DR-20240101-004',
                    nik: '3201234567890004',
                    nama: 'dr. Rina Wijaya, Sp.M',
                    nomorSIP: 'SIP-2024-004',
                    nomorSTR: 'STR-2024-004',
                    spesialis: 'Mata',
                    poli: 'Poli Spesialis',
                    jenisKelamin: 'Perempuan',
                    tanggalLahir: '1985-11-28',
                    alamat: 'Jl. Kuningan No. 12, Jakarta',
                    noHP: '081234567893',
                    email: 'rina.wijaya@hmris.com',
                    pendidikan: 'Spesialis Mata',
                    universitas: 'Universitas Padjadjaran',
                    pengalaman: 8,
                    hariPraktik: ['Senin', 'Rabu'],
                    jamMulai: '10:00',
                    jamSelesai: '14:00',
                    status: 'Cuti',
                    photo: null,
                    createdAt: '2024-01-04T08:00:00.000Z'
                },
                {
                    id: 'DR-20240101-005',
                    nik: '3201234567890005',
                    nama: 'dr. Hendra Kusuma',
                    nomorSIP: 'SIP-2024-005',
                    nomorSTR: 'STR-2024-005',
                    spesialis: 'Umum',
                    poli: 'IGD',
                    jenisKelamin: 'Laki-laki',
                    tanggalLahir: '1990-06-15',
                    alamat: 'Jl. Rasuna Said No. 56, Jakarta',
                    noHP: '081234567894',
                    email: 'hendra.kusuma@hmris.com',
                    pendidikan: 'Kedokteran Umum',
                    universitas: 'Universitas Trisakti',
                    pengalaman: 5,
                    hariPraktik: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
                    jamMulai: '00:00',
                    jamSelesai: '23:59',
                    status: 'Jaga',
                    photo: null,
                    createdAt: '2024-01-05T08:00:00.000Z'
                }
            ];

            this.doctors = defaultDoctors;
            Storage.set(Storage.KEYS.DOCTORS, this.doctors);
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

            // Add doctor button
            document.getElementById('btnAddDoctor').addEventListener('click', () => this.openAddModal());

            // Modal close buttons
            document.getElementById('btnCloseModal').addEventListener('click', () => this.closeModal('doctorModal'));
            document.getElementById('btnCancelForm').addEventListener('click', () => this.closeModal('doctorModal'));
            document.getElementById('btnCloseDetail').addEventListener('click', () => this.closeModal('detailModal'));
            document.getElementById('btnCloseDetail2').addEventListener('click', () => this.closeModal('detailModal'));
            document.getElementById('btnClosePhoto').addEventListener('click', () => this.closeModal('photoModal'));
            document.getElementById('btnCancelDelete').addEventListener('click', () => this.closeModal('deleteModal'));

            // Close modal on overlay click
            ['doctorModal', 'detailModal', 'photoModal', 'deleteModal'].forEach(id => {
                document.getElementById(id).addEventListener('click', (e) => {
                    if (e.target.id === id) this.closeModal(id);
                });
            });

            // Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    ['doctorModal', 'detailModal', 'photoModal', 'deleteModal'].forEach(id => {
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

            // Real-time validation
            const fields = ['nik', 'nama', 'nomorSIP', 'nomorSTR', 'alamat', 'noHP', 'email', 'pendidikan', 'universitas', 'pengalaman'];
            fields.forEach(field => {
                const el = document.getElementById(field);
                if (el) {
                    el.addEventListener('blur', () => this.validateField(field));
                    el.addEventListener('input', () => this.clearError(field));
                }
            });

            // Search
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
            document.getElementById('filterSpecialist').addEventListener('change', (e) => {
                this.filters.specialist = e.target.value;
                this.currentPage = 1;
                this.applyFilters();
            });

            document.getElementById('filterPoli').addEventListener('change', (e) => {
                this.filters.poli = e.target.value;
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
            document.getElementById('doctorForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

            // Detail modal edit button
            document.getElementById('btnEditFromDetail').addEventListener('click', () => {
                const currentId = document.getElementById('detailModal').dataset.doctorId;
                this.closeModal('detailModal');
                this.openEditModal(currentId);
            });

            // Delete confirmation
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
            this.doctors = Storage.get(Storage.KEYS.DOCTORS) || [];
            this.applyFilters();
            this.updateStats();
        }

        updateStats() {
            const total = this.doctors.length;
            const active = this.doctors.filter(d => d.status === 'Aktif').length;
            const leave = this.doctors.filter(d => d.status === 'Cuti').length;
            const onDuty = this.doctors.filter(d => d.status === 'Jaga').length;

            this.animateCounter('statTotal', total);
            this.animateCounter('statActive', active);
            this.animateCounter('statLeave', leave);
            this.animateCounter('statOnDuty', onDuty);
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
            let filtered = [...this.doctors];

            // Search
            if (this.searchTerm) {
                filtered = filtered.filter(d =>
                    (d.nama || '').toLowerCase().includes(this.searchTerm) ||
                    (d.id || '').toLowerCase().includes(this.searchTerm) ||
                    (d.spesialis || '').toLowerCase().includes(this.searchTerm) ||
                    (d.nomorSIP || '').toLowerCase().includes(this.searchTerm) ||
                    (d.nomorSTR || '').toLowerCase().includes(this.searchTerm) ||
                    (d.email || '').toLowerCase().includes(this.searchTerm)
                );
            }

            // Filters
            if (this.filters.specialist) {
                filtered = filtered.filter(d => d.spesialis === this.filters.specialist);
            }
            if (this.filters.poli) {
                filtered = filtered.filter(d => d.poli === this.filters.poli);
            }
            if (this.filters.status) {
                filtered = filtered.filter(d => d.status === this.filters.status);
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

            this.filteredDoctors = filtered;
            this.renderTable();
            this.renderPagination();
        }

        renderTable() {
            const tableBody = document.getElementById('tableBody');
            const emptyState = document.getElementById('emptyState');

            if (this.filteredDoctors.length === 0) {
                tableBody.innerHTML = '';
                emptyState.style.display = 'block';
                return;
            }

            emptyState.style.display = 'none';

            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            const pageData = this.filteredDoctors.slice(startIndex, endIndex);

            tableBody.innerHTML = pageData.map(doctor => `
                <tr data-id="${doctor.id}">
                    <td><code style="background: var(--gray-100); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">${doctor.id}</code></td>
                    <td>
                        <div class="doctor-avatar" data-photo="${doctor.photo || ''}" data-name="${doctor.nama}">
                            ${doctor.photo ? `<img src="${doctor.photo}" alt="${doctor.nama}">` : `<i class="fas fa-user-md"></i>`}
                        </div>
                    </td>
                    <td>
                        <div class="doctor-info">
                            <div class="doctor-details">
                                <div class="doctor-name">${doctor.nama}</div>
                                <div class="doctor-id">${doctor.nomorSIP || '-'}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="specialist-badge">${doctor.spesialis || '-'}</span>
                    </td>
                    <td>
                        <span class="poli-badge">${doctor.poli || '-'}</span>
                    </td>
                    <td>
                        <div class="schedule-info">
                            <div class="schedule-days">
                                ${(doctor.hariPraktik || []).slice(0, 3).map(day => `<span class="day-tag">${day.substring(0, 3)}</span>`).join('')}
                                ${(doctor.hariPraktik || []).length > 3 ? `<span class="day-tag">+${doctor.hariPraktik.length - 3}</span>` : ''}
                            </div>
                            <div class="schedule-time">${doctor.jamMulai || ''} - ${doctor.jamSelesai || ''}</div>
                        </div>
                    </td>
                    <td>
                        <span class="status-badge ${(doctor.status || '').toLowerCase().replace('-', '')}">
                            <i class="fas fa-circle"></i>
                            ${doctor.status || 'Aktif'}
                        </span>
                    </td>
                    <td class="text-center">
                        <div class="action-buttons">
                            <button class="action-btn view" data-action="view" data-id="${doctor.id}" title="Detail">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn edit" data-action="edit" data-id="${doctor.id}" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete" data-action="delete" data-id="${doctor.id}" data-name="${doctor.nama}" title="Hapus">
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

                    if (action === 'view') this.viewDoctor(id);
                    if (action === 'edit') this.openEditModal(id);
                    if (action === 'delete') this.openDeleteModal(id, btn.getAttribute('data-name'));
                });
            });

            // Bind avatar click
            tableBody.querySelectorAll('.doctor-avatar').forEach(avatar => {
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
            document.getElementById('showingStart').textContent = this.filteredDoctors.length > 0 ? startIndex + 1 : 0;
            document.getElementById('showingEnd').textContent = Math.min(endIndex, this.filteredDoctors.length);
            document.getElementById('showingTotal').textContent = this.filteredDoctors.length;
        }

        renderPagination() {
            const pagination = document.getElementById('pagination');
            const totalPages = Math.ceil(this.filteredDoctors.length / this.itemsPerPage);

            if (totalPages <= 1) {
                pagination.innerHTML = '';
                return;
            }

            let html = '';

            html += `<button class="page-btn" ${this.currentPage === 1 ? 'disabled' : ''} data-page="${this.currentPage - 1}">
                <i class="fas fa-chevron-left"></i>
            </button>`;

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

            html += `<button class="page-btn" ${this.currentPage === totalPages ? 'disabled' : ''} data-page="${this.currentPage + 1}">
                <i class="fas fa-chevron-right"></i>
            </button>`;

            pagination.innerHTML = html;

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

        generateIdDokter() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const todayPrefix = `DR-${year}${month}${day}`;
            const todayCount = this.doctors.filter(d => d.id && d.id.startsWith(todayPrefix)).length;
            const sequence = String(todayCount + 1).padStart(3, '0');
            return `${todayPrefix}-${sequence}`;
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
            document.getElementById('doctorForm').reset();
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-user-md"></i><span>Tambah Dokter Baru</span>';
            document.getElementById('btnSubmitForm').innerHTML = '<i class="fas fa-save"></i><span>Simpan Data</span>';
            document.getElementById('idDokter').value = this.generateIdDokter();
            this.removePhoto();
            this.clearAllErrors();

            document.getElementById('status').value = 'Aktif';

            UI.showModal('doctorModal');
        }

        openEditModal(id) {
            const doctor = this.doctors.find(d => d.id === id);
            if (!doctor) return;

            this.editingId = id;
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-user-edit"></i><span>Edit Data Dokter</span>';
            document.getElementById('btnSubmitForm').innerHTML = '<i class="fas fa-save"></i><span>Update Data</span>';

            document.getElementById('idDokter').value = doctor.id || '';
            document.getElementById('nik').value = doctor.nik || '';
            document.getElementById('nama').value = doctor.nama || '';
            document.getElementById('nomorSIP').value = doctor.nomorSIP || '';
            document.getElementById('nomorSTR').value = doctor.nomorSTR || '';
            document.getElementById('spesialis').value = doctor.spesialis || '';
            document.getElementById('poli').value = doctor.poli || '';
            document.getElementById('tanggalLahir').value = doctor.tanggalLahir || '';
            document.getElementById('alamat').value = doctor.alamat || '';
            document.getElementById('noHP').value = doctor.noHP || '';
            document.getElementById('email').value = doctor.email || '';
            document.getElementById('pendidikan').value = doctor.pendidikan || '';
            document.getElementById('universitas').value = doctor.universitas || '';
            document.getElementById('pengalaman').value = doctor.pengalaman || '';
            document.getElementById('jamMulai').value = doctor.jamMulai || '';
            document.getElementById('jamSelesai').value = doctor.jamSelesai || '';
            document.getElementById('status').value = doctor.status || 'Aktif';

            // Set gender radio
            const genderRadio = document.querySelector(`input[name="jenisKelamin"][value="${doctor.jenisKelamin}"]`);
            if (genderRadio) genderRadio.checked = true;

            // Set days checkboxes
            document.querySelectorAll('input[name="hariPraktik"]').forEach(cb => {
                cb.checked = (doctor.hariPraktik || []).includes(cb.value);
            });

            // Load photo
            if (doctor.photo) {
                this.currentPhotoData = doctor.photo;
                document.getElementById('photoPreview').innerHTML = `<img src="${doctor.photo}" alt="Preview">`;
                document.getElementById('photoPreview').classList.add('has-image');
                document.getElementById('btnRemovePhoto').style.display = 'inline-flex';
            } else {
                this.removePhoto();
            }

            this.clearAllErrors();
            UI.showModal('doctorModal');
        }

        viewDoctor(id) {
            const doctor = this.doctors.find(d => d.id === id);
            if (!doctor) return;

            document.getElementById('detailModal').dataset.doctorId = id;

            const age = this.calculateAge(doctor.tanggalLahir);

            const detailBody = document.getElementById('detailBody');
            detailBody.innerHTML = `
                <div class="detail-header">
                    <div class="detail-avatar" id="detailAvatar" data-photo="${doctor.photo || ''}">
                        ${doctor.photo ? `<img src="${doctor.photo}" alt="${doctor.nama}">` : `<i class="fas fa-user-md"></i>`}
                    </div>
                    <div class="detail-main-info">
                        <h2>${doctor.nama}</h2>
                        <div class="id-doctor">${doctor.id}</div>
                        <div class="detail-badges">
                            <span class="status-badge ${(doctor.status || '').toLowerCase().replace('-', '')}">
                                <i class="fas fa-circle"></i> ${doctor.status || 'Aktif'}
                            </span>
                            <span class="specialist-badge">${doctor.spesialis || '-'}</span>
                            <span class="poli-badge">${doctor.poli || '-'}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-grid">
                    <div class="detail-item">
                        <label>NIK</label>
                        <span>${doctor.nik || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Tanggal Lahir</label>
                        <span>${this.formatDate(doctor.tanggalLahir)} ${age ? `(${age})` : ''}</span>
                    </div>
                    <div class="detail-item">
                        <label>Jenis Kelamin</label>
                        <span>${doctor.jenisKelamin || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Pengalaman</label>
                        <span>${doctor.pengalaman || 0} tahun</span>
                    </div>
                    <div class="detail-item">
                        <label>No HP</label>
                        <span>${doctor.noHP || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Email</label>
                        <span>${doctor.email || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Nomor SIP</label>
                        <span>${doctor.nomorSIP || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Nomor STR</label>
                        <span>${doctor.nomorSTR || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Pendidikan</label>
                        <span>${doctor.pendidikan || '-'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Universitas</label>
                        <span>${doctor.universitas || '-'}</span>
                    </div>
                    <div class="detail-item full-width">
                        <label>Alamat</label>
                        <span>${doctor.alamat || '-'}</span>
                    </div>
                    <div class="detail-item full-width">
                        <div class="detail-schedule-box">
                            <h4><i class="fas fa-calendar-alt"></i> Jadwal Praktik</h4>
                            <div class="schedule-days-detail">
                                ${(doctor.hariPraktik || []).map(day => `<span class="day-tag">${day}</span>`).join('')}
                            </div>
                            <div class="schedule-time-detail">
                                <i class="fas fa-clock"></i> ${doctor.jamMulai || ''} - ${doctor.jamSelesai || ''} WIB
                            </div>
                        </div>
                    </div>
                    <div class="detail-item full-width">
                        <label>Terdaftar Sejak</label>
                        <span>${this.formatDateTime(doctor.createdAt)}</span>
                    </div>
                </div>
            `;

            // Bind avatar click
            setTimeout(() => {
                const avatar = document.getElementById('detailAvatar');
                if (avatar) {
                    avatar.addEventListener('click', () => {
                        if (doctor.photo) {
                            document.getElementById('photoPreviewLarge').src = doctor.photo;
                            UI.showModal('photoModal');
                        }
                    });
                }
            }, 100);

            UI.showModal('detailModal');
        }

        openDeleteModal(id, name) {
            this.deletingId = id;
            document.getElementById('deleteDoctorName').textContent = name;
            UI.showModal('deleteModal');
        }

        confirmDelete() {
            if (!this.deletingId) return;

            const doctor = this.doctors.find(d => d.id === this.deletingId);
            if (!doctor) return;

            this.doctors = this.doctors.filter(d => d.id !== this.deletingId);
            Storage.set(Storage.KEYS.DOCTORS, this.doctors);

            this.closeModal('deleteModal');
            UI.showToast(`Data dokter "${doctor.nama}" berhasil dihapus!`, 'success');
            this.deletingId = null;
            this.refresh();
        }

        validateField(fieldId) {
            const field = document.getElementById(fieldId);
            if (!field) return true;

            let value = field.value.trim();

            if (fieldId === 'jenisKelamin') {
                const selected = document.querySelector('input[name="jenisKelamin"]:checked');
                value = selected ? selected.value : '';
            }

            if (fieldId === 'hariPraktik') {
                const selected = document.querySelectorAll('input[name="hariPraktik"]:checked');
                value = Array.from(selected).map(cb => cb.value);
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

            let isValid = true;
            const fields = ['nik', 'nama', 'nomorSIP', 'nomorSTR', 'spesialis', 'poli', 'jenisKelamin', 'tanggalLahir', 'alamat', 'noHP', 'email', 'pendidikan', 'universitas', 'pengalaman', 'hariPraktik', 'jamMulai', 'jamSelesai', 'status'];

            fields.forEach(field => {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                document.getElementById('doctorForm').classList.add('shake');
                setTimeout(() => document.getElementById('doctorForm').classList.remove('shake'), 400);
                UI.showToast('Mohon lengkapi semua data dengan benar!', 'error');
                return;
            }

            // Check email duplicate
            const email = document.getElementById('email').value.trim().toLowerCase();
            const duplicate = this.doctors.find(d =>
                d.email.toLowerCase() === email &&
                (!this.editingId || d.id !== this.editingId)
            );
            if (duplicate) {
                this.showError('email', 'Email sudah digunakan');
                UI.showToast('Email sudah terdaftar!', 'error');
                return;
            }

            // Check NIK duplicate
            const nik = document.getElementById('nik').value.trim();
            const nikDuplicate = this.doctors.find(d =>
                d.nik === nik &&
                (!this.editingId || d.id !== this.editingId)
            );
            if (nikDuplicate) {
                this.showError('nik', 'NIK sudah terdaftar');
                UI.showToast('NIK sudah terdaftar!', 'error');
                return;
            }

            // Check time validation
            const jamMulai = document.getElementById('jamMulai').value;
            const jamSelesai = document.getElementById('jamSelesai').value;
            if (jamMulai && jamSelesai && jamMulai >= jamSelesai) {
                this.showError('jamSelesai', 'Jam selesai harus lebih besar dari jam mulai');
                UI.showToast('Jam praktik tidak valid!', 'error');
                return;
            }

            // Collect data
            const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked').value;
            const hariPraktik = Array.from(document.querySelectorAll('input[name="hariPraktik"]:checked')).map(cb => cb.value);

            const doctorData = {
                id: this.editingId || document.getElementById('idDokter').value,
                nik: nik,
                nama: document.getElementById('nama').value.trim(),
                nomorSIP: document.getElementById('nomorSIP').value.trim(),
                nomorSTR: document.getElementById('nomorSTR').value.trim(),
                spesialis: document.getElementById('spesialis').value,
                poli: document.getElementById('poli').value,
                jenisKelamin: jenisKelamin,
                tanggalLahir: document.getElementById('tanggalLahir').value,
                alamat: document.getElementById('alamat').value.trim(),
                noHP: document.getElementById('noHP').value.trim(),
                email: email,
                pendidikan: document.getElementById('pendidikan').value.trim(),
                universitas: document.getElementById('universitas').value.trim(),
                pengalaman: parseInt(document.getElementById('pengalaman').value) || 0,
                hariPraktik: hariPraktik,
                jamMulai: jamMulai,
                jamSelesai: jamSelesai,
                status: document.getElementById('status').value,
                photo: this.currentPhotoData,
                createdAt: this.editingId ? (this.doctors.find(d => d.id === this.editingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            if (this.editingId) {
                const index = this.doctors.findIndex(d => d.id === this.editingId);
                if (index !== -1) {
                    this.doctors[index] = doctorData;
                }
                UI.showToast('Data dokter berhasil diupdate!', 'success');
            } else {
                this.doctors.push(doctorData);
                UI.showToast('Dokter baru berhasil ditambahkan!', 'success');
            }

            Storage.set(Storage.KEYS.DOCTORS, this.doctors);
            this.closeModal('doctorModal');
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
            if (this.filteredDoctors.length === 0) {
                UI.showToast('Tidak ada data untuk di-export!', 'warning');
                return;
            }

            const headers = ['ID', 'NIK', 'Nama', 'Spesialis', 'Poli', 'No SIP', 'No STR', 'No HP', 'Email', 'Jadwal', 'Status'];
            const rows = this.filteredDoctors.map(d => [
                d.id,
                d.nik,
                d.nama,
                d.spesialis,
                d.poli,
                d.nomorSIP,
                d.nomorSTR,
                d.noHP,
                d.email,
                `${(d.hariPraktik || []).join(', ')} (${d.jamMulai}-${d.jamSelesai})`,
                d.status
            ]);

            const csv = [
                headers.join(','),
                ...rows.map(row => row.map(cell => `"${cell || ''}"`).join(','))
            ].join('\n');

            const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `data-dokter-hmris-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);

            UI.showToast('Data berhasil di-export ke Excel (CSV)!', 'success');
        }

        exportPDF() {
            if (this.filteredDoctors.length === 0) {
                UI.showToast('Tidak ada data untuk di-export!', 'warning');
                return;
            }

            const printWindow = window.open('', '_blank');
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Laporan Data Dokter - HMRIS</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: 'Arial', sans-serif; padding: 20px; color: #333; }
                        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #0D9488; padding-bottom: 20px; }
                        .header h1 { color: #0D9488; font-size: 24px; margin-bottom: 5px; }
                        .header p { color: #666; font-size: 12px; }
                        .info { margin-bottom: 20px; font-size: 12px; }
                        table { width: 100%; border-collapse: collapse; font-size: 10px; }
                        th { background: #0D9488; color: white; padding: 8px 6px; text-align: left; }
                        td { padding: 6px; border: 1px solid #ddd; }
                        tr:nth-child(even) { background: #f9f9f9; }
                        .footer { margin-top: 30px; text-align: right; font-size: 11px; }
                        .signature { margin-top: 50px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>HOSPITAL MEDICAL RECORD INFORMATION SYSTEM</h1>
                        <p>Laporan Data Dokter</p>
                    </div>
                    <div class="info">
                        <p><strong>Tanggal:</strong> ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Total Data:</strong> ${this.filteredDoctors.length} dokter</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>ID</th>
                                <th>Nama</th>
                                <th>Spesialis</th>
                                <th>Poli</th>
                                <th>No HP</th>
                                <th>Jadwal</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.filteredDoctors.map((d, i) => `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${d.id}</td>
                                    <td>${d.nama}</td>
                                    <td>${d.spesialis}</td>
                                    <td>${d.poli}</td>
                                    <td>${d.noHP}</td>
                                    <td>${(d.hariPraktik || []).join(', ')}<br>${d.jamMulai}-${d.jamSelesai}</td>
                                    <td>${d.status}</td>
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

        calculateAge(dateString) {
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
        new DoctorManager();
    });

})();