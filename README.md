# Student Management REST API

## 1. Nama Aplikasi

**Student Management REST API**

---

## 2. Deskripsi Aplikasi

Student Management REST API adalah aplikasi untuk mengelola data siswa menggunakan REST API.

Aplikasi ini terdiri dari backend dan frontend. Backend digunakan untuk menyediakan REST API yang terhubung dengan database, sedangkan frontend digunakan sebagai tampilan untuk menampilkan dan mengelola data siswa.

Fitur utama aplikasi meliputi menampilkan, menambahkan, mengubah, dan menghapus data siswa.

---

## 3. Teknologi yang Digunakan

Teknologi yang digunakan dalam aplikasi ini adalah:

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MySQL
- Bootstrap
- Postman
- Git dan GitHub
- Visual Studio Code

---

## 4. Cara Menjalankan Backend

1. Buka project menggunakan Visual Studio Code.

2. Buka terminal pada folder project.

3. Install seluruh dependency dengan perintah:

```bash
npm install

4. pastikan konfigurasi database sudah sesuai pada:
    config/database.js

5. jalankan backend dengan perintah:
    node server.js

6. backend berjalan pada:
    https://localhost:3000

## 5. Cara Menjalankan Frontend

frontend terdapat pada folder:
frontend/

file utama frontend adalah;
frontend/index.html

untuk menjalankan frontend:
1. buka file frontend/index.html menggunkaan Visual Studio Code.
2. jalankan menggunakan ekstensi Live Server
3. browser akan membuka halaman aplikasi.
4. frontend akan mengambil dan mengirim data melalui REST API pada backend.

---

## 6. Daftar Endpoint API
    Siswa
Method       Endpoint        Fungsi
GET          /siswa          Menampilkan seluruh data siswa
GET          /siswa/:id      Menampilkan data siswa berdasarkan ID
POST         /siswa          Menambahkan data siswa
PUT          /siswa/:id      Mengubah data siswa berdasarkan ID
DELETE       /siswa/:id      Menghapus data siswa berdasarkan ID

    Data Siswa
Data siswa yang digunakan dalam aplikasi terdiri dari:
- NIS
- Nama
- Kelas
- Jurusan
- Alamat

Pengujian endpoint API dilakukan menggunakan Postman.
---

## 7. Screenshot Aplikasi 
Tampilan Aplikasi
Masukkan screenshot halaman utama aplikasi di sini.
![tampilan aplikasi](c:\Users\User\Pictures\Screenshots\Screenshot (46).png)
![tampilan aplikasi](c:\Users\User\Pictures\Screenshots\Screenshot (45).png)

Pengujian REST API
Masukkan screenshot pengujian API menggunakan Postman di sini.
![pengujian API](c:\Users\User\Pictures\Screenshots\Screenshot (40).png)
![pengujian API](c:\Users\User\Pictures\Screenshots\Screenshot (41).png)
![pengujian API](c:\Users\User\Pictures\Screenshots\Screenshot (42).png)
![pengujian API](c:\Users\User\Pictures\Screenshots\Screenshot (43).png)
![pengujian API](c:\Users\User\Pictures\Screenshots\Screenshot (44).png)

---

## 8. Identitas Pembuat
Nama: Siti Nur Kholisha
Kelas: XII RPL
Jurusan: Rekayasa Perangkat Lunak
Sekolah: SMK Bina Putra Mandiri
---