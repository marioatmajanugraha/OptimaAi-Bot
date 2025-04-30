# OptimaAI-Bot 🚀

Script ini dirancang untuk mengotomatiskan pengambilan statistik dan hadiah node operator pada platform Optima AI menggunakan token dari `tokens.txt`.

---

## 📌 Fitur

- ✅ Mengambil statistik dashboard (rewards, tasks, uptime, dll.) secara otomatis  
- 💰 Mengambil data hadiah node operator (data requests, uptime hours)  
- 🔌 Dukungan proxy (`proxy.txt`) untuk koneksi aman  
- 🍪 Dukungan cookie (`cookies.txt`) untuk autentikasi tambahan  
- 🔄 Loop otomatis dengan delay antar siklus dan token untuk stabilitas  
- 🛡️ Rotasi User-Agent acak untuk menghindari deteksi  
- 🎨 Tampilan CLI yang menarik dengan `cfonts` dan `chalk`  
- 🛑 Penghentian graceful saat menerima SIGINT (Ctrl+C)  

---

## 🚀 Cara Penggunaan

### 1. Clone repository ini

```bash
git clone https://github.com/marioatmajanugraha/OptimaAi-Bot.git
cd OptimaAi-Bot
```

### 2. Install Dependencies

```bash
npm install axios chalk cfonts http-proxy-agent https-proxy-agent socks-proxy-agent readline-sync uuid
```

### 3. Siapkan file konfigurasi

#### - Buat `tokens.txt` dan isi dengan token akses, satu token per baris. Contoh:

```
eyJ..
euyJlks...
```

#### - (Opsional) Buat `cookies.txt` jika diperlukan. Contoh:

```
session_id=abc123
session_id=xyz789
```

#### - (Opsional) Buat `proxy.txt` jika ingin menggunakan proxy. Contoh:

```
http://username:password@host:port
socks5://username:password@host:port
```

---

### 4. Jalankan Script

```bash
node index.js
```

---

### 5. Ikuti Instruksi

- Jawab prompt apakah ingin menggunakan proxy (y/n)  
- Script akan berjalan otomatis, mengambil stats dan rewards untuk setiap token  
- Tekan Ctrl+C untuk menghentikan script secara graceful  

---

## ⚠️ Disclaimer

Gunakan script ini dengan bijak dan sesuai aturan platform Optima AI.  
Developer tidak bertanggung jawab atas penyalahgunaan atau banned akun.

---

## 🤝 Kontribusi

Jika ingin berkontribusi, silakan fork repo ini dan ajukan pull request!  
Kami terbuka untuk ide baru dan perbaikan.

---

## 📞 Kontak

Jika ada pertanyaan, hubungi: [@balveerxyz](https://t.me/balveerxyz)  
Join channel Telegram gratis: [t.me/airdroplocked](https://t.me/airdroplocked)
