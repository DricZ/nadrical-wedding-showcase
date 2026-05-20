#!/bin/bash

echo "🚀 Memulai Deployment React Showcase..."

# 1. Tarik pembaruan terbaru dari repository (pastikan branch-nya benar, misal 'main' atau 'master')
echo "📦 Pulling dari Git..."
git pull origin main

# 2. Install dependensi baru (jika ada) via bun
echo "🛠️ Menginstal dependencies dengan Bun..."
bun i

# 3. Build project React
echo "🏗️ Membangun project (Build)..."
bun run build

# 4. Copy hasil build ke folder public WordPress
echo "📂 Menyalin file dist ke wedding-wp-core..."
cp -r dist/* /www/wwwroot/wedding-wp-core/

# 5. Fix ownership agar OpenLiteSpeed tidak Error 403
echo "🔐 Memperbaiki hak akses file..."
chown -R www:www /www/wwwroot/wedding-wp-core

echo "✅ Deployment Selesai! Showcase sudah terupdate."