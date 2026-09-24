# 🏥 HMRIS — Hospital Medical Record Information System

[![Status](https://img.shields.io/badge/Status-Active%20Production%20Ready-0D9488?style=for-the-badge)](https://github.com/inugroho399-alt/hospital-medical-record)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6%2B%20JS-0F172A?style=for-the-badge)](https://github.com/inugroho399-alt/hospital-medical-record)
[![Design](https://img.shields.io/badge/Design-Clinical%20Teal%20%26%20Slate-0D9488?style=for-the-badge)](https://github.com/inugroho399-alt/hospital-medical-record)
[![Tests](https://img.shields.io/badge/Tests-30%2F30%20Passed%20(100%25)-059669?style=for-the-badge)](https://github.com/inugroho399-alt/hospital-medical-record)

**HMRIS** (*Hospital Medical Record Information System*) adalah sistem informasi manajemen rumah sakit dan rekam medis elektronik (RME) modern berbasis web. Sistem ini dirancang dengan standar antarmuka klinis profesional (**Clinical Teal & Deep Slate**), arsitektur modular tanpa ketergantungan framework berat (*Zero-dependency Vanilla Web Architecture*), serta sistem **Role-Based Access Control (RBAC)** ketat untuk menjamin keamanan dan isolasi data medis pasien.

---

## 📑 Daftar Isi

- [✨ Fitur Utama](#-fitur-utama)
- [👥 Matriks Hak Akses Peran (RBAC)](#-matriks-hak-akses-peran-rbac)
- [🔑 Kredensial Akun Demo](#-kredensial-akun-demo)
- [🎨 Desain Sistem & Tema Klinis](#-desain-sistem--tema-klinis)
- [📁 Struktur Direktori](#-struktur-direktori)
- [🚀 Cara Menjalankan Aplikasi](#-cara-menjalankan-aplikasi)
- [🧪 Pengujian Otomatis (Automated Tests)](#-pengujian-otomatis-automated-tests)
- [🔒 Keamanan & Isolasi Data](#-keamanan--isolasi-data)
- [📄 Lisensi](#-lisensi)

---

## ✨ Fitur Utama

### 1. 🧑‍⚕️ Manajemen Pelayanan Klinis (Dokter & Perawat)
- **Rekam Medis Terstandarisasi (SOAP)**: Pencatatan anamnesis, pemeriksaan fisik, diagnosis terindeks ICD-10, tindakan, dan instruksi terapi.
- **Peringatan Klinis & Kontraindikasi Alergi**: Peringatan otomatis (*Allergy Alert System*) jika dokter meresepkan obat yang memicu riwayat alergi pasien.
- **Triase & Tanda Vital Perawat**: Pencatatan tekanan darah, denyut nadi, laju pernapasan, saturasi oksigen ($SpO_2$), dan kalkulator otomatis Indeks Massa Tubuh (BMI).

### 2. 💊 Modul Farmasi & E-Prescription
- **Verifikasi & Status Resep**: Alur resep transparan dari antrean masuk (`Menunggu`), proses peracikan (`Diproses`), hingga penyerahan ke pasien (`Selesai`).
- **Manajemen Inventaris Obat**: Monitoring stok farmasi, status kedaluwarsa, dan peringatan batas minimum stok (*low-stock threshold*).

### 3. 🔬 Laboratorium & Diagnostik
- **Permintaan Tes Lab**: Rujukan pemeriksaan laboratorium terintegrasi langsung dari rekam medis.
- **Pencatatan Hasil Uji**: Menampilkan nilai hasil, rentang rujukan normal, dan penanda status otomatis (*Normal / Tinggi / Rendah*).
- **Cetak Hasil Laboratorium**: Template cetak resmi berstandar laboratorium rumah sakit.

### 4. 📅 Janji Temu & Pendaftaran Mandiri (Pasien)
- **Registrasi Pasien Mandiri**: Pasien baru dapat membuat akun dan langsung memperoleh Nomor Rekam Medis (No. RM) resmi unik.
- **Booking Jadwal Konsultasi**: Pemilihan poliklinik, dokter spesialis, jadwal praktik, serta penerbitan nomor antrean otomatis.
- **Portal Pasien Terisolasi**: Pasien hanya memiliki akses ke riwayat rekam medis, janji temu, dan hasil tes laboratorium milik dirinya sendiri.

### 5. 📊 Laporan, Analitik & Administrasi (Admin & Petugas)
- **Dashboard Statistik Terpadu**: Metrik dinamis (total pasien, kunjungan harian, antrean lab, resep aktif) yang disesuaikan per role.
- **Laporan Tren Penyakit & Kunjungan**: Rekapitulasi data berkala dengan opsi ekspor data ke format CSV dan JSON.
- **Backup & Restore Data**: Mekanisme backup seluruh basis data lokal (*LocalStorage snapshot*) ke format JSON yang dapat dipulihkan kapan saja.

---

## 👥 Matriks Hak Akses Peran (RBAC)

| Modul / Halaman | Admin | Dokter | Perawat | Petugas RM | Pasien |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Landing Page & Registrasi** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Dashboard Ringkasan** | ✅ (Global) | ✅ (Medis) | ✅ (Triase) | ✅ (Registrasi) | ✅ (Pribadi) |
| **Direktori Semua Pasien** | ✅ (Full) | ✅ (Akses Medis) | ✅ (Tanda Vital) | ✅ (Registrasi) | ❌ *Diblokir* |
| **Data Dokter & Jadwal** | ✅ (Kelola) | ✅ (Lihat/Jadwal) | ✅ (Lihat) | ✅ (Lihat) | ✅ (Lihat Jadwal) |
| **Entri Rekam Medis (SOAP)** | ✅ | ✅ (Penuh & Resep) | ❌ | ❌ (Arsip Saja) | ❌ *(Hanya Baca Milik Sendiri)* |
| **Janji Temu (Antrean)** | ✅ (Kelola) | ✅ (Antrean Hari Ini) | ✅ (Lihat) | ✅ (Kelola) | ✅ (Booking & Riwayat Pribadi) |
| **Farmasi & Peracikan Obat** | ✅ | ✅ (Resep) | ❌ | ❌ | ❌ |
| **Laboratorium & Hasil Uji** | ✅ | ✅ (Rujukan) | ❌ | ❌ | ✅ *(Hasil Milik Sendiri)* |
| **Laporan & Ekspor Data** | ✅ | ✅ (Laporan Medis) | ❌ | ✅ (Kunjungan) | ❌ |
| **Backup, Restore & Sistem** | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## 🔑 Kredensial Akun Demo

Sistem menyediakan akun bawaan (*pre-seeded accounts*) untuk pengujian cepat semua hak akses:

| Peran | Username | Password | Nama Pengguna | Akses Khusus |
|:---|:---|:---|:---|:---|
| **Admin** | `admin` | `admin123` | Administrator | Akses penuh, manajemen user, backup & restore sistem |
| **Dokter** | `dokter` | `dokter123` | dr. Ahmad Fauzi | Input SOAP, resep obat, riwayat pemeriksaan |
| **Perawat** | `perawat` | `perawat123` | Siti Nurhaliza, A.Md.Kep | Triase, input tanda vital (vital signs), kalkulator BMI |
| **Petugas RM** | `petugas` | `petugas123` | Budi Santoso | Pendaftaran pasien baru, arsip & validasi No. RM |
| **Pasien** | *(Daftar via signup.html)* | *(Sesuai registrasi)* | Pasien Mandiri | Portal pribadi: Rekam Medis, Janji Temu, Hasil Lab |

> 💡 **Tips Pengujian Pasien**: Anda dapat mendaftar akun pasien baru secara langsung melalui halaman `signup.html` atau menggunakan form pendaftaran pasien di portal login.

---

## 🎨 Desain Sistem & Tema Klinis

Sistem antarmuka HMRIS menggunakan palet warna **Clinical Teal & Deep Slate** yang tenang, kredibel, dan ramah pengguna dalam lingkungan medis:

```css
/* Master Design Tokens (assets/css/theme.css) */
--primary: #0D9488;          /* Deep Clinical Teal */
--primary-dark: #0F766E;     /* Darker Teal */
--primary-light: #14B8A6;    /* Light Medical Cyan */
--primary-lightest: #F0FDFA; /* Soft Clean Teal Surface */

--bg-sidebar: #0F172A;       /* Midnight Deep Slate */
--bg-main: #F8FAFC;          /* Clean Clinical Off-White */
--text-main: #1E293B;        /* Slate Heading & Content */
--text-muted: #64748B;       /* Secondary Muted Text */

/* Semantic Health Badges */
--badge-success: #059669;    /* Clinical Emerald (Selesai/Tersedia) */
--badge-warning: #D97706;    /* Amber (Menunggu/Diproses) */
--badge-danger:  #DC2626;    /* Crimson Red (Alergi/Darurat) */
--badge-info:    #0284C7;    /* Sky Blue (Informasi/Pemeriksaan) */
```

- **Fokus Ergonomis**: Mengurangi kelelahan visual (*eye-strain*) bagi staf medis yang bekerja dalam durasi lama.
- **No AI-Slop Aesthetics**: Menghilangkan efek blur neon berlebihan, glow bergradasi liar, dan bayangan buram. Menggunakan elevasi slate presisi dan tipografi Inter yang tajam.

---

## 📁 Struktur Direktori

```text
hospital-medical-record/
├── assets/
│   ├── css/
│   │   ├── theme.css            # Master Design System & Clinical Palette Tokens
│   │   ├── dashboard.css        # Layout & Komponen Dashboard Utama
│   │   ├── dokter.css           # UI Manajemen Dokter & Jadwal
│   │   ├── farmasi.css          # UI Modul E-Prescription & Apotek
│   │   ├── janji.css            # UI Manajemen Antrean & Janji Temu
│   │   ├── laboratorium.css     # UI Rujukan & Hasil Uji Lab
│   │   ├── landing.css          # UI Landing Page Publik
│   │   ├── laporan.css          # UI Laporan & Analitik Statistik
│   │   ├── login.css            # UI Halaman Autentikasi
│   │   ├── navbar.css           # Navigasi Atas & User Dropdown
│   │   ├── pasien.css           # UI Direktori Pasien
│   │   ├── pengaturan.css       # UI Profil & Konfigurasi Sistem
│   │   ├── rekammedis.css       # UI Rekam Medis Elektronik (SOAP)
│   │   └── signup.css           # UI Pendaftaran Pasien Mandiri
│   └── js/
│       ├── dashboard.js         # Logika Dashboard & Statistik per Role
│       ├── dokter.js            # Data & Manajemen Jadwal Dokter
│       ├── farmasi.js           # Alur Resep Obat & Inventaris Apotek
│       ├── janji.js             # Booking & Antrean Janji Temu
│       ├── laboratorium.js      # Pengolahan Data & Cetak Hasil Lab
│       ├── landing.js           # Interaksi Landing Page
│       ├── laporan.js           # Ekspor Data (CSV/JSON) & Grafik
│       ├── login.js             # Autentikasi, Enkripsi, & Role Dispatcher
│       ├── navbar.js            # Manajemen Header & Navigasi Dinamis
│       ├── pasien.js            # Operasi CRUD Data Pasien
│       ├── pengaturan.js        # Profil, Pengaturan Rumah Sakit, Backup/Restore
│       ├── rekammedis.js        # SOAP, ICD-10, & Allergy Alert Engine
│       └── signup.js            # Validasi & Auto-generate No. RM Baru
├── pages/
│   ├── dashboard/
│   │   └── index.html           # Halaman Utama Dashboard Multi-Role
│   ├── dokter.html              # Halaman Manajemen Dokter
│   ├── farmasi.html             # Halaman Modul Farmasi
│   ├── janji-temu.html          # Halaman Janji Temu
│   ├── laboratorium.html        # Halaman Laboratorium
│   ├── laporan.html             # Halaman Laporan & Analitik
│   ├── pasien.html              # Halaman Direktori Pasien
│   ├── pengaturan.html          # Halaman Pengaturan & Backup Sistem
│   └── rekam-medis.html         # Halaman Rekam Medis Elektronik (RME)
├── tests/
│   ├── test_all_roles.js        # Automated E2E Test Suite (30 Test Cases)
│   └── test_farmasi_exit.js     # Verification Test untuk Navigasi Menu Farmasi
├── .gitignore                   # Konfigurasi Git Ignore
├── index.html                   # Halaman Login Utama
├── landing.html                 # Landing Page Publik Informasi Rumah Sakit
├── signup.html                  # Halaman Pendaftaran Pasien Baru
└── README.md                    # Dokumentasi Proyek
```

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini dibangun murni menggunakan teknologi web standar tanpa kompilasi build (*No build step required*). Anda dapat menjalankannya langsung di browser menggunakan web server lokal:

### 1. Clone Repositori
```bash
git clone https://github.com/inugroho399-alt/hospital-medical-record.git
cd hospital-medical-record
```

### 2. Jalankan Web Server Lokal

Pilih salah satu metode di bawah ini:

- **Menggunakan Python 3**:
  ```bash
  python3 -m http.server 8000
  ```
  Lalu buka browser di `http://localhost:8000`.

- **Menggunakan Node.js (`serve` atau `http-server`)**:
  ```bash
  npx serve .
  # atau
  npx http-server -p 8000
  ```

- **Menggunakan Visual Studio Code Live Server**:
  Klik kanan pada file `index.html` atau `landing.html`, lalu pilih **"Open with Live Server"**.

---

## 🧪 Pengujian Otomatis (Automated Tests)

Repositori ini dilengkapi dengan automated testing suite berbasis Node.js yang memverifikasi integritas autentikasi, isolasi data, dan alur operasional di seluruh 5 role pengguna.

### Menjalankan Seluruh Test Suite:
```bash
node tests/test_all_roles.js
```

### Output Pengujian:
```text
======================================================
   HMRIS ROLE-BY-ROLE END-TO-END VERIFICATION SUITE   
======================================================

🧪 TESTING ROLE 1: PASIEN (Registration to Service Finish)
  ✔ Registrasi: Akun pasien tersimpan di hmris_users
  ✔ Registrasi: Data pasien tersimpan di hmris_patients
  ✔ Autentikasi: Password hash valid dan user ditemukan
  ✔ Session: hmris_currentUser diset dengan role: pasien
  ✔ Session: nama pasien tersimpan lengkap
  ✔ Session: noRM pasien tersimpan lengkap
  ✔ Dashboard: Menu Rekam Medis Saya tersedia untuk pasien
  ✔ Dashboard: Menu Hasil Lab Saya tersedia untuk pasien
  ✔ Dashboard: Menu Data Pasien (direktori seluruh pasien) TIDAK ada pada menu pasien
  ✔ Rekam Medis: Pasien HANYA melihat rekam medis milik sendiri (Data Isolation OK)
  ✔ Rekam Medis: Rekam medis pasien lain terfilter dan terisolasi dengan aman
  ✔ Janji Temu: Pasien HANYA melihat jadwal janji temu miliknya sendiri
  ✔ Janji Temu: Pasien berhasil membuat janji temu baru atas namanya
  ✔ Laboratorium: Pasien HANYA melihat hasil lab miliknya sendiri
  ✔ Akses Kontrol: Akses langsung ke pasien.html diblokir untuk role pasien
  ✔ Pengaturan: Tab sensitif (backup, restore, reset, RS) disembunyikan untuk pasien

🧪 TESTING ROLE 2: DOKTER (Clinical Management & Allergy Alert)
  ✔ Autentikasi: Login dokter berhasil dengan default credential (dokter/dokter123)
  ✔ Session: Role dokter aktif
  ✔ Rekam Medis: Dokter berhasil menginput rekam medis dan resep obat
  ✔ Peringatan Klinis: Sistem mendeteksi kontraindikasi alergi resep obat

🧪 TESTING ROLE 3: PERAWAT (Triage & Vital Signs Monitoring)
  ✔ Autentikasi: Login perawat berhasil (perawat/perawat123)
  ✔ Session: Role perawat aktif
  ✔ Tanda Vital: Perhitungan BMI otomatis akurat (22.5 Normal)

🧪 TESTING ROLE 4: PETUGAS REKAM MEDIS (Registration & Archiving)
  ✔ Autentikasi: Login petugas RM berhasil (petugas/petugas123)
  ✔ Session: Role petugas RM aktif
  ✔ Petugas RM: Akses direktori pasien dan arsip rekam medis diizinkan

🧪 TESTING ROLE 5: ADMIN (System, Users & Backup/Restore)
  ✔ Autentikasi: Login admin berhasil (admin/admin123)
  ✔ Session: Role admin aktif dengan akses penuh
  ✔ Backup Data: Generate export backup JSON berhasil
  ✔ Restore Data: Validasi struktur format backup JSON sukses

======================================================
Role: PASIEN     [PASSED] 16/16 test cases passed
Role: DOKTER     [PASSED] 4/4 test cases passed
Role: PERAWAT    [PASSED] 3/3 test cases passed
Role: PETUGAS    [PASSED] 3/3 test cases passed
Role: ADMIN      [PASSED] 4/4 test cases passed
------------------------------------------------------
TOTAL: 30 Passed, 0 Failed (100% Success Rate)
```

### Menjalankan Uji Navigasi Farmasi:
```bash
node tests/test_farmasi_exit.js
```

---

## 🔒 Keamanan & Isolasi Data

- **Session Enkapsulasi**: Data sesi pengguna tersimpan di `LocalStorage` dengan enkripsi string hashing untuk kata sandi.
- **Strict Role-Based Routing**: Pengguna yang mencoba mengakses rute di luar kewenangannya (misal: Pasien membuka `pasien.html` atau tab backup database) secara otomatis dicegat dan dialihkan ke dashboard utama.
- **Privacy by Design**: Filter otomatis pada seluruh modul data menjamin pasien tidak dapat membaca data klinis maupun identitas pasien lainnya.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi **MIT**. Silakan gunakan, pelajari, dan kembangkan sesuai kebutuhan rumah sakit, klinik, atau institusi pendidikan Anda.
