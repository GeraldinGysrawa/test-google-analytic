# Portofolio Geraldin Gysrawa

Landing page Next.js + React dengan CMS sederhana di `/dashboard` dan tracking klik Google Analytics 4 (GA4).

## Fitur

- Landing page: hero, tentang saya, pengalaman proyek
- CMS tanpa login di `/dashboard` (tab Konten + Analytics)
- Event klik (`nav_click`, `cta_click`, `project_click`, dll.) dikirim ke GA4
- Log klik lokal di dashboard untuk verifikasi cepat
- Siap deploy ke Vercel

## Menjalankan lokal

```bash
npm install
cp .env.example .env.local
# isi NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
npm run dev
```

Buka:

- Landing: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard

## Melihat analytics per klik

1. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` di `.env.local`
2. Restart `npm run dev`
3. Klik CTA / navigasi / tombol proyek
4. Cek log di `/dashboard` → tab Analytics
5. Cek juga **Google Analytics → Reports → Realtime → Event count**

## Deploy

Lihat panduan lengkap di [DEPLOY.md](./DEPLOY.md).
