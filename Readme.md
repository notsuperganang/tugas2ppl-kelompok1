# 🎬 MovieBase - Simple Movie Manager

MovieBase adalah aplikasi berbasis CLI sederhana yang memungkinkan pengguna untuk mengelola daftar film mereka dengan mudah. Dengan menggunakan database berbasis JSON, pengguna dapat menambahkan, melihat, mencari, memperbarui, dan menghapus film dalam daftar mereka. 

## ✨ Fitur Utama
- 📌 **Melihat daftar film** yang telah ditambahkan.
- ➕ **Menambahkan film** baru dengan informasi judul, tahun rilis, dan rating.
- 🔍 **Mencari film** berdasarkan kata kunci dalam judul.
- 📝 **Melihat detail film** tertentu dalam daftar.
- ✏️ **Memperbarui informasi film** yang sudah ada.
- ❌ **Menghapus film** dari daftar.
- 📊 **Menampilkan statistik database**, seperti jumlah total film dan rata-rata rating.

## 🚀 Cara Menjalankan
### 1️⃣ Persyaratan
Pastikan Anda telah menginstal **Node.js** di sistem Anda.

### 2️⃣ Clone Repository
```sh
git clone https://github.com/username/moviebase.git
cd moviebase
```

### 3️⃣ Install Dependencies
Aplikasi ini tidak memerlukan dependensi tambahan.

### 4️⃣ Jalankan Program
```sh
node index.js
```

## 📚 Cara Penggunaan
Setelah program dijalankan, Anda akan melihat menu interaktif seperti berikut:
```
1. View movies
2. Add movie
3. View details
4. Update movie
5. Delete movie
6. Search movies
7. Show statistics
8. Exit
```
Masukkan angka sesuai opsi yang ingin dipilih.

### 🔧 Contoh Penggunaan
#### 🟢 Menambahkan Film
1. Pilih opsi `2. Add movie`.
2. Masukkan **judul film**, **tahun rilis**, dan **rating**.
3. Film akan tersimpan dalam database.

#### 🔍 Mencari Film
1. Pilih opsi `6. Search movies`.
2. Masukkan kata kunci untuk mencari judul film.
3. Program akan menampilkan daftar film yang sesuai dengan kata kunci tersebut.

#### 📊 Menampilkan Statistik
1. Pilih opsi `7. Show statistics`.
2. Program akan menampilkan jumlah total film dalam database dan rata-rata rating film yang tersimpan.

## 🛠 Teknologi yang Digunakan
- **Node.js** - Runtime JavaScript untuk backend.
- **JSON** - Sebagai database sederhana untuk menyimpan daftar film.
- **Readline** - Modul untuk interaksi berbasis CLI.

## 📌 Struktur Proyek
```
/moviebase
│── database.json  # Database film dalam format JSON
│── index.js       # File utama yang menjalankan aplikasi
│── README.md      # Dokumentasi proyek ini
```

## 📄 Lisensi
Proyek ini menggunakan lisensi **MIT**. Silakan gunakan, modifikasi, dan distribusikan dengan bebas.

🚀 Selamat menggunakan MovieBase! Nikmati pengalaman mengelola daftar film Anda dengan mudah! 🍿
