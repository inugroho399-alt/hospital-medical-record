(function () {
    'use strict';

    // ==================== STORAGE MANAGER ====================
    const Storage = {
        KEYS: {
            USERS: 'hmris_users',
            PATIENTS: 'hmris_patients',
            DOCTORS: 'hmris_doctors',
            RECORDS: 'hmris_records',
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
            { name: 'Data Pasien', icon: 'fa-users', href: 'pasien.html',  },
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html' , active: true},
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
            { name: 'Data Pasien', icon: 'fa-users', href: 'pasien.html' },
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html' , active: true},
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
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html' , active: true},
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
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html', active: true },
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
            { name: 'Rekam Medis Saya', icon: 'fa-file-medical', href: 'rekam-medis.html' , active: true},
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
        validate(field, value) {
            switch (field) {
                case 'idPasien':
                    if (!value) return 'Pasien wajib dipilih';
                    return '';
                case 'idDokter':
                    if (!value) return 'Dokter wajib dipilih';
                    return '';
                case 'tanggal':
                    if (!value) return 'Tanggal wajib diisi';
                    return '';
                case 'jam':
                    if (!value) return 'Jam wajib diisi';
                    return '';
                case 'keluhan':
                    if (!value) return 'Keluhan wajib diisi';
                    if (value.length < 5) return 'Keluhan minimal 5 karakter';
                    return '';
                case 'diagnosa':
                    if (!value) return 'Diagnosa wajib diisi';
                    if (value.length < 3) return 'Diagnosa minimal 3 karakter';
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

    // ==================== RECORD MANAGER ====================
    class RecordManager {
        constructor() {
            this.records = Storage.get(Storage.KEYS.RECORDS) || [];
            this.patients = Storage.get(Storage.KEYS.PATIENTS) || [];
            this.doctors = Storage.get(Storage.KEYS.DOCTORS) || [];
            this.filteredRecords = [...this.records];
            this.currentPage = 1;
            this.itemsPerPage = 10;
            this.sortField = 'createdAt';
            this.sortDirection = 'desc';
            this.searchTerm = '';
            this.filters = { status: '', doctor: '' };
            this.editingId = null;
            this.deletingId = null;
            this.medicines = [];

            this.init();
        }

        init() {
            if (!this.checkAuth()) return;

            this.loadUserData();
            this.renderSidebar();
            this.populateDropdowns();
            this.bindEvents();
            this.refresh();
            this.updateStats();
        }

        checkAuth() {
            const user = Storage.get(Storage.KEYS.CURRENT_USER);
            if (!user) {
                UI.showToast('Silakan login terlebih dahulu!', 'error');
                setTimeout(() => { window.location.href = '../index.html'; }, 1000);
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

        populateDropdowns() {
            // Populate patient dropdown
            const patientSelect = document.getElementById('idPasien');
            patientSelect.innerHTML = '<option value="">-- Pilih Pasien --</option>';
            this.patients.forEach(p => {
                const opt = document.createElement('option');
                opt.value = p.id;
                opt.textContent = `${p.noRM} - ${p.nama}`;
                patientSelect.appendChild(opt);
            });

            // Populate doctor dropdown (form)
            const doctorSelect = document.getElementById('idDokter');
            doctorSelect.innerHTML = '<option value="">-- Pilih Dokter --</option>';
            this.doctors.forEach(d => {
                const opt = document.createElement('option');
                opt.value = d.id;
                opt.textContent = `${d.nama} - ${d.spesialis}`;
                doctorSelect.appendChild(opt);
            });

            // Populate doctor filter
            const filterDoctor = document.getElementById('filterDoctor');
            filterDoctor.innerHTML = '<option value="">Semua Dokter</option>';
            this.doctors.forEach(d => {
                const opt = document.createElement('option');
                opt.value = d.id;
                opt.textContent = d.nama;
                filterDoctor.appendChild(opt);
            });
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

            // Add record
            document.getElementById('btnAddRecord').addEventListener('click', () => this.openAddModal());

            // Modal close buttons
            document.getElementById('btnCloseModal').addEventListener('click', () => this.closeModal('recordModal'));
            document.getElementById('btnCancelForm').addEventListener('click', () => this.closeModal('recordModal'));
            document.getElementById('btnCloseDetail').addEventListener('click', () => this.closeModal('detailModal'));
            document.getElementById('btnCloseDetail2').addEventListener('click', () => this.closeModal('detailModal'));
            document.getElementById('btnCancelDelete').addEventListener('click', () => this.closeModal('deleteModal'));

            // Close on overlay click
            ['recordModal', 'detailModal', 'deleteModal'].forEach(id => {
                document.getElementById(id).addEventListener('click', (e) => {
                    if (e.target.id === id) this.closeModal(id);
                });
            });

            // Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    ['recordModal', 'detailModal', 'deleteModal'].forEach(id => {
                        if (document.getElementById(id).classList.contains('active')) this.closeModal(id);
                    });
                }
            });

            // Patient & Doctor select change (show preview)
            document.getElementById('idPasien').addEventListener('change', (e) => this.showPatientPreview(e.target.value));
            document.getElementById('idDokter').addEventListener('change', (e) => this.showDoctorPreview(e.target.value));

            // BMI calculation
            document.getElementById('tinggiBadan').addEventListener('input', () => this.calculateBMI());
            document.getElementById('beratBadan').addEventListener('input', () => this.calculateBMI());

            // Set default date/time
            this.setDefaultDateTime();

            // Add medicine
            document.getElementById('btnAddMedicine').addEventListener('click', () => this.addMedicineRow());

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
            document.getElementById('filterStatus').addEventListener('change', (e) => {
                this.filters.status = e.target.value;
                this.currentPage = 1;
                this.applyFilters();
            });

            document.getElementById('filterDoctor').addEventListener('change', (e) => {
                this.filters.doctor = e.target.value;
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
            document.getElementById('recordForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

            // Detail edit
            document.getElementById('btnEditFromDetail').addEventListener('click', () => {
                const currentId = document.getElementById('detailModal').dataset.recordId;
                this.closeModal('detailModal');
                this.openEditModal(currentId);
            });

            // Detail print
            document.getElementById('btnPrintRecord').addEventListener('click', () => {
                const currentId = document.getElementById('detailModal').dataset.recordId;
                this.printRecord(currentId);
            });

            // Delete
            document.getElementById('btnConfirmDelete').addEventListener('click', () => this.confirmDelete());

            // Toolbar
            document.getElementById('btnExportExcel').addEventListener('click', () => this.exportExcel());
            document.getElementById('btnExportPDF').addEventListener('click', () => this.exportPDF());
            document.getElementById('btnPrint').addEventListener('click', () => this.printTable());
            document.getElementById('btnRefresh').addEventListener('click', () => {
                this.refresh();
                UI.showToast('Data berhasil di-refresh!', 'success');
            });

            // Resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 992) {
                    document.getElementById('sidebar').classList.remove('active');
                    document.getElementById('mobileOverlay').classList.remove('active');
                }
            });
        }

        setDefaultDateTime() {
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];
            const timeStr = now.toTimeString().substring(0, 5);
            document.getElementById('tanggal').value = dateStr;
            document.getElementById('jam').value = timeStr;
        }

        showPatientPreview(patientId) {
            const preview = document.getElementById('patientPreview');
            if (!patientId) {
                preview.classList.remove('show');
                return;
            }

            const patient = this.patients.find(p => p.id === patientId);
            if (!patient) return;

            const age = this.calculateAge(patient.tanggalLahir);

            // Cek riwayat alergi pasien (dari data pasien atau riwayat rekam medis sebelumnya)
            const prevRecords = this.records.filter(r => r.idPasien === patientId && r.riwayatAlergi && r.riwayatAlergi.trim() !== '-' && r.riwayatAlergi.trim() !== '');
            const knownAllergy = patient.riwayatAlergi || (prevRecords.length > 0 ? prevRecords[prevRecords.length - 1].riwayatAlergi : '');

            // Otomatis isi textarea riwayatAlergi jika masih kosong
            const allergyField = document.getElementById('riwayatAlergi');
            if (allergyField && knownAllergy && !allergyField.value.trim()) {
                allergyField.value = knownAllergy;
            }

            let allergyBadge = '';
            if (knownAllergy) {
                allergyBadge = `
                    <div class="patient-allergy-alert" style="margin-top: 6px; padding: 5px 10px; background: #FFF1F2; border: 1px solid #FECDD3; border-radius: 6px; color: #E11D48; font-size: 0.76rem; font-weight: 700; display: flex; align-items: center; gap: 6px;">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>PERINGATAN ALERGI: ${knownAllergy}</span>
                    </div>
                `;
            }

            preview.innerHTML = `
                <div class="preview-avatar">
                    ${patient.photo ? `<img src="${patient.photo}" alt="${patient.nama}">` : `<i class="fas fa-user-injured"></i>`}
                </div>
                <div class="preview-info" style="flex: 1;">
                    <span class="preview-name">${patient.nama}</span>
                    <span class="preview-detail">${patient.nik || '-'} • ${patient.jenisKelamin || '-'} • ${age || '-'}</span>
                    ${allergyBadge}
                </div>
            `;
            preview.classList.add('show');
        }

        showDoctorPreview(doctorId) {
            const preview = document.getElementById('doctorPreview');
            if (!doctorId) {
                preview.classList.remove('show');
                return;
            }

            const doctor = this.doctors.find(d => d.id === doctorId);
            if (!doctor) return;

            preview.innerHTML = `
                <div class="preview-avatar">
                    ${doctor.photo ? `<img src="${doctor.photo}" alt="${doctor.nama}">` : `<i class="fas fa-user-md"></i>`}
                </div>
                <div class="preview-info">
                    <span class="preview-name">${doctor.nama}</span>
                    <span class="preview-detail">${doctor.spesialis || '-'} • ${doctor.poli || '-'}</span>
                </div>
            `;
            preview.classList.add('show');
        }

        calculateBMI() {
            const height = parseFloat(document.getElementById('tinggiBadan').value);
            const weight = parseFloat(document.getElementById('beratBadan').value);
            const bmiInput = document.getElementById('bmi');
            const bmiCategory = document.getElementById('bmiCategory');

            if (!height || !weight || height <= 0) {
                bmiInput.value = '';
                bmiCategory.textContent = '';
                bmiCategory.className = 'bmi-category';
                return;
            }

            const heightM = height / 100;
            const bmi = weight / (heightM * heightM);
            bmiInput.value = bmi.toFixed(1);

            let category = '';
            let className = '';

            if (bmi < 18.5) {
                category = 'Kurus';
                className = 'underweight';
            } else if (bmi < 25) {
                category = 'Normal';
                className = 'normal';
            } else if (bmi < 30) {
                category = 'Gemuk';
                className = 'overweight';
            } else {
                category = 'Obesitas';
                className = 'obese';
            }

            bmiCategory.textContent = category;
            bmiCategory.className = 'bmi-category ' + className;
        }

        addMedicineRow() {
            const list = document.getElementById('prescriptionList');

            // Remove empty placeholder
            const empty = list.querySelector('.empty-prescription');
            if (empty) empty.remove();

            const rowId = 'med-' + Date.now();
            const row = document.createElement('div');
            row.className = 'medicine-row';
            row.id = rowId;
            row.innerHTML = `
                <div class="form-group">
                    <label>Nama Obat <span class="required">*</span></label>
                    <div class="input-with-icon">
                        <i class="fas fa-pills"></i>
                        <input type="text" name="medicineName" placeholder="Nama obat" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Dosis</label>
                    <div class="input-with-icon">
                        <i class="fas fa-prescription"></i>
                        <input type="text" name="medicineDose" placeholder="500mg">
                    </div>
                </div>
                <div class="form-group">
                    <label>Frekuensi</label>
                    <div class="input-with-icon">
                        <i class="fas fa-clock"></i>
                        <input type="text" name="medicineFreq" placeholder="3x1">
                    </div>
                </div>
                <div class="form-group">
                    <label>Jumlah</label>
                    <div class="input-with-icon">
                        <i class="fas fa-sort-numeric-up"></i>
                        <input type="number" name="medicineQty" min="1" placeholder="10">
                    </div>
                </div>
                <button type="button" class="btn-remove-medicine" data-row="${rowId}">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            list.appendChild(row);

            // Real-time Allergy Cross-Check
            const medInput = row.querySelector('input[name="medicineName"]');
            medInput.addEventListener('input', () => {
                const allergyVal = (document.getElementById('riwayatAlergi')?.value || '').toLowerCase().trim();
                const medVal = medInput.value.toLowerCase().trim();
                if (allergyVal && medVal.length >= 3 && (allergyVal.includes(medVal) || medVal.includes(allergyVal))) {
                    medInput.style.borderColor = '#E11D48';
                    medInput.style.backgroundColor = '#FFF1F2';
                    UI.showToast(`⚠️ KONTRAINDIKASI ALERGI: Pasien tercatat memiliki alergi "${allergyVal}"!`, 'warning');
                } else {
                    medInput.style.borderColor = '';
                    medInput.style.backgroundColor = '';
                }
            });

            // Bind remove
            row.querySelector('.btn-remove-medicine').addEventListener('click', () => {
                row.remove();
                if (list.children.length === 0) {
                    list.innerHTML = `
                        <div class="empty-prescription">
                            <i class="fas fa-pills"></i>
                            <p>Belum ada obat ditambahkan. Klik "Tambah Obat" untuk menambahkan.</p>
                        </div>
                    `;
                }
            });
        }

        collectMedicines() {
            const rows = document.querySelectorAll('.medicine-row');
            const medicines = [];

            rows.forEach(row => {
                const name = row.querySelector('input[name="medicineName"]').value.trim();
                const dose = row.querySelector('input[name="medicineDose"]').value.trim();
                const freq = row.querySelector('input[name="medicineFreq"]').value.trim();
                const qty = row.querySelector('input[name="medicineQty"]').value.trim();

                if (name) {
                    medicines.push({ name, dose, freq, qty: qty || '-' });
                }
            });

            return medicines;
        }

        refresh() {
            this.records = Storage.get(Storage.KEYS.RECORDS) || [];
            this.patients = Storage.get(Storage.KEYS.PATIENTS) || [];
            this.doctors = Storage.get(Storage.KEYS.DOCTORS) || [];
            this.applyFilters();
            this.updateStats();
        }

        updateStats() {
            const total = this.records.length;
            const today = new Date().toISOString().split('T')[0];
            const todayRecords = this.records.filter(r => r.tanggal === today).length;
            const outpatient = this.records.filter(r => r.status === 'Rawat Jalan').length;
            const inpatient = this.records.filter(r => r.status === 'Rawat Inap').length;

            this.animateCounter('statTotal', total);
            this.animateCounter('statToday', todayRecords);
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
            let filtered = [...this.records];

            if (this.searchTerm) {
                filtered = filtered.filter(r => {
                    const patient = this.patients.find(p => p.id === r.idPasien);
                    const doctor = this.doctors.find(d => d.id === r.idDokter);
                    return (
                        (patient?.nama || '').toLowerCase().includes(this.searchTerm) ||
                        (patient?.noRM || '').toLowerCase().includes(this.searchTerm) ||
                        (doctor?.nama || '').toLowerCase().includes(this.searchTerm) ||
                        (r.diagnosa || '').toLowerCase().includes(this.searchTerm) ||
                        (r.kodeICD || '').toLowerCase().includes(this.searchTerm)
                    );
                });
            }

            if (this.filters.status) {
                filtered = filtered.filter(r => r.status === this.filters.status);
            }

            if (this.filters.doctor) {
                filtered = filtered.filter(r => r.idDokter === this.filters.doctor);
            }

            filtered.sort((a, b) => {
                let aVal = a[this.sortField];
                let bVal = b[this.sortField];
                if (typeof aVal === 'string') aVal = aVal.toLowerCase();
                if (typeof bVal === 'string') bVal = bVal.toLowerCase();
                if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });

            this.filteredRecords = filtered;
            this.renderTable();
            this.renderPagination();
        }

        renderTable() {
            const tableBody = document.getElementById('tableBody');
            const emptyState = document.getElementById('emptyState');

            if (this.filteredRecords.length === 0) {
                tableBody.innerHTML = '';
                emptyState.style.display = 'block';
                return;
            }

            emptyState.style.display = 'none';

            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            const pageData = this.filteredRecords.slice(startIndex, endIndex);

            tableBody.innerHTML = pageData.map(record => {
                const patient = this.patients.find(p => p.id === record.idPasien);
                const doctor = this.doctors.find(d => d.id === record.idDokter);

                return `
                    <tr data-id="${record.id}">
                        <td>
                            <div class="record-info">
                                <span class="record-date">${this.formatDate(record.tanggal)}</span>
                                <span class="record-time">${record.jam || ''} WIB</span>
                            </div>
                        </td>
                        <td><code style="background: var(--gray-100); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">${patient?.noRM || '-'}</code></td>
                        <td>
                            <div class="patient-cell">
                                <span class="patient-cell-name">${patient?.nama || '-'}</span>
                                <span class="patient-cell-rm">${patient?.nik || '-'}</span>
                            </div>
                        </td>
                        <td>
                            <div class="doctor-cell">
                                <span class="doctor-cell-name">${doctor?.nama || '-'}</span>
                                <span class="doctor-cell-spec">${doctor?.spesialis || '-'}</span>
                            </div>
                        </td>
                        <td>
                            <div class="diagnosis-cell">
                                <div class="diagnosis-text">${record.diagnosa || '-'}</div>
                                ${record.kodeICD ? `<span class="diagnosis-icd">${record.kodeICD}</span>` : ''}
                            </div>
                        </td>
                        <td>
                            <span class="status-badge ${(record.status || '').toLowerCase().replace(/\s+/g, '')}">
                                <i class="fas fa-circle"></i> ${record.status || '-'}
                            </span>
                        </td>
                        <td class="text-center">
                            <div class="action-buttons">
                                <button class="action-btn view" data-action="view" data-id="${record.id}" title="Detail"><i class="fas fa-eye"></i></button>
                                <button class="action-btn edit" data-action="edit" data-id="${record.id}" title="Edit"><i class="fas fa-edit"></i></button>
                                <button class="action-btn print" data-action="print" data-id="${record.id}" title="Cetak"><i class="fas fa-print"></i></button>
                                <button class="action-btn delete" data-action="delete" data-id="${record.id}" data-name="${patient?.nama || ''}" title="Hapus"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');

            // Bind action buttons
            tableBody.querySelectorAll('[data-action]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const action = btn.getAttribute('data-action');
                    const id = btn.getAttribute('data-id');

                    if (action === 'view') this.viewRecord(id);
                    if (action === 'edit') this.openEditModal(id);
                    if (action === 'print') this.printRecord(id);
                    if (action === 'delete') this.openDeleteModal(id, btn.getAttribute('data-name'));
                });
            });

            document.getElementById('showingStart').textContent = this.filteredRecords.length > 0 ? startIndex + 1 : 0;
            document.getElementById('showingEnd').textContent = Math.min(endIndex, this.filteredRecords.length);
            document.getElementById('showingTotal').textContent = this.filteredRecords.length;
        }

        renderPagination() {
            const pagination = document.getElementById('pagination');
            const totalPages = Math.ceil(this.filteredRecords.length / this.itemsPerPage);

            if (totalPages <= 1) {
                pagination.innerHTML = '';
                return;
            }

            let html = '';
            html += `<button class="page-btn" ${this.currentPage === 1 ? 'disabled' : ''} data-page="${this.currentPage - 1}"><i class="fas fa-chevron-left"></i></button>`;

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

            html += `<button class="page-btn" ${this.currentPage === totalPages ? 'disabled' : ''} data-page="${this.currentPage + 1}"><i class="fas fa-chevron-right"></i></button>`;

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
            document.querySelectorAll('.sortable').forEach(th => th.classList.remove('sort-asc', 'sort-desc'));
            activeTh.classList.add(this.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
        }

        openAddModal() {
            this.editingId = null;
            this.medicines = [];
            document.getElementById('recordForm').reset();
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-file-medical"></i><span>Tambah Rekam Medis</span>';
            document.getElementById('btnSubmitForm').innerHTML = '<i class="fas fa-save"></i><span>Simpan Rekam Medis</span>';
            this.setDefaultDateTime();
            this.clearAllErrors();

            // Reset prescription list
            document.getElementById('prescriptionList').innerHTML = `
                <div class="empty-prescription">
                    <i class="fas fa-pills"></i>
                    <p>Belum ada obat ditambahkan. Klik "Tambah Obat" untuk menambahkan.</p>
                </div>
            `;

            // Reset previews
            document.getElementById('patientPreview').classList.remove('show');
            document.getElementById('doctorPreview').classList.remove('show');
            document.getElementById('bmi').value = '';
            document.getElementById('bmiCategory').textContent = '';
            document.getElementById('bmiCategory').className = 'bmi-category';

            UI.showModal('recordModal');
        }

        openEditModal(id) {
            const record = this.records.find(r => r.id === id);
            if (!record) return;

            this.editingId = id;
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit"></i><span>Edit Rekam Medis</span>';
            document.getElementById('btnSubmitForm').innerHTML = '<i class="fas fa-save"></i><span>Update Rekam Medis</span>';

            // Populate form
            document.getElementById('idPasien').value = record.idPasien || '';
            document.getElementById('idDokter').value = record.idDokter || '';
            document.getElementById('tanggal').value = record.tanggal || '';
            document.getElementById('jam').value = record.jam || '';
            document.getElementById('keluhan').value = record.keluhan || '';
            document.getElementById('riwayatPenyakit').value = record.riwayatPenyakit || '';
            document.getElementById('riwayatAlergi').value = record.riwayatAlergi || '';
            document.getElementById('tekananDarah').value = record.tekananDarah || '';
            document.getElementById('suhu').value = record.suhu || '';
            document.getElementById('nadi').value = record.nadi || '';
            document.getElementById('pernapasan').value = record.pernapasan || '';
            document.getElementById('tinggiBadan').value = record.tinggiBadan || '';
            document.getElementById('beratBadan').value = record.beratBadan || '';
            document.getElementById('diagnosa').value = record.diagnosa || '';
            document.getElementById('kodeICD').value = record.kodeICD || '';
            document.getElementById('tindakan').value = record.tindakan || '';
            document.getElementById('catatanDokter').value = record.catatanDokter || '';
            document.getElementById('status').value = record.status || 'Rawat Jalan';

            // Show previews
            this.showPatientPreview(record.idPasien);
            this.showDoctorPreview(record.idDokter);

            // Calculate BMI
            this.calculateBMI();

            // Populate medicines
            const list = document.getElementById('prescriptionList');
            list.innerHTML = '';

            if (record.medicines && record.medicines.length > 0) {
                record.medicines.forEach(med => {
                    this.addMedicineRow();
                    const rows = document.querySelectorAll('.medicine-row');
                    const lastRow = rows[rows.length - 1];
                    lastRow.querySelector('input[name="medicineName"]').value = med.name || '';
                    lastRow.querySelector('input[name="medicineDose"]').value = med.dose || '';
                    lastRow.querySelector('input[name="medicineFreq"]').value = med.freq || '';
                    lastRow.querySelector('input[name="medicineQty"]').value = med.qty || '';
                });
            } else {
                list.innerHTML = `
                    <div class="empty-prescription">
                        <i class="fas fa-pills"></i>
                        <p>Belum ada obat ditambahkan. Klik "Tambah Obat" untuk menambahkan.</p>
                    </div>
                `;
            }

            this.clearAllErrors();
            UI.showModal('recordModal');
        }

        viewRecord(id) {
            const record = this.records.find(r => r.id === id);
            if (!record) return;

            const patient = this.patients.find(p => p.id === record.idPasien);
            const doctor = this.doctors.find(d => d.id === record.idDokter);

            document.getElementById('detailModal').dataset.recordId = id;

            const bmiValue = (record.tinggiBadan && record.beratBadan) ?
                (record.beratBadan / Math.pow(record.tinggiBadan / 100, 2)).toFixed(1) : '-';

            const detailBody = document.getElementById('detailBody');
            detailBody.innerHTML = `
                <div class="detail-header">
                    <div class="detail-header-info">
                        <h2>${patient?.nama || 'Pasien Tidak Ditemukan'}</h2>
                        <div class="rm-code">No RM: ${patient?.noRM || '-'}</div>
                        <div class="datetime">
                            <i class="fas fa-calendar-alt"></i>
                            ${this.formatDate(record.tanggal)} - ${record.jam || ''} WIB
                        </div>
                        <div class="detail-badges">
                            <span class="status-badge ${(record.status || '').toLowerCase().replace(/\s+/g, '')}">
                                <i class="fas fa-circle"></i> ${record.status || '-'}
                            </span>
                            ${record.kodeICD ? `<span class="diagnosis-icd">${record.kodeICD}</span>` : ''}
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-user-md"></i> Dokter Pemeriksa</h4>
                    <div class="detail-item full-width">
                        <label>Nama Dokter</label>
                        <span>${doctor?.nama || '-'} ${doctor ? `(${doctor.spesialis || '-'})` : ''}</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-notes-medical"></i> Keluhan & Riwayat</h4>
                    <div class="detail-grid">
                        <div class="detail-item full-width">
                            <label>Keluhan Utama</label>
                            <span>${record.keluhan || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>Riwayat Penyakit</label>
                            <span>${record.riwayatPenyakit || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>Riwayat Alergi</label>
                            ${record.riwayatAlergi && record.riwayatAlergi.trim() !== '-' ? `<span style="color: #E11D48; font-weight: 700; background: #FFF1F2; padding: 2px 8px; border-radius: 4px; border: 1px solid #FECDD3; display: inline-flex; align-items: center; gap: 4px;"><i class="fas fa-exclamation-triangle"></i> ${record.riwayatAlergi}</span>` : '<span>Tidak ada riwayat alergi</span>'}
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-heartbeat"></i> Tanda Vital</h4>
                    <div class="vitals-grid">
                        <div class="vital-card">
                            <i class="fas fa-heart"></i>
                            <span class="vital-value">${record.tekananDarah || '-'}</span>
                            <span class="vital-label">Tensi (mmHg)</span>
                        </div>
                        <div class="vital-card">
                            <i class="fas fa-thermometer-half"></i>
                            <span class="vital-value">${record.suhu || '-'}°C</span>
                            <span class="vital-label">Suhu</span>
                        </div>
                        <div class="vital-card">
                            <i class="fas fa-wave-square"></i>
                            <span class="vital-value">${record.nadi || '-'}</span>
                            <span class="vital-label">Nadi (x/mnt)</span>
                        </div>
                        <div class="vital-card">
                            <i class="fas fa-lungs"></i>
                            <span class="vital-value">${record.pernapasan || '-'}</span>
                            <span class="vital-label">RR (x/mnt)</span>
                        </div>
                        <div class="vital-card">
                            <i class="fas fa-ruler-vertical"></i>
                            <span class="vital-value">${record.tinggiBadan || '-'} cm</span>
                            <span class="vital-label">Tinggi</span>
                        </div>
                        <div class="vital-card">
                            <i class="fas fa-weight"></i>
                            <span class="vital-value">${record.beratBadan || '-'} kg</span>
                            <span class="vital-label">Berat</span>
                        </div>
                        <div class="vital-card">
                            <i class="fas fa-calculator"></i>
                            <span class="vital-value">${bmiValue}</span>
                            <span class="vital-label">BMI</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-stethoscope"></i> Diagnosa & Tindakan</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Diagnosa</label>
                            <span>${record.diagnosa || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>Kode ICD-10</label>
                            <span>${record.kodeICD || '-'}</span>
                        </div>
                        <div class="detail-item full-width">
                            <label>Tindakan</label>
                            <span>${record.tindakan || '-'}</span>
                        </div>
                        <div class="detail-item full-width">
                            <label>Catatan Dokter</label>
                            <span>${record.catatanDokter || '-'}</span>
                        </div>
                    </div>
                </div>

                ${record.medicines && record.medicines.length > 0 ? `
                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-prescription-bottle-alt"></i> Resep Obat (${record.medicines.length} item)</h4>
                    <table class="prescription-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Obat</th>
                                <th>Dosis</th>
                                <th>Frekuensi</th>
                                <th>Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${record.medicines.map((m, i) => `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${m.name}</td>
                                    <td>${m.dose || '-'}</td>
                                    <td>${m.freq || '-'}</td>
                                    <td>${m.qty || '-'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                ` : ''}

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-info-circle"></i> Informasi Sistem</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Dibuat</label>
                            <span>${this.formatDateTime(record.createdAt)}</span>
                        </div>
                        <div class="detail-item">
                            <label>Terakhir Update</label>
                            <span>${this.formatDateTime(record.updatedAt)}</span>
                        </div>
                    </div>
                </div>
            `;

            UI.showModal('detailModal');
        }

        openDeleteModal(id, patientName) {
            this.deletingId = id;
            document.getElementById('deleteRecordInfo').textContent = `pasien ${patientName}`;
            UI.showModal('deleteModal');
        }

        confirmDelete() {
            if (!this.deletingId) return;

            this.records = this.records.filter(r => r.id !== this.deletingId);
            Storage.set(Storage.KEYS.RECORDS, this.records);

            this.closeModal('deleteModal');
            UI.showToast('Rekam medis berhasil dihapus!', 'success');
            this.deletingId = null;
            this.refresh();
        }

        validateField(fieldId) {
            const field = document.getElementById(fieldId);
            if (!field) return true;
            const value = field.value.trim();
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
            const fields = ['idPasien', 'idDokter', 'tanggal', 'jam', 'keluhan', 'diagnosa', 'status'];
            fields.forEach(f => { if (!this.validateField(f)) isValid = false; });

            // Validate medicines
            const medicines = this.collectMedicines();
            const hasEmptyMedicine = document.querySelectorAll('.medicine-row input[name="medicineName"]').length > 0 &&
                Array.from(document.querySelectorAll('.medicine-row input[name="medicineName"]')).some(inp => !inp.value.trim());

            if (hasEmptyMedicine) {
                UI.showToast('Nama obat tidak boleh kosong!', 'error');
                isValid = false;
            }

            if (!isValid) {
                document.getElementById('recordForm').classList.add('shake');
                setTimeout(() => document.getElementById('recordForm').classList.remove('shake'), 400);
                UI.showToast('Mohon lengkapi semua data dengan benar!', 'error');
                return;
            }

            const recordData = {
                id: this.editingId || 'RM-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                idPasien: document.getElementById('idPasien').value,
                idDokter: document.getElementById('idDokter').value,
                tanggal: document.getElementById('tanggal').value,
                jam: document.getElementById('jam').value,
                keluhan: document.getElementById('keluhan').value.trim(),
                riwayatPenyakit: document.getElementById('riwayatPenyakit').value.trim(),
                riwayatAlergi: document.getElementById('riwayatAlergi').value.trim(),
                tekananDarah: document.getElementById('tekananDarah').value.trim(),
                suhu: document.getElementById('suhu').value.trim(),
                nadi: document.getElementById('nadi').value.trim(),
                pernapasan: document.getElementById('pernapasan').value.trim(),
                tinggiBadan: document.getElementById('tinggiBadan').value.trim(),
                beratBadan: document.getElementById('beratBadan').value.trim(),
                diagnosa: document.getElementById('diagnosa').value.trim(),
                kodeICD: document.getElementById('kodeICD').value.trim(),
                tindakan: document.getElementById('tindakan').value.trim(),
                catatanDokter: document.getElementById('catatanDokter').value.trim(),
                status: document.getElementById('status').value,
                medicines: medicines,
                createdBy: this.currentUser.id,
                createdAt: this.editingId ? (this.records.find(r => r.id === this.editingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            if (this.editingId) {
                const index = this.records.findIndex(r => r.id === this.editingId);
                if (index !== -1) this.records[index] = recordData;
                UI.showToast('Rekam medis berhasil diupdate!', 'success');
            } else {
                this.records.push(recordData);
                UI.showToast('Rekam medis baru berhasil ditambahkan!', 'success');
            }

            Storage.set(Storage.KEYS.RECORDS, this.records);
            this.closeModal('recordModal');
            this.refresh();
        }

        closeModal(id) { UI.hideModal(id); }

        logout() {
            Storage.remove(Storage.KEYS.CURRENT_USER);
            UI.showToast('Logout berhasil! Mengalihkan...', 'success');
            setTimeout(() => { window.location.href = '../index.html'; }, 1000);
        }

        // ==================== EXPORT ====================
        exportExcel() {
            if (this.filteredRecords.length === 0) {
                UI.showToast('Tidak ada data untuk di-export!', 'warning');
                return;
            }

            const headers = ['Tanggal', 'Jam', 'No RM', 'Nama Pasien', 'Dokter', 'Diagnosa', 'Kode ICD', 'Status'];
            const rows = this.filteredRecords.map(r => {
                const patient = this.patients.find(p => p.id === r.idPasien);
                const doctor = this.doctors.find(d => d.id === r.idDokter);
                return [
                    r.tanggal,
                    r.jam,
                    patient?.noRM || '-',
                    patient?.nama || '-',
                    doctor?.nama || '-',
                    r.diagnosa || '-',
                    r.kodeICD || '-',
                    r.status || '-'
                ];
            });

            const csv = [headers.join(','), ...rows.map(row => row.map(c => `"${c}"`).join(','))].join('\n');

            const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `rekam-medis-hmris-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);

            UI.showToast('Data berhasil di-export ke Excel (CSV)!', 'success');
        }

        exportPDF() {
            if (this.filteredRecords.length === 0) {
                UI.showToast('Tidak ada data untuk di-export!', 'warning');
                return;
            }

            const printWindow = window.open('', '_blank');
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Laporan Rekam Medis - HMRIS</title>
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
                        <p>Laporan Rekam Medis</p>
                    </div>
                    <div class="info">
                        <p><strong>Tanggal:</strong> ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Total Data:</strong> ${this.filteredRecords.length} rekam medis</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>No RM</th>
                                <th>Pasien</th>
                                <th>Dokter</th>
                                <th>Diagnosa</th>
                                <th>ICD</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.filteredRecords.map((r, i) => {
                                const patient = this.patients.find(p => p.id === r.idPasien);
                                const doctor = this.doctors.find(d => d.id === r.idDokter);
                                return `
                                    <tr>
                                        <td>${i + 1}</td>
                                        <td>${r.tanggal}</td>
                                        <td>${patient?.noRM || '-'}</td>
                                        <td>${patient?.nama || '-'}</td>
                                        <td>${doctor?.nama || '-'}</td>
                                        <td>${r.diagnosa || '-'}</td>
                                        <td>${r.kodeICD || '-'}</td>
                                        <td>${r.status || '-'}</td>
                                    </tr>
                                `;
                            }).join('')}
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
            setTimeout(() => printWindow.print(), 500);

            UI.showToast('Laporan PDF dibuka di tab baru!', 'success');
        }

        printRecord(id) {
            const record = this.records.find(r => r.id === id);
            if (!record) return;

            const patient = this.patients.find(p => p.id === record.idPasien);
            const doctor = this.doctors.find(d => d.id === record.idDokter);
            const bmi = (record.tinggiBadan && record.beratBadan) ?
                (record.beratBadan / Math.pow(record.tinggiBadan / 100, 2)).toFixed(1) : '-';

            const printWindow = window.open('', '_blank');
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Rekam Medis - ${patient?.nama || ''}</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: 'Arial', sans-serif; padding: 20px; color: #333; font-size: 12px; }
                        .header { text-align: center; border-bottom: 3px double #0D9488; padding-bottom: 15px; margin-bottom: 20px; }
                        .header h1 { color: #0D9488; font-size: 20px; }
                        .header p { color: #666; font-size: 11px; }
                        h3 { color: #0D9488; font-size: 14px; margin: 15px 0 8px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
                        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px; }
                        .item { padding: 6px 10px; background: #f9f9f9; border-left: 3px solid #0D9488; }
                        .item label { display: block; font-size: 10px; font-weight: 700; color: #666; text-transform: uppercase; }
                        .item span { font-size: 12px; font-weight: 500; }
                        .full { grid-column: 1 / -1; }
                        .vitals { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
                        .vital { text-align: center; padding: 8px; background: #F0FDFA; border-radius: 4px; }
                        .vital strong { display: block; font-size: 14px; color: #0F766E; }
                        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
                        th { background: #0D9488; color: white; padding: 6px; text-align: left; font-size: 11px; }
                        td { padding: 6px; border: 1px solid #ddd; font-size: 11px; }
                        .signature { margin-top: 40px; display: flex; justify-content: space-between; }
                        .sig-box { text-align: center; width: 200px; }
                        .sig-line { border-top: 1px solid #333; margin-top: 60px; padding-top: 4px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>REKAM MEDIS PASIEN</h1>
                        <p>Hospital Medical Record Information System</p>
                        <p>No. RM: ${patient?.noRM || '-'}</p>
                    </div>

                    <h3>👤 Data Pasien</h3>
                    <div class="grid">
                        <div class="item"><label>Nama</label><span>${patient?.nama || '-'}</span></div>
                        <div class="item"><label>NIK</label><span>${patient?.nik || '-'}</span></div>
                        <div class="item"><label>TTL</label><span>${patient?.tempatLahir || '-'}, ${patient?.tanggalLahir || '-'}</span></div>
                        <div class="item"><label>Jenis Kelamin</label><span>${patient?.jenisKelamin || '-'}</span></div>
                        <div class="item full"><label>Alamat</label><span>${patient?.alamat || '-'}</span></div>
                    </div>

                    <h3>🩺 Informasi Pemeriksaan</h3>
                    <div class="grid">
                        <div class="item"><label>Tanggal</label><span>${record.tanggal}</span></div>
                        <div class="item"><label>Jam</label><span>${record.jam} WIB</span></div>
                        <div class="item full"><label>Dokter Pemeriksa</label><span>${doctor?.nama || '-'} (${doctor?.spesialis || '-'})</span></div>
                    </div>

                    <h3>📋 Keluhan & Riwayat</h3>
                    <div class="grid">
                        <div class="item full"><label>Keluhan Utama</label><span>${record.keluhan || '-'}</span></div>
                        <div class="item"><label>Riwayat Penyakit</label><span>${record.riwayatPenyakit || '-'}</span></div>
                        <div class="item"><label>Riwayat Alergi</label><span>${record.riwayatAlergi || '-'}</span></div>
                    </div>

                    <h3>💓 Tanda Vital</h3>
                    <div class="vitals">
                        <div class="vital"><strong>${record.tekananDarah || '-'}</strong>Tensi</div>
                        <div class="vital"><strong>${record.suhu || '-'}°C</strong>Suhu</div>
                        <div class="vital"><strong>${record.nadi || '-'}</strong>Nadi</div>
                        <div class="vital"><strong>${record.pernapasan || '-'}</strong>RR</div>
                        <div class="vital"><strong>${record.tinggiBadan || '-'} cm</strong>Tinggi</div>
                        <div class="vital"><strong>${record.beratBadan || '-'} kg</strong>Berat</div>
                        <div class="vital"><strong>${bmi}</strong>BMI</div>
                    </div>

                    <h3>🏥 Diagnosa & Tindakan</h3>
                    <div class="grid">
                        <div class="item"><label>Diagnosa</label><span>${record.diagnosa || '-'}</span></div>
                        <div class="item"><label>Kode ICD-10</label><span>${record.kodeICD || '-'}</span></div>
                        <div class="item full"><label>Tindakan</label><span>${record.tindakan || '-'}</span></div>
                        <div class="item full"><label>Catatan Dokter</label><span>${record.catatanDokter || '-'}</span></div>
                        <div class="item"><label>Status</label><span>${record.status || '-'}</span></div>
                    </div>

                    ${record.medicines && record.medicines.length > 0 ? `
                    <h3>💊 Resep Obat</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Obat</th>
                                <th>Dosis</th>
                                <th>Frekuensi</th>
                                <th>Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${record.medicines.map((m, i) => `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${m.name}</td>
                                    <td>${m.dose || '-'}</td>
                                    <td>${m.freq || '-'}</td>
                                    <td>${m.qty || '-'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    ` : ''}

                    <div class="signature">
                        <div class="sig-box">
                            <p>Pasien/Keluarga</p>
                            <div class="sig-line">( ${patient?.nama || '_______________'} )</div>
                        </div>
                        <div class="sig-box">
                            <p>Dokter Pemeriksa</p>
                            <div class="sig-line">( ${doctor?.nama || '_______________'} )</div>
                        </div>
                    </div>

                    <p style="text-align: center; margin-top: 30px; font-size: 10px; color: #999;">
                        Dicetak: ${new Date().toLocaleString('id-ID')} | HMRIS © 2024
                    </p>
                </body>
                </html>
            `;

            printWindow.document.write(html);
            printWindow.document.close();
            setTimeout(() => printWindow.print(), 500);

            UI.showToast('Rekam medis siap dicetak!', 'success');
        }

        printTable() {
            window.print();
            UI.showToast('Mempersiapkan print...', 'info');
        }

        // ==================== UTILITIES ====================
        formatDate(dateString) {
            if (!dateString) return '-';
            return new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
        }

        formatDateTime(dateString) {
            if (!dateString) return '-';
            return new Date(dateString).toLocaleDateString('id-ID', {
                day: '2-digit', month: 'long', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        }

        calculateAge(dateString) {
            if (!dateString) return '';
            const birth = new Date(dateString);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
            return `${age} tahun`;
        }
    }

    // ==================== INITIALIZE ====================
    document.addEventListener('DOMContentLoaded', () => {
        new RecordManager();
    });

})();