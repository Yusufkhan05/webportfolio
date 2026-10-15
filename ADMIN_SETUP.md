# 🔐 Admin Panel - To'liq Sozlash Yo'riqnomasi

## 📋 Tezkor Boshlash

### 1️⃣ Environment o'rnatish

`.env` faylini yarating:

```env
VITE_SUPABASE_URL=https://satnznlieuctrrttavjh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhdG56bmxpZXVjdHJydHRhdmpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3ODk0MDQsImV4cCI6MjEwNzM2NTQwNH0.EDYx5_9Zz5mc3BiSyTEkyK4pFKWRTboqXbP4naSBU9g
VITE_WEB3FORMS_KEY=bfd7231f-54f0-4183-a53b-8d992f43ae37
VITE_SITE_URL=https://yourwebsite.com
```

### 2️⃣ Database Setup (Supabase)

1. **Supabase Dashboard ochish:**
   - https://app.supabase.com ga kiring
   - Proyektingizni tanlang: `satnznlieuctrrttavjh`

2. **SQL ishga tushirish:**
   - **SQL Editor** bo'limiga o'ting (chap menu)
   - Yangi query oching
   - `supabase/SETUP_ALL.sql` faylidagi **BARCHA** kodni nusxalang
   - Paste qilib **RUN** bosing

   ✅ Bu quyidagilarni yaratadi:
   - `projects` - Loyihalar jadvali
   - `blogs` - Blog postlar jadvali  
   - `site_content` - Sayt kontent jadvali
   - `project-images` - Storage bucket
   - RLS policies (anon user uchun read/write)

3. **Tasdiqlash:**
   - **Table Editor** ga o'ting
   - `projects`, `blogs`, `site_content` jadvallar paydo bo'lganini tekshiring
   - **Storage** → `project-images` bucket borligini ko'ring

### 3️⃣ Dependencies o'rnatish

```bash
npm install
```

### 4️⃣ Development server ishga tushirish

```bash
npm run dev
```

Server: http://localhost:5173

---

## 🔑 Admin Panelga Kirish

### URL:
```
http://localhost:5173/admin
```

### Login ma'lumotlari:
```
Login: admin
Parol: yusufxon2005
```

**Eslatma:** Bu login/parol `src/lib/constants.js` da sozlangan. Production uchun o'zgartiring!

---

## 📂 Admin Panel Bo'limlari

### 1. Dashboard (Bosh sahifa)

**Ko'rsatkichlar:**
- Jami loyihalar soni
- Sotuvdagi loyihalar
- Jami bloglar
- Kategoriyalar soni

**Tezkor harakatlar:**
- Kontent tahrirlash
- Yangi loyiha qo'shish
- Yangi blog qo'shish

### 2. Kontent (Site Content Editor)

Sayt matnlarini tahrirlash - Supabase `site_content` jadvalida saqlanadi.

**Bo'limlar:**

#### Profile
- Ism
- Initsial (avatar)
- Rol (kartochka osti)
- Teglar (Farg'ona, O'zbekiston, Mavjud)

#### Hero (Bosh sahifa yuqori qism)
- Badge matn
- Lavozim
- Qisqa tavsif
- Tugma matnlari
- Statistikalar (yil tajriba, loyihalar, GPA)

#### About (Men haqimda)
- Badge
- Sarlavha
- 1-paragraf
- 2-paragraf
- Available status

#### Experience (Ish tajribasi)
- Lavozim
- Davr (2023 - hozir)
- Kompaniya
- Bandlar (bullet points)
- ➕ Qo'shish / 🗑️ O'chirish

#### Skills (Ko'nikmalar)
- Guruh nomi (Frontend, Backend, Tools)
- Elementlar vergul bilan (React, TypeScript, Node.js)
- ➕ Guruh qo'shish / 🗑️ O'chirish

#### Education (Ta'lim)
- Joy / OTM nomi
- Daraja / kurs
- Davr
- Meta (GPA, joy)
- ➕ Qo'shish / 🗑️ O'chirish

#### Portfolio Meta
- Badge
- Sarlavha
- Lead matn (Intro)

#### Contact Meta
- Badge  
- Sarlavha
- Lead matn

**Saqlash:**
- **Local mode**: Supabase ulanmasa localStorage ga saqlanadi
- **Remote mode**: Supabase `site_content` jadvaliga yoziladi
- Har bir bo'limni alohida saqlash mumkin

---

### 3. Loyihalar (Projects)

#### Yangi loyiha qo'shish

**Majburiy maydonlar:**
- ✅ **Nom** - Loyiha nomi

**Ixtiyoriy maydonlar:**
- **Slug** - URL uchun (avtomatik yaratiladi)
- **Kategoriya** - featured, react, static, api (custom ham qo'shish mumkin)
- **Tartib** - Saytda ko'rinish tartibi (0 = eng yuqori)
- **Qisqa tavsif** - Kartochkada ko'rinadi
- **To'liq tavsif** - Detail sahifada ko'rinadi
- **Tech** - Texnologiyalar (vergul bilan: React, TypeScript, Vite)
- **GitHub** - Repository link
- **Live demo** - Jonli sayt linki
- **YouTube** - Video link (avtomatik embed)
- **Narx** - Sotuvdagi narx ($299 yoki 3 000 000 so'm)
- **For sale** - Checkbox (sotuvda yoki yo'q)

#### Rasm yuklash

**Asosiy rasm (Cover):**
- Format: JPG, PNG, WebP, GIF
- Maksimal hajm: 2.5MB
- Avtomatik gallery ga ham qo'shiladi

**Gallery rasmlar:**
- Bir nechta rasm tanlab yuklash mumkin
- Har bir rasm `project-images` bucketga yuklanadi
- ❌ tugmasi bilan o'chirish

**Rasm yuklash mexanizmi:**
1. Local file tanlanadi → preview ko'rsatiladi
2. Supabase Storage ga yuklanadi (`project-images` bucket)
3. Public URL olinadi
4. DB ga URL saqlanadi
5. Agar Storage ishlamasa → base64 fallback

#### Kategoriyalar boshqaruvi

**Custom kategoriya qo'shish:**
1. Yangi kategoriya nomini yozing
2. "Qo'shish" tugmasini bosing
3. Yangi kategoriya dropdown ga qo'shiladi

**Kategoriya o'chirish:**
- ❌ tugmasi bilan o'chirish
- Agar kategoriyada loyiha bo'lsa → boshqa kategoriyaga ko'chiriladi
- Kamida 1 ta kategoriya qolishi kerak

**Kategoriya storage:**
- LocalStorage da saqlanadi (`portfolio_project_categories`)
- Default: featured, startup, static
- O'chirilgan defaultlar qayta tiklanmaydi

#### Loyihalarni tahrirlash

1. Loyiha ro'yxatidan **Edit** bosing
2. Forma ma'lumotlar bilan to'ldiriladi
3. O'zgartirishlar kiriting
4. **Saqlash** bosing

#### Loyihani o'chirish

1. **Del** tugmasini bosing
2. Tasdiqlash oynasi chiqadi
3. **OK** bosing

---

### 4. Blog

#### Yangi blog post qo'shish

**Majburiy maydonlar:**
- ✅ **Sarlavha** - Blog post sarlavhasi

**Ixtiyoriy maydonlar:**
- **Slug** - URL (avtomatik yaratiladi)
- **Tartib** - Ko'rinish tartibi
- **Excerpt** - Qisqa matn (kartochkada)
- **Content** - To'liq matn (paragraflar bo'sh qator bilan)
- **Rasm** - Cover image (2.5MB max)
- **Tashqi link** - Medium, Dev.to yoki boshqa link
- **Published** - Checkbox (saytda ko'rinsinmi)

#### Blog rasm yuklash

- Format: JPG, PNG, WebP, GIF
- Maksimal: 2.5MB
- `project-images/blog/` papkaga saqlanadi
- Preview + o'chirish imkoniyati

#### Blog tahrirlash/o'chirish

- **Edit** - Ma'lumotlarni tahrirlash
- **Del** - Blogni o'chirish (tasdiq kerak)

---

## 🛠️ Texnik Ma'lumotlar

### Authentication

**Local admin mode:**
- Login/parol browser sessionStorage da saqlanadi
- Supabase session ixtiyoriy
- Rate limit bo'lsa ham ishlaydi

**Supabase Auth:**
- signInWithPassword (email/password)
- Session avtomatik yangilanadi
- Logout = Supabase session + localStorage tozalash

### Row Level Security (RLS)

**Policies (anon user):**
```sql
-- Read: hammaga ruxsat
allow SELECT to anon, authenticated

-- Write: anon user ham yoza oladi (admin panel uchun)
allow INSERT, UPDATE, DELETE to anon, authenticated
```

**Xavfsizlik:**
- Admin panel frontend da login tekshiriladi
- Production: RLS ni qaytarish kerak (faqat authenticated)
- Yoki: API key orqali admin role tekshirish

### Storage Bucket

**Bucket nomi:** `project-images`

**Public:** ✅ (rasmlar hammaga ochiq)

**Policies:**
```sql
-- Read public
SELECT to anon, authenticated

-- Write anon (admin panel)
INSERT, UPDATE, DELETE to anon, authenticated
```

**Upload mexanizmi:**
1. File tanlanadi
2. Extension olinadi (jpg, png, webp, gif)
3. Path: `folder/timestamp-random.ext`
4. Supabase storage upload
5. Public URL qaytariladi

### Error Handling

**Network errors:**
- Xabar: "Supabase ulanmadi. Vercelda env o'zgargach Redeploy qiling."
- LocalStorage fallback ishlaydi

**Table missing (PGRST205, 42P01):**
- Xabar: "Jadval yo'q. SQL: SETUP_ALL.sql ni Run qiling."
- Banner ko'rsatiladi

**Column missing:**
- Legacy schema bilan retry
- Xabar: "Yangilandi (eski schema). projects_detail_columns.sql kerak."

---

## 🔧 Troubleshooting

### ❌ "Supabase sozlanmagan"

**Sabab:** `.env` da URL yoki KEY yo'q

**Yechim:**
1. `.env` faylini tekshiring
2. `VITE_SUPABASE_URL` va `VITE_SUPABASE_ANON_KEY` to'g'riligini ko'ring
3. Dev server qayta ishga tushiring (`npm run dev`)

### ❌ "Jadval yo'q"

**Sabab:** SQL migration ishga tushmagan

**Yechim:**
1. Supabase Dashboard → SQL Editor
2. `supabase/SETUP_ALL.sql` ni Run qiling
3. Table Editor da jadvallarni tekshiring

### ❌ "Rasm yuklash xatosi"

**Sabab:** Storage bucket yo'q yoki RLS bloklayapti

**Yechim:**
1. SQL da bucket yaratilganini tekshiring
2. Storage policies borligini ko'ring
3. Agar SQL to'g'ri bo'lsa → base64 fallback ishlaydi

### ❌ "Rate limit exceeded"

**Sabab:** Supabase auth limit (dev mode)

**Yechim:**
- Local admin session ishlaydi (admin panel ochiladi)
- Supabase session ixtiyoriy
- SQL: `fix_rls_anon_write.sql` (anon policy)

### ❌ "Column does not exist"

**Sabab:** Yangi ustunlar qo'shilmagan (eski schema)

**Yechim:**
1. SQL Editor da `supabase/projects_detail_columns.sql` ni Run qiling
2. Legacy mode ishlaydi, lekin detail maydonlar yo'q

---

## 📝 Production Sozlamalari

### Vercel Deployment

**1. Environment Variables:**
```
VITE_SUPABASE_URL=https://satnznlieuctrrttavjh.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_WEB3FORMS_KEY=your_key
VITE_SITE_URL=https://yourwebsite.com
VITE_ADMIN_EMAIL=admin@yourdomain.com
```

**2. Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**3. Redeploy:**
- Env o'zgargach "Redeploy" qiling
- "Clear Build Cache" kerak bo'lishi mumkin

### Admin Login o'zgartirish

`src/lib/constants.js`:

```js
export const ADMIN_LOGIN = "your_username";
export const ADMIN_PASSWORD = "your_secure_password";
export const ADMIN_AUTH_EMAIL = "admin@yourdomain.com";
```

**Xavfsizlik:**
- Production da strong password ishlating
- Environment variable ga o'tkazing
- 2FA qo'shing (Supabase native support)

---

## 🎯 Best Practices

### Rasm yuklash

- ✅ WebP format (kichik hajm)
- ✅ 1200x630px optimal (og:image)
- ✅ Siqish: TinyPNG, Squoosh
- ✅ Gallery: 3-5 rasm yetarli

### Content yozish

- ✅ Qisqa tavsif: 120-160 belgi
- ✅ To'liq tavsif: 300-500 so'z
- ✅ Paragraflar bo'sh qator bilan
- ✅ Markdown qo'llab-quvvatlanmaydi (keyingi versiya)

### SEO

- ✅ Slug: kebab-case (my-awesome-project)
- ✅ Sarlavha: 50-60 belgi
- ✅ Excerpt: 150-160 belgi (meta description)
- ✅ Alt text: rasmga tavsif qo'shing (keyingi versiya)

### Performance

- ✅ Rasm siqing (2.5MB max → 200-300KB optimal)
- ✅ Gallery: 5 dan ko'p rasm yuklamang
- ✅ Content: 2000 so'zdan oshmasin

---

## 🚀 Keyingi Yangilanishlar

- [ ] **Markdown editor** - Rich text for blog
- [ ] **Image alt text** - SEO uchun
- [ ] **Batch operations** - Ko'plab loyiha/blog o'chirish
- [ ] **Categories manager** - Alohida sahifa
- [ ] **Analytics dashboard** - View count, click tracking
- [ ] **User roles** - Viewer, Editor, Admin
- [ ] **Draft preview** - Publish qilmasdan ko'rish
- [ ] **Revision history** - O'zgarishlar tarixi
- [ ] **Bulk image upload** - Drag & drop
- [ ] **Image cropper** - Inline editing

---

## 📞 Yordam

Muammo yoki savol bo'lsa:

- **Telegram**: [@yusufxonjalolxojayev](https://t.me/yusufxonjalolxojayev)
- **Email**: yusufxonjalolxojayev95@gmail.com
- **Phone**: +998 93 954 25 24
- **GitHub Issues**: [Create Issue](https://github.com/Yusufkhan05/portfolio)

---

**Good luck! 🎉**
