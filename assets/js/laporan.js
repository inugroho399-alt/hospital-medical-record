/**
 * ============================================
 * HMRIS Laporan - JavaScript (Modular)
 * Hospital Medical Record Information System
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
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' },
            { name: 'Data Perawat', icon: 'fa-user-nurse', href: '#' },
            { name: 'Petugas RM', icon: 'fa-user-tie', href: '#' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' },
            { name: 'Farmasi', icon: 'fa-capsules', href: 'farmasi.html' },
            { name: 'Laboratorium', icon: 'fa-flask', href: 'laboratorium.html' },
            { name: 'Laporan', icon: 'fa-chart-bar', href: 'laporan.html' , active: true},
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
            { name: 'Laporan Saya', icon: 'fa-chart-line', href: 'laporan.html' , active: true},
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
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' },
            { name: 'Laboratorium', icon: 'fa-flask', href: 'laboratorium.html' },
            { name: 'Laporan Harian', icon: 'fa-file-alt', href: 'laporan.html' , active: true},
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
            { name: 'Laporan Medis', icon: 'fa-file-download', href: 'laporan.html' , active: true},
            { name: 'Pengaturan', icon: 'fa-cog', href: 'pengaturan.html' }
        ]
    }
};

    // ==================== REPORT CONFIG ====================
    const REPORT_CONFIG = {
        pasien: {
            name: 'Laporan Pasien',
            icon: 'fa-users',
            columns: ['No', 'No RM', 'Nama', 'NIK', 'Jenis Kelamin', 'No HP', 'Status', 'Terdaftar']
        },
        dokter: {
            name: 'Laporan Dokter',
            icon: 'fa-user-md',
            columns: ['No', 'ID', 'Nama', 'Spesialis', 'Poli', 'No HP', 'Status', 'Jadwal']
        },
        rekammedis: {
            name: 'Laporan Rekam Medis',
            icon: 'fa-file-medical',
            columns: ['No', 'Tanggal', 'No RM', 'Pasien', 'Dokter', 'Diagnosa', 'Status']
        },
        janjitemu: {
            name: 'Laporan Janji Temu',
            icon: 'fa-calendar-check',
            columns: ['No', 'Kode', 'Tanggal', 'Pasien', 'Dokter', 'Jenis', 'Prioritas', 'Status']
        },
        laboratorium: {
            name: 'Laporan Laboratorium',
            icon: 'fa-flask',
            columns: ['No', 'Kode', 'Tanggal', 'Pasien', 'Dokter', 'Jenis', 'Hasil', 'Status']
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

        formatRupiah(amount) {
            if (!amount && amount !== 0) return 'Rp 0';
            return 'Rp ' + Number(amount).toLocaleString('id-ID');
        }
    };

    // ==================== REPORT MANAGER ====================
    class ReportManager {
        constructor() {
            this.patients = Storage.get(Storage.KEYS.PATIENTS) || [];
            this.doctors = Storage.get(Storage.KEYS.DOCTORS) || [];
            this.records = Storage.get(Storage.KEYS.RECORDS) || [];
            this.appointments = Storage.get(Storage.KEYS.APPOINTMENTS) || [];
            this.laboratory = Storage.get(Storage.KEYS.LABORATORY) || [];

            this.currentTab = 'pasien';
            this.currentPeriod = 6;
            this.currentData = [];
            this.searchTerm = '';

            this.filters = {
                startDate: '',
                endDate: '',
                month: '',
                year: '',
                doctor: '',
                status: ''
            };

            this.init();
        }

        init() {
            if (!this.checkAuth()) return;

            this.loadUserData();
            this.renderSidebar();
            this.populateFilterOptions();
            this.bindEvents();
            this.updateStatistics();
            this.renderCharts();
            this.renderReport();
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

        populateFilterOptions() {
            // Populate years
            const yearSelect = document.getElementById('filterYear');
            const currentYear = new Date().getFullYear();
            for (let y = currentYear; y >= currentYear - 5; y--) {
                const opt = document.createElement('option');
                opt.value = y;
                opt.textContent = y;
                yearSelect.appendChild(opt);
            }

            // Populate doctors
            const doctorSelect = document.getElementById('filterDoctor');
            this.doctors.forEach(d => {
                const opt = document.createElement('option');
                opt.value = d.id;
                opt.textContent = d.nama;
                doctorSelect.appendChild(opt);
            });

            // Set default month & year
            const now = new Date();
            document.getElementById('filterMonth').value = now.getMonth();
            document.getElementById('filterYear').value = now.getFullYear();
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

            // Tabs
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.currentTab = btn.dataset.tab;
                    this.renderReport();
                });
            });

            // Period buttons
            document.querySelectorAll('.period-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.currentPeriod = parseInt(btn.dataset.period);
                    this.renderCharts();
                });
            });

            // Filter actions
            document.getElementById('btnApplyFilter').addEventListener('click', () => this.applyFilters());
            document.getElementById('btnResetFilter').addEventListener('click', () => this.resetFilters());

            // Report search
            let searchTimeout;
            document.getElementById('reportSearch').addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.searchTerm = e.target.value.toLowerCase().trim();
                    this.renderReport();
                }, 300);
            });

            // Global search
            let globalSearchTimeout;
            document.getElementById('globalSearch').addEventListener('input', (e) => {
                clearTimeout(globalSearchTimeout);
                globalSearchTimeout = setTimeout(() => {
                    this.searchTerm = e.target.value.toLowerCase().trim();
                    this.renderReport();
                }, 300);
            });

            // Export buttons
            document.getElementById('btnExportExcel').addEventListener('click', () => this.exportExcel());
            document.getElementById('btnExportPDF').addEventListener('click', () => this.exportPDF());
            document.getElementById('btnPrint').addEventListener('click', () => this.printReport());

            // Resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 992) {
                    document.getElementById('sidebar').classList.remove('active');
                    document.getElementById('mobileOverlay').classList.remove('active');
                }
            });
        }

        // ==================== FILTER LOGIC ====================
        applyFilters() {
            this.filters.startDate = document.getElementById('filterStartDate').value;
            this.filters.endDate = document.getElementById('filterEndDate').value;
            this.filters.month = document.getElementById('filterMonth').value;
            this.filters.year = document.getElementById('filterYear').value;
            this.filters.doctor = document.getElementById('filterDoctor').value;
            this.filters.status = document.getElementById('filterStatus').value;

            this.updateStatistics();
            this.renderCharts();
            this.renderReport();
            UI.showToast('Filter berhasil diterapkan!', 'success');
        }

        resetFilters() {
            document.getElementById('filterStartDate').value = '';
            document.getElementById('filterEndDate').value = '';
            document.getElementById('filterMonth').value = '';
            document.getElementById('filterYear').value = '';
            document.getElementById('filterDoctor').value = '';
            document.getElementById('filterStatus').value = '';

            this.filters = {
                startDate: '',
                endDate: '',
                month: '',
                year: '',
                doctor: '',
                status: ''
            };

            this.updateStatistics();
            this.renderCharts();
            this.renderReport();
            UI.showToast('Filter direset!', 'info');
        }

        filterByDate(dateStr) {
            if (!dateStr) return true;
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return true;

            if (this.filters.startDate && date < new Date(this.filters.startDate)) return false;
            if (this.filters.endDate && date > new Date(this.filters.endDate)) return false;
            if (this.filters.month !== '' && date.getMonth() !== parseInt(this.filters.month)) return false;
            if (this.filters.year !== '' && date.getFullYear() !== parseInt(this.filters.year)) return false;

            return true;
        }

        filterByStatus(status) {
            if (!this.filters.status) return true;
            return status === this.filters.status;
        }

        filterByDoctor(doctorId) {
            if (!this.filters.doctor) return true;
            return doctorId === this.filters.doctor;
        }

        // ==================== STATISTICS ====================
        updateStatistics() {
            // Filter data by current filters
            const filteredPatients = this.patients.filter(p => this.filterByDate(p.createdAt));
            const filteredRecords = this.records.filter(r =>
                this.filterByDate(r.tanggal) &&
                this.filterByDoctor(r.idDokter) &&
                this.filterByStatus(r.status)
            );
            const filteredAppointments = this.appointments.filter(a =>
                this.filterByDate(a.tanggal) &&
                this.filterByDoctor(a.idDokter) &&
                this.filterByStatus(a.status)
            );
            const filteredLab = this.laboratory.filter(l =>
                this.filterByDate(l.tanggal) &&
                this.filterByDoctor(l.idDokter) &&
                this.filterByStatus(l.status)
            );
            const filteredDoctors = this.doctors.filter(d => this.filterByStatus(d.status));

            // Animate counters
            this.animateCounter('statTotalPasien', filteredPatients.length);
            this.animateCounter('statTotalDokter', filteredDoctors.length);
            this.animateCounter('statTotalRM', filteredRecords.length);
            this.animateCounter('statTotalJanji', filteredAppointments.length);
            this.animateCounter('statTotalLab', filteredLab.length);

            // Update trends (compare with previous period - simplified)
            const trend = (current, total) => {
                if (total === 0) return '0%';
                const percentage = Math.round((current / Math.max(total, 1)) * 100);
                return `${percentage}%`;
            };

            document.getElementById('trendPasien').textContent = trend(filteredPatients.length, this.patients.length);
            document.getElementById('trendRM').textContent = trend(filteredRecords.length, this.records.length);
            document.getElementById('trendJanji').textContent = trend(filteredAppointments.length, this.appointments.length);
            document.getElementById('trendLab').textContent = trend(filteredLab.length, this.laboratory.length);

            // Update tab counts
            document.getElementById('countPasien').textContent = filteredPatients.length;
            document.getElementById('countDokter').textContent = filteredDoctors.length;
            document.getElementById('countRM').textContent = filteredRecords.length;
            document.getElementById('countJanji').textContent = filteredAppointments.length;
            document.getElementById('countLab').textContent = filteredLab.length;
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

        // ==================== CHARTS ====================
        renderCharts() {
            this.renderBarChart('chartPasien', 'chartTotalPasien', this.patients, 'createdAt', '#0D9488', '#14B8A6');
            this.renderBarChart('chartRM', 'chartTotalRM', this.records, 'tanggal', '#6366F1', '#9D4EDD');
            this.renderBarChart('chartJanji', 'chartTotalJanji', this.appointments, 'tanggal', '#D97706', '#FFB347');
        }

        renderBarChart(svgId, totalId, data, dateField, colorStart, colorEnd) {
            const svg = document.getElementById(svgId);
            const totalEl = document.getElementById(totalId);
            if (!svg) return;

            svg.innerHTML = '';

            // Aggregate data by month
            const now = new Date();
            const monthsData = [];
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

            for (let i = this.currentPeriod - 1; i >= 0; i--) {
                const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const year = d.getFullYear();
                const month = d.getMonth();
                const count = data.filter(item => {
                    if (!item[dateField]) return false;
                    const itemDate = new Date(item[dateField]);
                    return itemDate.getFullYear() === year && itemDate.getMonth() === month;
                }).length;

                monthsData.push({
                    label: `${monthNames[month]} ${year.toString().substr(-2)}`,
                    value: count
                });
            }

            const total = monthsData.reduce((sum, d) => sum + d.value, 0);
            totalEl.textContent = total.toLocaleString('id-ID');

            // Chart dimensions
            const width = 400;
            const height = 200;
            const padding = { top: 20, right: 20, bottom: 40, left: 35 };
            const chartWidth = width - padding.left - padding.right;
            const chartHeight = height - padding.top - padding.bottom;

            const maxValue = Math.max(...monthsData.map(d => d.value), 1);
            const barWidth = chartWidth / monthsData.length * 0.7;
            const barSpacing = chartWidth / monthsData.length * 0.3;

            // Create SVG namespace
            const ns = 'http://www.w3.org/2000/svg';

            // Define gradient
            const defs = document.createElementNS(ns, 'defs');
            const gradient = document.createElementNS(ns, 'linearGradient');
            gradient.setAttribute('id', `gradient-${svgId}`);
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '0%');
            gradient.setAttribute('y2', '100%');

            const stop1 = document.createElementNS(ns, 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('style', `stop-color:${colorStart};stop-opacity:1`);

            const stop2 = document.createElementNS(ns, 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('style', `stop-color:${colorEnd};stop-opacity:1`);

            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
            svg.appendChild(defs);

            // Draw grid lines
            const gridCount = 4;
            for (let i = 0; i <= gridCount; i++) {
                const y = padding.top + (chartHeight / gridCount) * i;
                const line = document.createElementNS(ns, 'line');
                line.setAttribute('x1', padding.left);
                line.setAttribute('y1', y);
                line.setAttribute('x2', width - padding.right);
                line.setAttribute('y2', y);
                line.setAttribute('class', 'grid-line');
                svg.appendChild(line);

                // Y-axis label
                const value = Math.round(maxValue - (maxValue / gridCount) * i);
                const label = document.createElementNS(ns, 'text');
                label.setAttribute('x', padding.left - 6);
                label.setAttribute('y', y + 3);
                label.setAttribute('text-anchor', 'end');
                label.setAttribute('class', 'axis-label');
                label.textContent = value;
                svg.appendChild(label);
            }

            // Draw bars
            monthsData.forEach((data, i) => {
                const x = padding.left + (chartWidth / monthsData.length) * i + barSpacing / 2;
                const barHeight = (data.value / maxValue) * chartHeight;
                const y = padding.top + chartHeight - barHeight;

                // Bar
                const bar = document.createElementNS(ns, 'rect');
                bar.setAttribute('x', x);
                bar.setAttribute('y', y);
                bar.setAttribute('width', barWidth);
                bar.setAttribute('height', Math.max(barHeight, 2));
                bar.setAttribute('fill', `url(#gradient-${svgId})`);
                bar.setAttribute('rx', '3');
                bar.setAttribute('class', 'bar');
                bar.innerHTML = `<title>${data.label}: ${data.value}</title>`;
                svg.appendChild(bar);

                // Value label on top
                if (data.value > 0) {
                    const valueLabel = document.createElementNS(ns, 'text');
                    valueLabel.setAttribute('x', x + barWidth / 2);
                    valueLabel.setAttribute('y', y - 4);
                    valueLabel.setAttribute('class', 'value-label');
                    valueLabel.textContent = data.value;
                    svg.appendChild(valueLabel);
                }

                // X-axis label
                const xLabel = document.createElementNS(ns, 'text');
                xLabel.setAttribute('x', x + barWidth / 2);
                xLabel.setAttribute('y', height - padding.bottom + 15);
                xLabel.setAttribute('class', 'bar-label');
                xLabel.textContent = data.label;
                svg.appendChild(xLabel);
            });
        }

        // ==================== REPORT RENDERING ====================
        renderReport() {
            const config = REPORT_CONFIG[this.currentTab];
            const tableHead = document.getElementById('reportTableHead');
            const tableBody = document.getElementById('reportTableBody');
            const emptyState = document.getElementById('emptyState');

            // Render table header
            tableHead.innerHTML = `<tr>${config.columns.map(col => `<th>${col}</th>`).join('')}</tr>`;

            // Get data based on current tab
            let data = [];
            switch (this.currentTab) {
                case 'pasien':
                    data = this.patients.filter(p => this.filterByDate(p.createdAt) && this.filterByStatus(p.status || p.statusPasien));
                    break;
                case 'dokter':
                    data = this.doctors.filter(d => this.filterByStatus(d.status));
                    break;
                case 'rekammedis':
                    data = this.records.filter(r =>
                        this.filterByDate(r.tanggal) &&
                        this.filterByDoctor(r.idDokter) &&
                        this.filterByStatus(r.status)
                    );
                    break;
                case 'janjitemu':
                    data = this.appointments.filter(a =>
                        this.filterByDate(a.tanggal) &&
                        this.filterByDoctor(a.idDokter) &&
                        this.filterByStatus(a.status)
                    );
                    break;
                case 'laboratorium':
                    data = this.laboratory.filter(l =>
                        this.filterByDate(l.tanggal) &&
                        this.filterByDoctor(l.idDokter) &&
                        this.filterByStatus(l.status)
                    );
                    break;
            }

            // Apply search
            if (this.searchTerm) {
                data = data.filter(item => JSON.stringify(item).toLowerCase().includes(this.searchTerm));
            }

            // Sort by date descending
            data.sort((a, b) => {
                const dateA = new Date(a.tanggal || a.createdAt || 0);
                const dateB = new Date(b.tanggal || b.createdAt || 0);
                return dateB - dateA;
            });

            this.currentData = data;

            // Render table body
            if (data.length === 0) {
                tableBody.innerHTML = '';
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
                tableBody.innerHTML = data.map((item, i) => this.renderRow(item, i)).join('');
            }

            // Update showing count
            document.getElementById('reportShowing').textContent = data.length;
        }

        renderRow(item, index) {
            const statusClass = (item.status || item.statusPasien || '').toLowerCase().replace(/[-\s]/g, '');

            switch (this.currentTab) {
                case 'pasien':
                    return `
                        <tr>
                            <td>${index + 1}</td>
                            <td><span class="code-badge">${item.noRM || '-'}</span></td>
                            <td>
                                <div class="data-cell">
                                    <span class="data-cell-main">${item.nama || '-'}</span>
                                    <span class="data-cell-sub">${item.email || '-'}</span>
                                </div>
                            </td>
                            <td>${item.nik || '-'}</td>
                            <td>${item.jenisKelamin || '-'}</td>
                            <td>${item.noHP || '-'}</td>
                            <td><span class="status-badge ${statusClass}"><i class="fas fa-circle"></i> ${item.status || item.statusPasien || 'Aktif'}</span></td>
                            <td>${this.formatDate(item.createdAt)}</td>
                        </tr>
                    `;

                case 'dokter':
                    return `
                        <tr>
                            <td>${index + 1}</td>
                            <td><span class="code-badge">${item.id || '-'}</span></td>
                            <td>
                                <div class="data-cell">
                                    <span class="data-cell-main">${item.nama || '-'}</span>
                                    <span class="data-cell-sub">${item.email || '-'}</span>
                                </div>
                            </td>
                            <td><span class="category-badge">${item.spesialis || '-'}</span></td>
                            <td>${item.poli || '-'}</td>
                            <td>${item.noHP || '-'}</td>
                            <td><span class="status-badge ${statusClass}"><i class="fas fa-circle"></i> ${item.status || '-'}</span></td>
                            <td>${(item.hariPraktik || []).slice(0, 2).join(', ')}${(item.hariPraktik || []).length > 2 ? '...' : ''}</td>
                        </tr>
                    `;

                case 'rekammedis': {
                    const patient = this.patients.find(p => p.id === item.idPasien);
                    const doctor = this.doctors.find(d => d.id === item.idDokter);
                    return `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${this.formatDate(item.tanggal)}</td>
                            <td><span class="code-badge">${patient?.noRM || '-'}</span></td>
                            <td>
                                <div class="data-cell">
                                    <span class="data-cell-main">${patient?.nama || item.pasienNama || '-'}</span>
                                    <span class="data-cell-sub">${patient?.nik || '-'}</span>
                                </div>
                            </td>
                            <td>${doctor?.nama || item.dokterNama || '-'}</td>
                            <td>${item.diagnosa || '-'}</td>
                            <td><span class="status-badge ${statusClass}"><i class="fas fa-circle"></i> ${item.status || '-'}</span></td>
                        </tr>
                    `;
                }

                case 'janjitemu': {
                    const patient = this.patients.find(p => p.id === item.idPasien);
                    const doctor = this.doctors.find(d => d.id === item.idDokter);
                    return `
                        <tr>
                            <td>${index + 1}</td>
                            <td><span class="code-badge">${item.kode || '-'}</span></td>
                            <td>${this.formatDate(item.tanggal)} ${item.jam || ''}</td>
                            <td>${patient?.nama || item.pasienNama || '-'}</td>
                            <td>${doctor?.nama || item.dokterNama || '-'}</td>
                            <td>${item.jenisKunjungan || '-'}</td>
                            <td>${item.prioritas || '-'}</td>
                            <td><span class="status-badge ${statusClass}"><i class="fas fa-circle"></i> ${item.status || '-'}</span></td>
                        </tr>
                    `;
                }

                case 'laboratorium': {
                    const patient = this.patients.find(p => p.id === item.idPasien);
                    const doctor = this.doctors.find(d => d.id === item.idDokter);
                    return `
                        <tr>
                            <td>${index + 1}</td>
                            <td><span class="code-badge">${item.kode || '-'}</span></td>
                            <td>${this.formatDate(item.tanggal)}</td>
                            <td>${patient?.nama || item.pasienNama || '-'}</td>
                            <td>${doctor?.nama || item.dokterNama || '-'}</td>
                            <td><span class="category-badge">${item.jenisPemeriksaan || '-'}</span></td>
                            <td>${item.hasil || '-'}</td>
                            <td><span class="status-badge ${statusClass}"><i class="fas fa-circle"></i> ${item.status || '-'}</span></td>
                        </tr>
                    `;
                }

                default:
                    return '';
            }
        }

        // ==================== EXPORT FUNCTIONS ====================
        exportExcel() {
            if (this.currentData.length === 0) {
                UI.showToast('Tidak ada data untuk di-export!', 'warning');
                return;
            }

            const config = REPORT_CONFIG[this.currentTab];
            let headers = config.columns;
            let rows = [];

            this.currentData.forEach((item, i) => {
                switch (this.currentTab) {
                    case 'pasien':
                        rows.push([i + 1, item.noRM, item.nama, item.nik, item.jenisKelamin, item.noHP, item.status || item.statusPasien, this.formatDate(item.createdAt)]);
                        break;
                    case 'dokter':
                        rows.push([i + 1, item.id, item.nama, item.spesialis, item.poli, item.noHP, item.status, (item.hariPraktik || []).join(', ')]);
                        break;
                    case 'rekammedis': {
                        const patient = this.patients.find(p => p.id === item.idPasien);
                        const doctor = this.doctors.find(d => d.id === item.idDokter);
                        rows.push([i + 1, this.formatDate(item.tanggal), patient?.noRM || '-', patient?.nama || '-', doctor?.nama || '-', item.diagnosa, item.status]);
                        break;
                    }
                    case 'janjitemu': {
                        const patient = this.patients.find(p => p.id === item.idPasien);
                        const doctor = this.doctors.find(d => d.id === item.idDokter);
                        rows.push([i + 1, item.kode, `${this.formatDate(item.tanggal)} ${item.jam || ''}`, patient?.nama || '-', doctor?.nama || '-', item.jenisKunjungan, item.prioritas, item.status]);
                        break;
                    }
                    case 'laboratorium': {
                        const patient = this.patients.find(p => p.id === item.idPasien);
                        const doctor = this.doctors.find(d => d.id === item.idDokter);
                        rows.push([i + 1, item.kode, this.formatDate(item.tanggal), patient?.nama || '-', doctor?.nama || '-', item.jenisPemeriksaan, item.hasil, item.status]);
                        break;
                    }
                }
            });

            const csv = [
                headers.join(','),
                ...rows.map(row => row.map(cell => `"${cell ?? ''}"`).join(','))
            ].join('\n');

            const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `laporan-${this.currentTab}-hmris-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);

            UI.showToast('Data berhasil di-export ke Excel (CSV)!', 'success');
        }

        exportPDF() {
            if (this.currentData.length === 0) {
                UI.showToast('Tidak ada data untuk di-export!', 'warning');
                return;
            }

            const config = REPORT_CONFIG[this.currentTab];
            const printWindow = window.open('', '_blank');

            const rowsHtml = this.currentData.map((item, i) => {
                let cells = '';
                switch (this.currentTab) {
                    case 'pasien':
                        cells = `<td>${i + 1}</td><td>${item.noRM || '-'}</td><td>${item.nama || '-'}</td><td>${item.nik || '-'}</td><td>${item.jenisKelamin || '-'}</td><td>${item.status || item.statusPasien || '-'}</td>`;
                        break;
                    case 'dokter':
                        cells = `<td>${i + 1}</td><td>${item.id || '-'}</td><td>${item.nama || '-'}</td><td>${item.spesialis || '-'}</td><td>${item.poli || '-'}</td><td>${item.status || '-'}</td>`;
                        break;
                    case 'rekammedis': {
                        const patient = this.patients.find(p => p.id === item.idPasien);
                        const doctor = this.doctors.find(d => d.id === item.idDokter);
                        cells = `<td>${i + 1}</td><td>${this.formatDate(item.tanggal)}</td><td>${patient?.nama || '-'}</td><td>${doctor?.nama || '-'}</td><td>${item.diagnosa || '-'}</td><td>${item.status || '-'}</td>`;
                        break;
                    }
                    case 'janjitemu': {
                        const patient = this.patients.find(p => p.id === item.idPasien);
                        const doctor = this.doctors.find(d => d.id === item.idDokter);
                        cells = `<td>${i + 1}</td><td>${item.kode || '-'}</td><td>${this.formatDate(item.tanggal)}</td><td>${patient?.nama || '-'}</td><td>${doctor?.nama || '-'}</td><td>${item.status || '-'}</td>`;
                        break;
                    }
                    case 'laboratorium': {
                        const patient = this.patients.find(p => p.id === item.idPasien);
                        const doctor = this.doctors.find(d => d.id === item.idDokter);
                        cells = `<td>${i + 1}</td><td>${item.kode || '-'}</td><td>${this.formatDate(item.tanggal)}</td><td>${patient?.nama || '-'}</td><td>${item.jenisPemeriksaan || '-'}</td><td>${item.status || '-'}</td>`;
                        break;
                    }
                }
                return `<tr>${cells}</tr>`;
            }).join('');

            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Laporan ${config.name} - HMRIS</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: 'Arial', sans-serif; padding: 30px; color: #333; }
                        .header { text-align: center; border-bottom: 3px double #0D9488; padding-bottom: 15px; margin-bottom: 25px; }
                        .header h1 { color: #0D9488; font-size: 22px; margin-bottom: 5px; }
                        .header p { color: #666; font-size: 12px; }
                        .info { margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px; }
                        .info-item { padding: 8px 12px; background: #f8f9fa; border-left: 3px solid #0D9488; border-radius: 4px; }
                        .info-item label { display: block; font-size: 10px; color: #666; text-transform: uppercase; font-weight: 700; margin-bottom: 2px; }
                        .info-item span { font-weight: 600; color: #0F172A; }
                        table { width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 20px; }
                        th { background: #0D9488; color: white; padding: 8px 6px; text-align: left; }
                        td { padding: 6px; border: 1px solid #ddd; }
                        tr:nth-child(even) { background: #f9f9f9; }
                        .summary { margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 4px; border: 1px solid #bae6fd; }
                        .summary strong { color: #0D9488; }
                        .signature { margin-top: 40px; display: flex; justify-content: space-between; }
                        .sig-box { text-align: center; width: 200px; }
                        .sig-line { border-top: 1px solid #333; margin-top: 60px; padding-top: 4px; font-size: 11px; }
                        .footer { text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 10px; color: #999; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>LAPORAN ${config.name.toUpperCase()}</h1>
                        <p>Hospital Medical Record Information System</p>
                    </div>
                    <div class="info">
                        <div class="info-item">
                            <label>Tanggal Cetak</label>
                            <span>${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div class="info-item">
                            <label>Total Data</label>
                            <span>${this.currentData.length} data</span>
                        </div>
                        <div class="info-item">
                            <label>Periode Filter</label>
                            <span>${this.filters.startDate || 'Awal'} - ${this.filters.endDate || 'Sekarang'}</span>
                        </div>
                        <div class="info-item">
                            <label>Dicetak Oleh</label>
                            <span>${this.currentUser.nama || this.currentUser.username}</span>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>${config.columns.map(col => `<th>${col}</th>`).join('')}</tr>
                        </thead>
                        <tbody>${rowsHtml}</tbody>
                    </table>
                    <div class="summary">
                        <strong>Ringkasan:</strong> Total ${this.currentData.length} data pada laporan ${config.name}.
                        Filter diterapkan: ${this.filters.startDate ? 'Tanggal' : ''} ${this.filters.month !== '' ? 'Bulan' : ''} ${this.filters.year ? 'Tahun' : ''} ${this.filters.doctor ? 'Dokter' : ''} ${this.filters.status ? 'Status' : ''}
                    </div>
                    <div class="signature">
                        <div class="sig-box">
                            <p>Mengetahui,</p>
                            <div class="sig-line">( Kepala Rumah Sakit )</div>
                        </div>
                        <div class="sig-box">
                            <p>Dicetak oleh,</p>
                            <div class="sig-line">( ${this.currentUser.nama || this.currentUser.username} )</div>
                        </div>
                    </div>
                    <div class="footer">
                        <p>© 2024 HMRIS - Hospital Medical Record Information System | Dokumen ini dicetak otomatis oleh sistem</p>
                    </div>
                </body>
                </html>
            `;

            printWindow.document.write(html);
            printWindow.document.close();
            setTimeout(() => printWindow.print(), 500);

            UI.showToast('Laporan PDF dibuka di tab baru!', 'success');
        }

        printReport() {
            window.print();
            UI.showToast('Mempersiapkan print...', 'info');
        }

        logout() {
            Storage.remove(Storage.KEYS.CURRENT_USER);
            UI.showToast('Logout berhasil! Mengalihkan...', 'success');
            setTimeout(() => { window.location.href = '../login.html'; }, 1000);
        }

        // ==================== UTILITIES ====================
        formatDate(dateString) {
            if (!dateString) return '-';
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '-';
            return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
        }
    }

    // ==================== INITIALIZE ====================
    document.addEventListener('DOMContentLoaded', () => {
        new ReportManager();
    });

})();