/* CekLink: logika navigasi, simulasi, penyimpanan progres, dan sertifikat digital. */
const STORAGE_KEY = 'ceklink-simulator-state-v1';
    const screens = ['landing-screen','game-screen','result-screen'].map(id => document.getElementById(id));
    const state = { player:{name:'',school:''}, index:0, score:0, answers:[], modalOpen:false };

    // Mengubah tampilan utama dengan transisi sederhana tanpa memuat ulang halaman.
    function showScreen(screenId) {
      screens.forEach(screen => screen.classList.toggle('hidden', screen.id !== screenId));
      window.scrollTo({top:0,behavior:'smooth'});
    }

    // Menyimpan data permainan yang tidak sensitif secara lokal agar hasil dapat dipulihkan.
    function saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          player:state.player,index:state.index,score:state.score,answers:state.answers
        }));
      } catch (error) {
        console.warn('Progres tidak dapat disimpan di perangkat ini.', error);
      }
    }

    // Menampilkan isi kasus sesuai kanal simulasi serta memperbarui progres pemain.
    function renderCase() {
      const item = scenarios[state.index];
      document.getElementById('header-player').textContent = `${state.player.name} · ${state.player.school}`;
      document.getElementById('case-count').textContent = `Kasus ${state.index + 1} / ${scenarios.length}`;
      document.getElementById('score-label').textContent = `${state.score} / 800 poin`;
      document.getElementById('progress-bar').style.width = `${(state.index / scenarios.length) * 100}%`;
      document.getElementById('case-title').textContent = item.title;
      document.getElementById('case-category').textContent = `KASUS ${String(item.id).padStart(2,'0')} · SIMULASI DIGITAL`;
      document.getElementById('mockup-label').textContent = item.label;
      document.getElementById('xray-panel').innerHTML = '';
      document.getElementById('xray-panel').classList.add('hidden');
      document.getElementById('xray-button').setAttribute('aria-expanded','false');
      document.getElementById('mockup').innerHTML = renderMockup(item);
      document.querySelectorAll('[data-answer]').forEach(button => button.disabled = false);
      saveState();
    }

    // Menghasilkan mockup UI berbeda untuk browser, chat, DM, dan email.
    function renderMockup(item) {
      if (item.channel === 'whatsapp' || item.channel === 'whatsapp-group') {
        const group = item.channel === 'whatsapp-group';
        return `<div class="mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-[#e9f2ee]">
          <div class="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white"><span class="grid h-9 w-9 place-items-center rounded-full bg-white/20">${group?'👥':'📦'}</span><div><p class="text-sm font-extrabold">${group?'Grup Kelas 8B':item.sender}</p><p class="text-[10px] text-white/70">${group?'32 peserta':'online'}</p></div><span class="ml-auto">⋮</span></div>
          <div class="space-y-3 p-4">
            <div class="max-w-[94%] rounded-2xl rounded-tl-sm bg-white p-3 shadow-sm"><p class="mb-1 text-[10px] font-bold text-emerald-700">${group?item.sender:'Nomor tidak dikenal'}</p><p class="text-xs leading-5 text-slate-700">${escapeHTML(item.body)}</p>${group?`<p class="mt-2 text-xs font-bold text-cyan-700">http://kuota-pendidikan-gratis.blogspot.com</p><div id="quota-url-flag" class="mono mt-2 break-all rounded-lg bg-slate-100 p-2 text-[10px] text-slate-600">http://kuota-pendidikan-gratis.blogspot.com</div><p class="mt-2 text-[10px] font-bold text-slate-500">Teruskan pesan ini ke 5 grup untuk klaim!</p>`:`<div id="apk-flag" class="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5"><span class="grid h-8 w-8 place-items-center rounded-lg bg-red-100">📁</span><span class="min-w-0 flex-1"><span class="block break-all text-[10px] font-extrabold text-slate-700">${escapeHTML(item.detail)}</span><span class="text-[9px] text-slate-400">File aplikasi · 1,8 MB</span></span><span class="text-xs text-slate-400">↓</span></div>`}</div>
            <p class="text-right text-[9px] text-slate-500">10.42 ✓✓</p>
          </div><div class="border-t border-slate-200/70 bg-white/70 px-4 py-3 text-center text-[10px] text-slate-400">Pesan dan nama grup adalah simulasi</div>
        </div>`;
      }
      if (item.channel === 'instagram') {
        return `<div class="mx-auto max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-3 border-b border-slate-100 px-4 py-3"><span class="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 via-pink-500 to-amber-400 text-xs font-extrabold text-white">IG</span><div class="min-w-0"><p id="ig-handle-flag" class="break-all text-xs font-extrabold text-slate-800">${escapeHTML(item.sender)}</p><p class="text-[10px] text-slate-400">Akun profesional · aktif sekarang</p></div><span class="ml-auto text-slate-400">ⓘ</span></div>
          <div class="min-h-56 bg-gradient-to-b from-white to-pink-50/40 p-5"><p class="text-center text-[9px] text-slate-400">Hari ini 09.16</p><div class="mt-4 max-w-[90%] rounded-2xl rounded-tl-sm bg-slate-100 p-3.5"><p class="text-xs font-extrabold text-slate-800">${escapeHTML(item.headline)}</p><p class="mt-2 text-xs leading-5 text-slate-600">${escapeHTML(item.body)}</p><p class="mono mt-3 break-all rounded-lg bg-white p-2 text-[10px] font-semibold text-blue-700">${escapeHTML(item.address)}</p><button class="mt-3 w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 px-3 py-2 text-[10px] font-extrabold text-white">${escapeHTML(item.button)}</button></div></div>
          <div class="border-t border-slate-100 px-4 py-3 text-center text-[10px] text-slate-400">Pesan langsung · Simulasi edukasi</div></div>`;
      }
      if (item.channel === 'email') {
        return `<div class="mx-auto max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 p-4"><div class="flex items-center gap-2 text-[10px] text-slate-400"><span>INBOX</span><span>›</span><span class="text-slate-600">Pesan masuk</span></div><h3 class="mt-3 text-sm font-extrabold text-slate-800">${escapeHTML(item.subject)}</h3><div class="mt-3 flex items-center gap-2"><span class="grid h-8 w-8 place-items-center rounded-full ${item.isPhishing?'bg-pink-100 text-pink-700':'bg-blue-100 text-blue-700'} text-[10px] font-extrabold">${item.isPhishing?'I':'G'}</span><div class="min-w-0 flex-1"><p id="email-sender-flag" class="break-all text-[10px] font-bold text-slate-700">${escapeHTML(item.sender)}</p><p class="text-[9px] text-slate-400">kepada saya · 09.24</p></div><span class="text-[10px] text-slate-400">⋮</span></div></div>
          <div class="p-5"><div class="rounded-xl ${item.isPhishing?'bg-gradient-to-br from-purple-50 to-pink-50':'bg-gradient-to-br from-blue-50 to-cyan-50'} p-4"><p class="text-[9px] font-bold uppercase tracking-widest ${item.isPhishing?'text-purple-600':'text-blue-600'}">${item.isPhishing?'PUSAT KEAMANAN':'NOTIFIKASI KEAMANAN'}</p><h4 class="mt-2 text-sm font-extrabold text-slate-800">${escapeHTML(item.headline)}</h4><p class="mt-2 text-xs leading-5 text-slate-600">${escapeHTML(item.body)}</p><div class="mono mt-3 break-all rounded-lg bg-white p-2 text-[9px] text-slate-600">${escapeHTML(item.detail)}</div><button class="mt-3 rounded-lg ${item.isPhishing?'bg-purple-600':'bg-blue-600'} px-4 py-2 text-[10px] font-extrabold text-white">${escapeHTML(item.button)}</button></div><p class="mt-3 text-[9px] text-slate-400">Mockup email untuk latihan · Jangan klik tautan nyata</p></div></div>`;
      }
      const safe = !item.isPhishing;
      const displayUrl = item.address.replace(/^https:\/\//,'');
      return `<div class="mx-auto max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 bg-slate-100 px-3 py-2"><span class="flex gap-1"><i class="h-2 w-2 rounded-full bg-red-400"></i><i class="h-2 w-2 rounded-full bg-amber-400"></i><i class="h-2 w-2 rounded-full bg-emerald-400"></i></span><div class="mono flex min-w-0 flex-1 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] text-slate-600"><span class="${safe?'text-safe':'text-amber-600'}">${safe?'🔒':'ⓘ'}</span><span id="${safe?'safe-url-flag':'domain-flag'}" class="break-all">${escapeHTML(displayUrl)}</span></div><span class="text-xs text-slate-500">↻</span></div>
        <div class="p-5 sm:p-7"><div class="mx-auto max-w-sm text-center"><div class="mx-auto grid h-11 w-11 place-items-center rounded-2xl ${safe?'bg-blue-50 text-blue-700':'bg-amber-50 text-amber-700'} text-xl">${safe?'🏫':'🎮'}</div><p class="mt-3 text-[9px] font-extrabold uppercase tracking-[.18em] ${safe?'text-blue-700':'text-amber-700'}">${safe?'PORTAL PENGUMUMAN':'EVENT SPESIAL'}</p><h3 class="mt-2 text-lg font-extrabold text-slate-800">${escapeHTML(item.headline)}</h3><p class="mt-2 text-xs leading-5 text-slate-500">${escapeHTML(item.body)}</p>
          ${safe?`<div class="mt-5 rounded-xl border border-slate-200 p-3 text-left"><label class="text-[10px] font-bold text-slate-600">NISN siswa</label><div class="mono mt-1 rounded-lg bg-slate-50 p-2 text-[10px] text-slate-400">${escapeHTML(item.detail)}</div></div>`:item.id===8?`<div class="mt-4 space-y-2 text-left"><div class="rounded-lg border border-slate-200 px-3 py-2 text-[10px] text-slate-400">${escapeHTML(item.fields[0])}</div><div id="otp-flag" class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[10px] font-bold text-red-700">${escapeHTML(item.fields[1])}</div></div>`:`<div class="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-xs font-extrabold text-amber-800">⏱️ Hadiah hangus dalam ${escapeHTML(item.detail)}</div><div class="mt-4 space-y-2 text-left"><div class="rounded-lg border border-slate-200 px-3 py-2 text-[10px] text-slate-400">${escapeHTML(item.fields[0])}</div><div class="rounded-lg border border-slate-200 px-3 py-2 text-[10px] text-slate-400">${escapeHTML(item.fields[1])}</div></div>`}
          <button class="mt-4 w-full rounded-xl ${safe?'bg-blue-700':'bg-amber-500'} px-4 py-3 text-xs font-extrabold text-white">${escapeHTML(item.button)}</button><p class="mt-3 text-[9px] text-slate-400">${safe?'HTTPS aktif · Pastikan domain milik sekolahmu':'Klaim hadiah khusus akun terpilih!'}</p></div></div></div>`;
    }

    // Melakukan escape pada teks skenario sebelum memasukkannya ke dalam mockup HTML.
    function escapeHTML(value) {
      return String(value).replace(/[&<>"']/g, character => ({
        '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
      })[character]);
    }

    // Memecah alamat pengirim dan URL menjadi petunjuk teknis yang mudah dipahami.
    function toggleXray() {
      const panel = document.getElementById('xray-panel');
      const button = document.getElementById('xray-button');
      const item = scenarios[state.index];
      const opening = panel.classList.contains('hidden');
      panel.classList.toggle('hidden',!opening);
      button.setAttribute('aria-expanded',String(opening));
      if (!opening) return;
      panel.innerHTML = `<div class="overflow-hidden rounded-xl border border-slate-200 bg-white"><div class="bg-slate-50 px-3 py-2"><p class="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">X-Ray alamat</p></div>${item.xray.map(([label,value,note]) => `<div class="xray-row px-3 py-2.5"><div class="flex items-start justify-between gap-2"><p class="text-[9px] font-bold text-slate-500">${escapeHTML(label)}</p><p class="mono max-w-[62%] break-all text-right text-[9px] font-semibold text-slate-800">${escapeHTML(value)}</p></div><p class="mt-1 text-[9px] leading-4 text-slate-500">${escapeHTML(note)}</p></div>`).join('')}</div>`;
    }

    // Memeriksa jawaban, memperbarui skor, menyorot red flag, dan membuka penjelasan.
    function submitAnswer(answer) {
      if (state.modalOpen) return;
      const item = scenarios[state.index];
      const correct = (answer === 'phishing') === item.isPhishing;
      state.answers[state.index] = {answer,correct};
      if (correct) state.score += 100;
      state.modalOpen = true;
      document.querySelectorAll('[data-answer]').forEach(button => button.disabled = true);
      if (item.flag) {
        const flag = document.getElementById(item.flag);
        if (flag) flag.classList.add('flag-highlight');
      }
      const icon = document.getElementById('feedback-icon');
      icon.className = `grid h-12 w-12 place-items-center rounded-2xl text-xl ${correct?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`;
      icon.textContent = correct ? '🎯' : '💡';
      document.getElementById('feedback-kicker').textContent = correct ? 'Jawabanmu tepat · +100 poin' : 'Belum tepat · tetap semangat!';
      document.getElementById('feedback-kicker').className = `mt-4 text-[10px] font-extrabold uppercase tracking-[.18em] ${correct?'text-emerald-700':'text-amber-700'}`;
      document.getElementById('feedback-title').textContent = correct ? 'Analisis yang jeli!' : (item.isPhishing ? 'Ternyata ini phishing!' : 'Ternyata pesan ini aman!');
      document.getElementById('feedback-summary').textContent = item.isPhishing
        ? 'Ada beberapa tanda bahaya yang penting untuk dikenali. Periksa bukti berikut sebelum mengeklik pesan serupa.'
        : 'Pesan ini memiliki ciri yang sesuai, tetapi tetap biasakan memeriksa alamat dan konteks sebelum bertindak.';
      document.getElementById('feedback-reason-heading').textContent = item.isPhishing ? '🚩 Kenapa ini phishing?' : '✅ Kenapa ini aman?';
      document.getElementById('feedback-reasons').innerHTML = item.reasons.map(reason => `<li>${escapeHTML(reason)}</li>`).join('');
      document.getElementById('feedback-tip').textContent = item.tip;
      document.getElementById('next-case').innerHTML = state.index === scenarios.length - 1
        ? 'Lihat Hasil Akhir <span>→</span>' : 'Lanjut ke Kasus Berikutnya <span>→</span>';
      document.getElementById('feedback-modal').classList.remove('hidden');
      document.getElementById('feedback-modal').classList.add('flex');
      document.getElementById('next-case').focus();
      saveState();
    }

    // Menampilkan hasil akhir beserta akurasi dan ringkasan seluruh jawaban.
    function renderResults() {
      document.getElementById('result-name').textContent = state.player.name;
      document.getElementById('final-score').textContent = state.score;
      const correctCount = state.answers.filter(answer => answer && answer.correct).length;
      document.getElementById('final-accuracy').textContent = `${Math.round((correctCount / scenarios.length) * 100)}%`;
      const title = state.score >= 700 ? 'Cyber Guardian (Duta Anti-Phishing)'
        : state.score >= 400 ? 'Digital Detective (Cukup Teliti)'
        : 'Cyber Rookie (Perlu Waspada)';
      document.getElementById('final-title').textContent = title;
      document.getElementById('recap-list').innerHTML = scenarios.map((item,index) => {
        const answer = state.answers[index];
        const correct = Boolean(answer && answer.correct);
        return `<div class="flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-2.5"><span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg ${correct?'bg-emerald-50 text-emerald-700':'bg-amber-50 text-amber-700'} text-sm">${correct?'✓':'!'}</span><div class="min-w-0 flex-1"><p class="truncate text-xs font-bold text-slate-700">${escapeHTML(item.title)}</p><p class="mt-0.5 text-[10px] text-slate-400">Kasus ${item.id} · Jawaban: ${answer ? (answer.answer==='phishing'?'Phishing':'Aman') : 'Belum dijawab'}</p></div><span class="text-[10px] font-extrabold ${correct?'text-emerald-700':'text-amber-700'}">${correct?'+100':'0'} pts</span></div>`;
      }).join('');
      document.getElementById('progress-bar').style.width = '100%';
      try {
        localStorage.setItem('ceklink-last-result-v1',JSON.stringify({player:state.player,score:state.score,accuracy:correctCount/ scenarios.length,title,completedAt:new Date().toISOString()}));
      } catch (error) {
        console.warn('Hasil tidak dapat disimpan di perangkat ini.',error);
      }
      showScreen('result-screen');
    }

    // Menggambar sertifikat ke Canvas lalu mengunduh hasilnya sebagai PNG.
    function downloadCertificate() {
      const status = document.getElementById('certificate-status');
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1600;
        canvas.height = 1120;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Canvas tidak tersedia di browser ini.');
        const gradient = context.createLinearGradient(0,0,1600,1120);
        gradient.addColorStop(0,'#0f172a');
        gradient.addColorStop(1,'#12324a');
        context.fillStyle = gradient;
        context.fillRect(0,0,canvas.width,canvas.height);
        context.strokeStyle = '#06b6d4';
        context.lineWidth = 5;
        context.strokeRect(42,42,1516,1036);
        context.strokeStyle = 'rgba(255,255,255,.25)';
        context.lineWidth = 1;
        context.strokeRect(62,62,1476,996);
        context.textAlign = 'center';
        context.fillStyle = '#67e8f9';
        context.font = '700 24px "Plus Jakarta Sans", sans-serif';
        context.fillText('CEKLINK  ·  SIMULATOR ANTI-PHISHING',800,160);
        context.fillStyle = '#ffffff';
        context.font = '800 62px "Plus Jakarta Sans", sans-serif';
        context.fillText('SERTIFIKAT PENCAPAIAN',800,286);
        context.fillStyle = '#cbd5e1';
        context.font = '400 27px "Plus Jakarta Sans", sans-serif';
        context.fillText('Diberikan dengan bangga kepada',800,380);
        context.fillStyle = '#67e8f9';
        context.font = '800 60px "Plus Jakarta Sans", sans-serif';
        context.fillText(state.player.name,800,482);
        context.fillStyle = '#cbd5e1';
        context.font = '500 25px "Plus Jakarta Sans", sans-serif';
        context.fillText(state.player.school,800,535);
        context.fillStyle = '#ffffff';
        context.font = '700 28px "Plus Jakarta Sans", sans-serif';
        context.fillText('telah menyelesaikan 8 simulasi literasi anti-phishing',800,635);
        context.fillStyle = '#a5f3fc';
        context.font = '700 31px "Plus Jakarta Sans", sans-serif';
        const title = state.score >= 700 ? 'Cyber Guardian (Duta Anti-Phishing)' : state.score >= 400 ? 'Digital Detective (Cukup Teliti)' : 'Cyber Rookie (Perlu Waspada)';
        context.fillText(title,800,715);
        context.fillStyle = '#ffffff';
        context.font = '800 33px "JetBrains Mono", monospace';
        context.fillText(`SKOR  ${state.score} / 800`,800,805);
        context.fillStyle = '#94a3b8';
        context.font = '500 21px "Plus Jakarta Sans", sans-serif';
        context.fillText(`Tanggal: ${new Intl.DateTimeFormat('id-ID',{day:'numeric',month:'long',year:'numeric'}).format(new Date())}`,800,920);
        context.fillStyle = '#64748b';
        context.font = '400 17px "Plus Jakarta Sans", sans-serif';
        context.fillText('Belajar aman, berpikir kritis, dan selalu cek sebelum klik.',800,1000);
        const link = document.createElement('a');
        link.download = `Sertifikat-CekLink-${state.player.name.trim().replace(/[^a-z0-9]+/gi,'-') || 'Pelajar'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        status.textContent = 'Sertifikat berhasil diunduh.';
      } catch (error) {
        console.error('Sertifikat gagal dibuat.',error);
        status.textContent = 'Sertifikat gagal dibuat. Coba browser lain.';
      }
    }

    // Mengembalikan permainan ke halaman awal dengan data pemain tetap terisi.
    function restartGame() {
      state.index = 0;
      state.score = 0;
      state.answers = [];
      state.modalOpen = false;
      document.getElementById('player-name').value = state.player.name;
      document.getElementById('player-school').value = state.player.school;
      saveState();
      showScreen('landing-screen');
    }

    // Menghubungkan formulir, pilihan jawaban, X-Ray, navigasi, dan unduhan sertifikat.
    function initializeApp() {
      document.getElementById('player-form').addEventListener('submit',event => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        state.player = {
          name:String(formData.get('name') || '').trim(),
          school:String(formData.get('school') || '').trim()
        };
        if (!state.player.name || !state.player.school) return;
        state.index = 0;
        state.score = 0;
        state.answers = [];
        state.modalOpen = false;
        renderCase();
        showScreen('game-screen');
      });
      document.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click',() => submitAnswer(button.dataset.answer)));
      document.getElementById('xray-button').addEventListener('click',toggleXray);
      document.getElementById('next-case').addEventListener('click',() => {
        document.getElementById('feedback-modal').classList.add('hidden');
        document.getElementById('feedback-modal').classList.remove('flex');
        state.modalOpen = false;
        if (state.index === scenarios.length - 1) {
          renderResults();
          return;
        }
        state.index += 1;
        renderCase();
      });
      document.getElementById('restart-game').addEventListener('click',restartGame);
      document.getElementById('download-certificate').addEventListener('click',downloadCertificate);
      document.getElementById('exit-game').addEventListener('click',() => {
        if (window.confirm('Keluar dari simulasi? Progres saat ini akan direset.')) restartGame();
      });
      document.getElementById('brand-home').addEventListener('click',event => {
        event.preventDefault();
        showScreen('landing-screen');
      });
    }

    initializeApp();
