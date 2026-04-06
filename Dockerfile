# ---------- Step 1: Build React + Vite ----------
FROM node:22-alpine AS build

WORKDIR /app

# Salin file dependency dulu untuk cache layer lebih efisien
COPY package*.json ./

# Install semua dependency termasuk devDependencies
RUN npm ci

# Salin seluruh source code
COPY . .

# Jalankan proses build
RUN npm run build

# (Opsional) Debug: lihat isi folder dist
RUN ls -lah /app/dist

# ---------- Step 2: Serve hasil build pakai Nginx ----------
FROM nginx:alpine

# Hapus config default Nginx (opsional, kalau kamu mau custom route)
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy hasil build ke direktori Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
