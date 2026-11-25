/* CekLink: bank data kasus simulasi phishing dan aman untuk latihan pelajar. */
// Bank skenario dipisahkan dari logika tampilan agar mudah dibaca dan dikembangkan.
    const scenarios = [
      {
        id:1, title:'Skin & diamond gratis?', channel:'browser', label:'HALAMAN KLAIM HADIAH',
        isPhishing:true, sender:'Event Hadiah Gamer', address:'https://claim-diamond-event2026.xyz/claim',
        xray:[['Protokol','https://','Koneksi terenkripsi, tapi belum tentu situsnya tepercaya.'],['Subdomain','(tidak ada)','Alamat langsung menuju domain utama.'],['Domain utama','claim-diamond-event2026.xyz','Domain promosi tidak resmi; nama event dan tahun dipakai agar tampak meyakinkan.'],['Ekstensi / path','.xyz/claim','Bukan kanal resmi game. HTTPS tidak menjamin situs aman.']],
        headline:'KLAIM 5.000 DIAMOND GRATIS!', body:'Kesempatan terbatas! Hadiah akan hangus dalam:', detail:'00:04:59', fields:['Email akun game','Password akun game'], button:'KLAIM SEKARANG',
        flag:'domain-flag', flagText:'claim-diamond-event2026.xyz',
        reasons:['Domain hadiah tidak menunjukkan kanal resmi penerbit game.','Timer hitung mundur menciptakan rasa panik agar kamu cepat bertindak.','Form meminta password akun. Situs hadiah tidak seharusnya meminta kredensial akunmu.'],
        tip:'Jangan masukkan password lewat tautan hadiah. Buka aplikasi atau situs resmi game secara langsung untuk mengecek promo.'
      },
      {
        id:2, title:'File “cek resi” dari nomor asing', channel:'whatsapp', label:'CHAT WHATSAPP',
        isPhishing:true, sender:'+62 812-••••-4381', address:'Cek_Resi_Paket_Anda.apk',
        xray:[['Pengirim','+62 812-••••-4381','Nomor tak dikenal, bukan kanal resmi kurir yang terverifikasi.'],['Nama file','Cek_Resi_Paket_Anda.apk','Ekstensi .apk adalah aplikasi Android, bukan dokumen resi.'],['Jenis tautan','Lampiran aplikasi','Memasang APK dari chat dapat memberi aplikasi akses berbahaya.']],
        headline:'Paket Anda tertahan!', body:'Saya kurir, paket tidak bisa dikirim karena alamat tidak lengkap. Segera cek resi ya, kalau tidak paket dikembalikan hari ini.', detail:'📎  Cek_Resi_Paket_Anda.apk  ·  1,8 MB', button:'Unduh lampiran',
        flag:'apk-flag', flagText:'Cek_Resi_Paket_Anda.apk',
        reasons:['Kurir tidak perlu mengirim file APK agar kamu bisa melacak paket.','Lampiran .apk adalah aplikasi yang bisa dijalankan di ponsel, bukan bukti pengiriman.','Desakan “hari ini” mendorongmu memasang file tanpa sempat memeriksa.'],
        tip:'Jangan unduh atau pasang APK dari chat. Lacak paket lewat aplikasi atau situs resmi ekspedisi dengan nomor resi.'
      },
      {
        id:3, title:'Peringatan login baru dari Google', channel:'email', label:'KOTAK MASUK EMAIL',
        isPhishing:false, sender:'Google <no-reply@accounts.google.com>', address:'https://myaccount.google.com/notifications',
        xray:[['Pengirim','no-reply@accounts.google.com','Domain pengirim tepat accounts.google.com; tetap periksa konteks pesannya.'],['Protokol','https://','Koneksi HTTPS aktif.'],['Domain utama','myaccount.google.com','Subdomain dari google.com dengan domain utama yang sesuai.'],['Permintaan','Tidak ada password / OTP','Pesan hanya memberi notifikasi dan mengarahkan ke halaman akun.']],
        subject:'Pemberitahuan keamanan: login baru', headline:'Login baru di perangkat Anda', body:'Kami mendeteksi login ke Akun Google Anda dari perangkat baru. Jika ini Anda, tidak perlu melakukan apa pun. Anda dapat meninjau aktivitas keamanan akun.', detail:'Tinjau aktivitas akun →', button:'Lihat aktivitas',
        flag:null,
        reasons:['Alamat pengirim menggunakan domain accounts.google.com yang sesuai.','Tautan menuju myaccount.google.com, masih di domain utama google.com.','Email notifikasi tidak meminta password atau kode OTP melalui balasan.'],
        tip:'Tetap cek alamat tujuan sebelum membuka tautan. Jika ragu, kunjungi halaman akun dengan mengetik alamatnya sendiri.'
      },
      {
        id:4, title:'DM ancaman akun Instagram dihapus', channel:'instagram', label:'SIMULASI DM INSTAGRAM',
        isPhishing:true, sender:'@ig.support_helpcenter26', address:'https://bit.ly/ig-verify-appeal',
        xray:[['Pengirim','@ig.support_helpcenter26','Nama akun yang mengaku dukungan resmi, tetapi bukan bukti identitas resmi.'],['Domain tujuan','bit.ly','Pemendek tautan menyembunyikan alamat tujuan sebenarnya.'],['Path','/ig-verify-appeal','Kata “appeal” dibuat agar terlihat seperti proses banding.']],
        headline:'Pelanggaran Pedoman Komunitas', body:'Akun Anda dilaporkan dan akan dihapus dalam 12 jam. Ajukan banding sekarang untuk menghindari penonaktifan permanen.', detail:'Formulir banding  →', button:'Ajukan banding',
        flag:'ig-handle-flag', flagText:'@ig.support_helpcenter26',
        reasons:['Akun dukungan menggunakan handle tidak resmi yang meniru nama Instagram.','Tautan pendek bit.ly menyamarkan alamat situs yang akan dibuka.','Ancaman penghapusan dalam 12 jam adalah tekanan agar kamu bertindak cepat.'],
        tip:'Jangan isi formulir dari DM. Periksa notifikasi pelanggaran langsung dari aplikasi atau pusat bantuan resmi.'
      },
      {
        id:5, title:'Broadcast bantuan kuota 50GB', channel:'whatsapp-group', label:'GRUP WHATSAPP',
        isPhishing:true, sender:'Grup Kelas 8B · diteruskan berkali-kali', address:'http://kuota-pendidikan-gratis.blogspot.com',
        xray:[['Protokol','http://','Tidak menggunakan HTTPS; koneksi tidak terenkripsi.'],['Domain utama','blogspot.com','Blog gratis umum, bukan domain program pemerintah atau operator.'],['Subdomain','kuota-pendidikan-gratis','Nama dibuat menyerupai program resmi.'],['Permintaan','Bagikan ke 5 grup','Mekanisme sebar-berantai untuk memperluas jangkauan pesan.']],
        headline:'🎁 BANTUAN KUOTA PELAJAR', body:'Klaim kuota internet gratis 50GB untuk pelajar sekarang! Isi data sebelum pendaftaran ditutup.', detail:'http://kuota-pendidikan-gratis.blogspot.com', button:'KLAIM KUOTA',
        flag:'quota-url-flag', flagText:'kuota-pendidikan-gratis.blogspot.com',
        reasons:['Alamat berada di Blogspot, bukan domain resmi sekolah, pemerintah, atau operator.','Tautan memakai HTTP, bukan HTTPS.','Syarat membagikan pesan ke 5 grup adalah pola spam dan penyebaran berantai.'],
        tip:'Periksa pengumuman bantuan lewat situs resmi sekolah, pemerintah, atau operator. Jangan sebarkan pesan sebelum terverifikasi.'
      },
      {
        id:6, title:'Pengumuman portal belajar sekolah', channel:'browser', label:'PORTAL PENGUMUMAN SEKOLAH',
        isPhishing:false, sender:'Portal Pendidikan Sekolah', address:'https://pengumuman.smpn8-kotakita.sch.id/hasil',
        xray:[['Protokol','https://','Koneksi HTTPS aktif dengan ikon gembok.'],['Subdomain','pengumuman','Bagian alamat untuk layanan pengumuman.'],['Domain utama','smpn8-kotakita.sch.id','Akhiran .sch.id digunakan untuk domain sekolah. Pastikan sesuai sekolahmu.'],['Permintaan','NISN saja','Tidak meminta password email pribadi atau kode OTP.']],
        headline:'Pengumuman Hasil Seleksi', body:'Masukkan NISN untuk melihat hasil seleksi kegiatan sekolah. Pastikan NISN yang dimasukkan milikmu.', detail:'NISN:  (contoh) 0091234567', button:'LIHAT PENGUMUMAN',
        flag:null,
        reasons:['Alamat memakai HTTPS dan domain berakhiran .sch.id yang lazim dipakai sekolah.','Pengumuman hanya meminta NISN untuk pencarian hasil, bukan password email atau OTP.','Pastikan nama domain sesuai dengan sekolahmu sebelum memasukkan data apa pun.'],
        tip:'Cek alamat dengan teliti dan konfirmasi ke guru atau sekolah jika belum yakin portalnya resmi.'
      },
      {
        id:7, title:'Email reset password yang tampak rapi', channel:'email', label:'KOTAK MASUK EMAIL',
        isPhishing:true, sender:'Instagram Security <security@instagran-mail.com>', address:'http://192.168.45.12/login',
        xray:[['Pengirim','security@instagran-mail.com','“instagran” salah eja (m diganti n) dan bukan domain resmi Instagram.'],['Protokol','http://','Tidak ada enkripsi HTTPS.'],['Domain tujuan','192.168.45.12','Alamat IP mentah, bukan domain layanan resmi.'],['Path','/login','Halaman login palsu berpotensi mencuri kata sandi.']],
        subject:'Permintaan reset kata sandi Anda', headline:'Reset password akun Anda', body:'Kami menerima permintaan untuk mengatur ulang kata sandi. Jika Anda tidak melakukan ini, amankan akun Anda sekarang.', detail:'http://192.168.45.12/login', button:'Amankan akun',
        flag:'email-sender-flag', flagText:'security@instagran-mail.com',
        reasons:['Domain pengirim salah eja: “instagran-mail.com”, bukan domain Instagram.','Tombol mengarah ke alamat IP mentah dengan HTTP, bukan situs resmi.','Tampilan email yang rapi tidak membuktikan pengirimnya tepercaya.'],
        tip:'Arahkan kursor atau tekan lama untuk melihat tujuan tautan. Jika diminta reset, buka aplikasi resmi secara langsung.'
      },
      {
        id:8, title:'Saldo e-wallet gratis dengan kode rahasia', channel:'browser', label:'HALAMAN KLAIM SALDO',
        isPhishing:true, sender:'Promo Saldo Pelajar', address:'https://dana-kaget-hadiah-pelajar.example/claim',
        xray:[['Protokol','https://','HTTPS hanya mengenkripsi koneksi; tidak memastikan promo itu asli.'],['Domain utama','dana-kaget-hadiah-pelajar.example','Domain bukan kanal resmi penyedia e-wallet.'],['Permintaan','Nomor HP + PIN / OTP','PIN dan OTP adalah rahasia pribadi, tidak boleh diminta halaman klaim.'],['Tanda bahaya','Kode 6 digit SMS','Kode SMS dapat digunakan untuk mengambil alih akun.']],
        headline:'DANA Kaget — Saldo Gratis Pelajar!', body:'Masukkan nomor HP dan kode verifikasi untuk klaim saldo kejutanmu sekarang.', detail:'Nomor HP: 08•• •••• ••••', button:'VERIFIKASI & KLAIM',
        fields:['Nomor HP','6 digit PIN / OTP SMS'],
        flag:'otp-flag', flagText:'6 digit PIN / OTP SMS',
        reasons:['Promo meminta PIN atau OTP 6 digit yang dikirim melalui SMS.','Kode OTP dan PIN hanya untuk pemilik akun; membagikannya dapat memberi akses ke akunmu.','Nama kampanye dan tampilan halaman mudah ditiru oleh situs palsu.'],
        tip:'Jangan pernah bagikan OTP, PIN, atau kode verifikasi—termasuk kepada orang yang mengaku petugas. Hubungi layanan resmi bila ragu.'
      }
    ];
