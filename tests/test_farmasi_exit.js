/**
 * Test to verify that farmasi.html sidebar and exit links point to valid targets
 * and do not trap the user.
 */
const fs = require('fs');
const path = require('path');

const farmasiHtmlPath = path.join(__dirname, '../pages/farmasi.html');
const farmasiJsPath = path.join(__dirname, '../assets/js/farmasi.js');

const htmlContent = fs.readFileSync(farmasiHtmlPath, 'utf8');
const jsContent = fs.readFileSync(farmasiJsPath, 'utf8');

console.log('Testing Farmasi Exit Navigation:');

// 1. Verify that farmasi.js does not contain duplicate renderSidebar declaration
const matches = jsContent.match(/^\s*renderSidebar\s*\(/gm);
if (matches && matches.length > 1) {
    console.error('❌ Duplicate renderSidebar found in farmasi.js');
    process.exit(1);
} else {
    console.log('  ✔ No duplicate renderSidebar found');
}

// 2. Verify that there are valid exit links configured in farmasi.js ROLE_CONFIG
const exitTargets = [
    'dashboard/index.html',
    'pasien.html',
    'dokter.html',
    'rekam-medis.html',
    'janji-temu.html',
    'laboratorium.html',
    'laporan.html',
    'pengaturan.html'
];

let allFound = true;
exitTargets.forEach(target => {
    if (jsContent.includes(target) || htmlContent.includes(target)) {
        console.log(`  ✔ Exit route to ${target} verified`);
    } else {
        console.warn(`  ❌ Exit route to ${target} missing!`);
        allFound = false;
    }
});

if (!allFound) {
    process.exit(1);
}

console.log('✨ Farmasi Exit Navigation verification complete!');
