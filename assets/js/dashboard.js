/**
 * HMRIS Dashboard - FIXED VERSION (Bulletproof Navigation)
 */
(function () {
    'use strict';

    // ==================== STORAGE KEYS ====================
    const STORAGE_KEYS = {
        USERS: 'hmris_users',
        PATIENTS: 'hmris_patients',
        DOCTORS: 'hmris_doctors',
        RECORDS: 'hmris_records',
        APPOINTMENTS: 'hmris_appointments',
        LABORATORY: 'hmris_laboratory',
        MEDICINES: 'hmris_medicines',
        CURRENT_USER: 'hmris_currentUser'
    };

    const ROLE_NAMES = {
        admin: 'Administrator',
        dokter: 'Dokter',
        perawat: 'Perawat',
        petugas: 'Petugas Rekam Medis',
        pasien: 'Pasien'
    };

    const ROLE_ICONS = {
        admin: 'fa-user-shield',
        dokter: 'fa-user-md',
        perawat: 'fa-user-nurse',
        petugas: 'fa-user-tie',
        pasien: 'fa-user-injured'
    };

    // ✅ MENU DENGAN PATH YANG BENAR
    const ROLE_MENUS = {
        admin: [
            { category: 'Utama' },
            { name: 'Dashboard', icon: 'fa-th-large', href: 'index.html', active: true },
            { category: 'Manajemen' },
            { name: 'Data Pasien', icon: 'fa-users', href: '../pasien.html' },
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: '../rekam-medis.html' },
            { name: 'Data Dokter', icon: 'fa-user-md', href: '../dokter.html' },
            { name: 'Data Perawat', icon: 'fa-user-nurse', href: '#' },
            { name: 'Petugas RM', icon: 'fa-user-tie', href: '#' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: '../janji-temu.html' },
            { name: 'Farmasi', icon: 'fa-capsules', href: '../farmasi.html' },
            { name: 'Laboratorium', icon: 'fa-flask', href: '../laboratorium.html' },
            { name: 'Laporan', icon: 'fa-chart-bar', href: '../laporan.html' },
            { name: 'Pengaturan', icon: 'fa-cog', href: '../pengaturan.html' }
        ],
        dokter: [
            { category: 'Utama' },
            { name: 'Dashboard', icon: 'fa-th-large', href: 'index.html', active: true },
            { category: 'Pelayanan' },
            { name: 'Data Pasien', icon: 'fa-users', href: '../pasien.html' },
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: '../rekam-medis.html' },
            { name: 'Resep Obat', icon: 'fa-pills', href: '#' },
            { category: 'Jadwal' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: '../janji-temu.html' },
            { name: 'Jadwal Praktik', icon: 'fa-calendar-alt', href: '#' },
            { name: 'Antrian Hari Ini', icon: 'fa-list-ol', href: '#' },
            { category: 'Lainnya' },
            { name: 'Laporan Saya', icon: 'fa-chart-line', href: '../laporan.html' },
            { name: 'Pengaturan', icon: 'fa-cog', href: '../pengaturan.html' }
        ],
        perawat: [
            { category: 'Utama' },
            { name: 'Dashboard', icon: 'fa-th-large', href: 'index.html', active: true },
            { category: 'Pelayanan' },
            { name: 'Data Pasien', icon: 'fa-users', href: '../pasien.html' },
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: '../rekam-medis.html' },
            { name: 'Antrian', icon: 'fa-list-ol', href: '#' },
            { name: 'Tindakan Medis', icon: 'fa-stethoscope', href: '#' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: '../janji-temu.html' },
            { name: 'Jadwal Shift', icon: 'fa-calendar-alt', href: '#' },
            { name: 'Tanda Vital', icon: 'fa-heartbeat', href: '#' },
            { name: 'Pengaturan', icon: 'fa-cog', href: '../pengaturan.html' }
        ],
        petugas: [
            { category: 'Utama' },
            { name: 'Dashboard', icon: 'fa-th-large', href: 'index.html', active: true },
            { category: 'Rekam Medis' },
            { name: 'Data Pasien', icon: 'fa-users', href: '../pasien.html' },
            { name: 'Rekam Medis', icon: 'fa-file-medical', href: '../rekam-medis.html' },
            { name: 'Data Dokter', icon: 'fa-user-md', href: '../dokter.html' },
            { category: 'Operasional' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: '../janji-temu.html' },
            { name: 'Laboratorium', icon: 'fa-flask', href: '../laboratorium.html' },
            { name: 'Laporan Harian', icon: 'fa-file-alt', href: '../laporan.html' },
            { name: 'Pengaturan', icon: 'fa-cog', href: '../pengaturan.html' }
        ],
        pasien: [
            { category: 'Utama' },
            { name: 'Dashboard', icon: 'fa-th-large', href: 'index.html', active: true },
            { category: 'Layanan Saya' },
            { name: 'Rekam Medis Saya', icon: 'fa-file-medical', href: '../rekam-medis.html' },
            { name: 'Janji Temu', icon: 'fa-calendar-check', href: '../janji-temu.html' },
            { name: 'Hasil Lab Saya', icon: 'fa-flask', href: '../laboratorium.html' },
            { name: 'Antrian Saya', icon: 'fa-list-ol', href: '#' },
            { name: 'Resep Obat', icon: 'fa-pills', href: '../farmasi.html' },
            { category: 'Lainnya' },
            { name: 'Data Dokter', icon: 'fa-user-md', href: '../dokter.html' },
            { name: 'Laporan Medis', icon: 'fa-file-download', href: '../laporan.html' },
            { name: 'Pengaturan', icon: 'fa-cog', href: '../pengaturan.html' }
        ]
    };

    const ROLE_STATS = {
        admin: [
            { icon: 'fa-users', label: 'Total Pasien', value: 2847, trend: '+12%', trendDir: 'up', color: '#0D9488' },
            { icon: 'fa-user-md', label: 'Total Dokter', value: 156, trend: '+5%', trendDir: 'up', color: '#059669' },
            { icon: 'fa-user-nurse', label: 'Total Perawat', value: 324, trend: '+8%', trendDir: 'up', color: '#D97706' },
            { icon: 'fa-file-medical', label: 'RM Hari Ini', value: 89, trend: '-3%', trendDir: 'down', color: '#6366F1' }
        ],
        dokter: [
            { icon: 'fa-users', label: 'Pasien Hari Ini', value: 24, trend: '+15%', trendDir: 'up', color: '#0D9488' },
            { icon: 'fa-calendar-check', label: 'Janji Temu', value: 18, trend: '+8%', trendDir: 'up', color: '#059669' },
            { icon: 'fa-file-medical', label: 'RM Baru', value: 12, trend: '+25%', trendDir: 'up', color: '#D97706' },
            { icon: 'fa-user-injured', label: 'Pasien Aktif', value: 156, trend: '+3%', trendDir: 'up', color: '#6366F1' }
        ],
        perawat: [
            { icon: 'fa-list-ol', label: 'Antrian Hari Ini', value: 45, trend: '+20%', trendDir: 'up', color: '#0D9488' },
            { icon: 'fa-procedures', label: 'Rawat Inap', value: 28, trend: '-5%', trendDir: 'down', color: '#059669' },
            { icon: 'fa-stethoscope', label: 'Tindakan', value: 34, trend: '+10%', trendDir: 'up', color: '#D97706' },
            { icon: 'fa-tasks', label: 'Tugas Pending', value: 7, trend: '-12%', trendDir: 'down', color: '#6366F1' }
        ],
        petugas: [
            { icon: 'fa-file-medical', label: 'RM Baru', value: 45, trend: '+18%', trendDir: 'up', color: '#0D9488' },
            { icon: 'fa-users', label: 'Data Pasien', value: 128, trend: '+12%', trendDir: 'up', color: '#059669' },
            { icon: 'fa-clock', label: 'Pending', value: 14, trend: '-8%', trendDir: 'down', color: '#D97706' },
            { icon: 'fa-archive', label: 'Arsip Bulan Ini', value: 892, trend: '+22%', trendDir: 'up', color: '#6366F1' }
        ],
        pasien: [
            { icon: 'fa-hospital-user', label: 'Total Kunjungan', value: 12, trend: '+2', trendDir: 'up', color: '#0D9488' },
            { icon: 'fa-calendar-alt', label: 'Jadwal Berikutnya', value: 2, trend: 'Segera', trendDir: 'up', color: '#059669' },
            { icon: 'fa-pills', label: 'Resep Aktif', value: 3, trend: 'Aktif', trendDir: 'up', color: '#D97706' },
            { icon: 'fa-file-medical', label: 'Laporan Medis', value: 8, trend: '+1', trendDir: 'up', color: '#6366F1' }
        ]
    };

    const ROLE_ACTIONS = {
        admin: [
            { icon: 'fa-user-plus', label: 'Tambah User', href: '#' },
            { icon: 'fa-database', label: 'Backup Data', href: '../pengaturan.html' },
            { icon: 'fa-chart-pie', label: 'Generate Laporan', href: '../laporan.html' },
            { icon: 'fa-cogs', label: 'Konfigurasi', href: '../pengaturan.html' },
            { icon: 'fa-bell', label: 'Notifikasi', href: '#' },
            { icon: 'fa-shield-alt', label: 'Keamanan', href: '#' }
        ],
        dokter: [
            { icon: 'fa-prescription', label: 'Tulis Resep', href: '#' },
            { icon: 'fa-stethoscope', label: 'Input Diagnosa', href: '../rekam-medis.html' },
            { icon: 'fa-calendar-plus', label: 'Jadwal Baru', href: '../janji-temu.html' },
            { icon: 'fa-file-medical', label: 'Rekam Medis', href: '../rekam-medis.html' },
            { icon: 'fa-video', label: 'Telemedicine', href: '#' },
            { icon: 'fa-notes-medical', label: 'Catatan', href: '#' }
        ],
        perawat: [
            { icon: 'fa-heartbeat', label: 'Input Vital Sign', href: '#' },
            { icon: 'fa-list-ol', label: 'Update Antrian', href: '#' },
            { icon: 'fa-notes-medical', label: 'Catat Tindakan', href: '../rekam-medis.html' },
            { icon: 'fa-pills', label: 'Obat Pasien', href: '../farmasi.html' },
            { icon: 'fa-procedures', label: 'Rawat Inap', href: '#' },
            { icon: 'fa-phone', label: 'Hubungi Dokter', href: '#' }
        ],
        petugas: [
            { icon: 'fa-file-medical', label: 'Input RM', href: '../rekam-medis.html' },
            { icon: 'fa-user-edit', label: 'Update Pasien', href: '../pasien.html' },
            { icon: 'fa-print', label: 'Cetak Laporan', href: '../laporan.html' },
            { icon: 'fa-search', label: 'Cari Data', href: '../pasien.html' },
            { icon: 'fa-archive', label: 'Arsip RM', href: '#' },
            { icon: 'fa-barcode', label: 'Scan QR', href: '#' }
        ],
        pasien: [
            { icon: 'fa-calendar-plus', label: 'Buat Janji', href: '../janji-temu.html' },
            { icon: 'fa-file-download', label: 'Unduh Laporan', href: '../laporan.html' },
            { icon: 'fa-pills', label: 'Lihat Resep', href: '../farmasi.html' },
            { icon: 'fa-video', label: 'Telemedicine', href: '#' },
            { icon: 'fa-comment-medical', label: 'Konsultasi', href: '#' },
            { icon: 'fa-question-circle', label: 'Bantuan', href: '#' }
        ]
    };

    const ROLE_ACTIVITIES = {
        admin: [
            { icon: 'fa-user-plus', type: 'success', title: 'User baru ditambahkan', desc: 'dr. Sarah Wijaya terdaftar', time: '5 menit lalu' },
            { icon: 'fa-shield-alt', type: 'info', title: 'Backup sistem berhasil', desc: 'Backup database pukul 02:00 WIB', time: '2 jam lalu' },
            { icon: 'fa-chart-line', type: 'purple', title: 'Laporan bulanan tersedia', desc: 'Laporan Januari 2024', time: '5 jam lalu' },
            { icon: 'fa-exclamation-triangle', type: 'warning', title: 'Stok obat menipis', desc: '5 item obat perlu restock', time: '8 jam lalu' }
        ],
        dokter: [
            { icon: 'fa-user-injured', type: 'info', title: 'Pasien baru', desc: 'Andi Wijaya masuk', time: '10 menit lalu' },
            { icon: 'fa-calendar-check', type: 'success', title: 'Janji dikonfirmasi', desc: 'Siti Nurhaliza - 15:00', time: '30 menit lalu' },
            { icon: 'fa-file-medical', type: 'purple', title: 'RM ditandatangani', desc: 'Rekam medis baru', time: '1 jam lalu' }
        ],
        perawat: [
            { icon: 'fa-heartbeat', type: 'success', title: 'Vital sign diinput', desc: 'Pasien Rina - Tensi normal', time: '5 menit lalu' },
            { icon: 'fa-list-ol', type: 'info', title: 'Antrian dipanggil', desc: 'Nomor A024', time: '15 menit lalu' },
            { icon: 'fa-stethoscope', type: 'purple', title: 'Tindakan selesai', desc: 'Infus kamar 204', time: '45 menit lalu' }
        ],
        petugas: [
            { icon: 'fa-file-medical', type: 'success', title: 'RM baru dibuat', desc: 'Pasien Dewi Lestari', time: '8 menit lalu' },
            { icon: 'fa-user-edit', type: 'info', title: 'Data pasien update', desc: 'Alamat diperbarui', time: '25 menit lalu' },
            { icon: 'fa-archive', type: 'purple', title: 'Arsip RM', desc: '15 rekam diarsipkan', time: '1 jam lalu' }
        ],
        pasien: [
            { icon: 'fa-calendar-check', type: 'success', title: 'Janji dibuat', desc: 'Poli Umum - 10:00', time: '1 jam lalu' },
            { icon: 'fa-file-medical', type: 'info', title: 'Rekam medis baru', desc: 'Hasil pemeriksaan tersedia', time: '2 hari lalu' },
            { icon: 'fa-pills', type: 'purple', title: 'Resep baru', desc: '3 item obat', time: '3 hari lalu' }
        ]
    };

    const EVENTS = [
        { date: 15, title: 'Rapat Tim Medis', time: '09:00' },
        { date: 18, title: 'Jadwal Praktik', time: '14:00' },
        { date: 22, title: 'Training Sistem', time: '10:00' }
    ];

    const CHART_DATA = {
        labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
        visits: [65, 78, 52, 91, 85, 45, 30],
        newPatients: [12, 18, 8, 22, 15, 6, 4]
    };

    // ==================== DOM ELEMENTS ====================
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const userProfile = document.getElementById('userProfile');
    const userDropdown = document.getElementById('userDropdown');
    const logoutModal = document.getElementById('logoutModal');
    const navList = document.getElementById('navList');
    const statsGrid = document.getElementById('statsGrid');
    const quickActionsGrid = document.getElementById('quickActionsGrid');
    const activityList = document.getElementById('activityList');
    const calendarGrid = document.getElementById('calendarGrid');
    const eventsList = document.getElementById('eventsList');
    const barChart = document.getElementById('barChart');

    let currentUser = null;
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // ==================== INIT ====================
    function init() {
        console.log('🚀 === DASHBOARD INIT START ===');
        console.log('📍 URL:', window.location.href);
        
        if (!checkAuth()) return;

        console.log('✅ User logged in:', currentUser.username, '| Role:', currentUser.role);
        
        loadUserData();
        renderMenu();
        renderStats();
        renderQuickActions();
        renderActivities();
        renderCalendar();
        renderChart();
        renderEvents();
        setupEventListeners();
        updateDateDisplay();
        updatePageTitle();
        
        console.log('🎉 === DASHBOARD INIT COMPLETE ===');
    }

    // ==================== AUTH ====================
    function checkAuth() {
        const user = getFromStorage(STORAGE_KEYS.CURRENT_USER);
        console.log('🔐 checkAuth - user from storage:', user);

        if (!user) {
            showNotification('Silakan login terlebih dahulu!', 'error');
            setTimeout(() => { window.location.href = '../../index.html'; }, 1000);
            return false;
        }

        // Normalisasi role
        const normalizedRole = (user.role || '').toLowerCase().trim();
        user.role = normalizedRole;
        console.log('🎭 Normalized role:', normalizedRole);

        if (!ROLE_MENUS[normalizedRole]) {
            console.error('❌ Role tidak valid:', normalizedRole);
            showNotification('Role tidak valid!', 'error');
            setTimeout(() => { logout(); }, 1500);
            return false;
        }

        currentUser = user;
        return true;
    }

    function loadUserData() {
        document.getElementById('userName').textContent = currentUser.nama || currentUser.username;
        document.getElementById('userRole').textContent = ROLE_NAMES[currentUser.role] || currentUser.role;
        document.getElementById('dropdownName').textContent = currentUser.nama || currentUser.username;
        document.getElementById('dropdownEmail').textContent = currentUser.email || 'user@hmris.com';

        const roleBadge = document.getElementById('roleBadge');
        document.getElementById('roleBadgeText').textContent = ROLE_NAMES[currentUser.role] || currentUser.role;
        roleBadge.querySelector('i').className = `fas ${ROLE_ICONS[currentUser.role] || 'fa-user'}`;

        const userAvatar = document.getElementById('userAvatar');
        const dropdownAvatar = document.querySelector('.dropdown-avatar');

        if (currentUser.photo) {
            userAvatar.innerHTML = `<img src="${currentUser.photo}" alt="Avatar">`;
            dropdownAvatar.innerHTML = `<img src="${currentUser.photo}" alt="Avatar" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
        } else {
            userAvatar.innerHTML = `<i class="fas ${ROLE_ICONS[currentUser.role] || 'fa-user'}"></i>`;
            dropdownAvatar.innerHTML = `<i class="fas ${ROLE_ICONS[currentUser.role] || 'fa-user'}"></i>`;
        }

        document.getElementById('welcomeTitle').innerHTML = `Selamat Datang, <span class="text-gradient">${currentUser.nama || currentUser.username}</span>! 👋`;

        const welcomeMessages = {
            admin: 'Anda memiliki akses penuh ke seluruh sistem.',
            dokter: 'Berikut ringkasan pasien dan jadwal praktik Anda hari ini.',
            perawat: 'Semangat bertugas! Berikut antrian dan tugas hari ini.',
            petugas: 'Kelola rekam medis dengan efisien.',
            pasien: 'Semoga kesehatan Anda semakin membaik.'
        };
        document.getElementById('welcomeDesc').textContent = welcomeMessages[currentUser.role] || 'Semoga hari Anda menyenangkan.';
    }

    // ✅ RENDER MENU - BULLETPROOF VERSION
    function renderMenu() {
        const role = (currentUser.role || '').toLowerCase();
        const menus = ROLE_MENUS[role] || ROLE_MENUS.admin;
        console.log('📋 renderMenu - role:', role, '| menu count:', menus.length);
        
        navList.innerHTML = '';

        menus.forEach((item, index) => {
            if (item.category) {
                const categoryEl = document.createElement('li');
                categoryEl.className = 'nav-category';
                categoryEl.textContent = item.category;
                navList.appendChild(categoryEl);
            } else {
                const menuItem = document.createElement('li');
                menuItem.className = 'nav-item';

                const link = document.createElement('a');
                link.href = item.href || '#';
                link.className = 'nav-link' + (item.active ? ' active' : '');
                
                // ✅ SIMPAN HREF DI DATASET SEBAGAI BACKUP
                link.dataset.menuName = item.name;
                link.dataset.href = item.href || '#';
                
                link.innerHTML = `
                    <i class="fas ${item.icon}"></i>
                    <span>${item.name}</span>
                    ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
                `;

                // ✅ EVENT LISTENER DENGAN FALLBACK
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Ambil href dari berbagai sumber (fallback)
                    const hrefFromDataset = this.dataset.href;
                    const hrefFromAttribute = this.getAttribute('href');
                    const finalHref = hrefFromDataset || hrefFromAttribute || item.href;
                    
                    console.log('🖱️ Menu clicked:', item.name);
                    console.log('   - href from dataset:', hrefFromDataset);
                    console.log('   - href from attribute:', hrefFromAttribute);
                    console.log('   - href from item:', item.href);
                    console.log('   - FINAL HREF:', finalHref);
                    
                    handleMenuClick(item.name, finalHref);
                });

                menuItem.appendChild(link);
                navList.appendChild(menuItem);
            }
        });
        
        console.log('✅ Menu rendered successfully');
    }

    // ✅ HANDLE MENU CLICK - BULLETPROOF VERSION
    function handleMenuClick(menuName, href) {
        console.log('🎯 handleMenuClick:', menuName, '| href:', href);
        console.log('   - href type:', typeof href);
        console.log('   - href value:', JSON.stringify(href));
        
        // Cek apakah href valid (bukan #, bukan kosong, bukan undefined)
        const isValidHref = href && 
                           href !== '#' && 
                           href !== '' && 
                           href !== 'undefined' &&
                           href !== 'null';
        
        console.log('   - isValidHref:', isValidHref);
        
        if (isValidHref) {
            console.log('🚀 NAVIGATING TO:', href);
            showNotification(`Mengalihkan ke ${menuName}...`, 'info');
            
            // ✅ LANGSUNG NAVIGASI - TANPA DELAY
            window.location.href = href;
            return;
        }

        console.log('⏸️ Showing "coming soon" toast');
        showNotification(`Halaman "${menuName}" akan segera hadir!`, 'info');

        if (window.innerWidth <= 992) {
            closeSidebar();
        }
    }

    // ==================== RENDER FUNCTIONS ====================
    function renderStats() {
        const stats = ROLE_STATS[currentUser.role] || ROLE_STATS.admin;
        statsGrid.innerHTML = '';

        stats.forEach((stat, index) => {
            const card = document.createElement('div');
            card.className = 'stat-card';
            card.style.setProperty('--card-color', stat.color);
            card.innerHTML = `
                <div class="stat-card-top">
                    <div class="stat-icon" style="background: ${stat.color}">
                        <i class="fas ${stat.icon}"></i>
                    </div>
                    <span class="stat-trend ${stat.trendDir}">
                        <i class="fas fa-arrow-${stat.trendDir}"></i>
                        ${stat.trend}
                    </span>
                </div>
                <div class="stat-value counter" data-target="${stat.value}">0</div>
                <div class="stat-label">${stat.label}</div>
            `;
            statsGrid.appendChild(card);
        });

        setTimeout(animateCounters, 100);
    }

    function renderQuickActions() {
        const actions = ROLE_ACTIONS[currentUser.role] || ROLE_ACTIONS.admin;
        quickActionsGrid.innerHTML = '';

        actions.forEach(action => {
            const card = document.createElement('div');
            card.className = 'action-card';
            card.innerHTML = `
                <div class="action-icon">
                    <i class="fas ${action.icon}"></i>
                </div>
                <span>${action.label}</span>
            `;

            card.addEventListener('click', () => {
                if (action.href && action.href !== '#') {
                    window.location.href = action.href;
                } else {
                    showNotification(`Fitur "${action.label}" akan segera tersedia!`, 'info');
                }
            });

            quickActionsGrid.appendChild(card);
        });
    }

    function renderActivities() {
        const activities = ROLE_ACTIVITIES[currentUser.role] || ROLE_ACTIVITIES.admin;
        activityList.innerHTML = '';

        activities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `
                <div class="activity-icon ${activity.type}">
                    <i class="fas ${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-desc">${activity.desc}</div>
                    <div class="activity-time"><i class="far fa-clock"></i> ${activity.time}</div>
                </div>
            `;
            activityList.appendChild(item);
        });
    }

    function renderCalendar() {
        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        document.getElementById('calMonth').textContent = `${monthNames[currentMonth]} ${currentYear}`;
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const today = new Date();

        calendarGrid.innerHTML = '';
        const weekdays = document.createElement('div');
        weekdays.className = 'cal-weekdays';
        ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.className = 'cal-weekday';
            dayEl.textContent = day;
            weekdays.appendChild(dayEl);
        });
        calendarGrid.appendChild(weekdays);

        const daysContainer = document.createElement('div');
        daysContainer.className = 'cal-days';

        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'cal-day empty';
            daysContainer.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'cal-day';
            dayEl.textContent = day;
            if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayEl.classList.add('today');
            }
            if (EVENTS.some(e => e.date === day)) dayEl.classList.add('has-event');
            dayEl.addEventListener('click', () => {
                showNotification(`Tanggal ${day} ${monthNames[currentMonth]} ${currentYear}`, 'info');
            });
            daysContainer.appendChild(dayEl);
        }
        calendarGrid.appendChild(daysContainer);
    }

    function renderEvents() {
        eventsList.innerHTML = '';
        EVENTS.slice(0, 3).forEach(event => {
            const item = document.createElement('div');
            item.className = 'event-item';
            item.innerHTML = `
                <div class="event-time">${event.time}</div>
                <div class="event-info">
                    <h5>${event.title}</h5>
                    <p>Tanggal ${event.date}</p>
                </div>
            `;
            eventsList.appendChild(item);
        });
    }

    function renderChart() {
        barChart.innerHTML = '';
        const maxVisits = Math.max(...CHART_DATA.visits);
        const barWidth = 60;
        const barSpacing = 20;
        const chartHeight = 240;
        const startX = 40;
        const startY = 260;

        for (let i = 0; i <= 4; i++) {
            const y = startY - (i * chartHeight / 4);
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', startX);
            line.setAttribute('y1', y);
            line.setAttribute('x2', 580);
            line.setAttribute('y2', y);
            line.setAttribute('stroke', '#E2E8F0');
            line.setAttribute('stroke-width', '1');
            line.setAttribute('stroke-dasharray', '4,4');
            barChart.appendChild(line);

            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', startX - 8);
            label.setAttribute('y', y + 4);
            label.setAttribute('text-anchor', 'end');
            label.setAttribute('fill', '#94A3B8');
            label.setAttribute('font-size', '11');
            label.setAttribute('font-family', 'Poppins, sans-serif');
            label.textContent = Math.round(maxVisits * i / 4);
            barChart.appendChild(label);
        }

        CHART_DATA.labels.forEach((label, i) => {
            const x = startX + i * (barWidth + barSpacing);
            const visitHeight = (CHART_DATA.visits[i] / maxVisits) * chartHeight;
            const visitBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            visitBar.setAttribute('x', x);
            visitBar.setAttribute('y', startY - visitHeight);
            visitBar.setAttribute('width', barWidth / 2 - 2);
            visitBar.setAttribute('height', visitHeight);
            visitBar.setAttribute('rx', '4');
            visitBar.setAttribute('fill', 'url(#blueGradient)');
            barChart.appendChild(visitBar);

            const patientHeight = (CHART_DATA.newPatients[i] / maxVisits) * chartHeight;
            const patientBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            patientBar.setAttribute('x', x + barWidth / 2 + 2);
            patientBar.setAttribute('y', startY - patientHeight);
            patientBar.setAttribute('width', barWidth / 2 - 2);
            patientBar.setAttribute('height', patientHeight);
            patientBar.setAttribute('rx', '4');
            patientBar.setAttribute('fill', 'url(#greenGradient)');
            barChart.appendChild(patientBar);

            const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            xLabel.setAttribute('x', x + barWidth / 2);
            xLabel.setAttribute('y', startY + 20);
            xLabel.setAttribute('text-anchor', 'middle');
            xLabel.setAttribute('fill', '#64748B');
            xLabel.setAttribute('font-size', '11');
            xLabel.setAttribute('font-weight', '500');
            xLabel.setAttribute('font-family', 'Poppins, sans-serif');
            xLabel.textContent = label;
            barChart.appendChild(xLabel);
        });

        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#0D9488;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#14B8A6;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#059669;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#2EC4B6;stop-opacity:1" />
            </linearGradient>
        `;
        barChart.insertBefore(defs, barChart.firstChild);
    }

    // ==================== EVENT LISTENERS ====================
    function setupEventListeners() {
        menuToggle.addEventListener('click', toggleSidebar);
        mobileOverlay.addEventListener('click', closeSidebar);

        userProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!userProfile.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });

        document.getElementById('btnLogoutSidebar').addEventListener('click', showLogoutModal);
        document.getElementById('btnLogoutDropdown').addEventListener('click', (e) => {
            e.preventDefault();
            userDropdown.classList.remove('active');
            showLogoutModal();
        });
        document.getElementById('btnCancelLogout').addEventListener('click', hideLogoutModal);
        document.getElementById('btnConfirmLogout').addEventListener('click', logout);

        logoutModal.addEventListener('click', (e) => {
            if (e.target === logoutModal) hideLogoutModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideLogoutModal();
                userDropdown.classList.remove('active');
            }
        });

        const btnGetStarted = document.getElementById('btnGetStarted');
        if (btnGetStarted) {
            btnGetStarted.addEventListener('click', () => {
                showNotification('Selamat bekerja!', 'success');
            });
        }
    }

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showLogoutModal() { logoutModal.classList.add('active'); }
    function hideLogoutModal() { logoutModal.classList.remove('active'); }

    function logout() {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        showNotification('Logout berhasil!', 'success');
        setTimeout(() => { window.location.href = '../../index.html'; }, 1500);
    }

    // ==================== UTILITIES ====================
    function getFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Storage error:', error);
            return null;
        }
    }

    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 1500;
            const increment = target / (duration / 16);
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current).toLocaleString('id-ID');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString('id-ID');
                }
            };
            updateCounter();
        });
    }

    function updateDateDisplay() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const el = document.getElementById('currentDate');
        if (el) el.textContent = now.toLocaleDateString('id-ID', options);
    }

    function updatePageTitle() {
        const rolePages = {
            admin: { title: 'Dashboard Administrator', subtitle: 'Monitor performa sistem' },
            dokter: { title: 'Dashboard Dokter', subtitle: 'Kelola pasien dan jadwal' },
            perawat: { title: 'Dashboard Perawat', subtitle: 'Pantau antrian dan tugas' },
            petugas: { title: 'Dashboard Petugas RM', subtitle: 'Kelola rekam medis' },
            pasien: { title: 'Dashboard Pasien', subtitle: 'Pantau riwayat kesehatan' }
        };
        const pageInfo = rolePages[currentUser.role] || rolePages.admin;
        document.getElementById('pageTitle').textContent = pageInfo.title;
        document.getElementById('pageSubtitle').textContent = pageInfo.subtitle;
    }

    function showNotification(message, type = 'success') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        notification.style.cssText = `
            position: fixed; top: 90px; right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#059669' : type === 'error' ? '#DC2626' : '#0D9488'};
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
    }

    // Inject notification styles
    if (!document.getElementById('notif-styles-dashboard')) {
        const style = document.createElement('style');
        style.id = 'notif-styles-dashboard';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content { display: flex; align-items: center; gap: 10px; }
            .notification-close {
                background: rgba(255,255,255,0.2); border: none; color: white;
                width: 24px; height: 24px; border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                cursor: pointer; font-size: 0.7rem;
            }
            .notification-close:hover { background: rgba(255,255,255,0.4); }
        `;
        document.head.appendChild(style);
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) closeSidebar();
    });

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();