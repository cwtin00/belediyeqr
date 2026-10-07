Cetinweb - İtibar QR Oluşturucu
GitHub Pages sürümü

KURULUM
1. GitHub'da yeni bir repository oluşturun. Örnek: itibar-qr
2. Bu klasörün İÇİNDEKİ tüm dosyaları repository'nin ana dizinine yükleyin.
3. GitHub'da Settings > Pages bölümüne girin.
4. Source / Build and deployment kısmında "Deploy from a branch" seçin.
5. Branch: main, Folder: / (root) seçip Save'e basın.
6. Yayın adresi genelde şu biçimde olur:
   https://KULLANICIADI.github.io/REPO-ADI/

KODDA ALAN ADI YAZMANIZ GEREKMEZ.
Sistem açıldığı adresi otomatik algılar. Örneğin sayfa
https://ornek.github.io/itibar-qr/
adresinde açıldıysa oluşturulan QR otomatik olarak
https://ornek.github.io/itibar-qr/kart.html#...
adresine yönlenir.

DOSYALAR
- index.html : QR oluşturma ekranı
- kart.html  : QR okutulunca açılan bilgi sayfası
- style.css  : tasarım
- script.js  : QR oluşturma işlemleri
- kart.js    : bilgi kartı işlemleri
- .nojekyll  : GitHub Pages için statik dosyaları doğrudan yayınlatır

NOT
Yerel bilgisayarda Test Et butonu ile kart.html denenebilir.
Telefondan QR okutmak için proje GitHub Pages veya başka bir HTTPS web sitesinde yayınlanmış olmalıdır.
