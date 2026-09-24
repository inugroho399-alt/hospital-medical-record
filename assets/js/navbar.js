/**
 * ==========================================================================
 * HMRIS - Global Top Navbar Controller
 * Interactive Global Search & Notification Center
 * ==========================================================================
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        initGlobalNavbar();
    });

    function initGlobalNavbar() {
        const topNavbar = document.querySelector('.top-navbar');
        if (!topNavbar) return;

        const isDashboard = window.location.pathname.includes('/dashboard/');
        const basePath = isDashboard ? '../' : '';

        // 1. Setup Notifications
        setupNotifications(topNavbar, basePath);

        // 2. Setup Global Search
        setupGlobalSearch(topNavbar, basePath);
    }

    // ==================== NOTIFICATIONS ====================
    function setupNotifications(navbar, basePath) {
        const notifBtn = navbar.querySelector('#btnNotification') || navbar.querySelector('.navbar-icon-btn:has(.fa-bell)') || navbar.querySelector('.fa-bell')?.closest('.navbar-icon-btn');
        if (!notifBtn) return;

        // Wrap button in relative container if not already
        let wrapper = notifBtn.parentElement;
        if (!wrapper.classList.contains('navbar-item-wrapper')) {
            const newWrapper = document.createElement('div');
            newWrapper.className = 'navbar-item-wrapper';
            notifBtn.parentNode.insertBefore(newWrapper, notifBtn);
            newWrapper.appendChild(notifBtn);
            wrapper = newWrapper;
        }

        // Create Dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'notification-dropdown';
        dropdown.id = 'notificationDropdown';
        dropdown.innerHTML = `
            <div class="notif-dropdown-header">
                <h4>Notifikasi Sistem</h4>
                <button type="button" class="btn-mark-read" id="btnMarkAllRead">Tandai Sudah Dibaca</button>
            </div>
            <div class="notif-dropdown-body">
                <div class="notif-item unread" data-href="${basePath}farmasi.html">
                    <div class="notif-item-icon amber"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="notif-item-content">
                        <div class="notif-item-title">Peringatan Stok Obat</div>
                        <div class="notif-item-desc">Stok Paracetamol 500mg tersisa kurang dari 20 strip. Perlu restock segera.</div>
                        <div class="notif-item-time">10 menit yang lalu</div>
                    </div>
                </div>
                <div class="notif-item unread" data-href="${basePath}rekam-medis.html">
                    <div class="notif-item-icon blue"><i class="fas fa-file-medical"></i></div>
                    <div class="notif-item-content">
                        <div class="notif-item-title">Rekam Medis Baru</div>
                        <div class="notif-item-desc">Rekam medis atas nama Budi Santoso telah selesai diperiksa oleh dr. Ahmad Fauzi.</div>
                        <div class="notif-item-time">30 menit yang lalu</div>
                    </div>
                </div>
                <div class="notif-item unread" data-href="${basePath}janji-temu.html">
                    <div class="notif-item-icon emerald"><i class="fas fa-calendar-check"></i></div>
                    <div class="notif-item-content">
                        <div class="notif-item-title">Janji Temu Terkonfirmasi</div>
                        <div class="notif-item-desc">Pasien Siti Rahma telah konfirmasi kehadiran di Poli Umum pukul 10:30 WIB.</div>
                        <div class="notif-item-time">1 jam yang lalu</div>
                    </div>
                </div>
                <div class="notif-item" data-href="${basePath}laboratorium.html">
                    <div class="notif-item-icon purple"><i class="fas fa-flask"></i></div>
                    <div class="notif-item-content">
                        <div class="notif-item-title">Hasil Lab Selesai</div>
                        <div class="notif-item-desc">Pemeriksaan darah lengkap pasien Andi Wijaya telah diterbitkan analis.</div>
                        <div class="notif-item-time">2 jam yang lalu</div>
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(dropdown);

        // Toggle Dropdown
        notifBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        // Mark as Read
        const markBtn = dropdown.querySelector('#btnMarkAllRead');
        const badge = notifBtn.querySelector('.badge');
        markBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));
            if (badge) {
                badge.style.display = 'none';
            }
        });

        // Click item navigates
        dropdown.querySelectorAll('.notif-item').forEach(item => {
            item.addEventListener('click', () => {
                const target = item.dataset.href;
                if (target) window.location.href = target;
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    // ==================== GLOBAL SEARCH ====================
    function setupGlobalSearch(navbar, basePath) {
        const searchBox = navbar.querySelector('.search-box');
        if (!searchBox) return;

        const input = searchBox.querySelector('input');
        if (!input) return;

        // Results Dropdown
        const resultsEl = document.createElement('div');
        resultsEl.className = 'search-results-dropdown';
        resultsEl.id = 'searchResultsDropdown';
        searchBox.appendChild(resultsEl);

        let debounceTimeout;

        input.addEventListener('input', () => {
            clearTimeout(debounceTimeout);
            const query = input.value.trim().toLowerCase();

            if (query.length < 2) {
                resultsEl.classList.remove('active');
                resultsEl.innerHTML = '';
                return;
            }

            debounceTimeout = setTimeout(() => {
                performGlobalSearch(query, resultsEl, basePath);
            }, 200);
        });

        input.addEventListener('focus', () => {
            if (input.value.trim().length >= 2) {
                resultsEl.classList.add('active');
            }
        });

        // Close on Escape or click outside
        document.addEventListener('click', (e) => {
            if (!searchBox.contains(e.target)) {
                resultsEl.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                resultsEl.classList.remove('active');
            }
        });
    }

    function performGlobalSearch(query, container, basePath) {
        let patients = [];
        let doctors = [];
        let records = [];

        try {
            patients = JSON.parse(localStorage.getItem('hmris_patients')) || [];
            doctors = JSON.parse(localStorage.getItem('hmris_doctors')) || [];
            records = JSON.parse(localStorage.getItem('hmris_records')) || [];
        } catch (e) {
            console.error('Search storage read error:', e);
        }

        const matchPatients = patients.filter(p =>
            (p.nama || '').toLowerCase().includes(query) ||
            (p.noRM || '').toLowerCase().includes(query) ||
            (p.nik || '').includes(query)
        ).slice(0, 3);

        const matchDoctors = doctors.filter(d =>
            (d.nama || '').toLowerCase().includes(query) ||
            (d.spesialis || '').toLowerCase().includes(query) ||
            (d.poli || '').toLowerCase().includes(query)
        ).slice(0, 2);

        const matchRecords = records.filter(r =>
            (r.diagnosa || '').toLowerCase().includes(query) ||
            (r.kodeICD || '').toLowerCase().includes(query)
        ).slice(0, 2);

        const totalMatches = matchPatients.length + matchDoctors.length + matchRecords.length;

        if (totalMatches === 0) {
            container.innerHTML = `
                <div class="search-empty">
                    <i class="fas fa-search" style="font-size: 24px; color: #94A3B8; margin-bottom: 8px; display: block;"></i>
                    Tidak ada data yang cocok dengan "${query}"
                </div>
            `;
            container.classList.add('active');
            return;
        }

        let html = '<div class="search-results-list">';

        // Patients
        if (matchPatients.length > 0) {
            html += '<div class="search-results-header">Pasien</div>';
            matchPatients.forEach(p => {
                html += `
                    <div class="search-result-item" data-url="${basePath}pasien.html">
                        <div class="search-result-icon"><i class="fas fa-user"></i></div>
                        <div class="search-result-text">
                            <div class="search-result-name">${p.nama}</div>
                            <div class="search-result-detail">No. RM: ${p.noRM || '-'} | NIK: ${p.nik || '-'}</div>
                        </div>
                        <span class="search-result-badge">Pasien</span>
                    </div>
                `;
            });
        }

        // Doctors
        if (matchDoctors.length > 0) {
            html += '<div class="search-results-header">Dokter</div>';
            matchDoctors.forEach(d => {
                html += `
                    <div class="search-result-item" data-url="${basePath}dokter.html">
                        <div class="search-result-icon"><i class="fas fa-user-md"></i></div>
                        <div class="search-result-text">
                            <div class="search-result-name">${d.nama}</div>
                            <div class="search-result-detail">${d.spesialis || '-'} | Poli: ${d.poli || '-'}</div>
                        </div>
                        <span class="search-result-badge">Dokter</span>
                    </div>
                `;
            });
        }

        // Records
        if (matchRecords.length > 0) {
            html += '<div class="search-results-header">Rekam Medis</div>';
            matchRecords.forEach(r => {
                html += `
                    <div class="search-result-item" data-url="${basePath}rekam-medis.html">
                        <div class="search-result-icon"><i class="fas fa-file-medical"></i></div>
                        <div class="search-result-text">
                            <div class="search-result-name">${r.diagnosa || 'Pemeriksaan Klinis'}</div>
                            <div class="search-result-detail">Kode ICD: ${r.kodeICD || '-'}</div>
                        </div>
                        <span class="search-result-badge">RM</span>
                    </div>
                `;
            });
        }

        html += '</div>';
        container.innerHTML = html;
        container.classList.add('active');

        // Bind clicks
        container.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const url = item.dataset.url;
                if (url) window.location.href = url;
            });
        });
    }

})();
