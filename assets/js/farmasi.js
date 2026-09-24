/**
 * ============================================
 * HMRIS Farmasi - JavaScript (Modular)
 * Hospital Medical Record Information System
 * ============================================
 */

(function () {
    'use strict';

    // ==================== STORAGE MANAGER ====================
    const Storage = {
        KEYS: {
            USERS: 'hmris_users',
            MEDICINES: 'hmris_medicines',
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
            { name: 'Farmasi', icon: 'fa-capsules', href: 'farmasi.html', active: true },
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
            { name: 'Resep Obat', icon: 'fa-pills', href: 'farmasi.html' , active: true},
            { category: 'Lainnya' },
            { name: 'Data Dokter', icon: 'fa-user-md', href: 'dokter.html' },
            { name: 'Laporan Medis', icon: 'fa-file-download', href: 'laporan.html' },
            { name: 'Pengaturan', icon: 'fa-cog', href: 'pengaturan.html' }
        ]
    }
};

    // ==================== CATEGORY CONFIG ====================
    const CATEGORY_CONFIG = {
        'Antibiotik': { icon: 'fa-bacteria', class: 'antibiotik' },
        'Analgesik': { icon: 'fa-head-side-virus', class: 'analgesik' },
        'Antipiretik': { icon: 'fa-thermometer-full', class: 'antipiretik' },
        'Vitamin': { icon: 'fa-apple-alt', class: 'vitamin' },
        'Suplemen': { icon: 'fa-dumbbell', class: 'suplemen' },
        'Obat Jantung': { icon: 'fa-heartbeat', class: 'obat-jantung' },
        'Obat Diabetes': { icon: 'fa-syringe', class: 'obat-diabetes' },
        'Obat Hipertensi': { icon: 'fa-heart', class: 'obat-hipertensi' },
        'Obat Lambung': { icon: 'fa-stomach', class: 'obat-lambung' },
        'Obat Alergi': { icon: 'fa-allergies', class: 'obat-alergi' },
        'Obat Batuk': { icon: 'fa-head-side-cough', class: 'obat-batuk' },
        'Obat Flu': { icon: 'fa-viruses', class: 'obat-flu' },
        'Lainnya': { icon: 'fa-pills', class: 'lainnya' }
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
        },

        formatRupiah(amount) {
            if (!amount && amount !== 0) return 'Rp 0';
            return 'Rp ' + Number(amount).toLocaleString('id-ID');
        },

        formatRupiahShort(amount) {
            if (!amount && amount !== 0) return 'Rp 0';
            if (amount >= 1000000000) return 'Rp ' + (amount / 1000000000).toFixed(1) + ' M';
            if (amount >= 1000000) return 'Rp ' + (amount / 1000000).toFixed(1) + ' Jt';
            if (amount >= 1000) return 'Rp ' + (amount / 1000).toFixed(0) + ' Rb';
            return 'Rp ' + amount;
        }
    };

    // ==================== MEDICINE MANAGER ====================
    class MedicineManager {
        constructor() {
            this.medicines = Storage.get(Storage.KEYS.MEDICINES) || [];
            this.filteredMedicines = [...this.medicines];
            this.currentPage = 1;
            this.itemsPerPage = 10;
            this.sortField = 'createdAt';
            this.sortDirection = 'desc';
            this.searchTerm = '';
            this.filters = { category: '', status: '', stock: '', expiry: '' };
            this.editingId = null;
            this.deletingId = null;

            if (this.medicines.length === 0) {
                this.seedDefaultMedicines();
            }

            this.init();
        }

        seedDefaultMedicines() {
            const today = new Date();
            const addDays = (days) => {
                const d = new Date(today);
                d.setDate(d.getDate() + days);
                return d.toISOString().split('T')[0];
            };

            const defaultMedicines = [
                { id: 'OBT-20240101-001', kode: 'OBT-20240101-001', nama: 'Amoxicillin 500mg', kategori: 'Antibiotik', satuan: 'Kapsul', stok: 250, harga: 8500, expired: addDays(180), supplier: 'PT Kimia Farma', status: 'Aktif', deskripsi: 'Antibiotik spektrum luas', createdAt: '2024-01-15T08:00:00.000Z' },
                { id: 'OBT-20240101-002', kode: 'OBT-20240101-002', nama: 'Paracetamol 500mg', kategori: 'Analgesik', satuan: 'Tablet', stok: 500, harga: 3500, expired: addDays(365), supplier: 'PT Dexa Medica', status: 'Aktif', deskripsi: 'Pereda nyeri dan penurun demam', createdAt: '2024-01-15T08:00:00.000Z' },
                { id: 'OBT-20240101-003', kode: 'OBT-20240101-003', nama: 'Vitamin C 1000mg', kategori: 'Vitamin', satuan: 'Tablet', stok: 8, harga: 15000, expired: addDays(90), supplier: 'PT Kalbe Farma', status: 'Aktif', deskripsi: 'Suplemen vitamin C', createdAt: '2024-01-15T08:00:00.000Z' },
                { id: 'OBT-20240101-004', kode: 'OBT-20240101-004', nama: 'Omeprazole 20mg', kategori: 'Obat Lambung', satuan: 'Kapsul', stok: 0, harga: 12000, expired: addDays(120), supplier: 'PT Sanbe Farma', status: 'Habis', deskripsi: 'Obat asam lambung', createdAt: '2024-01-15T08:00:00.000Z' },
                { id: 'OBT-20240101-005', kode: 'OBT-20240101-005', nama: 'Metformin 500mg', kategori: 'Obat Diabetes', satuan: 'Tablet', stok: 150, harga: 7500, expired: addDays(240), supplier: 'PT Novell Pharma', status: 'Aktif', deskripsi: 'Obat diabetes tipe 2', createdAt: '2024-01-15T08:00:00.000Z' },
                { id: 'OBT-20240101-006', kode: 'OBT-20240101-006', nama: 'Amlodipine 5mg', kategori: 'Obat Hipertensi', satuan: 'Tablet', stok: 5, harga: 9500, expired: addDays(15), supplier: 'PT Pfizer Indonesia', status: 'Aktif', deskripsi: 'Obat tekanan darah tinggi', createdAt: '2024-01-15T08:00:00.000Z' },
                { id: 'OBT-20240101-007', kode: 'OBT-20240101-007', nama: 'Cetirizine 10mg', kategori: 'Obat Alergi', satuan: 'Tablet', stok: 3, harga: 6000, expired: addDays(25), supplier: 'PT Dexa Medica', status: 'Aktif', deskripsi: 'Antihistamin untuk alergi', createdAt: '2024-01-15T08:00:00.000Z' },
                { id: 'OBT-20240101-008', kode: 'OBT-20240101-008', nama: 'Aspirin 80mg', kategori: 'Obat Jantung', satuan: 'Tablet', stok: 120, harga: 5500, expired: addDays(-5), supplier: 'PT Bayer Indonesia', status: 'Aktif', deskripsi: 'Pengencer darah', createdAt: '2024-01-15T08:00:00.000Z' },
                { id: 'OBT-20240101-009', kode: 'OBT-20240101-009', nama: 'Ibuprofen 400mg', kategori: 'Analgesik', satuan: 'Tablet', stok: 300, harga: 4500, expired: addDays(200), supplier: 'PT Sanbe Farma', status: 'Aktif', deskripsi: 'Anti-inflamasi non-steroid', createdAt: '2024-01-15T08:00:00.000Z' },
                { id: 'OBT-20240101-010', kode: 'OBT-20240101-010', nama: 'Dexamethasone 0.5mg', kategori: 'Lainnya', satuan: 'Tablet', stok: 0, harga: 8000, expired: addDays(60), supplier: 'PT Kimia Farma', status: 'Habis', deskripsi: 'Kortikosteroid', createdAt: '2024-01-15T08:00:00.000Z' },
                { id: 'OBT-20240101-011', kode: 'OBT-20240101-011', nama: 'Salbutamol Inhaler', kategori: 'Lainnya', satuan: 'Inhaler', stok: 45, harga: 65000, expired: addDays(300), supplier: 'PT GlaxoSmithKline', status: 'Aktif', deskripsi: 'Obat asma', createdAt: '2024-01-15T08:00:00.000Z' },
                { id: 'OBT-20240101-012', kode: 'OBT-20240101-012', nama: 'CTM 4mg', kategori: 'Obat Alergi', satuan: 'Tablet', stok: 7, harga: 2500, expired: addDays(45), supplier: 'PT Indofarma', status: 'Aktif', deskripsi: 'Antihistamin', createdAt: '2024-01-15T08:00:00.000Z' }
            ];

            this.medicines = defaultMedicines;
            Storage.set(Storage.KEYS.MEDICINES, this.medicines);
        }

        init() {
            if (!this.checkAuth()) return;

            this.loadUserData();
            this.renderSidebar();
            this.bindEvents();
            this.refresh();
            this.updateStats();
            this.updateAlerts();
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
}renderSidebar() {
    const role = (this.currentUser.role || '').toLowerCase();
    const config = ROLE_CONFIG[role] || ROLE_CONFIG.admin;
    const navList = document.getElementById('navList');
    navList.innerHTML = '';

    config.menus.forEach(item => {
        if (item.category) {
            const el = document.createElement('li');
            el.className = 'nav-category';
            el.textContent = item.category;
            navList.appendChild(el);
        } else {
            const menuItem = document.createElement('li');
            menuItem.className = 'nav-item';
            const link = document.createElement('a');
            link.href = item.href || '#';
            link.className = 'nav-link' + (item.active ? ' active' : '');
            link.dataset.href = item.href || '#';
            link.innerHTML = `
                <i class="fas ${item.icon}"></i>
                <span>${item.name}</span>
                ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
            `;

            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const finalHref = link.dataset.href || link.getAttribute('href') || item.href;
                console.log('🖱️ Menu clicked:', item.name, '| href:', finalHref);
                this.handleMenuClick(item.name, finalHref);
            });

            menuItem.appendChild(link);
            navList.appendChild(menuItem);
        }
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

            // Add medicine
            document.getElementById('btnAddMedicine').addEventListener('click', () => this.openAddModal());

            // Modal close buttons
            document.getElementById('btnCloseModal').addEventListener('click', () => this.closeModal('medicineModal'));
            document.getElementById('btnCancelForm').addEventListener('click', () => this.closeModal('medicineModal'));
            document.getElementById('btnCloseDetail').addEventListener('click', () => this.closeModal('detailModal'));
            document.getElementById('btnCloseDetail2').addEventListener('click', () => this.closeModal('detailModal'));
            document.getElementById('btnCancelDelete').addEventListener('click', () => this.closeModal('deleteModal'));
            document.getElementById('btnCloseAlertModal').addEventListener('click', () => this.closeModal('alertModal'));
            document.getElementById('btnCloseAlertModal2').addEventListener('click', () => this.closeModal('alertModal'));

            // Close on overlay click
            ['medicineModal', 'detailModal', 'deleteModal', 'alertModal'].forEach(id => {
                document.getElementById(id).addEventListener('click', (e) => {
                    if (e.target.id === id) this.closeModal(id);
                });
            });

            // Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    ['medicineModal', 'detailModal', 'deleteModal', 'alertModal'].forEach(id => {
                        if (document.getElementById(id).classList.contains('active')) this.closeModal(id);
                    });
                }
            });

            // Stock live indicator
            document.getElementById('stok').addEventListener('input', () => this.updateStockIndicator());

            // Price live preview
            document.getElementById('harga').addEventListener('input', () => this.updatePricePreview());

            // Expiry live indicator
            document.getElementById('expired').addEventListener('change', () => this.updateExpiryIndicator());

            // Alerts button
            document.getElementById('btnAlerts').addEventListener('click', () => this.showAlertModal());

            // Close alert banner
            document.getElementById('btnCloseAlert').addEventListener('click', () => {
                document.getElementById('alertBanner').style.display = 'none';
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
            ['filterCategory', 'filterStatus', 'filterStock', 'filterExpiry'].forEach(id => {
                document.getElementById(id).addEventListener('change', (e) => {
                    const key = id.replace('filter', '').toLowerCase();
                    this.filters[key] = e.target.value;
                    this.currentPage = 1;
                    this.applyFilters();
                });
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
            document.getElementById('medicineForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

            // Detail edit
            document.getElementById('btnEditFromDetail').addEventListener('click', () => {
                const currentId = document.getElementById('detailModal').dataset.medicineId;
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

        // ==================== LIVE INDICATORS ====================
        updateStockIndicator() {
            const stok = parseInt(document.getElementById('stok').value) || 0;
            const indicator = document.getElementById('stockIndicator');

            let className = 'safe';
            let message = '✅ Stok aman';

            if (stok === 0) {
                className = 'out';
                message = '🔴 Stok habis - Segera restok!';
            } else if (stok < 10) {
                className = 'low';
                message = '🟠 Stok rendah - Segera restok';
            } else if (stok < 50) {
                className = 'medium';
                message = '🟡 Stok cukup - Pantau rutin';
            }

            indicator.className = `stock-indicator show ${className}`;
            indicator.textContent = message;
        }

        updatePricePreview() {
            const harga = parseFloat(document.getElementById('harga').value) || 0;
            const preview = document.getElementById('pricePreview');

            preview.className = 'price-preview show';
            preview.innerHTML = `<i class="fas fa-coins"></i> ${UI.formatRupiah(harga)}`;
        }

        updateExpiryIndicator() {
            const expired = document.getElementById('expired').value;
            const indicator = document.getElementById('expiryIndicator');

            if (!expired) {
                indicator.className = 'expiry-indicator';
                indicator.textContent = '';
                return;
            }

            const days = this.getDaysUntilExpiry(expired);
            let className = 'safe';
            let message = '✅ Expired masih lama';

            if (days < 0) {
                className = 'expired';
                message = `🔴 SUDAH EXPIRED ${Math.abs(days)} hari yang lalu!`;
            } else if (days <= 30) {
                className = 'soon';
                message = `🟠 Expired dalam ${days} hari - Segera gunakan`;
            } else if (days <= 90) {
                className = 'warning';
                message = `🟡 Expired dalam ${days} hari`;
            } else {
                message = `✅ Expired dalam ${days} hari`;
            }

            indicator.className = `expiry-indicator show ${className}`;
            indicator.textContent = message;
        }

        // ==================== ALERT SYSTEM ====================
        updateAlerts() {
            const expiredMeds = this.medicines.filter(m => {
                const days = this.getDaysUntilExpiry(m.expired);
                return days < 0;
            });

            const soonExpiredMeds = this.medicines.filter(m => {
                const days = this.getDaysUntilExpiry(m.expired);
                return days >= 0 && days <= 30;
            });

            const lowStockMeds = this.medicines.filter(m => m.stok > 0 && m.stok < 10 && m.status !== 'Habis');
            const outStockMeds = this.medicines.filter(m => m.stok === 0);

            const totalAlerts = expiredMeds.length + soonExpiredMeds.length + lowStockMeds.length + outStockMeds.length;

            // Update notification badge
            document.getElementById('notifBadge').textContent = totalAlerts;
            document.getElementById('alertCount').textContent = totalAlerts;

            // Show alert banner if has alerts
            const alertBanner = document.getElementById('alertBanner');
            if (totalAlerts > 0) {
                alertBanner.style.display = 'block';

                const alertMessages = [];
                if (expiredMeds.length > 0) alertMessages.push(`${expiredMeds.length} obat sudah expired`);
                if (soonExpiredMeds.length > 0) alertMessages.push(`${soonExpiredMeds.length} obat akan segera expired`);
                if (lowStockMeds.length > 0) alertMessages.push(`${lowStockMeds.length} obat stok rendah`);
                if (outStockMeds.length > 0) alertMessages.push(`${outStockMeds.length} obat habis`);

                document.getElementById('alertTitle').textContent = '⚠️ Perhatian Diperlukan';
                document.getElementById('alertMessage').textContent = alertMessages.join(' • ');

                // Build alert details
                const alertDetails = document.getElementById('alertDetails');
                alertDetails.innerHTML = '';

                // Top 3 most critical
                const criticalItems = [
                    ...expiredMeds.slice(0, 2).map(m => ({ ...m, type: 'critical', icon: 'fa-calendar-times', msg: `SUDAH EXPIRED` })),
                    ...outStockMeds.slice(0, 2).map(m => ({ ...m, type: 'critical', icon: 'fa-box-open', msg: `STOK HABIS` })),
                    ...soonExpiredMeds.slice(0, 2).map(m => ({ ...m, type: 'warning', icon: 'fa-exclamation-circle', msg: `Expired ${this.getDaysUntilExpiry(m.expired)} hari` })),
                    ...lowStockMeds.slice(0, 2).map(m => ({ ...m, type: 'warning', icon: 'fa-exclamation-triangle', msg: `Sisa ${m.stok} ${m.satuan}` }))
                ].slice(0, 4);

                criticalItems.forEach(item => {
                    const div = document.createElement('div');
                    div.className = `alert-item ${item.type}`;
                    div.innerHTML = `
                        <i class="fas ${item.icon} alert-item-icon"></i>
                        <span class="alert-item-text">
                            <strong>${item.nama}</strong> - ${item.msg}
                        </span>
                    `;
                    alertDetails.appendChild(div);
                });
            } else {
                alertBanner.style.display = 'none';
            }
        }

        showAlertModal() {
            const expiredMeds = this.medicines.filter(m => this.getDaysUntilExpiry(m.expired) < 0);
            const soonExpiredMeds = this.medicines.filter(m => {
                const days = this.getDaysUntilExpiry(m.expired);
                return days >= 0 && days <= 30;
            });
            const warningExpiredMeds = this.medicines.filter(m => {
                const days = this.getDaysUntilExpiry(m.expired);
                return days > 30 && days <= 90;
            });
            const lowStockMeds = this.medicines.filter(m => m.stok > 0 && m.stok < 10 && m.status !== 'Habis');
            const outStockMeds = this.medicines.filter(m => m.stok === 0);

            const body = document.getElementById('alertModalBody');
            body.innerHTML = '';

            // Expired Section
            if (expiredMeds.length > 0) {
                body.innerHTML += `
                    <div class="alert-section critical">
                        <h4 class="alert-section-title">
                            <i class="fas fa-calendar-times"></i>
                            SUDAH EXPIRED (${expiredMeds.length} obat)
                        </h4>
                        <div class="alert-list">
                            ${expiredMeds.map(m => `
                                <div class="alert-list-item critical">
                                    <div class="alert-list-icon"><i class="fas fa-capsules"></i></div>
                                    <div class="alert-list-content">
                                        <div class="alert-list-title">${m.nama}</div>
                                        <div class="alert-list-desc">Expired ${Math.abs(this.getDaysUntilExpiry(m.expired))} hari yang lalu • Stok: ${m.stok} ${m.satuan}</div>
                                    </div>
                                    <div class="alert-list-value">${m.kode}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // Soon Expired Section
            if (soonExpiredMeds.length > 0) {
                body.innerHTML += `
                    <div class="alert-section warning">
                        <h4 class="alert-section-title">
                            <i class="fas fa-exclamation-triangle"></i>
                            Segera Expired < 30 Hari (${soonExpiredMeds.length} obat)
                        </h4>
                        <div class="alert-list">
                            ${soonExpiredMeds.map(m => `
                                <div class="alert-list-item warning">
                                    <div class="alert-list-icon"><i class="fas fa-capsules"></i></div>
                                    <div class="alert-list-content">
                                        <div class="alert-list-title">${m.nama}</div>
                                        <div class="alert-list-desc">Expired dalam ${this.getDaysUntilExpiry(m.expired)} hari • ${this.formatDate(m.expired)}</div>
                                    </div>
                                    <div class="alert-list-value">${m.kode}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // Warning Expired Section
            if (warningExpiredMeds.length > 0) {
                body.innerHTML += `
                    <div class="alert-section info">
                        <h4 class="alert-section-title">
                            <i class="fas fa-clock"></i>
                            Peringatan Expired 30-90 Hari (${warningExpiredMeds.length} obat)
                        </h4>
                        <div class="alert-list">
                            ${warningExpiredMeds.map(m => `
                                <div class="alert-list-item info">
                                    <div class="alert-list-icon"><i class="fas fa-capsules"></i></div>
                                    <div class="alert-list-content">
                                        <div class="alert-list-title">${m.nama}</div>
                                        <div class="alert-list-desc">Expired dalam ${this.getDaysUntilExpiry(m.expired)} hari • ${this.formatDate(m.expired)}</div>
                                    </div>
                                    <div class="alert-list-value">${m.kode}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // Out of Stock Section
            if (outStockMeds.length > 0) {
                body.innerHTML += `
                    <div class="alert-section critical">
                        <h4 class="alert-section-title">
                            <i class="fas fa-box-open"></i>
                            Stok Habis (${outStockMeds.length} obat)
                        </h4>
                        <div class="alert-list">
                            ${outStockMeds.map(m => `
                                <div class="alert-list-item critical">
                                    <div class="alert-list-icon"><i class="fas fa-capsules"></i></div>
                                    <div class="alert-list-content">
                                        <div class="alert-list-title">${m.nama}</div>
                                        <div class="alert-list-desc">Supplier: ${m.supplier}</div>
                                    </div>
                                    <div class="alert-list-value">${m.kode}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            // Low Stock Section
            if (lowStockMeds.length > 0) {
                body.innerHTML += `
                    <div class="alert-section warning">
                        <h4 class="alert-section-title">
                            <i class="fas fa-exclamation-circle"></i>
                            Stok Rendah < 10 (${lowStockMeds.length} obat)
                        </h4>
                        <div class="alert-list">
                            ${lowStockMeds.map(m => `
                                <div class="alert-list-item warning">
                                    <div class="alert-list-icon"><i class="fas fa-capsules"></i></div>
                                    <div class="alert-list-content">
                                        <div class="alert-list-title">${m.nama}</div>
                                        <div class="alert-list-desc">Sisa ${m.stok} ${m.satuan} • Supplier: ${m.supplier}</div>
                                    </div>
                                    <div class="alert-list-value">${m.kode}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            if (body.innerHTML === '') {
                body.innerHTML = `
                    <div class="empty-alert">
                        <i class="fas fa-check-circle"></i>
                        <p>Tidak ada peringatan saat ini.<br>Semua stok aman dan tidak ada obat yang akan expired dalam waktu dekat.</p>
                    </div>
                `;
            }

            UI.showModal('alertModal');
        }

        // ==================== DATA OPERATIONS ====================
        refresh() {
            this.medicines = Storage.get(Storage.KEYS.MEDICINES) || [];
            this.applyFilters();
            this.updateStats();
            this.updateAlerts();
        }

        updateStats() {
            const total = this.medicines.length;
            const lowStock = this.medicines.filter(m => m.stok < 10 && m.status !== 'Habis').length +
                            this.medicines.filter(m => m.stok === 0).length;
            const expiredSoon = this.medicines.filter(m => {
                const days = this.getDaysUntilExpiry(m.expired);
                return days < 0 || days <= 30;
            }).length;
            const totalValue = this.medicines.reduce((sum, m) => sum + (m.stok * m.harga), 0);

            this.animateCounter('statTotal', total);
            this.animateCounter('statLowStock', lowStock);
            this.animateCounter('statExpiredSoon', expiredSoon);

            // Animate currency
            const valueEl = document.getElementById('statTotalValue');
            const duration = 1000;
            const increment = totalValue / (duration / 16);
            let current = 0;
            const update = () => {
                current += increment;
                if (current < totalValue) {
                    valueEl.textContent = UI.formatRupiahShort(Math.ceil(current));
                    requestAnimationFrame(update);
                } else {
                    valueEl.textContent = UI.formatRupiahShort(totalValue);
                }
            };
            update();
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
            let filtered = [...this.medicines];

            if (this.searchTerm) {
                filtered = filtered.filter(m =>
                    (m.kode || '').toLowerCase().includes(this.searchTerm) ||
                    (m.nama || '').toLowerCase().includes(this.searchTerm) ||
                    (m.supplier || '').toLowerCase().includes(this.searchTerm) ||
                    (m.kategori || '').toLowerCase().includes(this.searchTerm)
                );
            }

            if (this.filters.category) filtered = filtered.filter(m => m.kategori === this.filters.category);
            if (this.filters.status) filtered = filtered.filter(m => m.status === this.filters.status);

            if (this.filters.stock === 'low') filtered = filtered.filter(m => m.stok > 0 && m.stok < 10);
            else if (this.filters.stock === 'out') filtered = filtered.filter(m => m.stok === 0);
            else if (this.filters.stock === 'safe') filtered = filtered.filter(m => m.stok >= 10);

            if (this.filters.expiry === 'expired') filtered = filtered.filter(m => this.getDaysUntilExpiry(m.expired) < 0);
            else if (this.filters.expiry === 'soon') filtered = filtered.filter(m => {
                const d = this.getDaysUntilExpiry(m.expired);
                return d >= 0 && d <= 30;
            });
            else if (this.filters.expiry === 'warning') filtered = filtered.filter(m => {
                const d = this.getDaysUntilExpiry(m.expired);
                return d > 30 && d <= 90;
            });
            else if (this.filters.expiry === 'safe') filtered = filtered.filter(m => this.getDaysUntilExpiry(m.expired) > 90);

            filtered.sort((a, b) => {
                let aVal = a[this.sortField];
                let bVal = b[this.sortField];
                if (typeof aVal === 'string') aVal = aVal.toLowerCase();
                if (typeof bVal === 'string') bVal = bVal.toLowerCase();
                if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });

            this.filteredMedicines = filtered;
            this.renderTable();
            this.renderPagination();
        }

        renderTable() {
            const tableBody = document.getElementById('tableBody');
            const emptyState = document.getElementById('emptyState');

            if (this.filteredMedicines.length === 0) {
                tableBody.innerHTML = '';
                emptyState.style.display = 'block';
                return;
            }

            emptyState.style.display = 'none';

            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            const pageData = this.filteredMedicines.slice(startIndex, endIndex);

            tableBody.innerHTML = pageData.map(med => {
                const categoryConfig = CATEGORY_CONFIG[med.kategori] || CATEGORY_CONFIG['Lainnya'];
                const statusClass = (med.status || '').toLowerCase().replace(/\s+/g, '');
                const stockStatus = this.getStockStatus(med.stok);
                const expiryInfo = this.getExpiryInfo(med.expired);
                const rowClass = expiryInfo.isExpired ? 'expired' : (med.stok < 10 ? 'low-stock' : '');

                return `
                    <tr data-id="${med.id}" class="${rowClass}">
                        <td><code style="background: var(--gray-100); padding: 4px 8px; border-radius: 4px; font-size: 0.78rem;">${med.kode || '-'}</code></td>
                        <td>
                            <div class="medicine-cell">
                                <span class="medicine-name">${med.nama}</span>
                                <span class="medicine-code">${med.kode || '-'}</span>
                            </div>
                        </td>
                        <td>
                            <span class="category-badge ${categoryConfig.class}">
                                <i class="fas ${categoryConfig.icon}"></i>
                                ${med.kategori || 'Lainnya'}
                            </span>
                        </td>
                        <td>${med.satuan || '-'}</td>
                        <td class="stock-cell">
                            <span class="stock-badge ${stockStatus.class}">
                                <i class="fas ${stockStatus.icon}"></i>
                                ${med.stok} ${med.satuan || ''}
                            </span>
                        </td>
                        <td class="price-cell">${UI.formatRupiah(med.harga)}</td>
                        <td class="expired-cell">
                            <span class="expired-date">${this.formatDate(med.expired)}</span>
                            <span class="expired-days ${expiryInfo.class}">
                                <i class="fas ${expiryInfo.icon}"></i>
                                ${expiryInfo.text}
                            </span>
                        </td>
                        <td class="supplier-cell">${med.supplier || '-'}</td>
                        <td>
                            <span class="status-badge ${statusClass}">
                                <i class="fas fa-circle"></i> ${med.status || '-'}
                            </span>
                        </td>
                        <td class="text-center">
                            <div class="action-buttons">
                                <button class="action-btn view" data-action="view" data-id="${med.id}" title="Detail"><i class="fas fa-eye"></i></button>
                                <button class="action-btn edit" data-action="edit" data-id="${med.id}" title="Edit"><i class="fas fa-edit"></i></button>
                                <button class="action-btn delete" data-action="delete" data-id="${med.id}" data-name="${med.nama}" title="Hapus"><i class="fas fa-trash-alt"></i></button>
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

                    if (action === 'view') this.viewMedicine(id);
                    if (action === 'edit') this.openEditModal(id);
                    if (action === 'delete') this.openDeleteModal(id, btn.getAttribute('data-name'));
                });
            });

            document.getElementById('showingStart').textContent = this.filteredMedicines.length > 0 ? startIndex + 1 : 0;
            document.getElementById('showingEnd').textContent = Math.min(endIndex, this.filteredMedicines.length);
            document.getElementById('showingTotal').textContent = this.filteredMedicines.length;
        }

        getStockStatus(stok) {
            if (stok === 0) return { class: 'out', icon: 'fa-times-circle' };
            if (stok < 10) return { class: 'low', icon: 'fa-exclamation-triangle' };
            if (stok < 50) return { class: 'medium', icon: 'fa-minus-circle' };
            return { class: 'safe', icon: 'fa-check-circle' };
        }

        getExpiryInfo(expired) {
            const days = this.getDaysUntilExpiry(expired);
            if (days < 0) return { class: 'expired', icon: 'fa-times-circle', text: `Expired ${Math.abs(days)} hari lalu`, isExpired: true };
            if (days <= 30) return { class: 'soon', icon: 'fa-exclamation-circle', text: `${days} hari lagi`, isExpired: false };
            if (days <= 90) return { class: 'warning', icon: 'fa-clock', text: `${days} hari lagi`, isExpired: false };
            return { class: 'safe', icon: 'fa-check-circle', text: `${days} hari lagi`, isExpired: false };
        }

        getDaysUntilExpiry(expired) {
            if (!expired) return 999;
            const expDate = new Date(expired);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const diff = expDate.getTime() - today.getTime();
            return Math.ceil(diff / (1000 * 60 * 60 * 24));
        }

        renderPagination() {
            const pagination = document.getElementById('pagination');
            const totalPages = Math.ceil(this.filteredMedicines.length / this.itemsPerPage);

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

        generateKodeObat() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const todayPrefix = `OBT-${year}${month}${day}`;
            const todayCount = this.medicines.filter(m => m.kode && m.kode.startsWith(todayPrefix)).length;
            const sequence = String(todayCount + 1).padStart(3, '0');
            return `${todayPrefix}-${sequence}`;
        }

        openAddModal() {
            this.editingId = null;
            document.getElementById('medicineForm').reset();
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-pills"></i><span>Tambah Obat Baru</span>';
            document.getElementById('btnSubmitForm').innerHTML = '<i class="fas fa-save"></i><span>Simpan Obat</span>';
            document.getElementById('kodeObat').value = this.generateKodeObat();
            this.clearAllErrors();
            document.getElementById('status').value = 'Aktif';

            // Reset indicators
            document.getElementById('stockIndicator').className = 'stock-indicator';
            document.getElementById('stockIndicator').textContent = '';
            document.getElementById('expiryIndicator').className = 'expiry-indicator';
            document.getElementById('expiryIndicator').textContent = '';
            document.getElementById('pricePreview').className = 'price-preview';
            document.getElementById('pricePreview').textContent = '';

            UI.showModal('medicineModal');
        }

        openEditModal(id) {
            const med = this.medicines.find(m => m.id === id);
            if (!med) return;

            this.editingId = id;
            document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit"></i><span>Edit Obat</span>';
            document.getElementById('btnSubmitForm').innerHTML = '<i class="fas fa-save"></i><span>Update Obat</span>';

            document.getElementById('kodeObat').value = med.kode || '';
            document.getElementById('nama').value = med.nama || '';
            document.getElementById('kategori').value = med.kategori || '';
            document.getElementById('satuan').value = med.satuan || '';
            document.getElementById('stok').value = med.stok || 0;
            document.getElementById('harga').value = med.harga || 0;
            document.getElementById('expired').value = med.expired || '';
            document.getElementById('supplier').value = med.supplier || '';
            document.getElementById('status').value = med.status || 'Aktif';
            document.getElementById('deskripsi').value = med.deskripsi || '';

            this.updateStockIndicator();
            this.updatePricePreview();
            this.updateExpiryIndicator();
            this.clearAllErrors();

            UI.showModal('medicineModal');
        }

        viewMedicine(id) {
            const med = this.medicines.find(m => m.id === id);
            if (!med) return;

            document.getElementById('detailModal').dataset.medicineId = id;

            const categoryConfig = CATEGORY_CONFIG[med.kategori] || CATEGORY_CONFIG['Lainnya'];
            const statusClass = (med.status || '').toLowerCase().replace(/\s+/g, '');
            const stockStatus = this.getStockStatus(med.stok);
            const expiryInfo = this.getExpiryInfo(med.expired);
            const stockPercentage = Math.min((med.stok / 500) * 100, 100);
            const totalValue = med.stok * med.harga;

            const detailBody = document.getElementById('detailBody');
            detailBody.innerHTML = `
                <div class="detail-header">
                    <div class="detail-icon-large">
                        <i class="fas ${categoryConfig.icon}"></i>
                    </div>
                    <div class="detail-main-info">
                        <h2>${med.nama}</h2>
                        <div class="code-rm">${med.kode}</div>
                        <div class="detail-badges">
                            <span class="category-badge ${categoryConfig.class}">
                                <i class="fas ${categoryConfig.icon}"></i> ${med.kategori}
                            </span>
                            <span class="status-badge ${statusClass}">
                                <i class="fas fa-circle"></i> ${med.status}
                            </span>
                            <span class="stock-badge ${stockStatus.class}">
                                <i class="fas ${stockStatus.icon}"></i> ${med.stok} ${med.satuan}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-info-circle"></i> Informasi Obat</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Kode Obat</label>
                            <span>${med.kode}</span>
                        </div>
                        <div class="detail-item">
                            <label>Kategori</label>
                            <span>${med.kategori}</span>
                        </div>
                        <div class="detail-item">
                            <label>Satuan</label>
                            <span>${med.satuan}</span>
                        </div>
                        <div class="detail-item">
                            <label>Harga per Satuan</label>
                            <span>${UI.formatRupiah(med.harga)}</span>
                        </div>
                        <div class="detail-item">
                            <label>Supplier</label>
                            <span>${med.supplier}</span>
                        </div>
                        <div class="detail-item">
                            <label>Total Nilai Stok</label>
                            <span style="font-weight: 700; color: var(--primary);">${UI.formatRupiah(totalValue)}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-warehouse"></i> Status Stok</h4>
                    <div class="stock-visual">
                        <div class="stock-bar-container">
                            <div class="stock-bar ${stockStatus.class}" style="width: ${stockPercentage}%"></div>
                        </div>
                        <div class="stock-info-row">
                            <span>Stok Saat Ini: <strong>${med.stok} ${med.satuan}</strong></span>
                            <span>Status: <strong>${stockStatus.class === 'out' ? 'Habis' : stockStatus.class === 'low' ? 'Rendah' : stockStatus.class === 'medium' ? 'Cukup' : 'Aman'}</strong></span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-calendar-times"></i> Masa Expired</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Tanggal Expired</label>
                            <span>${this.formatDate(med.expired)}</span>
                        </div>
                        <div class="detail-item">
                            <label>Sisa Waktu</label>
                            <span class="expired-days ${expiryInfo.class}" style="font-size: 0.88rem; font-weight: 600;">
                                <i class="fas ${expiryInfo.icon}"></i> ${expiryInfo.text}
                            </span>
                        </div>
                    </div>
                </div>

                ${med.deskripsi ? `
                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-align-left"></i> Deskripsi</h4>
                    <div class="detail-item full-width">
                        <label>Deskripsi Obat</label>
                        <span>${med.deskripsi}</span>
                    </div>
                </div>
                ` : ''}

                <div class="detail-section">
                    <h4 class="detail-section-title"><i class="fas fa-info-circle"></i> Informasi Sistem</h4>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <label>Dibuat</label>
                            <span>${this.formatDateTime(med.createdAt)}</span>
                        </div>
                        <div class="detail-item">
                            <label>Terakhir Update</label>
                            <span>${this.formatDateTime(med.updatedAt)}</span>
                        </div>
                    </div>
                </div>
            `;

            UI.showModal('detailModal');
        }

        openDeleteModal(id, name) {
            this.deletingId = id;
            document.getElementById('deleteMedicineName').textContent = name || '';
            UI.showModal('deleteModal');
        }

        confirmDelete() {
            if (!this.deletingId) return;

            this.medicines = this.medicines.filter(m => m.id !== this.deletingId);
            Storage.set(Storage.KEYS.MEDICINES, this.medicines);

            this.closeModal('deleteModal');
            UI.showToast('Obat berhasil dihapus!', 'success');
            this.deletingId = null;
            this.refresh();
        }

        validateField(fieldId) {
            const field = document.getElementById(fieldId);
            if (!field) return true;
            const value = field.value.trim();
            let error = '';

            switch (fieldId) {
                case 'nama':
                    if (!value) error = 'Nama obat wajib diisi';
                    else if (value.length < 3) error = 'Nama minimal 3 karakter';
                    break;
                case 'kategori':
                    if (!value) error = 'Kategori wajib dipilih';
                    break;
                case 'satuan':
                    if (!value) error = 'Satuan wajib dipilih';
                    break;
                case 'stok':
                    if (!value && value !== 0) error = 'Stok wajib diisi';
                    else if (parseInt(value) < 0) error = 'Stok tidak valid';
                    break;
                case 'harga':
                    if (!value && value !== 0) error = 'Harga wajib diisi';
                    else if (parseFloat(value) < 0) error = 'Harga tidak valid';
                    break;
                case 'expired':
                    if (!value) error = 'Tanggal expired wajib diisi';
                    break;
                case 'supplier':
                    if (!value) error = 'Supplier wajib diisi';
                    else if (value.length < 3) error = 'Supplier minimal 3 karakter';
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
            const fields = ['nama', 'kategori', 'satuan', 'stok', 'harga', 'expired', 'supplier'];
            fields.forEach(f => { if (!this.validateField(f)) isValid = false; });

            if (!isValid) {
                document.getElementById('medicineForm').classList.add('shake');
                setTimeout(() => document.getElementById('medicineForm').classList.remove('shake'), 400);
                UI.showToast('Mohon lengkapi semua data dengan benar!', 'error');
                return;
            }

            const medicineData = {
                id: this.editingId || 'OBT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                kode: document.getElementById('kodeObat').value,
                nama: document.getElementById('nama').value.trim(),
                kategori: document.getElementById('kategori').value,
                satuan: document.getElementById('satuan').value,
                stok: parseInt(document.getElementById('stok').value) || 0,
                harga: parseFloat(document.getElementById('harga').value) || 0,
                expired: document.getElementById('expired').value,
                supplier: document.getElementById('supplier').value.trim(),
                status: document.getElementById('status').value,
                deskripsi: document.getElementById('deskripsi').value.trim(),
                createdAt: this.editingId ? (this.medicines.find(m => m.id === this.editingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // Auto set status to Habis if stock is 0
            if (medicineData.stok === 0 && medicineData.status !== 'Habis') {
                medicineData.status = 'Habis';
            } else if (medicineData.stok > 0 && medicineData.status === 'Habis') {
                medicineData.status = 'Aktif';
            }

            if (this.editingId) {
                const index = this.medicines.findIndex(m => m.id === this.editingId);
                if (index !== -1) this.medicines[index] = medicineData;
                UI.showToast('Data obat berhasil diupdate!', 'success');
            } else {
                this.medicines.push(medicineData);
                UI.showToast('Obat baru berhasil ditambahkan!', 'success');
            }

            Storage.set(Storage.KEYS.MEDICINES, this.medicines);
            this.closeModal('medicineModal');
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
            if (this.filteredMedicines.length === 0) {
                UI.showToast('Tidak ada data untuk di-export!', 'warning');
                return;
            }

            const headers = ['Kode', 'Nama', 'Kategori', 'Satuan', 'Stok', 'Harga', 'Expired', 'Supplier', 'Status'];
            const rows = this.filteredMedicines.map(m => [
                m.kode, m.nama, m.kategori, m.satuan, m.stok, m.harga, m.expired, m.supplier, m.status
            ]);

            const csv = [headers.join(','), ...rows.map(row => row.map(c => `"${c ?? ''}"`).join(','))].join('\n');

            const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `farmasi-hmris-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            URL.revokeObjectURL(url);

            UI.showToast('Data berhasil di-export ke Excel (CSV)!', 'success');
        }

        exportPDF() {
            if (this.filteredMedicines.length === 0) {
                UI.showToast('Tidak ada data untuk di-export!', 'warning');
                return;
            }

            const totalValue = this.filteredMedicines.reduce((sum, m) => sum + (m.stok * m.harga), 0);
            const lowStockCount = this.filteredMedicines.filter(m => m.stok < 10).length;
            const expiredCount = this.filteredMedicines.filter(m => this.getDaysUntilExpiry(m.expired) < 0).length;

            const printWindow = window.open('', '_blank');
            const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Laporan Farmasi - HMRIS</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: 'Arial', sans-serif; padding: 20px; color: #333; font-size: 11px; }
                        .header { text-align: center; margin-bottom: 20px; border-bottom: 3px solid #0D9488; padding-bottom: 15px; }
                        .header h1 { color: #0D9488; font-size: 22px; margin-bottom: 5px; }
                        .header p { color: #666; }
                        .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px; }
                        .summary-item { padding: 12px; background: #f8f9fa; border-left: 3px solid #0D9488; border-radius: 4px; }
                        .summary-item.warning { border-color: #D97706; }
                        .summary-item.danger { border-color: #DC2626; }
                        .summary-item.success { border-color: #059669; }
                        .summary-item label { display: block; font-size: 10px; color: #666; text-transform: uppercase; margin-bottom: 4px; }
                        .summary-item span { font-size: 14px; font-weight: 700; color: #0F172A; }
                        table { width: 100%; border-collapse: collapse; font-size: 10px; }
                        th { background: #0D9488; color: white; padding: 8px 6px; text-align: left; }
                        td { padding: 6px; border: 1px solid #ddd; }
                        tr:nth-child(even) { background: #f9f9f9; }
                        .footer { margin-top: 30px; text-align: right; }
                        .signature { margin-top: 40px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>LAPORAN INVENTARIS FARMASI</h1>
                        <p>Hospital Medical Record Information System</p>
                    </div>
                    <div class="summary">
                        <div class="summary-item">
                            <label>Total Obat</label>
                            <span>${this.filteredMedicines.length}</span>
                        </div>
                        <div class="summary-item warning">
                            <label>Stok Rendah</label>
                            <span>${lowStockCount}</span>
                        </div>
                        <div class="summary-item danger">
                            <label>Expired</label>
                            <span>${expiredCount}</span>
                        </div>
                        <div class="summary-item success">
                            <label>Total Nilai</label>
                            <span>${UI.formatRupiah(totalValue)}</span>
                        </div>
                    </div>
                    <p style="margin-bottom: 10px;"><strong>Tanggal:</strong> ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Kode</th>
                                <th>Nama Obat</th>
                                <th>Kategori</th>
                                <th>Satuan</th>
                                <th>Stok</th>
                                <th>Harga</th>
                                <th>Total</th>
                                <th>Expired</th>
                                <th>Supplier</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.filteredMedicines.map((m, i) => `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${m.kode}</td>
                                    <td>${m.nama}</td>
                                    <td>${m.kategori}</td>
                                    <td>${m.satuan}</td>
                                    <td>${m.stok}</td>
                                    <td>${UI.formatRupiah(m.harga)}</td>
                                    <td>${UI.formatRupiah(m.stok * m.harga)}</td>
                                    <td>${this.formatDate(m.expired)}</td>
                                    <td>${m.supplier}</td>
                                    <td>${m.status}</td>
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
        new MedicineManager();
    });

})();