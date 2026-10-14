const coverPage = document.getElementById('coverPage');
const invitationPage = document.getElementById('invitationPage');
document.getElementById('openInvitation').addEventListener('click', async () => {
  // A real user tap allows browsers to start audio when autoplay is blocked.
  const song = document.getElementById('hennaSong');
  if (song) {
    try {
      await song.play();
    } catch (error) {
      console.warn('Audio playback was blocked by the browser.', error);
    }
  }
  coverPage.classList.add('hidden');
  invitationPage.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.getElementById('backButton').addEventListener('click', () => {
  invitationPage.classList.add('hidden');
  coverPage.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const rsvpDialog = document.getElementById('rsvpDialog');
document.getElementById('rsvpButton').addEventListener('click', () => rsvpDialog.showModal());
document.getElementById('rsvpForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('guestName').value.trim();
  const attendance = document.getElementById('attendance').value;
  const message = `شكراً يا ${name} ❤️ تم تسجيل اختيارك: ${attendance}. ملاحظة: التأكيد يظهر على جهازك فقط ولا يُرسل لصاحب الدعوة تلقائياً.`;
  document.getElementById('rsvpMessage').textContent = message;
});

document.getElementById('photosButton').addEventListener('click', () => {
  alert('معرض الصور قريباً ❤️');
});
document.getElementById('videoButton').addEventListener('click', () => {
  alert('فيديو الحنة قريباً ❤️ يمكن إضافة رابط الفيديو داخل ملف script.js عند توفره.');
});
document.getElementById('shareButton').addEventListener('click', async () => {
  const shareData = { title: 'دعوة حنة دارم', text: 'يشرفنا حضوركم حنة دارم ❤️', url: window.location.href };
  try {
    if (navigator.share) await navigator.share(shareData);
    else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط الدعوة للمشاركة ❤️');
    } else {
      prompt('انسخي رابط الدعوة للمشاركة:', window.location.href);
    }
  } catch (error) {
    if (error.name !== 'AbortError') alert('يمكنك نسخ رابط الصفحة ومشاركته.');
  }
});


// Soft golden pollen/firefly-like sparkles, enabled only on invitation page.
function createPollenParticles() {
  const layer = document.getElementById('pollenLayer');
  if (!layer || layer.dataset.ready === 'true') return;
  layer.dataset.ready = 'true';
  const count = 34;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    particle.className = 'pollen-particle';
    particle.style.setProperty('--x', `${Math.random() * 100}%`);
    particle.style.setProperty('--size', `${2 + Math.random() * 4}px`);
    particle.style.setProperty('--duration', `${8 + Math.random() * 11}s`);
    particle.style.setProperty('--delay', `${-Math.random() * 18}s`);
    particle.style.setProperty('--drift', `${-55 + Math.random() * 110}px`);
    layer.appendChild(particle);
  }
}
createPollenParticles();


// Browsers often block audio autoplay until a visitor interacts with the page.
// Try on load, then start on the first tap/click/key interaction if blocked.
const hennaSong = document.getElementById('hennaSong');
if (hennaSong) {
  hennaSong.volume = 0.65;
  const startHennaSong = () => hennaSong.play().catch(() => {});
  window.addEventListener('load', startHennaSong, { once: true });
  document.addEventListener('pointerdown', startHennaSong, { once: true });
  document.addEventListener('keydown', startHennaSong, { once: true });
}
