# Professional Portfolio - Jalolxojayev Yusufxon

A modern, animated portfolio website with CMS admin panel built with React, Vite, Supabase, and Framer Motion.

**Mobile Developer Portfolio** - Flutter, Dart

## 🎯 Features

✨ Professional animations with Framer Motion  
🎨 Modern gradient designs  
📱 Fully responsive design  
🚀 Fast performance with Vite  
💼 Dynamic portfolio showcase  
📝 Blog system  
🔐 **Admin Panel** (CMS)  
📧 Contact form with Web3Forms  
🎯 Smooth scrolling navigation  
🗄️ Supabase backend (PostgreSQL + Storage)  

## 🛠️ Technologies Used

- **Frontend**: React 19, Vite 6
- **Backend**: Supabase (PostgreSQL + Storage + Auth)
- **UI**: Material-UI, Framer Motion, React Icons
- **Routing**: React Router DOM v7
- **Notifications**: Sonner (toast)
- **Forms**: Web3Forms

## 📦 Installation

```bash
# Dependencies o'rnatish
npm install
```

## ⚙️ Environment Setup

`.env` faylini yarating va quyidagi qiymatlarni kiriting:

```env
# Supabase
VITE_SUPABASE_URL=https://satnznlieuctrrttavjh.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Web3Forms (contact form)
VITE_WEB3FORMS_KEY=your_web3forms_key

# Site URL (production domain)
VITE_SITE_URL=https://yourwebsite.com
```

## 🗄️ Database Setup

1. [Supabase Dashboard](https://app.supabase.com)ga kiring
2. **SQL Editor** bo'limini oching
3. `supabase/SETUP_ALL.sql` faylidagi barcha SQL kodni nusxalang
4. SQL editorga joylab **Run** bosing

Bu quyidagilarni yaratadi:
- `projects` jadvali (loyihalar)
- `blogs` jadvali (blog postlar)
- `site_content` jadvali (sayt kontenti)
- `project-images` storage bucket
- RLS (Row Level Security) policies

## 🚀 Development

```bash
npm run dev
```

Server http://localhost:5173 da ishga tushadi.

## 👨‍💻 Admin Panel

### Admin Panelga kirish:

**URL:** http://localhost:5173/admin

**Login ma'lumotlari:**
- Login: `admin`
- Parol: `yusufxon2005`

### Admin Panel imkoniyatlari:

1. **Dashboard** - Umumiy statistika
2. **Kontent** - Sayt matnlarini tahrirlash (Hero, About, Experience, Skills, Education)
3. **Loyihalar** - Loyihalar qo'shish/tahrirlash/o'chirish
   - Rasm yuklash (cover + gallery)
   - YouTube video qo'shish
   - Kategoriyalar boshqaruvi
   - Sotuvga qo'yish (for sale)
4. **Blog** - Blog postlar boshqaruvi
   - Rasm yuklash
   - Draft/Published status
   - Tashqi link (Medium, Dev.to)

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── navbar/
│   │   ├── footer/
│   │   ├── contact/
│   │   ├── seo/
│   │   └── ui/
│   ├── pages/
│   │   ├── home/
│   │   ├── admin/          # 🔐 Admin Panel
│   │   ├── project/
│   │   └── blog/
│   ├── lib/
│   │   ├── supabase.js     # Supabase client
│   │   ├── projects.js     # Projects CRUD
│   │   ├── blogs.js        # Blogs CRUD
│   │   ├── siteContent.js  # Site content management
│   │   ├── uploadImage.js  # Image upload
│   │   └── constants.js    # Config
│   ├── i18n/               # Tarjimalar (UZ/RU/EN)
│   └── theme/              # Dark/Light theme
├── supabase/               # SQL migration files
└── public/                 # Static assets
```

## 🏗️ Build

```bash
npm run build
```

Build fayllar `dist/` papkasida yaratiladi.

## 👀 Preview Production Build

```bash
npm run preview
```

## 🎨 Animations

Portfolio professional animatsiyalarni o'z ichiga oladi:
- Fade in/out effects
- Slide animations  
- Hover effects
- Gradient animations
- Floating elements
- Ripple effects
- Smooth transitions

## 🔒 Security Notes

- Admin panel RLS (Row Level Security) bilan himoyalangan
- Image upload maksimal hajm: 2.5MB
- CORS sozlamalari production uchun sozlangan
- `.env` faylini git ga commit qilmang!

## 📝 To-Do / Improvements

- [ ] Markdown editor for blog content
- [ ] Image optimization pipeline
- [ ] SEO analyzer dashboard
- [ ] Analytics integration
- [ ] Multi-language admin panel
- [ ] Batch operations (delete multiple)

## 🚀 Deployment

### Vercel (Recommended)

1. GitHub repo yarating va push qiling
2. [Vercel](https://vercel.com)da import qiling
3. Environment Variables qo'shing:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WEB3FORMS_KEY`
   - `VITE_SITE_URL`
4. Deploy!

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Environment variables yuqoridagi kabi qo'shing

## 📄 License

© 2025 Jalolxojayev Yusufxon. All rights reserved.

## 👤 Contact

- **Email**: yusufxonjalolxojayev95@gmail.com
- **GitHub**: [@Yusufkhan05](https://github.com/Yusufkhan05)
- **Telegram**: [@yusufxonjalolxojayev](https://t.me/yusufxonjalolxojayev)
- **Phone**: +998 93 954 25 24

---

Built with ❤️ by Jalolxojayev Yusufxon - Mobile Developer
