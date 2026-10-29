# Tata Teduhmu: redesign preview ("Ma" / Sketsa Hidup)

Preview statis lokal. HTML, CSS, dan JavaScript biasa; tanpa build, tanpa instalasi, tanpa server.

## Cara membuka
Klik dua kali `index.html` (atau seret ke browser). Semua halaman saling terhubung lewat `file://`.
Folder ini tidak mengubah repository publik dan tidak melakukan deployment.

## Arah desain
Satu gagasan per layar, banyak ruang kosong, teks kecil, tipografi serif besar (Fraunces) di atas kertas hangat.
Satu-satunya ornamen adalah sketsa kuas yang menggambar dirinya. Warna: kertas `#F7F4EE`, tinta plum `#3A0F34` (dipertahankan dari brand), emas `#B88410` hanya untuk garis dan penanda kecil, plum tua `#1E0719` untuk satu bagian gelap (testimoni).
Beranda sengaja tidak memuat daftar layanan, target pelanggan, atau wilayah; itu ada di `layanan.html`.

## Komponen yang dipertahankan (mekanisme tidak diubah)
- **Navbar**: blok navbar, warna header otomatis, dan reveal di `site.js` identik dengan sumber. ID `#navbar`, `#btn-toggle`, `#nav-links`, atribut `data-open`, breakpoint 1024 px.
- **Testimoni**: `carousel.js` identik byte demi byte dengan sumber. Selector `.testi-slide`, `.testi-dot`, `#prev-testi`, `#next-testi`, dan utilitas `opacity-*`/`z-*` tetap ada di CSS. Isi 4 testimoni tidak diubah.
- **Klien**: `#klien-window`, `#klien-track`, `.klien-item[data-klien-index]`, `--visible-logos`, daftar ganda dengan salinan `aria-hidden`. 13 nama klien tidak diubah; tidak ada logo atau klien baru.
- **Animasi Prinsip**: tiga sketsa SVG disalin persis (nilai `d` setiap path sama), termasuk filter `#brush`, mekanisme `pathLength` + `stroke-dashoffset`, dan durasi 2,8 dtk. Hanya warna dan komposisi sekitarnya yang berubah.

## Perubahan fungsional
- `site.js` bagian 4 (`fetch()` untuk kartu "terbaru") dihapus agar jalan lewat `file://`. Kartu Proyek/Artikel Terbaru di `index.html` kini ditulis langsung; perbarui manual saat ada postingan baru.
- Daftar proyek/artikel (pencarian + nomor halaman, maks. 10 per halaman) tetap memakai `site.js` bagian 5. Untuk menambah postingan, salin satu blok `<article data-post>` ke paling atas `proyek.html` / `artikel.html`; siap menampung 15 artikel.
- Kata "gratis" pada tombol/teks konsultasi dihapus karena belum ada dukungan sumber yang dapat dipastikan. Kembalikan bila memang berlaku.
- Judul `proyek.html` diubah dari "Ruang hijau yang telah kami wujudkan." menjadi "Proyek" karena isinya masih data demonstrasi.

## Data contoh (BUKAN data nyata)
- `proyek-1..3.html` dan `artikel-1..3.html`: konten demonstrasi dari sumber. Ditandai label "Contoh", diberi `noindex`, dan tidak masuk `sitemap.xml`. Hapus `noindex` saat diganti konten asli.
- Seluruh foto adalah stok Unsplash (placeholder), ditandai di halaman. Belum ada foto, logo, atau aset milik Tata Teduhmu.
- Paragraf Sejarah/Pengelola, "Alur Kerja", dan bidang karir bersifat umum dan masih perlu dikonfirmasi.

## Keterbatasan
- Foto (Unsplash) dan font (Google Fonts) butuh internet. Offline, font memakai cadangan sistem dan foto tampil sebagai kotak kosong dengan rasio tetap (layout tidak bergeser).
- Form kontak membuka WhatsApp (`wa.me/6285156205650`) dengan pesan yang sudah tersusun.

## SEO yang disiapkan
`<title>` dan meta description per halaman, canonical (asumsi domain `https://tatateduhmu.github.io/Home/`), Open Graph dasar, `lang="id"`, satu `<h1>` per halaman, JSON-LD (`LocalBusiness` memakai alamat/telepon/email/sosial dari sumber, `BreadcrumbList`, `CollectionPage`, `Article`), `sitemap.xml`, `robots.txt`, `favicon.svg`, atribut `width`/`height` pada gambar.
Belum ada: `og:image` (belum ada aset gambar milik brand) dan data jam buka/koordinat/harga (tidak ada di sumber, tidak dikarang). Tidak ada klaim ranking, traffic, atau status indeks.

## Struktur
`index.html`, `layanan.html`, `tentang.html`, `prinsip.html`, `proyek.html` + `proyek-1..3.html`, `artikel.html` + `artikel-1..3.html`, `galeri.html`, `kontak.html`, `karir.html`, `style.css`, `site.js`, `carousel.js`, `sitemap.xml`, `robots.txt`, `favicon.svg`.
