/* =====================================================================
   site.js  |  Tata Teduhmu  |  dipakai SEMUA halaman
   Daftar isi: 1 NAVBAR | 2 WARNA HEADER | 3 REVEAL & SKETSA | 4 KONTEN TERBARU
               5 LIST + NOMOR HALAMAN | 6 GALERI | 7 FORM KONTAK
   (Slider testimoni & carousel klien ada di carousel.js, hanya dimuat di index.html)
   ===================================================================== */

/* ===== 1 NAVBAR =====
   Desktop (>=1024px): menu terbuka saat di paling atas, menciut jadi tombol saat di-scroll.
   HP & tablet (<1024px): dropdown kecil; tertutup saat scroll, klik di luar, atau tekan Esc. */
const navbar = document.getElementById('navbar');
const btnToggle = document.getElementById('btn-toggle');
const mqDesktop = window.matchMedia('(min-width: 1024px)');
let wasTop = true;

function setOpen(v) {
    navbar.dataset.open = v;
    btnToggle.setAttribute('aria-expanded', v);
    btnToggle.setAttribute('aria-label', v ? 'Tutup menu' : 'Buka menu');
}
function onScroll() {
    const top = window.scrollY <= 50;                 // 50 = jarak scroll (px) sebelum bar jadi transparan-blur
    navbar.classList.toggle('scrolled', !top);
    if (mqDesktop.matches && top !== wasTop) setOpen(top);
    if (!mqDesktop.matches && navbar.dataset.open === 'true') setOpen(false);
    wasTop = top;
}
btnToggle.addEventListener('click', e => { e.stopPropagation(); setOpen(navbar.dataset.open !== 'true'); });
document.querySelectorAll('#nav-links a').forEach(a => a.addEventListener('click', () => { if (!mqDesktop.matches) setOpen(false); }));
document.addEventListener('click', e => { if (!mqDesktop.matches && !navbar.contains(e.target)) setOpen(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
mqDesktop.addEventListener('change', () => setOpen(mqDesktop.matches && window.scrollY <= 50));
window.addEventListener('scroll', onScroll, { passive: true });
setOpen(mqDesktop.matches && window.scrollY <= 50);
onScroll();

/* ===== 2 WARNA HEADER OTOMATIS =====
   Section ber-class "data-dark" = latar gelap (teks header terang); "data-light" = latar terang.
   Section baru wajib diberi salah satu class ini. */
const bgObserver = new IntersectionObserver(entries => {
    entries.forEach(en => {
        if (!en.isIntersecting) return;
        const dark = en.target.classList.contains('data-dark');
        navbar.classList.toggle('header-dark-bg', dark);
        navbar.classList.toggle('header-light-bg', !dark);
    });
}, { rootMargin: '-60px 0px -85% 0px', threshold: 0 });
document.querySelectorAll('.data-dark, .data-light').forEach(el => bgObserver.observe(el));

/* ===== 3 ANIMASI MUNCUL (reveal) + SKETSA =====
   Elemen ber-class "reveal" muncul saat masuk layar. Baris pertama menyiapkan animasi menggambar sketsa. */
document.querySelectorAll('.sk *').forEach(n => n.setAttribute('pathLength', '1'));
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('active'); revealObserver.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== 4 AMBIL KONTEN TERBARU (kartu Proyek & Artikel di index.html) =====
   Membaca proyek.html / artikel.html, mengambil postingan PERTAMA (elemen ber-atribut data-post), lalu mengisi
   foto, judul, ringkasan, dan link pada kartu. Jika gagal, isi cadangan di HTML tetap dipakai.
   Hanya bekerja setelah web diupload ke hosting (bukan dari file komputer). */
async function loadLatest(prefix, page) {
    const imgEl = document.getElementById(prefix + '-img');
    if (!imgEl) return;                                  // halaman ini tidak punya kartu tsb
    try {
        const res = await fetch(page, { cache: 'no-cache' });
        if (!res.ok) return;
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        const post = doc.querySelector('[data-post]');
        if (!post) return;
        const abs = u => new URL(u, new URL(page, location.href)).href;
        const img = post.querySelector('img'), head = post.querySelector('h1,h2,h3'),
              desc = post.querySelector('p'), link = post.querySelector('a[href]');
        const title = document.getElementById(prefix + '-title');
        if (img)  { imgEl.src = abs(img.getAttribute('src')); imgEl.alt = img.alt || imgEl.alt; }
        if (head) title.textContent = head.textContent.trim();
        if (desc) document.getElementById(prefix + '-desc').textContent = desc.textContent.trim();
        if (link) title.href = abs(link.getAttribute('href'));
    } catch (err) { /* abaikan: pakai isi cadangan */ }
}
[['proyek', 'proyek.html'], ['artikel', 'artikel.html']].forEach(([p, f]) => loadLatest(p, f));

/* ===== 5 LIST + NOMOR HALAMAN (proyek.html, artikel.html) =====
   Semua postingan ditulis di HTML (terbaru di atas). Script menampilkan maksimal data-per (default 10) per halaman,
   membuat tombol Sebelumnya / 1 2 3 … / Berikutnya, dan kolom cari. Alamat: proyek.html?hal=2 */
function pageNums(p, n) {                                // contoh hasil: [1,'…',4,5,6,'…',20]
    const keep = [...new Set([1, n, p - 1, p, p + 1])].filter(x => x >= 1 && x <= n).sort((a, b) => a - b);
    const out = [];
    keep.forEach((x, i) => { if (i && x - keep[i - 1] > 1) out.push('…'); out.push(x); });
    return out;
}
(function initList() {
    const list = document.querySelector('[data-list]');
    if (!list) return;
    const per = Math.min(10, +list.dataset.per || 10);   // batas maksimal 10 per halaman
    const items = [...list.querySelectorAll('[data-post]')];
    const q = document.getElementById('list-q'), info = document.getElementById('list-info'),
          pager = document.getElementById('pager'), empty = document.getElementById('list-empty');
    let page = parseInt(new URLSearchParams(location.search).get('hal'), 10) || 1;

    function render(scroll) {
        const term = (q ? q.value : '').toLowerCase().trim();
        const vis = items.filter(el => el.textContent.toLowerCase().includes(term));
        const pages = Math.max(1, Math.ceil(vis.length / per));
        page = Math.min(Math.max(1, page), pages);
        items.forEach(el => { el.hidden = true; });
        vis.slice((page - 1) * per, page * per).forEach(el => { el.hidden = false; });
        empty.hidden = vis.length > 0;
        info.textContent = vis.length ? `Menampilkan ${(page - 1) * per + 1}–${Math.min(page * per, vis.length)} dari ${vis.length}` : '';
        let html = '';
        if (pages > 1) {
            html += `<a href="?hal=${page - 1}" data-p="${page - 1}" class="${page === 1 ? 'dis' : ''}" aria-label="Sebelumnya">←</a>`;
            pageNums(page, pages).forEach(x => {
                html += x === '…' ? '<span class="gap">…</span>'
                    : x === page ? `<span class="cur" aria-current="page">${x}</span>` : `<a href="?hal=${x}" data-p="${x}">${x}</a>`;
            });
            html += `<a href="?hal=${page + 1}" data-p="${page + 1}" class="${page === pages ? 'dis' : ''}" aria-label="Berikutnya">→</a>`;
        }
        pager.innerHTML = html;
        if (scroll) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    pager.addEventListener('click', e => {
        const a = e.target.closest('[data-p]');
        if (!a) return;
        e.preventDefault();
        page = +a.dataset.p;
        try { history.pushState({}, '', '?hal=' + page); } catch (err) {}
        render(true);
    });
    if (q) q.addEventListener('input', () => { page = 1; render(false); });
    window.addEventListener('popstate', () => { page = parseInt(new URLSearchParams(location.search).get('hal'), 10) || 1; render(false); });
    render(false);
})();

/* ===== 6 GALERI (galeri.html): klik foto = perbesar ===== */
(function initGallery() {
    const dlg = document.getElementById('lightbox');
    if (!dlg) return;
    const big = dlg.querySelector('img');
    document.querySelectorAll('.gallery img').forEach(im => im.addEventListener('click', () => { big.src = im.src; big.alt = im.alt; dlg.showModal(); }));
    dlg.addEventListener('click', () => dlg.close());
})();

/* ===== 7 FORM KONTAK (kontak.html): menyusun pesan lalu membuka WhatsApp =====
   Nomor tujuan: ubah "6285156205650" (format 62..., tanpa 0 / + / spasi). */
(function initForm() {
    const f = document.getElementById('wa-form');
    if (!f) return;
    f.addEventListener('submit', e => {
        e.preventDefault();
        const d = new FormData(f);
        const msg = `Halo Tata Teduhmu, saya ${d.get('nama')}.\nKeperluan: ${d.get('keperluan')}\n\n${d.get('pesan')}`;
        window.open('https://wa.me/6285156205650?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
})();
