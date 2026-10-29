# CATATAN PAGE & CARA MENGELOLA

Semua file diletakkan **dalam satu folder yang sama** (tidak ada subfolder), lalu diupload ke hosting.

## Daftar file
| File | Fungsi | Dituju dari |
|---|---|---|
| `index.html` | Beranda | logo, menu Beranda |
| `layanan.html` | 3 layanan + alur kerja. Bagian ber-id `perancangan`, `pengadaan`, `pengerjaan` | menu Layanan, baris layanan di beranda, footer |
| `proyek.html` | **Daftar** proyek (pencarian + nomor halaman) | menu Proyek, kartu Proyek Terbaru |
| `proyek-1.html` s/d `proyek-3.html` | **Contoh** halaman detail proyek | kartu di proyek.html |
| `artikel.html` | **Daftar** artikel (pencarian + nomor halaman) | menu Artikel, kartu Artikel Terbaru |
| `artikel-1.html` s/d `artikel-3.html` | **Contoh** halaman detail artikel | kartu di artikel.html |
| `tentang.html` | Profil. Bagian ber-id `sejarah`, `pengelola` | menu Tentang Kami, footer |
| `prinsip.html` | Penjelasan prinsip. id `manusia`, `ruang`, `alam` | tautan "Pelajari prinsip", footer |
| `galeri.html` | Galeri foto (klik untuk memperbesar) | footer |
| `karir.html` | Informasi karir | footer |
| `kontak.html` | Alamat, info kontak, form yang membuka WhatsApp | menu Kontak, tombol Kontak Kami |
| `style.css` | **Seluruh tampilan** (warna ada di bagian `== 1 WARNA`) | semua halaman |
| `site.js` | Perilaku bersama: navbar, animasi, daftar+nomor halaman, galeri, form | semua halaman |
| `carousel.js` | Mekanisme gulir slider testimoni & carousel klien (hanya beranda) | index.html |

Menu **Klien** menuju `index.html#klien` (bagian di beranda), bukan halaman sendiri.
Link sosial: Instagram `@tatateduhmu`, TikTok `@tatateduhmu`, LinkedIn `company/tata-teduhmu`. WhatsApp ke 085156205650 (`wa.me/6285156205650`).

## Menambah proyek / artikel baru
1. Salin salah satu file detail, mis. `proyek-3.html` -> `proyek-4.html`, lalu ganti judul, tanggal, foto, dan isinya.
2. Buka `proyek.html`, salin satu blok `<article data-post class="reveal"> ... </article>`, **tempel di paling atas** (sebelum blok lain), lalu sesuaikan judul, tanggal, foto, ringkasan, dan `href="proyek-4.html"`.
3. Selesai. Nomor halaman dan kartu "Proyek Terbaru" di beranda menyesuaikan otomatis. Untuk artikel caranya sama (`artikel.html`).

## Cara kerja daftar & nomor halaman
- Maksimal **10 postingan per halaman** (`data-per="10"` pada `<div class="post-grid">`; script membatasinya di 10).
- Lebih dari 10: muncul tombol `<- 1 2 3 ... ->` dan teks "Menampilkan 1-10 dari 23". Alamatnya `proyek.html?hal=2`.
- Ada kolom cari (mencari di judul, kategori, dan ringkasan).
- Urutan = urutan di HTML, jadi **yang terbaru harus di atas**.

## Kartu "Proyek Terbaru" & "Artikel Terbaru" di beranda
Setiap beranda dibuka, `site.js` (bagian 4) membaca `proyek.html` / `artikel.html`, mengambil `<article data-post>` **pertama**, lalu memakai foto, judul, ringkasan, dan link-nya. Tombol "Lihat Semua ..." selalu ke halaman daftar. Hanya jalan setelah web ada di hosting (bukan saat file dibuka dari komputer); selama itu, isi cadangan di `index.html` yang tampil.

## Yang masih CONTOH dan perlu kamu ganti dengan data asli
- Seluruh isi 3 proyek (`proyek-1..3`) dan 3 artikel (`artikel-1..3`) adalah **contoh buatan**, bukan proyek nyata.
- `tentang.html`: paragraf Sejarah dan Pengelola masih umum; tambahkan tonggak sejarah dan nama tim.
- `layanan.html`: butir layanan dan "Alur Kerja" adalah gambaran umum; sesuaikan dengan prosesmu.
- `karir.html`: bidang yang dibutuhkan masih contoh.
- Foto di semua halaman masih foto contoh (lihat CATATAN-GAMBAR.md).

## Tempat mengubah hal umum
- Warna: `style.css` bagian `== 1 WARNA` (ada palet alternatif "hijau tenang" dalam komentar).
- Jarak antar section (lega/rapat): variabel `--gap` di `style.css`.
- Menu navbar: `<nav id="nav-links">` di tiap halaman (salin perubahan ke semua halaman).
- Nomor WhatsApp: cari `6285156205650` (di semua halaman + `site.js`).
- Kecepatan slider testimoni & carousel klien: `carousel.js` (komentar di bagian atas).
