

(function () {
    'use strict';

    // ==================== STORAGE MANAGER ====================
    const Storage = {
        KEYS: {
            USERS: 'hmris_users',
            PATIENTS: 'hmris_patients',
            DOCTORS: 'hmris_doctors',
            APPOINTMENTS: 'hmris_appointments',
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
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: 'rekam-medis.html' },
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' },
            { name: 'Data Perawat', icon: 'fa-user-nurse', href: '#' },
            { name: 'Petugas RM', icon: 'fa-user-tie', href: '#' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' , active: true},
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
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' , active: true},
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
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html', active: true },
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
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html', active: true },
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
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html', active: true },
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

    // ==================== APPOINTMENT MANAGER ====================
    class AppointmentManager {
        constructor() {
            this.appointments = Storage.get(Storage.KEYS.APPOINTMENTS) || [];
            this.patients = Storage.get(Storage.KEYS.PATIENTS) || [];
            this.doctors = Storage.get(Storage.KEYS.DOCTORS) || [];
            this.filteredAppointments = [...this.appointments];
            this.currentPage = 1;
            this.itemsPerPage = 10;
            this.sortField = 'createdAt';
            this.sortDirection = 'desc';
            this.searchTerm = '';
            this.filters = { status: '', priority: '', doctor: '', date: '' };
            this.editingId = null;
            this.deletingId = null;
            this.currentMonth = new Date().getMonth();
            this.currentYear = new Date().getFullYear();

            this.init();
        }

        init() {
            if (!this.checkAuth()) return;

            this.loadUserData();
            this.renderSidebar();
            this.populateDropdowns();
            this.bindEvents();
            this.renderCalendar();
            this.refresh();
            this.updateStats();
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

        populateDropdowns() {
            const patientSelect = document.getElementById('idPasien');
            patientSelect.innerHTML = '<option value="">-- Pilih Pasien --</option>';
            this.patients.forEach(p => {
                const opt = document.createElement('option');
                opt.value = p.id;
                opt.textContent = `${p.noRM} - ${p.nama}`;
                patientSelect.appendChild(opt);
            });

            const doctorSelect = document.getElementById('idDokter');
            doctorSelect.innerHTML = '<option value="">-- Pilih Dokter --</option>';
            this.doctors.forEach(d => {
                const opt = document.createElement('option');
                opt.value = d.id;
                opt.textContent = `${d.nama} - ${d.spesialis}`;
                doctorSelect.appendChild(opt);
            });

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

            // Add appointment
            document.getElementById('btnAddAppointment').addEventListener('click', () => this.openAddModal());

            // Modal close buttons
            document.getElementById('btnCloseModal').addEventListener('click', () => this.closeModal('appointmentModal'));
            document.getElementById('btnCancelForm').addEventListener('click', () => this.closeModal('appointmentModal'));
            document.getElementById('btnCloseDetail').addEventListener('click', () => this.closeModal('detailModal'));
            document.getElementById('btnCloseDetail2').addEventListener('click', () => this.closeModal('detailModal'));
            document.getElementById('btnCancelDelete').addEventListener('click', () => this.closeModal('deleteModal'));

            // Close on overlay click
            ['appointmentModal', 'detailModal', 'deleteModal'].forEach(id => {
                document.getElementById(id).addEventListener('click', (e) => {
                    if (e.target.id === id) this.closeModal(id);
                });
            });

            // Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    ['appointmentModal', 'detailModal', 'deleteModal'].forEach(id => {
                        if (document.getElementById(id).classList.contains('active')) this.closeModal(id);
                    });
                }
            });

            // Doctor change -> auto-fill poli
            document.getElementById('idDokter').addEventListener('change', (e) => {
                const doctor = this.doctors.find(d => d.id === e.target.value);
                document.getElementById('poli').value = doctor ? doctor.poli : '';
                this.showDoctorPreview(e.target.value);
            });

            // Patient change -> show preview
            document.getElementById('idPasien').addEventListener('change', (e) => {
                this.showPatientPreview(e.target.value);
            });

            // Check schedule conflict when date/time/doctor/patient change
            const conflictFields = ['tanggal', 'jam', 'idDokter', 'idPasien'];
            conflictFields.forEach(field => {
                document.getElementById(field).addEventListener('change', () => this.checkConflict());
            });

            // Calendar navigation
            document.getElementById('prevMonth').addEventListener('click', () => {
                this.currentMonth--;
                if (this.currentMonth < 0) {
                    this.currentMonth = 11;
                    this.currentYear--;
                }
                this.renderCalendar();
            });

            document.getElementById('nextMonth').addEventListener('click', () => {
                this.currentMonth++;
                if (this.currentMonth > 11) {
                    this.currentMonth = 0;
                    this.currentYear++;
                }
                this.renderCalendar();
            });

            // Clear date filter
            document.getElementById('btnClearDateFilter').addEventListener('click', () => {
                this.filters.date = '';
                this.currentPage = 1;
                this.applyFilters();
                this.renderCalendar();
                UI.showToast('Filter tanggal direset', 'info');
            });

            // Set default date/time
            this.setDefaultDateTime();

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

            document.getElementById('filterPriority').addEventListener('change', (e) => {
                this.filters.priority = e.target.value;
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
            document.getElementById('appointmentForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

            // Detail edit
            document.getElementById('btnEditFromDetail').addEventListener('click', () => {
                const currentId = document.getElementById('detailModal').dataset.appointmentId;
                this.closeModal('detailModal');
                this.openEditModal(currentId);
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
            // Default time: next hour
            const hour = String(now.getHours() + 1).padStart(2, '0');
            document.getElementById('tanggal').value = dateStr;
            document.getElementById('tanggal').min = dateStr;
            document.getElementById('jam').value = `${hour}:00`;
        }

        showPatientPreview(patientId) {
            const preview = document.getElementById('patientPreview');
            if (!patientId) {
                preview.classList.remove('show');
                return;
            }
            const patient = this.patients.find(p => p.id === patientId);
            if (!patient) return;

            preview.innerHTML = `
                <div class="preview-avatar">
                    ${patient.photo ? `<img src="${patient.photo}" alt="${patient.nama}">` : `<i class="fas fa-user-injured"></i>`}
                </div>
                <div class="preview-info">
                    <span class="preview-name">${patient.nama}</span>
                    <span class="preview-detail">${patient.noRM || '-'} • ${patient.jenisKelamin || '-'}</span>
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

        // ==================== SCHEDULE CONFLICT VALIDATION ====================
        checkConflict() {
            const tanggal = document.getElementById('tanggal').value;
            const jam = document.getElementById('jam').value;
            const idDokter = document.getElementById('idDokter').value;
            const idPasien = document.getElementById('idPasien').value;

            const warning = document.getElementById('conflictWarning');
            const message = document.getElementById('conflictMessage');

            if (!tanggal || !jam || !idDokter || !idPasien) {
                warning.style.display = 'none';
                return false;
            }

            const conflict = this.validateScheduleConflict(tanggal, jam, idDokter, idPasien, this.editingId);

            if (conflict.conflict) {
                warning.style.display = 'flex';
                message.textContent = conflict.message;
                return true;
            } else {
                warning.style.display = 'none';
                return false;
            }
        }

        validateScheduleConflict(tanggal, jam, idDokter, idPasien, excludeId = null) {
            const conflicts = this.appointments.filter(a =>
                a.id !== excludeId &&
                a.tanggal === tanggal &&
                a.jam === jam &&
                a.status !== 'Dibatalkan'
            );

            // Check doctor conflict
            const doctorConflict = conflicts.find(a => a.idDokter === idDokter);
            if (doctorConflict) {
                const doctor = this.doctors.find(d => d.id === idDokter);
                const patient = this.patients.find(p => p.id === doctorConflict.idPasien);
                return {
                    conflict: true,
                    type: 'doctor',
                    message: `Dokter ${doctor?.nama || 'terpilih'} sudah memiliki janji dengan pasien ${patient?.nama || 'lain'} pada waktu yang sama.`
                };
            }

            // Check patient conflict
            const patientConflict = conflicts.find(a => a.idPasien === idPasien);
            if (patientConflict) {
                const doctor = this.doctors.find(d => d.id === patientConflict.idDokter);
                return {
                    conflict: true,
                    type: 'patient',
                    message: `Pasien sudah memiliki janji dengan ${doctor?.nama || 'dokter lain'} pada waktu yang sama.`
                };
            }

            // Check if time is within doctor's schedule
            const doctor = this.doctors.find(d => d.id === idDokter);
            if (doctor && doctor.jamMulai && doctor.jamSelesai) {
                const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                const appointmentDay = dayNames[new Date(tanggal).getDay()];

                if (doctor.hariPraktik && !doctor.hariPraktik.includes(appointmentDay)) {
                    return {
                        conflict: true,
                        type: 'schedule',
                        message: `Dokter ${doctor.nama} tidak praktik pada hari ${appointmentDay}. Hari praktik: ${doctor.hariPraktik.join(', ')}`
                    };
                }

                if (jam < doctor.jamMulai || jam > doctor.jamSelesai) {
                    return {
                        conflict: true,
                        type: 'schedule',
                        message: `Jam ${jam} di luar jam praktik dokter ${doctor.nama} (${doctor.jamMulai} - ${doctor.jamSelesai})`
                    };
                }
            }

            return { conflict: false };
        }

        // ==================== CALENDAR ====================
        renderCalendar() {
            const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

            document.getElementById('calMonth').textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;

            const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
            const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            const today = new Date();

            // Get dates with appointments
            const datesWithAppointments = new Set(
                this.appointments
                    .filter(a => a.status !== 'Dibatalkan')
                    .map(a => a.tanggal)
            );

            const grid = document.getElementById('calendarGrid');
            grid.innerHTML = '';

            // Weekdays
            const weekdays = document.createElement('div');
            weekdays.className = 'cal-weekdays';
            ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].forEach(day => {
                const dayEl = document.createElement('div');
                dayEl.className = 'cal-weekday';
                dayEl.textContent = day;
                weekdays.appendChild(dayEl);
            });
            grid.appendChild(weekdays);

            // Days
            const daysContainer = document.createElement('div');
            daysContainer.className = 'cal-days';

            // Empty cells
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'cal-day empty';
                daysContainer.appendChild(emptyDay);
            }

            // Days of month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayEl = document.createElement('div');
                dayEl.className = 'cal-day';
                dayEl.textContent = day;

                const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                if (day === today.getDate() && this.currentMonth === today.getMonth() && this.currentYear === today.getFullYear()) {
                    dayEl.classList.add('today');
                }

                if (datesWithAppointments.has(dateStr)) {
                    dayEl.classList.add('has-appointment');
                }

                if (this.filters.date === dateStr) {
                    dayEl.classList.add('selected');
                }

                dayEl.addEventListener('click', () => {
                    if (this.filters.date === dateStr) {
                        this.filters.date = '';
                    } else {
                        this.filters.date = dateStr;
                    }
                    this.currentPage = 1;
                    this.applyFilters();
                    this.renderCalendar();
                });

                daysContainer.appendChild(dayEl);
            }

            grid.appendChild(daysContainer);
        }

        // ==================== DATA OPERATIONS ====================
        refresh() {
            this.appointments = Storage.get(Storage.KEYS.APPOINTMENTS) || [];
            this.patients = Storage.get(Storage.KEYS.PATIENTS) || [];
            this.doctors = Storage.get(Storage.KEYS.DOCTORS) || [];
            this.applyFilters();
            this.updateStats();
            this.renderCalendar();
        }

        updateStats() {
            const total = this.appointments.length;
            const today = new Date().toISOString().split('T')[0];
            const todayCount = this.appointments.filter(a => a.tanggal === today && a.status !== 'Dibatalkan').length;
            const pending = this.appointments.filter(a => a.status === 'Dijadwalkan').length;
            const completed = this.appointments.filter(a => a.status === 'Selesai').length;

            this.animateCounter('statTotal', total);
            this.animateCounter('statToday', todayCount);
            this.animateCounter('statPending', pending);
            this.animateCounter('statCompleted', completed);
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
            let filtered = [...this.appointments];

            if (this.searchTerm) {
                filtered = filtered.filter(a => {
                    const patient = this.patients.find(p => p.id === a.idPasien);
                    const doctor = this.doctors.find(d => d.id === a.idDokter);
                    return (
                        (a.kode || '').toLowerCase().includes(this.searchTerm) ||
                        (patient?.nama || '').toLowerCase().includes(this.searchTerm) ||
                        (patient?.noRM || '').toLowerCase().includes(this.searchTerm) ||
                        (doctor?.nama || '').toLowerCase().includes(this.searchTerm) ||
                        (a.keluhan || '').toLowerCase().includes(this.searchTerm) ||
                        (a.jenisKunjungan || '').toLowerCase().includes(this.searchTerm)
                    );
                });
            }

            if (this.filters.status) filtered = filtered.filter(a => a.status === this.filters.status);
            if (this.filters.priority) filtered = filtered.filter(a => a.prioritas === this.filters.priority);
            if (this.filters.doctor) filtered = filtered.filter(a => a.idDokter === this.filters.doctor);
            if (this.filters.date) filtered = filtered.filter(a => a.tanggal === this.filters.date);

            filtered.sort((a, b) => {
                let aVal = a[this.sortField];
                let bVal = b[this.sortField];
                if (this.sortField === 'tanggal') {
                    aVal = `${a.tanggal} ${a.jam}`;
                    bVal = `${b.tanggal} ${b.jam}`;
                }
                if (typeof aVal === 'string') aVal = aVal.toLowerCase();
                if (typeof bVal === 'string') bVal = bVal.toLowerCase();
                if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });

            this.filteredAppointments = filtered;
            this.renderTable();
            this.renderPagination();
        }

        renderTable() {
            const tableBody = document.getElementById('tableBody');
            const emptyState = document.getElementById('emptyState');

            if (this.filteredAppointments.length === 0) {
                tableBody.innerHTML = '';
                emptyState.style.display = 'block';
                return;
            }

            emptyState.style.display = 'none';

            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            const pageData = this.filteredAppointments.slice(startIndex, endIndex);

            tableBody.innerHTML = pageData.map(apt => {
                const patient = this.patients.find(p => p.id === apt.idPasien);
                const doctor = this.doctors.find(d => d.id === apt.idDokter);
                const statusClass = (apt.status || '').toLowerCase().replace(/[-\s]/g, '');
                const priorityClass = (apt.prioritas || 'normal').toLowerCase();

                return `
                    <tr data-id="${apt.id}">
                        <td><code style="background: var(--gray-100); padding: 4px 8px; border-radius: 4px; font-size: 0.78rem;">${apt.kode || '-'}</code></td>
                        <td>
                            <div class="datetime-cell">
                                <span class="datetime-date">${this.formatDate(apt.tanggal)}</span>
                                <span class="datetime-time"><i class="fas fa-clock"></i> ${apt.jam || '-'} WIB</span>
                            </div>
                        </td>
                        <td>
                            <div class="person-cell">
                                <span class="person-name">${patient?.nama || '-'}</span>
                                <span class="person-detail">${patient?.noRM || '-'}</span>
                            </div>
                        </td>
                        <td>
                            <div class="person-cell">
                                <span class="person-name">${doctor?.nama || '-'}</span>
                                <span class="person-detail">${doctor?.spesialis || '-'}</span>
                            </div>
                        </td>
                        <td>${apt.poli || doctor?.poli || '-'}</td>
                        <td><span class="person-detail" style="font-size: 0.82rem;">${apt.jenisKunjungan || '-'}</span></td>
                        <td><span class="priority-badge ${priorityClass}"><i class="fas fa-circle" style="font-size: 0.5rem;"></i> ${apt.prioritas || 'Normal'}</span></td>
                        <td><span class="status-badge ${statusClass}"><i class="fas fa-circle"></i> ${apt.status || '-'}</span></td>
                        <td class="text-center">
                            <div class="action-buttons">
                                <button class="action-btn view" data-action="view" data-id="${apt.id}" title="Detail"><i class="fas fa-eye"></i></button>
                                <button class="action-btn edit" data-action="edit" data-id="${apt.id}" title="Edit"><i class="fas fa-edit"></i></button>
                                <button class="action-btn delete" data-action="delete" data-id="${apt.id}" data-code="${apt.kode}" title="Hapus"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');

            tableBody.querySelectorAll('[data-action]').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const action = btn.getAttribute('data-action');
                    const id = btn.getAttribute('data-id');

                    if (action === 'view') this.viewAppointment(id);
                    if (action === 'edit') this.openEditModal(id);
                    if (action === 'delete') this.openDeleteModal(id, btn.getAttribute('data-code'));
                });
            });

            document.getElementById('showingStart').textContent = this.filteredAppointments.length > 0 ? startIndex + 1 : 0;
            document.getElementById('showingEnd').textContent = Math.min(endIndex, this.filteredAppointments.length);
            document.getElementById('showingTotal').textContent = this.filteredAppointments.length;
        }

        renderPagination() {
            const pagination = document.getElementById('pagination');
            const totalPages = Math.ceil(this.filteredAppointments.length / this.itemsPerPage);

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

        generateKodeJanji() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const todayPrefix = `APT-${year}${month}${day}`;
            const todayCount = this.appointments.filter(a => a.kode && a.kode.startsWith(todayPrefix)).length;
            const sequence = String(todayCount + 1).padStart(3, '0');
            return `${todayPrefix}-${sequence}`;
        }

        openAddModal() {
            this.editingId = null;
            document.getElementById('appointmentForm').reset();
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-calendar-plus"></i><span>Buat Janji Temu Baru</span>';
            document.getElementById('btnSubmitForm').innerHTML = '<i class="fas fa-save"></i><span>Simpan Janji</span>';
            document.getElementById('kodeJanji').value = this.generateKodeJanji();
            document.getElementById('poli').value = '';
            this.setDefaultDateTime();
            this.clearAllErrors();

            document.getElementById('status').value = 'Dijadwalkan';
            document.querySelector('input[name="prioritas"][value="Normal"]').checked = true;

            document.getElementById('patientPreview').classList.remove('show');
            document.getElementById('doctorPreview').classList.remove('show');
            document.getElementById('conflictWarning').style.display = 'none';

            UI.showModal('appointmentModal');
        }

        openEditModal(id) {
            const apt = this.appointments.find(a => a.id === id);
            if (!apt) return;

            this.editingId = id;
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit"></i><span>Edit Janji Temu</span>';
            document.getElementById('btnSubmitForm').innerHTML = '<i class="fas fa-save"></i><span>Update Janji</span>';

            document.getElementById('kodeJanji').value = apt.kode || '';
            document.getElementById('tanggal').value = apt.tanggal || '';
            document.getElementById('jam').value = apt.jam || '';
            document.getElementById('idPasien').value = apt.idPasien || '';
            document.getElementById('idDokter').value = apt.idDokter || '';
            document.getElementById('poli').value = apt.poli || '';
            document.getElementById('jenisKunjungan').value = apt.jenisKunjungan || '';
            document.getElementById('keluhan').value = apt.keluhan || '';
            document.getElementById('status').value = apt.status || 'Dijadwalkan';

            const prioritasRadio = document.querySelector(`input[name="prioritas"][value="${apt.prioritas || 'Normal'}"]`);
            if (prioritasRadio) prioritasRadio.checked = true;

            this.showPatientPreview(apt.idPasien);
            this.showDoctorPreview(apt.idDokter);

            this.clearAllErrors();
            document.getElementById('conflictWarning').style.display = 'none';
            this.checkConflict();

            UI.showModal('appointmentModal');
        }

        viewAppointment(id) {
            const apt = this.appointments.find(a => a.id === id);
            if (!apt) return;

            const patient = this.patients.find(p => p.id === apt.idPasien);
            const doctor = this.doctors.find(d => d.id === apt.idDokter);

            document.getElementById('detailModal').dataset.appointmentId = id;

            const statusClass = (apt.status || '').toLowerCase().replace(/[-\s]/g, '');
            const priorityClass = (apt.prioritas || 'normal').toLowerCase();

            const detailBody = document.getElementById('detailBody');
            detailBody.innerHTML = `
                <div class="detail-header">
                    <div class="detail-icon-large">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="detail-main-info">
                        <h2>Janji Temu ${apt.kode || ''}</h2>
                        <div class="code-rm">${patient?.noRM || '-'}</div>
                        <div class="detail-badges">
                            <span class="status-badge ${statusClass}"><i class="fas fa-circle"></i> ${apt.status || '-'}</span>
                            <span class="priority-badge ${priorityClass}"><i class="fas fa-circle" style="font-size: 0.5rem;"></i> ${apt.prioritas || 'Normal'}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-calendar-alt"></i> Jadwal</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Tanggal</label>
                            <span>${this.formatDate(apt.tanggal)}</span>
                        </div>
                        <div class="detail-item">
                            <label>Jam</label>
                            <span>${apt.jam || '-'} WIB</span>
                        </div>
                        <div class="detail-item">
                            <label>Jenis Kunjungan</label>
                            <span>${apt.jenisKunjungan || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>Poli</label>
                            <span>${apt.poli || doctor?.poli || '-'}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-user-injured"></i> Data Pasien</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Nama</label>
                            <span>${patient?.nama || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>No RM</label>
                            <span>${patient?.noRM || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>No HP</label>
                            <span>${patient?.noHP || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>Jenis Kelamin</label>
                            <span>${patient?.jenisKelamin || '-'}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-user-md"></i> Data Dokter</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Nama</label>
                            <span>${doctor?.nama || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>Spesialis</label>
                            <span>${doctor?.spesialis || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>No HP</label>
                            <span>${doctor?.noHP || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>Jadwal Praktik</label>
                            <span>${(doctor?.hariPraktik || []).join(', ')} (${doctor?.jamMulai || '-'} - ${doctor?.jamSelesai || '-'})</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-comment-medical"></i> Keluhan</h4>
                    <div class="detail-item full-width">
                        <label>Keluhan Pasien</label>
                        <span>${apt.keluhan || '-'}</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-info-circle"></i> Informasi Sistem</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Dibuat</label>
                            <span>${this.formatDateTime(apt.createdAt)}</span>
                        </div>
                        <div class="detail-item">
                            <label>Terakhir Update</label>
                            <span>${this.formatDateTime(apt.updatedAt)}</span>
                        </div>
                    </div>
                </div>
            `;

            UI.showModal('detailModal');
        }

        openDeleteModal(id, code) {
            this.deletingId = id;
            document.getElementById('deleteAppointmentCode').textContent = code || '';
            UI.showModal('deleteModal');
        }

        confirmDelete() {
            if (!this.deletingId) return;

            this.appointments = this.appointments.filter(a => a.id !== this.deletingId);
            Storage.set(Storage.KEYS.APPOINTMENTS, this.appointments);

            this.closeModal('deleteModal');
            UI.showToast('Janji temu berhasil dihapus!', 'success');
            this.deletingId = null;
            this.refresh();
        }

        validateField(fieldId) {
            const field = document.getElementById(fieldId);
            if (!field) return true;
            const value = field.value.trim();
            let error = '';

            switch (fieldId) {
                case 'tanggal': if (!value) error = 'Tanggal wajib diisi'; break;
                case 'jam': if (!value) error = 'Jam wajib diisi'; break;
                case 'idPasien': if (!value) error = 'Pasien wajib dipilih'; break;
                case 'idDokter': if (!value) error = 'Dokter wajib dipilih'; break;
                case 'jenisKunjungan': if (!value) error = 'Jenis kunjungan wajib dipilih'; break;
                case 'keluhan':
                    if (!value) error = 'Keluhan wajib diisi';
                    else if (value.length < 5) error = 'Keluhan minimal 5 karakter';
                    break;
            }

            if (error) {
                this.showError(fieldId, error);
                return false;
            }
            this.clearError(fieldId);
            return true;
        }

        showError(fieldId, message) {
            const errorEl = document.getElementById(`error-${fieldId}`);
            if (errorEl) { errorEl.textContent = message; errorEl.classList.add('show'); }
        }

        clearError(fieldId) {
            const errorEl = document.getElementById(`error-${fieldId}`);
            if (errorEl) { errorEl.textContent = ''; errorEl.classList.remove('show'); }
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
            const fields = ['tanggal', 'jam', 'idPasien', 'idDokter', 'jenisKunjungan', 'keluhan'];
            fields.forEach(f => { if (!this.validateField(f)) isValid = false; });

            if (!isValid) {
                document.getElementById('appointmentForm').classList.add('shake');
                setTimeout(() => document.getElementById('appointmentForm').classList.remove('shake'), 400);
                UI.showToast('Mohon lengkapi semua data dengan benar!', 'error');
                return;
            }

            const tanggal = document.getElementById('tanggal').value;
            const jam = document.getElementById('jam').value;
            const idDokter = document.getElementById('idDokter').value;
            const idPasien = document.getElementById('idPasien').value;

            // Validate schedule conflict
            const conflict = this.validateScheduleConflict(tanggal, jam, idDokter, idPasien, this.editingId);
            if (conflict.conflict) {
                if (confirm(`⚠️ Peringatan: ${conflict.message}\n\nApakah Anda tetap ingin melanjutkan?`)) {
                    // User confirmed, proceed
                } else {
                    return;
                }
            }

            const doctor = this.doctors.find(d => d.id === idDokter);
            const prioritas = document.querySelector('input[name="prioritas"]:checked')?.value || 'Normal';

            const appointmentData = {
                id: this.editingId || 'APT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                kode: document.getElementById('kodeJanji').value,
                tanggal: tanggal,
                jam: jam,
                idPasien: idPasien,
                idDokter: idDokter,
                poli: document.getElementById('poli').value || doctor?.poli || '',
                jenisKunjungan: document.getElementById('jenisKunjungan').value,
                keluhan: document.getElementById('keluhan').value.trim(),
                prioritas: prioritas,
                status: document.getElementById('status').value,
                createdBy: this.currentUser.id,
                createdAt: this.editingId ? (this.appointments.find(a => a.id === this.editingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            if (this.editingId) {
                const index = this.appointments.findIndex(a => a.id === this.editingId);
                if (index !== -1) this.appointments[index] = appointmentData;
                UI.showToast('Janji temu berhasil diupdate!', 'success');
            } else {
                this.appointments.push(appointmentData);
                UI.showToast('Janji temu baru berhasil dibuat!', 'success');
            }

            Storage.set(Storage.KEYS.APPOINTMENTS, this.appointments);
            this.closeModal('appointmentModal');
            this.refresh();
        }

        closeModal(id) { UI.hideModal(id); }

        logout() {
            Storage.remove(Storage.KEYS.CURRENT_USER);
            UI.showToast('Logout berhasil! Mengalihkan...', 'success');
            setTimeout(() => { window.location.href = '../login.html'; }, 1000);
        }

        // ==================== EXPORT ====================
        exportExcel() {
            if (this.filteredAppointments.length === 0) {
                UI.showToast('Tidak ada data untuk di-export!', 'warning');
                return;
            }

            const headers = ['Kode', 'Tanggal', 'Jam', 'Pasien', 'Dokter', 'Poli', 'Jenis Kunjungan', 'Prioritas', 'Status'];
            const rows = this.filteredAppointments.map(a => {
                const patient = this.patients.find(p => p.id === a.idPasien);
                const doctor = this.doctors.find(d => d.id === a.idDokter);
                return [
                    a.kode,
                    a.tanggal,
                    a.jam,
                    patient?.nama || '-',
                    doctor?.nama || '-',
                    a.poli || '-',
                    a.jenisKunjungan || '-',
                    a.prioritas || '-',
                    a.status || '-'
                ];
            });

            const csv = [headers.join(','), ...rows.map(row => row.map(c => `"${c}"`).join(','))].join('\n');

            const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `janji-temu-hmris-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);

            UI.showToast('Data berhasil di-export ke Excel (CSV)!', 'success');
        }

        exportPDF() {
            if (this.filteredAppointments.length === 0) {
                UI.showToast('Tidak ada data untuk di-export!', 'warning');
                return;
            }

            const printWindow = window.open('', '_blank');
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Laporan Janji Temu - HMRIS</title>
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
                        <p>Laporan Janji Temu</p>
                    </div>
                    <div class="info">
                        <p><strong>Tanggal:</strong> ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Total Data:</strong> ${this.filteredAppointments.length} janji temu</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Kode</th>
                                <th>Tanggal</th>
                                <th>Jam</th>
                                <th>Pasien</th>
                                <th>Dokter</th>
                                <th>Jenis</th>
                                <th>Prioritas</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.filteredAppointments.map((a, i) => {
                                const patient = this.patients.find(p => p.id === a.idPasien);
                                const doctor = this.doctors.find(d => d.id === a.idDokter);
                                return `
                                    <tr>
                                        <td>${i + 1}</td>
                                        <td>${a.kode}</td>
                                        <td>${a.tanggal}</td>
                                        <td>${a.jam}</td>
                                        <td>${patient?.nama || '-'}</td>
                                        <td>${doctor?.nama || '-'}</td>
                                        <td>${a.jenisKunjungan || '-'}</td>
                                        <td>${a.prioritas || '-'}</td>
                                        <td>${a.status || '-'}</td>
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
    }

    // ==================== INITIALIZE ====================
    document.addEventListener('DOMContentLoaded', () => {
        new AppointmentManager();
    });

})();