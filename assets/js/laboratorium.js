/**
 * ============================================
 * HMRIS Laboratorium - JavaScript (Modular)
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
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' },
            { name: 'Data Perawat', icon: 'fa-user-nurse', href: '#' },
            { name: 'Petugas RM', icon: 'fa-user-tie', href: '#' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' },
            { name: 'Farmasi', icon: 'fa-capsules', href: 'farmasi.html' },
            { name: 'Laboratorium', icon: 'fa-flask', href: 'laboratorium.html', active: true },
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
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: 'janji-temu.html' },
            { name: 'Laboratorium', icon: 'fa-flask', href: 'laboratorium.html' , active: true},
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
            { name: 'Hasil Lab Saya', icon: 'fa-flask', href: 'laboratorium.html' , active: true},
            { name: 'Antrian Saya', icon: 'fa-list-ol', href: '#' },
            { name: 'Resep Obat', icon: 'fa-pills', href: 'farmasi.html' },
            { category: 'Lainnya' },
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' },
            { name: 'Laporan Medis', icon: 'fa-file-download', href: 'laporan.html' },
            { name: 'Pengaturan', icon: 'fa-cog', href: 'pengaturan.html' }
        ]
    }
};

    // ==================== LAB TEST CONFIG ====================
    const LAB_TEST_CONFIG = {
        'Darah Lengkap': {
            icon: 'fa-tint',
            class: 'darah-lengkap',
            normalRange: 'Hb: 12-16 g/dL, Leukosit: 4-10K/µL, Trombosit: 150-400K/µL',
            unit: 'g/dL'
        },
        'Gula Darah': {
            icon: 'fa-cookie',
            class: 'gula-darah',
            normalRange: 'Puasa: 70-100 mg/dL, Sewaktu: 70-140 mg/dL',
            unit: 'mg/dL'
        },
        'Kolesterol': {
            icon: 'fa-bacon',
            class: 'kolesterol',
            normalRange: 'Total: < 200 mg/dL, LDL: < 100 mg/dL, HDL: > 40 mg/dL',
            unit: 'mg/dL'
        },
        'Asam Urat': {
            icon: 'fa-bone',
            class: 'asam-urat',
            normalRange: 'Pria: 3.4-7.0 mg/dL, Wanita: 2.4-6.0 mg/dL',
            unit: 'mg/dL'
        },
        'Urine': {
            icon: 'fa-flask',
            class: 'urine',
            normalRange: 'pH: 4.6-8.0, Protein: Negatif, Glukosa: Negatif',
            unit: ''
        },
        'Fungsi Hati': {
            icon: 'fa-liver',
            class: 'fungsi-hati',
            normalRange: 'SGOT: 10-40 U/L, SGPT: 10-40 U/L',
            unit: 'U/L'
        },
        'Fungsi Ginjal': {
            icon: 'fa-kidneys',
            class: 'fungsi-ginjal',
            normalRange: 'Ureum: 15-40 mg/dL, Kreatinin: 0.6-1.2 mg/dL',
            unit: 'mg/dL'
        },
        'Covid': {
            icon: 'fa-virus',
            class: 'covid',
            normalRange: 'Negatif',
            unit: ''
        },
        'Lainnya': {
            icon: 'fa-vial',
            class: 'lainnya',
            normalRange: 'Sesuai jenis tes',
            unit: ''
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

    // ==================== LAB MANAGER ====================
    class LabManager {
        constructor() {
            this.labTests = Storage.get(Storage.KEYS.LABORATORY) || [];
            this.patients = Storage.get(Storage.KEYS.PATIENTS) || [];
            this.doctors = Storage.get(Storage.KEYS.DOCTORS) || [];
            this.filteredTests = [...this.labTests];
            this.currentPage = 1;
            this.itemsPerPage = 10;
            this.sortField = 'createdAt';
            this.sortDirection = 'desc';
            this.searchTerm = '';
            this.filters = { status: '', jenis: '' };
            this.editingId = null;
            this.deletingId = null;

            if (this.labTests.length === 0) {
                this.seedDefaultLabTests();
            }

            this.init();
        }

        seedDefaultLabTests() {
            const today = new Date().toISOString().split('T')[0];
            const daysAgo = (n) => {
                const d = new Date();
                d.setDate(d.getDate() - n);
                return d.toISOString().split('T')[0];
            };

            const defaultTests = [
                { id: 'LAB-20240115-001', kode: 'LAB-20240115-001', tanggal: today, idPasien: 'demo-1', idDokter: 'demo-1', noRM: 'RM-20240115-001', pasienNama: 'Ahmad Wijaya', dokterNama: 'dr. Ahmad Fauzi, Sp.PD', jenisPemeriksaan: 'Darah Lengkap', hasil: 'Hb 14.5 g/dL, Leukosit 7.2K', nilaiNormal: 'Hb: 12-16 g/dL', keterangan: 'Hasil dalam batas normal', status: 'Selesai', createdAt: new Date().toISOString() },
                { id: 'LAB-20240115-002', kode: 'LAB-20240115-002', tanggal: today, idPasien: 'demo-2', idDokter: 'demo-2', noRM: 'RM-20240115-002', pasienNama: 'Siti Aminah', dokterNama: 'dr. Siti Nurhaliza, Sp.A', jenisPemeriksaan: 'Gula Darah', hasil: '95 mg/dL', nilaiNormal: '70-140 mg/dL', keterangan: 'Puasa 10 jam', status: 'Selesai', createdAt: new Date().toISOString() },
                { id: 'LAB-20240115-003', kode: 'LAB-20240115-003', tanggal: daysAgo(1), idPasien: 'demo-3', idDokter: 'demo-1', noRM: 'RM-20240114-001', pasienNama: 'Budi Santoso', dokterNama: 'dr. Ahmad Fauzi, Sp.PD', jenisPemeriksaan: 'Kolesterol', hasil: '245 mg/dL', nilaiNormal: '< 200 mg/dL', keterangan: 'Kolesterol tinggi, perlu diet', status: 'Selesai', createdAt: new Date().toISOString() },
                { id: 'LAB-20240115-004', kode: 'LAB-20240115-004', tanggal: daysAgo(2), idPasien: 'demo-4', idDokter: 'demo-3', noRM: 'RM-20240113-001', pasienNama: 'Rina Marlina', dokterNama: 'dr. Budi Santoso, Sp.B', jenisPemeriksaan: 'Asam Urat', hasil: '7.8 mg/dL', nilaiNormal: '2.4-6.0 mg/dL', keterangan: 'Tinggi, disarankan diet rendah purin', status: 'Selesai', createdAt: new Date().toISOString() },
                { id: 'LAB-20240115-005', kode: 'LAB-20240115-005', tanggal: today, idPasien: 'demo-5', idDokter: 'demo-2', noRM: 'RM-20240115-003', pasienNama: 'Dewi Lestari', dokterNama: 'dr. Siti Nurhaliza, Sp.A', jenisPemeriksaan: 'Urine', hasil: 'pH 6.5, Protein (-), Glukosa (-)', nilaiNormal: 'pH 4.6-8.0', keterangan: 'Normal', status: 'Diproses', createdAt: new Date().toISOString() },
                { id: 'LAB-20240115-006', kode: 'LAB-20240115-006', tanggal: daysAgo(1), idPasien: 'demo-6', idDokter: 'demo-1', noRM: 'RM-20240114-002', pasienNama: 'Hendra Kusuma', dokterNama: 'dr. Ahmad Fauzi, Sp.PD', jenisPemeriksaan: 'Fungsi Hati', hasil: 'SGOT 35 U/L, SGPT 42 U/L', nilaiNormal: 'SGOT: 10-40 U/L', keterangan: 'SGPT sedikit tinggi', status: 'Selesai', createdAt: new Date().toISOString() },
                { id: 'LAB-20240115-007', kode: 'LAB-20240115-007', tanggal: today, idPasien: 'demo-7', idDokter: 'demo-3', noRM: 'RM-20240115-004', pasienNama: 'Maya Sari', dokterNama: 'dr. Budi Santoso, Sp.B', jenisPemeriksaan: 'Fungsi Ginjal', hasil: 'Menunggu', nilaiNormal: 'Ureum: 15-40 mg/dL', keterangan: 'Sampel sudah diambil', status: 'Menunggu', createdAt: new Date().toISOString() },
                { id: 'LAB-20240115-008', kode: 'LAB-20240115-008', tanggal: daysAgo(3), idPasien: 'demo-8', idDokter: 'demo-2', noRM: 'RM-20240112-001', pasienNama: 'Andi Wijaya', dokterNama: 'dr. Siti Nurhaliza, Sp.A', jenisPemeriksaan: 'Covid', hasil: 'Negatif', nilaiNormal: 'Negatif', keterangan: 'PCR Test', status: 'Selesai', createdAt: new Date().toISOString() },
                { id: 'LAB-20240115-009', kode: 'LAB-20240115-009', tanggal: today, idPasien: 'demo-9', idDokter: 'demo-1', noRM: 'RM-20240115-005', pasienNama: 'Linda Permata', dokterNama: 'dr. Ahmad Fauzi, Sp.PD', jenisPemeriksaan: 'Gula Darah', hasil: 'Menunggu', nilaiNormal: '70-140 mg/dL', keterangan: '', status: 'Menunggu', createdAt: new Date().toISOString() },
                { id: 'LAB-20240115-010', kode: 'LAB-20240115-010', tanggal: daysAgo(1), idPasien: 'demo-10', idDokter: 'demo-3', noRM: 'RM-20240114-003', pasienNama: 'Joko Widodo', dokterNama: 'dr. Budi Santoso, Sp.B', jenisPemeriksaan: 'Darah Lengkap', hasil: 'Hb 11.2 g/dL (rendah)', nilaiNormal: 'Hb: 12-16 g/dL', keterangan: 'Anemia ringan', status: 'Selesai', createdAt: new Date().toISOString() }
            ];

            this.labTests = defaultTests;
            Storage.set(Storage.KEYS.LABORATORY, this.labTests);
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

        rrenderSidebar() {
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
            // Patient dropdown
            const patientSelect = document.getElementById('idPasien');
            patientSelect.innerHTML = '<option value="">-- Pilih Pasien --</option>';
            this.patients.forEach(p => {
                const opt = document.createElement('option');
                opt.value = p.id;
                opt.textContent = `${p.noRM} - ${p.nama}`;
                opt.dataset.noRM = p.noRM;
                opt.dataset.nik = p.nik;
                opt.dataset.jk = p.jenisKelamin;
                patientSelect.appendChild(opt);
            });

            // Doctor dropdown
            const doctorSelect = document.getElementById('idDokter');
            doctorSelect.innerHTML = '<option value="">-- Pilih Dokter --</option>';
            this.doctors.forEach(d => {
                const opt = document.createElement('option');
                opt.value = d.id;
                opt.textContent = `${d.nama} - ${d.spesialis}`;
                opt.dataset.nama = d.nama;
                doctorSelect.appendChild(opt);
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

            // Add lab test
            document.getElementById('btnAddLab').addEventListener('click', () => this.openAddModal());

            // Modal close buttons
            document.getElementById('btnCloseModal').addEventListener('click', () => this.closeModal('labModal'));
            document.getElementById('btnCancelForm').addEventListener('click', () => this.closeModal('labModal'));
            document.getElementById('btnCloseDetail').addEventListener('click', () => this.closeModal('detailModal'));
            document.getElementById('btnCloseDetail2').addEventListener('click', () => this.closeModal('detailModal'));
            document.getElementById('btnCancelDelete').addEventListener('click', () => this.closeModal('deleteModal'));

            // Close on overlay click
            ['labModal', 'detailModal', 'deleteModal'].forEach(id => {
                document.getElementById(id).addEventListener('click', (e) => {
                    if (e.target.id === id) this.closeModal(id);
                });
            });

            // Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    ['labModal', 'detailModal', 'deleteModal'].forEach(id => {
                        if (document.getElementById(id).classList.contains('active')) this.closeModal(id);
                    });
                }
            });

            // Patient change -> auto-fill No RM & show preview
            document.getElementById('idPasien').addEventListener('change', (e) => {
                const selected = e.target.options[e.target.selectedIndex];
                document.getElementById('noRM').value = selected.dataset.noRm || '';
                this.showPatientPreview(e.target.value);
            });

            // Jenis pemeriksaan change -> auto-fill nilai normal
            document.getElementById('jenisPemeriksaan').addEventListener('change', (e) => {
                const config = LAB_TEST_CONFIG[e.target.value];
                if (config) {
                    document.getElementById('nilaiNormal').value = config.normalRange;
                } else {
                    document.getElementById('nilaiNormal').value = '';
                }
            });

            // Hasil change -> check result status
            document.getElementById('hasil').addEventListener('input', () => this.updateResultStatus());

            // Set default date
            this.setDefaultDate();

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

            document.getElementById('filterJenis').addEventListener('change', (e) => {
                this.filters.jenis = e.target.value;
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
            document.getElementById('labForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

            // Detail edit
            document.getElementById('btnEditFromDetail').addEventListener('click', () => {
                const currentId = document.getElementById('detailModal').dataset.labId;
                this.closeModal('detailModal');
                this.openEditModal(currentId);
            });

            // Detail print
            document.getElementById('btnPrintLab').addEventListener('click', () => {
                const currentId = document.getElementById('detailModal').dataset.labId;
                this.printLabResult(currentId);
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

        setDefaultDate() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('tanggal').value = today;
            document.getElementById('tanggal').max = today;
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
                    <span class="preview-detail">${patient.noRM || '-'} • ${patient.jenisKelamin || '-'} • ${patient.noHP || '-'}</span>
                </div>
            `;
            preview.classList.add('show');
        }

        updateResultStatus() {
            const hasil = document.getElementById('hasil').value.trim();
            const jenis = document.getElementById('jenisPemeriksaan').value;
            const indicator = document.getElementById('resultStatus');

            if (!hasil || !jenis) {
                indicator.className = 'result-status';
                indicator.textContent = '';
                return;
            }

            // Simple analysis based on numeric value
            const numericMatch = hasil.match(/(\d+\.?\d*)/);
            if (!numericMatch) {
                indicator.className = 'result-status show warning';
                indicator.innerHTML = '<i class="fas fa-info-circle"></i> Masukkan angka untuk analisis otomatis';
                return;
            }

            const value = parseFloat(numericMatch[1]);
            const config = LAB_TEST_CONFIG[jenis];

            let verdict = 'warning';
            let message = '<i class="fas fa-info-circle"></i> Perlu verifikasi manual';

            // Simple range checks based on jenis
            if (jenis === 'Gula Darah') {
                if (value >= 70 && value <= 140) {
                    verdict = 'normal';
                    message = '<i class="fas fa-check-circle"></i> Hasil dalam rentang normal';
                } else if (value > 140 && value <= 200) {
                    verdict = 'warning';
                    message = '<i class="fas fa-exclamation-triangle"></i> Pre-diabetes';
                } else if (value > 200) {
                    verdict = 'abnormal';
                    message = '<i class="fas fa-times-circle"></i> Diatas normal';
                } else {
                    verdict = 'warning';
                    message = '<i class="fas fa-exclamation-triangle"></i> Dibawah normal';
                }
            } else if (jenis === 'Kolesterol') {
                if (value < 200) {
                    verdict = 'normal';
                    message = '<i class="fas fa-check-circle"></i> Normal';
                } else if (value < 240) {
                    verdict = 'warning';
                    message = '<i class="fas fa-exclamation-triangle"></i> Borderline tinggi';
                } else {
                    verdict = 'abnormal';
                    message = '<i class="fas fa-times-circle"></i> Tinggi';
                }
            } else if (jenis === 'Asam Urat') {
                if (value >= 2.4 && value <= 7.0) {
                    verdict = 'normal';
                    message = '<i class="fas fa-check-circle"></i> Normal';
                } else if (value > 7.0) {
                    verdict = 'abnormal';
                    message = '<i class="fas fa-times-circle"></i> Tinggi';
                } else {
                    verdict = 'warning';
                    message = '<i class="fas fa-exclamation-triangle"></i> Rendah';
                }
            } else {
                verdict = 'normal';
                message = '<i class="fas fa-check-circle"></i> Hasil tercatat';
            }

            indicator.className = `result-status show ${verdict}`;
            indicator.innerHTML = message;
        }

        // ==================== DATA OPERATIONS ====================
        refresh() {
            this.labTests = Storage.get(Storage.KEYS.LABORATORY) || [];
            this.patients = Storage.get(Storage.KEYS.PATIENTS) || [];
            this.doctors = Storage.get(Storage.KEYS.DOCTORS) || [];
            this.applyFilters();
            this.updateStats();
        }

        updateStats() {
            const total = this.labTests.length;
            const today = new Date().toISOString().split('T')[0];
            const todayCount = this.labTests.filter(t => t.tanggal === today).length;
            const completed = this.labTests.filter(t => t.status === 'Selesai').length;
            const pending = this.labTests.filter(t => t.status === 'Menunggu' || t.status === 'Diproses').length;

            this.animateCounter('statTotal', total);
            this.animateCounter('statToday', todayCount);
            this.animateCounter('statCompleted', completed);
            this.animateCounter('statPending', pending);
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
            let filtered = [...this.labTests];

            if (this.searchTerm) {
                filtered = filtered.filter(t =>
                    (t.kode || '').toLowerCase().includes(this.searchTerm) ||
                    (t.pasienNama || '').toLowerCase().includes(this.searchTerm) ||
                    (t.dokterNama || '').toLowerCase().includes(this.searchTerm) ||
                    (t.jenisPemeriksaan || '').toLowerCase().includes(this.searchTerm) ||
                    (t.noRM || '').toLowerCase().includes(this.searchTerm)
                );
            }

            if (this.filters.status) filtered = filtered.filter(t => t.status === this.filters.status);
            if (this.filters.jenis) filtered = filtered.filter(t => t.jenisPemeriksaan === this.filters.jenis);

            filtered.sort((a, b) => {
                let aVal = a[this.sortField];
                let bVal = b[this.sortField];
                if (typeof aVal === 'string') aVal = aVal.toLowerCase();
                if (typeof bVal === 'string') bVal = bVal.toLowerCase();
                if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });

            this.filteredTests = filtered;
            this.renderTable();
            this.renderPagination();
        }

        renderTable() {
            const tableBody = document.getElementById('tableBody');
            const emptyState = document.getElementById('emptyState');

            if (this.filteredTests.length === 0) {
                tableBody.innerHTML = '';
                emptyState.style.display = 'block';
                return;
            }

            emptyState.style.display = 'none';

            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            const pageData = this.filteredTests.slice(startIndex, endIndex);

            tableBody.innerHTML = pageData.map(test => {
                const statusClass = (test.status || '').toLowerCase();
                const jenisConfig = LAB_TEST_CONFIG[test.jenisPemeriksaan] || LAB_TEST_CONFIG['Lainnya'];

                return `
                    <tr data-id="${test.id}">
                        <td>
                            <span class="person-name">${this.formatDate(test.tanggal)}</span>
                        </td>
                        <td><code style="background: var(--gray-100); padding: 4px 8px; border-radius: 4px; font-size: 0.78rem;">${test.kode || '-'}</code></td>
                        <td>
                            <div class="person-cell">
                                <span class="person-name">${test.pasienNama || '-'}</span>
                                <span class="person-detail">NIK: ${test.pasienNIK || '-'}</span>
                            </div>
                        </td>
                        <td><span class="rm-cell">${test.noRM || '-'}</span></td>
                        <td>
                            <div class="person-cell">
                                <span class="person-name">${test.dokterNama || '-'}</span>
                                <span class="person-detail">${test.dokterSpesialis || ''}</span>
                            </div>
                        </td>
                        <td>
                            <span class="jenis-badge ${jenisConfig.class}">
                                <i class="fas ${jenisConfig.icon}"></i>
                                ${test.jenisPemeriksaan || '-'}
                            </span>
                        </td>
                        <td>
                            <span class="status-badge ${statusClass}">
                                <i class="fas fa-circle"></i> ${test.status || '-'}
                            </span>
                        </td>
                        <td class="text-center">
                            <div class="action-buttons">
                                <button class="action-btn view" data-action="view" data-id="${test.id}" title="Detail"><i class="fas fa-eye"></i></button>
                                <button class="action-btn edit" data-action="edit" data-id="${test.id}" title="Edit"><i class="fas fa-edit"></i></button>
                                <button class="action-btn delete" data-action="delete" data-id="${test.id}" data-code="${test.kode}" title="Hapus"><i class="fas fa-trash-alt"></i></button>
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

                    if (action === 'view') this.viewLabTest(id);
                    if (action === 'edit') this.openEditModal(id);
                    if (action === 'delete') this.openDeleteModal(id, btn.getAttribute('data-code'));
                });
            });

            document.getElementById('showingStart').textContent = this.filteredTests.length > 0 ? startIndex + 1 : 0;
            document.getElementById('showingEnd').textContent = Math.min(endIndex, this.filteredTests.length);
            document.getElementById('showingTotal').textContent = this.filteredTests.length;
        }

        renderPagination() {
            const pagination = document.getElementById('pagination');
            const totalPages = Math.ceil(this.filteredTests.length / this.itemsPerPage);

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

        generateKodeLab() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const todayPrefix = `LAB-${year}${month}${day}`;
            const todayCount = this.labTests.filter(t => t.kode && t.kode.startsWith(todayPrefix)).length;
            const sequence = String(todayCount + 1).padStart(3, '0');
            return `${todayPrefix}-${sequence}`;
        }

        openAddModal() {
            this.editingId = null;
            document.getElementById('labForm').reset();
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-flask"></i><span>Tambah Pemeriksaan Laboratorium</span>';
            document.getElementById('btnSubmitForm').innerHTML = '<i class="fas fa-save"></i><span>Simpan</span>';
            document.getElementById('kodeLab').value = this.generateKodeLab();
            this.setDefaultDate();
            this.clearAllErrors();

            document.getElementById('status').value = 'Menunggu';
            document.getElementById('patientPreview').classList.remove('show');
            document.getElementById('resultStatus').className = 'result-status';
            document.getElementById('resultStatus').textContent = '';

            UI.showModal('labModal');
        }

        openEditModal(id) {
            const test = this.labTests.find(t => t.id === id);
            if (!test) return;

            this.editingId = id;
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit"></i><span>Edit Pemeriksaan Lab</span>';
            document.getElementById('btnSubmitForm').innerHTML = '<i class="fas fa-save"></i><span>Update</span>';

            document.getElementById('kodeLab').value = test.kode || '';
            document.getElementById('tanggal').value = test.tanggal || '';
            document.getElementById('idPasien').value = test.idPasien || '';
            document.getElementById('noRM').value = test.noRM || '';
            document.getElementById('idDokter').value = test.idDokter || '';
            document.getElementById('jenisPemeriksaan').value = test.jenisPemeriksaan || '';
            document.getElementById('hasil').value = test.hasil || '';
            document.getElementById('nilaiNormal').value = test.nilaiNormal || '';
            document.getElementById('keterangan').value = test.keterangan || '';
            document.getElementById('status').value = test.status || 'Menunggu';

            this.showPatientPreview(test.idPasien);
            this.updateResultStatus();
            this.clearAllErrors();

            UI.showModal('labModal');
        }

        viewLabTest(id) {
            const test = this.labTests.find(t => t.id === id);
            if (!test) return;

            document.getElementById('detailModal').dataset.labId = id;

            const jenisConfig = LAB_TEST_CONFIG[test.jenisPemeriksaan] || LAB_TEST_CONFIG['Lainnya'];
            const statusClass = (test.status || '').toLowerCase();

            const detailBody = document.getElementById('detailBody');
            detailBody.innerHTML = `
                <div class="detail-header">
                    <div class="detail-icon-large">
                        <i class="fas ${jenisConfig.icon}"></i>
                    </div>
                    <div class="detail-main-info">
                        <h2>${test.jenisPemeriksaan || 'Pemeriksaan Lab'}</h2>
                        <div class="code-rm">${test.kode}</div>
                        <div class="detail-badges">
                            <span class="jenis-badge ${jenisConfig.class}">
                                <i class="fas ${jenisConfig.icon}"></i> ${test.jenisPemeriksaan}
                            </span>
                            <span class="status-badge ${statusClass}">
                                <i class="fas fa-circle"></i> ${test.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="result-card">
                    <div class="result-card-header">
                        <div class="result-card-title">
                            <i class="fas fa-file-medical-alt"></i> Hasil Pemeriksaan
                        </div>
                        <span class="result-verdict normal">
                            <i class="fas fa-check-circle"></i> ${test.status}
                        </span>
                    </div>
                    <div class="result-value">${test.hasil || '-'}</div>
                    <div class="result-normal-range">
                        <i class="fas fa-balance-scale"></i>
                        Nilai Normal: ${test.nilaiNormal || '-'}
                    </div>
                </div>

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-user-injured"></i> Data Pasien</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Nama Pasien</label>
                            <span>${test.pasienNama || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>No RM</label>
                            <span>${test.noRM || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>NIK</label>
                            <span>${test.pasienNIK || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>Jenis Kelamin</label>
                            <span>${test.pasienJK || '-'}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-user-md"></i> Informasi Pemeriksaan</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Tanggal</label>
                            <span>${this.formatDate(test.tanggal)}</span>
                        </div>
                        <div class="detail-item">
                            <label>Dokter Pengirim</label>
                            <span>${test.dokterNama || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>Spesialis</label>
                            <span>${test.dokterSpesialis || '-'}</span>
                        </div>
                        <div class="detail-item">
                            <label>Jenis Pemeriksaan</label>
                            <span>${test.jenisPemeriksaan || '-'}</span>
                        </div>
                    </div>
                </div>

                ${test.keterangan ? `
                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-align-left"></i> Keterangan</h4>
                    <div class="detail-item full-width">
                        <label>Catatan Laboratorium</label>
                        <span>${test.keterangan}</span>
                    </div>
                </div>
                ` : ''}

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-info-circle"></i> Informasi Sistem</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Dibuat</label>
                            <span>${this.formatDateTime(test.createdAt)}</span>
                        </div>
                        <div class="detail-item">
                            <label>Terakhir Update</label>
                            <span>${this.formatDateTime(test.updatedAt)}</span>
                        </div>
                    </div>
                </div>
            `;

            UI.showModal('detailModal');
        }

        openDeleteModal(id, code) {
            this.deletingId = id;
            document.getElementById('deleteLabCode').textContent = code || '';
            UI.showModal('deleteModal');
        }

        confirmDelete() {
            if (!this.deletingId) return;

            this.labTests = this.labTests.filter(t => t.id !== this.deletingId);
            Storage.set(Storage.KEYS.LABORATORY, this.labTests);

            this.closeModal('deleteModal');
            UI.showToast('Data pemeriksaan berhasil dihapus!', 'success');
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
                case 'idPasien': if (!value) error = 'Pasien wajib dipilih'; break;
                case 'idDokter': if (!value) error = 'Dokter wajib dipilih'; break;
                case 'jenisPemeriksaan': if (!value) error = 'Jenis pemeriksaan wajib dipilih'; break;
                case 'hasil':
                    if (!value) error = 'Hasil pemeriksaan wajib diisi';
                    else if (value.length < 2) error = 'Hasil minimal 2 karakter';
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
            const fields = ['tanggal', 'idPasien', 'idDokter', 'jenisPemeriksaan', 'hasil'];
            fields.forEach(f => { if (!this.validateField(f)) isValid = false; });

            if (!isValid) {
                document.getElementById('labForm').classList.add('shake');
                setTimeout(() => document.getElementById('labForm').classList.remove('shake'), 400);
                UI.showToast('Mohon lengkapi semua data dengan benar!', 'error');
                return;
            }

            const idPasien = document.getElementById('idPasien').value;
            const idDokter = document.getElementById('idDokter').value;
            const patient = this.patients.find(p => p.id === idPasien);
            const doctor = this.doctors.find(d => d.id === idDokter);

            const labData = {
                id: this.editingId || 'LAB-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                kode: document.getElementById('kodeLab').value,
                tanggal: document.getElementById('tanggal').value,
                idPasien: idPasien,
                idDokter: idDokter,
                noRM: patient?.noRM || document.getElementById('noRM').value,
                pasienNama: patient?.nama || '-',
                pasienNIK: patient?.nik || '-',
                pasienJK: patient?.jenisKelamin || '-',
                dokterNama: doctor?.nama || '-',
                dokterSpesialis: doctor?.spesialis || '-',
                jenisPemeriksaan: document.getElementById('jenisPemeriksaan').value,
                hasil: document.getElementById('hasil').value.trim(),
                nilaiNormal: document.getElementById('nilaiNormal').value.trim(),
                keterangan: document.getElementById('keterangan').value.trim(),
                status: document.getElementById('status').value,
                createdBy: this.currentUser.id,
                createdAt: this.editingId ? (this.labTests.find(t => t.id === this.editingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            if (this.editingId) {
                const index = this.labTests.findIndex(t => t.id === this.editingId);
                if (index !== -1) this.labTests[index] = labData;
                UI.showToast('Data pemeriksaan berhasil diupdate!', 'success');
            } else {
                this.labTests.push(labData);
                UI.showToast('Pemeriksaan baru berhasil ditambahkan!', 'success');
            }

            Storage.set(Storage.KEYS.LABORATORY, this.labTests);
            this.closeModal('labModal');
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
            if (this.filteredTests.length === 0) {
                UI.showToast('Tidak ada data untuk di-export!', 'warning');
                return;
            }

            const headers = ['Kode', 'Tanggal', 'Pasien', 'No RM', 'Dokter', 'Jenis', 'Hasil', 'Nilai Normal', 'Status'];
            const rows = this.filteredTests.map(t => [
                t.kode, t.tanggal, t.pasienNama, t.noRM, t.dokterNama,
                t.jenisPemeriksaan, t.hasil, t.nilaiNormal, t.status
            ]);

            const csv = [headers.join(','), ...rows.map(row => row.map(c => `"${c ?? ''}"`).join(','))].join('\n');

            const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `laboratorium-hmris-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);

            UI.showToast('Data berhasil di-export ke Excel (CSV)!', 'success');
        }

        exportPDF() {
            if (this.filteredTests.length === 0) {
                UI.showToast('Tidak ada data untuk di-export!', 'warning');
                return;
            }

            const printWindow = window.open('', '_blank');
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Laporan Laboratorium - HMRIS</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: 'Arial', sans-serif; padding: 20px; color: #333; font-size: 11px; }
                        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #0D9488; padding-bottom: 20px; }
                        .header h1 { color: #0D9488; font-size: 22px; margin-bottom: 5px; }
                        .header p { color: #666; }
                        .info { margin-bottom: 20px; }
                        table { width: 100%; border-collapse: collapse; font-size: 10px; }
                        th { background: #0D9488; color: white; padding: 8px 6px; text-align: left; }
                        td { padding: 6px; border: 1px solid #ddd; }
                        tr:nth-child(even) { background: #f9f9f9; }
                        .footer { margin-top: 30px; text-align: right; }
                        .signature { margin-top: 50px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>LABORATORIUM KLINIK</h1>
                        <p>Hospital Medical Record Information System</p>
                    </div>
                    <div class="info">
                        <p><strong>Tanggal:</strong> ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong>Total Pemeriksaan:</strong> ${this.filteredTests.length}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Kode</th>
                                <th>Pasien</th>
                                <th>No RM</th>
                                <th>Dokter</th>
                                <th>Jenis</th>
                                <th>Hasil</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.filteredTests.map((t, i) => `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${t.tanggal}</td>
                                    <td>${t.kode}</td>
                                    <td>${t.pasienNama}</td>
                                    <td>${t.noRM}</td>
                                    <td>${t.dokterNama}</td>
                                    <td>${t.jenisPemeriksaan}</td>
                                    <td>${t.hasil}</td>
                                    <td>${t.status}</td>
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
            setTimeout(() => printWindow.print(), 500);

            UI.showToast('Laporan PDF dibuka di tab baru!', 'success');
        }

        printLabResult(id) {
            const test = this.labTests.find(t => t.id === id);
            if (!test) return;

            const patient = this.patients.find(p => p.id === test.idPasien);
            const doctor = this.doctors.find(d => d.id === test.idDokter);
            const jenisConfig = LAB_TEST_CONFIG[test.jenisPemeriksaan] || LAB_TEST_CONFIG['Lainnya'];

            const printWindow = window.open('', '_blank');
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Hasil Lab - ${test.kode}</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: 'Arial', sans-serif; padding: 30px; color: #333; }
                        .header { text-align: center; border-bottom: 3px double #0D9488; padding-bottom: 20px; margin-bottom: 30px; }
                        .header h1 { color: #0D9488; font-size: 24px; margin-bottom: 5px; }
                        .header p { color: #666; font-size: 12px; }
                        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; }
                        .info-box { padding: 12px 16px; background: #f8f9fa; border-left: 4px solid #0D9488; border-radius: 4px; }
                        .info-box label { display: block; font-size: 10px; color: #666; text-transform: uppercase; font-weight: 700; margin-bottom: 4px; }
                        .info-box span { font-size: 13px; font-weight: 600; color: #0F172A; }
                        .result-section { margin: 30px 0; padding: 20px; background: #f0f9ff; border: 2px solid #0D9488; border-radius: 8px; }
                        .result-section h3 { color: #0D9488; font-size: 14px; margin-bottom: 12px; border-bottom: 1px dashed #0D9488; padding-bottom: 6px; }
                        .result-value { font-size: 24px; font-weight: 800; color: #0F172A; font-family: 'Courier New', monospace; margin: 10px 0; }
                        .result-normal { font-size: 12px; color: #666; }
                        .keterangan { margin: 20px 0; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; }
                        .keterangan h4 { color: #92400e; font-size: 13px; margin-bottom: 6px; }
                        .signature { margin-top: 50px; display: flex; justify-content: space-between; }
                        .sig-box { text-align: center; width: 220px; }
                        .sig-line { border-top: 1px solid #333; margin-top: 60px; padding-top: 5px; font-size: 12px; }
                        .footer { text-align: center; margin-top: 40px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 10px; color: #999; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1><i class="fas fa-flask"></i> HASIL PEMERIKSAAN LABORATORIUM</h1>
                        <p>Hospital Medical Record Information System</p>
                        <p style="font-family: 'Courier New', monospace; font-weight: 600; margin-top: 8px;">No: ${test.kode}</p>
                    </div>

                    <div class="info-grid">
                        <div class="info-box">
                            <label>Nama Pasien</label>
                            <span>${test.pasienNama || '-'}</span>
                        </div>
                        <div class="info-box">
                            <label>No RM</label>
                            <span>${test.noRM || '-'}</span>
                        </div>
                        <div class="info-box">
                            <label>NIK</label>
                            <span>${test.pasienNIK || '-'}</span>
                        </div>
                        <div class="info-box">
                            <label>Jenis Kelamin</label>
                            <span>${test.pasienJK || '-'}</span>
                        </div>
                        <div class="info-box">
                            <label>Tanggal Pemeriksaan</label>
                            <span>${this.formatDate(test.tanggal)}</span>
                        </div>
                        <div class="info-box">
                            <label>Dokter Pengirim</label>
                            <span>${test.dokterNama || '-'}</span>
                        </div>
                    </div>

                    <div class="result-section">
                        <h3><i class="fas ${jenisConfig.icon}"></i> ${test.jenisPemeriksaan}</h3>
                        <div class="result-value">${test.hasil || '-'}</div>
                        <div class="result-normal">
                            <strong>Nilai Normal:</strong> ${test.nilaiNormal || '-'}
                        </div>
                    </div>

                    ${test.keterangan ? `
                    <div class="keterangan">
                        <h4><i class="fas fa-sticky-note"></i> Keterangan</h4>
                        <p>${test.keterangan}</p>
                    </div>
                    ` : ''}

                    <div style="margin-top: 20px; padding: 10px; background: #f0fdf4; border-radius: 4px; font-size: 12px; color: #166534;">
                        <strong>Status:</strong> ${test.status} | 
                        <strong>Tanggal Cetak:</strong> ${new Date().toLocaleString('id-ID')}
                    </div>

                    <div class="signature">
                        <div class="sig-box">
                            <p>Pasien/Keluarga</p>
                            <div class="sig-line">( ${test.pasienNama || '_______________'} )</div>
                        </div>
                        <div class="sig-box">
                            <p>Petugas Laboratorium</p>
                            <div class="sig-line">( ___________________ )</div>
                        </div>
                        <div class="sig-box">
                            <p>Dokter Penanggung Jawab</p>
                            <div class="sig-line">( ${test.dokterNama || '_______________'} )</div>
                        </div>
                    </div>

                    <div class="footer">
                        <p>Dokumen ini dicetak otomatis oleh sistem HMRIS | © 2024 Hospital Medical Record Information System</p>
                    </div>
                </body>
                </html>
            `;

            printWindow.document.write(html);
            printWindow.document.close();
            setTimeout(() => printWindow.print(), 500);

            UI.showToast('Hasil lab siap dicetak!', 'success');
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
        new LabManager();
    });

})();