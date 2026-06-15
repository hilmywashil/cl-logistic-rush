// ---- Mobile Nav ----
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

function openNav() {
    mobileNav.style.display = 'block';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => mobileNav.classList.add('open'));
}

function closeNav() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    mobileNav.addEventListener('transitionend', () => {
        if (!mobileNav.classList.contains('open')) mobileNav.style.display = 'none';
    }, { once: true });
}

mobileToggle.addEventListener('click', openNav);
mobileNavClose.addEventListener('click', closeNav);
mobileNav.addEventListener('click', e => { if (e.target === mobileNav) closeNav(); });
document.querySelectorAll('.mobile-nav-links a').forEach(l => l.addEventListener('click', closeNav));

// ---- Dummy Data ----
const dummyData = {
    'JNP2024051200123': {
        status: 'delivered',
        statusLabel: 'Terkirim',
        statusIcon: 'fas fa-check-circle',
        statusTitle: 'Paket Telah Diterima',
        statusSub: 'Diterima oleh penerima pada 15 Mei 2024, 14:32',
        layanan: 'Pengiriman Reguler',
        berat: '1,2 kg',
        pengirim: 'Toko Elektronik Jaya',
        penerima: 'Budi Santoso',
        eta: 'Sudah Tiba',
        from: 'Jakarta Pusat',
        to: 'Surabaya',
        timeline: [
            { date: '15 Mei 2024', hour: '14:32', title: 'Paket Diterima', desc: 'Paket telah diterima oleh Budi Santoso.', location: 'Surabaya Selatan', status: 'active' },
            { date: '15 Mei 2024', hour: '09:10', title: 'Keluar dari Hub', desc: 'Paket keluar dari Hub Surabaya menuju alamat penerima.', location: 'Hub Surabaya', status: 'done' },
            { date: '14 Mei 2024', hour: '22:45', title: 'Tiba di Hub Surabaya', desc: 'Paket tiba dan sedang diproses di hub tujuan.', location: 'Hub Surabaya', status: 'done' },
            { date: '14 Mei 2024', hour: '08:00', title: 'Dalam Perjalanan', desc: 'Paket diberangkatkan dari Jakarta menuju Surabaya.', location: 'Hub Jakarta', status: 'done' },
            { date: '13 Mei 2024', hour: '16:30', title: 'Paket Diproses', desc: 'Paket sedang diproses dan dikemas di warehouse.', location: 'Jakarta Pusat', status: 'done' },
            { date: '13 Mei 2024', hour: '11:00', title: 'Pesanan Diterima', desc: 'Permintaan pengiriman telah diterima oleh sistem.', location: 'Jakarta Pusat', status: 'done' },
        ]
    },
    'JNP2024051200456': {
        status: 'in-transit',
        statusLabel: 'Dalam Pengiriman',
        statusIcon: 'fas fa-truck',
        statusTitle: 'Paket Sedang Dalam Perjalanan',
        statusSub: 'Estimasi tiba: 06 Juni 2026',
        layanan: 'Pengiriman Express',
        berat: '3,5 kg',
        pengirim: 'Fashion Store Bandung',
        penerima: 'Siti Rahayu',
        eta: '06 Juni 2026',
        from: 'Bandung',
        to: 'Medan',
        timeline: [
            { date: '05 Jun 2026', hour: '07:20', title: 'Kurir Sedang Mengantar', desc: 'Paket dibawa kurir menuju alamat penerima.', location: 'Medan Kota', status: 'active' },
            { date: '04 Jun 2026', hour: '23:55', title: 'Tiba di Hub Medan', desc: 'Paket tiba di Hub Medan dan sedang disortir.', location: 'Hub Medan', status: 'done' },
            { date: '04 Jun 2026', hour: '06:00', title: 'Dalam Penerbangan', desc: 'Paket diberangkatkan via udara dari Bandung ke Medan.', location: 'Bandara Soekarno-Hatta', status: 'done' },
            { date: '03 Jun 2026', hour: '18:15', title: 'Paket Diproses', desc: 'Paket telah dipacking dan siap dikirim.', location: 'Hub Bandung', status: 'done' },
            { date: '03 Jun 2026', hour: '10:00', title: 'Pesanan Diterima', desc: 'Permintaan pengiriman telah diterima oleh sistem.', location: 'Bandung', status: 'done' },
        ]
    },
    'JNP2024051200789': {
        status: 'pending',
        statusLabel: 'Menunggu Pickup',
        statusIcon: 'fas fa-clock',
        statusTitle: 'Menunggu Penjemputan',
        statusSub: 'Kurir akan menjemput paket hari ini',
        layanan: 'Cargo Darat',
        berat: '12 kg',
        pengirim: 'CV. Maju Bersama',
        penerima: 'PT. Sinar Abadi',
        eta: '09 Juni 2026',
        from: 'Yogyakarta',
        to: 'Makassar',
        timeline: [
            { date: '05 Jun 2026', hour: '09:00', title: 'Menunggu Pickup', desc: 'Kurir sedang dalam perjalanan menuju lokasi pengirim.', location: 'Yogyakarta', status: 'active' },
            { date: '05 Jun 2026', hour: '08:00', title: 'Pesanan Diterima', desc: 'Permintaan pengiriman telah diterima oleh sistem JNP.', location: 'Yogyakarta', status: 'done' },
        ]
    }
};

// ---- Render Functions ----
function showResult(data, resi) {
    const container = document.getElementById('resultContainer');
    const banner = document.getElementById('statusBanner');

    // Status banner
    banner.className = 'status-banner ' + data.status;
    document.getElementById('statusIcon').innerHTML = `<i class="${data.statusIcon}"></i>`;
    document.getElementById('statusTitle').textContent = data.statusTitle;
    document.getElementById('statusSub').textContent = data.statusSub;
    document.getElementById('statusBadge').innerHTML = `<i class="${data.statusIcon}"></i> ${data.statusLabel}`;

    // Info cards
    document.getElementById('infoResi').textContent = resi;
    document.getElementById('infoLayanan').textContent = data.layanan;
    document.getElementById('infoBerat').textContent = data.berat;
    document.getElementById('infoPengirim').textContent = data.pengirim;
    document.getElementById('infoPenerima').textContent = data.penerima;
    document.getElementById('infoEta').textContent = data.eta;

    // Route
    document.getElementById('routeFrom').textContent = data.from;
    document.getElementById('routeTo').textContent = data.to;

    // Timeline
    const tl = document.getElementById('timeline');
    tl.innerHTML = data.timeline.map((item, i) => `
                <div class="timeline-item ${item.status === 'active' ? 'is-active' : ''}">
                    <div class="timeline-time">
                        <div class="t-date">${item.date}</div>
                        <div class="t-hour">${item.hour}</div>
                    </div>
                    <div class="timeline-connector">
                        <div class="t-dot ${item.status}"></div>
                        <div class="t-line"></div>
                    </div>
                    <div class="timeline-body">
                        <div class="t-title">${item.title}</div>
                        <div class="t-desc">${item.desc}</div>
                        <span class="t-location"><i class="fas fa-map-pin"></i> ${item.location}</span>
                    </div>
                </div>
            `).join('');

    container.classList.add('show');
}

function trackPackage() {
    const input = document.getElementById('resiInput').value.trim().toUpperCase();
    const spinner = document.getElementById('loadingSpinner');
    const notFound = document.getElementById('notFound');
    const result = document.getElementById('resultContainer');

    // Reset
    result.classList.remove('show');
    notFound.classList.remove('show');
    spinner.classList.remove('show');

    if (!input) {
        document.getElementById('resiInput').focus();
        return;
    }

    // Scroll ke area hasil
    document.querySelector('.wrapper-result').scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Simulate loading
    spinner.classList.add('show');

    setTimeout(() => {
        spinner.classList.remove('show');

        if (dummyData[input]) {
            showResult(dummyData[input], input);
        } else {
            notFound.classList.add('show');
        }
    }, 1200);
}

document.getElementById('trackBtn').addEventListener('click', trackPackage);
document.getElementById('resiInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') trackPackage();
});

// Demo shortcut
function demoResi(resi) {
    document.getElementById('resiInput').value = resi;
    trackPackage();
}