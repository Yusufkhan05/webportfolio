#!/usr/bin/env node

/**
 * Environment o'rnatish tekshiruvi
 * Terminal: node check-env.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Environment tekshirilmoqda...\n');

// .env faylini o'qish
let envContent = '';
try {
  envContent = readFileSync(join(__dirname, '.env'), 'utf-8');
} catch (err) {
  console.error('❌ .env fayli topilmadi!');
  console.log('\n📝 Yechim:');
  console.log('1. .env faylini yarating');
  console.log('2. .env.example dan nusxa oling');
  console.log('3. VITE_SUPABASE_URL va VITE_SUPABASE_ANON_KEY qo\'shing\n');
  process.exit(1);
}

// Kerakli o'zgaruvchilarni tekshirish
const required = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_WEB3FORMS_KEY',
  'VITE_SITE_URL'
];

const envVars = {};
const lines = envContent.split('\n');

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  
  const [key, ...valueParts] = trimmed.split('=');
  const value = valueParts.join('=').trim();
  
  if (key && value) {
    envVars[key] = value;
  }
}

let hasErrors = false;

console.log('📋 Environment Variables:\n');

for (const key of required) {
  const value = envVars[key];
  const exists = Boolean(value);
  const icon = exists ? '✅' : '❌';
  
  console.log(`${icon} ${key}: ${exists ? '(set)' : '(MISSING)'}`);
  
  if (!exists) {
    hasErrors = true;
  } else if (key === 'VITE_SUPABASE_URL') {
    if (!value.startsWith('https://')) {
      console.log('   ⚠️  Warning: URL https:// bilan boshlanishi kerak');
      hasErrors = true;
    }
    if (!value.includes('supabase')) {
      console.log('   ⚠️  Warning: URL "supabase" so\'zini o\'z ichiga olishi kerak');
      hasErrors = true;
    }
  } else if (key === 'VITE_SUPABASE_ANON_KEY') {
    if (value.length < 100) {
      console.log('   ⚠️  Warning: ANON_KEY juda qisqa ko\'rinadi');
      hasErrors = true;
    }
  }
}

console.log('\n');

if (hasErrors) {
  console.log('❌ Environment sozlanmagan!\n');
  console.log('📝 Kerakli qadamlar:');
  console.log('1. Supabase Dashboard ga kiring: https://app.supabase.com');
  console.log('2. Settings → API bo\'limiga o\'ting');
  console.log('3. Project URL va anon public keyni nusxalang');
  console.log('4. .env faylini yangilang');
  console.log('5. Dev server qayta ishga tushiring: npm run dev\n');
  process.exit(1);
} else {
  console.log('✅ Barcha environment variables sozlangan!\n');
  console.log('📊 Keyingi qadamlar:');
  console.log('1. ✅ npm install (dependencies o\'rnatilgan)');
  console.log('2. 🗄️  SQL: supabase/SETUP_ALL.sql ni Run qiling');
  console.log('3. 🚀 npm run dev (server ishga tushirish)');
  console.log('4. 🔐 http://localhost:5173/admin (admin panel)\n');
  console.log('🔑 Admin Login:');
  console.log('   Login: admin');
  console.log('   Parol: yusufxon2005\n');
  console.log('✨ Good luck!\n');
}
