# Deploy ke Vercel — langkah demi langkah

Tujuan: landing portofolio online + GA4 mencatat setiap klik penting.

---

## A. Yang sudah / bisa dikerjakan otomatis di repo

Sudah disiapkan di project ini:

- [x] Aplikasi Next.js (App Router) + TypeScript + Tailwind
- [x] Landing page dengan data Geraldin Gysrawa
- [x] Route CMS `/dashboard` (tanpa login)
- [x] Integrasi GA4 lewat `@next/third-parties`
- [x] Tracking klik ke GA4 + log lokal di dashboard
- [x] `.gitignore` (env lokal tidak ikut commit)
- [x] `.env.example` sebagai template
- [x] `vercel.json` dasar
- [x] Foto profil di `public/foto-profile.png`

Yang masih bisa aku bantu di chat (kalau kamu minta):

- [ ] Commit perubahan ke git
- [ ] Push ke GitHub
- [ ] `vercel` CLI deploy (butuh login akunmu)
- [ ] Perbaikan bug / penyesuaian desain / tambah login nanti

---

## B. Yang harus kamu lakukan sendiri

### 1) Buat property Google Analytics 4

1. Buka https://analytics.google.com
2. Admin → Create → Property (atau pakai property yang sudah ada)
3. Buat **Web stream** dengan URL site kamu (bisa diisi dulu `http://localhost:3000`)
4. Salin **Measurement ID** (`G-XXXXXXXXXX`)

### 2) Isi environment lokal

Edit `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Lalu:

```bash
npm run dev
```

Uji klik di landing, lalu buka `/dashboard` → tab Analytics. Event harus muncul di log lokal. Di GA4, cek **Realtime** (kadang butuh 1–2 menit).

### 3) Siapkan GitHub (jika belum)

Di folder project:

```bash
git add .
git commit -m "Initial portfolio with GA4 dashboard"
```

Buat repo kosong di GitHub, lalu:

```bash
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

> Kalau kamu minta, aku bisa buatkan commit-nya. Push/remote tetap butuh akun & akses GitHub-mu.

### 4) Deploy di Vercel

1. Login https://vercel.com dengan akun GitHub
2. **Add New Project** → import repo ini
3. Framework: Next.js (otomatis terdeteksi)
4. Di **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
   - `NEXT_PUBLIC_SITE_URL` = `https://nama-project.vercel.app` (atau domain custom)
5. Klik **Deploy**
6. Setelah live, update juga **Web stream URL** di GA4 ke URL Vercel

### 5) Verifikasi setelah deploy

1. Buka site Vercel
2. Klik beberapa CTA / menu
3. Buka `/dashboard` → pastikan log klik terisi
4. Di GA4 Realtime, pastikan event masuk (`cta_click`, `nav_click`, `project_click`, …)
5. Di detail event, cek parameter `event_label` untuk membedakan tombol

---

## Catatan penting CMS

- Simpan di dashboard memakai **localStorage browser** (cepat, tanpa login/database).
- Untuk konten permanen di production: **Ekspor JSON** dari dashboard → ganti `src/data/content.json` → commit & redeploy.
- Login/auth belum ada (sesuai request). Bisa ditambahkan nanti.

---

## Troubleshooting GA4

| Gejala | Cek |
| --- | --- |
| Log lokal ada, GA4 kosong | Measurement ID salah / belum di-set di Vercel env |
| GA4 & lokal kosong | Hard refresh; pastikan klik memakai tombol tracked |
| Realtime lambat | Tunggu 1–2 menit; matikan adblock untuk domain analytics |
| Build gagal di Vercel | Pastikan `npm run build` lolos lokal |

Extension berguna: **Google Analytics Debugger** / cek Network request ke `google-analytics.com` / `gtag`.
