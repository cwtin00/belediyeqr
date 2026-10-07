/*
 * Cetinweb
 * İtibar QR Bilgi Kartı
 */

const hamBilgi = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '';
const bilgiler = new URLSearchParams(hamBilgi);
const cocuk = bilgiler.get('c') || 'Bilgi bulunamadı';
const veli = bilgiler.get('v') || 'Bilgi bulunamadı';
const telefon = (bilgiler.get('t') || '').replace(/\D/g, '');

document.getElementById('cardChild').textContent = cocuk;
document.getElementById('cardParent').textContent = veli;

const araButonu = document.getElementById('callBtn');
const telefonYazisi = document.getElementById('phoneText');

if (/^5\d{9}$/.test(telefon)) {
  const tamTelefon = `0${telefon}`;
  araButonu.href = `tel:+90${telefon}`;
  telefonYazisi.textContent = tamTelefon.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
} else {
  araButonu.style.display = 'none';
  telefonYazisi.textContent = 'Telefon bilgisi bulunamadı.';
}
