/*
 * Cetinweb
 * İtibar QR Oluşturucu
 * GitHub Pages ve gerçek site kullanımı için hazırlanmıştır.
 */

const form = document.getElementById('qrForm');
const sonucAlani = document.getElementById('result');
const qrAlani = document.getElementById('qrcode');
const telefonAlani = document.getElementById('parentPhone');
const olusturButonu = form.querySelector('button[type="submit"]');
const testButonu = document.getElementById('testBtn');

let sonKartAdresi = '';

telefonAlani.addEventListener('input', () => {
  telefonAlani.value = telefonAlani.value.replace(/\D/g, '').slice(0, 10);
});

function metniDuzenle(deger) {
  return deger.replace(/\s+/g, ' ').trim();
}

function kartVerisiniOlustur(cocuk, veli, telefon) {
  const parametreler = new URLSearchParams();
  parametreler.set('c', cocuk);
  parametreler.set('v', veli);
  parametreler.set('t', telefon);
  return parametreler.toString();
}

function kartAdresiniOlustur(cocuk, veli, telefon) {
  const veri = kartVerisiniOlustur(cocuk, veli, telefon);

  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    const kartAdresi = new URL('kart.html', window.location.href);
    kartAdresi.hash = veri;
    return kartAdresi.href;
  }

  return `kart.html#${veri}`;
}

function qrAlaniniTemizle() {
  qrAlani.innerHTML = '';
}

function qrOlustur(metin) {
  qrAlaniniTemizle();

  if (!window.QRCode) {
    throw new Error('QR kütüphanesi yüklenemedi.');
  }

  new QRCode(qrAlani, {
    text: metin,
    width: 280,
    height: 280,
    correctLevel: QRCode.CorrectLevel.M
  });
}

form.addEventListener('submit', (olay) => {
  olay.preventDefault();

  const cocukAlani = document.getElementById('childName');
  const veliAlani = document.getElementById('parentName');
  const cocuk = metniDuzenle(cocukAlani.value);
  const veli = metniDuzenle(veliAlani.value);
  const telefon = telefonAlani.value.replace(/\D/g, '');

  cocukAlani.value = cocuk;
  veliAlani.value = veli;

  if (cocuk.length < 2) {
    alert('Lütfen çocuğun adını ve soyadını giriniz.');
    cocukAlani.focus();
    return;
  }

  if (veli.length < 2) {
    alert('Lütfen veli adını ve soyadını giriniz.');
    veliAlani.focus();
    return;
  }

  if (!/^5\d{9}$/.test(telefon)) {
    alert('Telefon numarasını 0 olmadan 10 hane olarak giriniz. Örnek: 5321234567');
    telefonAlani.focus();
    return;
  }

  olusturButonu.disabled = true;
  olusturButonu.textContent = 'QR Oluşturuluyor...';
  sonucAlani.classList.add('hidden');

  try {
    sonKartAdresi = kartAdresiniOlustur(cocuk, veli, telefon);
    qrOlustur(sonKartAdresi);
    sonucAlani.classList.remove('hidden');
    sonucAlani.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (hata) {
    console.error(hata);
    alert('QR oluşturulamadı. Sayfayı yenileyip tekrar deneyiniz.');
  } finally {
    olusturButonu.disabled = false;
    olusturButonu.textContent = 'QR Oluştur';
  }
});

testButonu.addEventListener('click', () => {
  if (!sonKartAdresi) {
    alert('Önce QR kodunu oluşturunuz.');
    return;
  }

  window.open(sonKartAdresi, '_blank', 'noopener');
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const tuval = qrAlani.querySelector('canvas');
  const gorsel = qrAlani.querySelector('img');
  let indirmeAdresi = '';

  if (tuval) indirmeAdresi = tuval.toDataURL('image/png');
  else if (gorsel) indirmeAdresi = gorsel.src;

  if (!indirmeAdresi) {
    alert('Önce QR kodunu oluşturunuz.');
    return;
  }

  const indirmeBaglantisi = document.createElement('a');
  indirmeBaglantisi.href = indirmeAdresi;
  indirmeBaglantisi.download = 'itibar-qr.png';
  document.body.appendChild(indirmeBaglantisi);
  indirmeBaglantisi.click();
  indirmeBaglantisi.remove();
});

document.getElementById('printBtn').addEventListener('click', () => window.print());

document.getElementById('resetBtn').addEventListener('click', () => {
  form.reset();
  sonucAlani.classList.add('hidden');
  qrAlaniniTemizle();
  sonKartAdresi = '';
  document.getElementById('childName').focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
