# Responsive Device Management Simulation

<div style="position: fixed; top: 20px; right: 20px; z-index: 1000; background: white; padding: 10px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border: 1px solid #e0e0e0;">
  <button id="langToggle" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 14px;">🇹🇷 Türkçe</button>
</div>

<script>
let currentLang = 'en';

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'tr' : 'en';
  
  if (currentLang === 'tr') {
    // Türkçe içeriği göster
    document.querySelector('h1').textContent = 'Responsive Device Management Simülasyonu';
    document.getElementById('langToggle').textContent = '🇺🇸 English';
    
    // Ana bölümleri güncelle
    const sections = document.querySelectorAll('h2');
    sections.forEach(section => {
      const text = section.textContent;
      if (text.includes('Project Overview')) section.textContent = '📱 Proje Hakkında';
      if (text.includes('Project Purpose')) section.textContent = '🎯 Projenin Amacı';
      if (text.includes('Technical Architecture')) section.textContent = '🏗️ Teknik Mimari';
      if (text.includes('Core Components')) section.textContent = '🔧 Temel Bileşenler ve İşleyiş';
      if (text.includes('Click Detection')) section.textContent = '🎯 Tıklama Algılama ve Koordinat Sistemi';
      if (text.includes('Responsive Design')) section.textContent = '📊 Responsive Tasarım Stratejileri';
      if (text.includes('State Management')) section.textContent = '🔄 State Yönetimi';
      if (text.includes('Tailwind CSS')) section.textContent = '🎨 Tailwind CSS Kullanımı';
      if (text.includes('Performance')) section.textContent = '🚀 Performans Optimizasyonları';
      if (text.includes('Future Improvements')) section.textContent = '📈 Gelecek Geliştirmeler';
      if (text.includes('Installation')) section.textContent = '🛠️ Kurulum ve Çalıştırma';
      if (text.includes('Contribution')) section.textContent = '📝 Katkıda Bulunma';
      if (text.includes('License')) section.textContent = '📄 Lisans';
    });
  } else {
    // İngilizce içeriği göster
    document.querySelector('h1').textContent = 'Responsive Device Management Simulation';
    document.getElementById('langToggle').textContent = '🇹🇷 Türkçe';
    
    // Ana bölümleri güncelle
    const sections = document.querySelectorAll('h2');
    sections.forEach(section => {
      const text = section.textContent;
      if (text.includes('Proje Hakkında')) section.textContent = '📱 Project Overview';
      if (text.includes('Projenin Amacı')) section.textContent = '🎯 Project Purpose';
      if (text.includes('Teknik Mimari')) section.textContent = '🏗️ Technical Architecture';
      if (text.includes('Temel Bileşenler')) section.textContent = '🔧 Core Components and Operation';
      if (text.includes('Tıklama Algılama')) section.textContent = '🎯 Click Detection and Coordinate System';
      if (text.includes('Responsive Tasarım')) section.textContent = '📊 Responsive Design Strategies';
      if (text.includes('State Yönetimi')) section.textContent = '🔄 State Management';
      if (text.includes('Tailwind CSS')) section.textContent = '🎨 Tailwind CSS Usage';
      if (text.includes('Performans')) section.textContent = '🚀 Performance Optimizations';
      if (text.includes('Gelecek Geliştirmeler')) section.textContent = '📈 Future Improvements';
      if (text.includes('Kurulum')) section.textContent = '🛠️ Installation and Running';
      if (text.includes('Katkıda Bulunma')) section.textContent = '📝 Contribution';
      if (text.includes('Lisans')) section.textContent = '📄 License';
    });
  }
}

document.getElementById('langToggle').addEventListener('click', toggleLanguage);
</script>

## 📱 Project Overview

Bu proje, farklı cihaz türlerinin (telefon, tablet) ekran görüntülerini simüle eden ve bu cihazların farklı yerleşim senaryolarını test etmeye olanak sağlayan bir React uygulamasıdır. Proje, özellikle **responsive tasarım** ve **cihaz yönetimi** alanlarında çalışan geliştiriciler ve tasarımcılar için geliştirilmiştir.

## 🎯 Project Purpose

### Neden Bu Projeye İhtiyaç Duyuldu?

| Problem | Çözüm | Fayda |
|---------|-------|-------|
| **Gerçek Cihaz Testi Maliyeti** | Simülasyon ortamı | Maliyet tasarrufu |
| **Hızlı Prototipleme** | Dinamik cihaz kombinasyonları | Zaman tasarrufu |
| **Responsive Tasarım Doğrulama** | Farklı ekran boyutları | Kalite artışı |
| **Kullanıcı Deneyimi Testi** | Etkileşim simülasyonu | UX iyileştirme |

## 🏗️ Technical Architecture

### Kullanılan Teknolojiler

| Teknoloji | Versiyon | Amaç |
|------------|----------|------|
| React | 18.2.0 | UI Framework |
| TypeScript | 5.8.3 | Tip Güvenliği |
| Tailwind CSS | 3.4.4 | Styling |
| Vite | 5.0.8 | Build Tool |
| React Router | 7.6.3 | Routing |

### Proje Yapısı

```
src/
├── features/
│   ├── device/
│   │   ├── components/
│   │   │   ├── DeviceScreen.tsx      # Ekran simülasyonu
│   │   │   ├── DeviceInstance.tsx    # Cihaz örneği
│   │   │   ├── DeviceHeader.tsx      # Cihaz başlığı
│   │   │   ├── RightPanel.tsx        # Sağ panel
│   │   │   └── PhysicallyButtons.tsx # Fiziksel butonlar
│   │   └── types/
│   └── sidebar/
│       └── components/
│           └── Sidebar.tsx           # Cihaz seçimi
├── pages/
│   └── Home/
│       └── Home.tsx                  # Ana sayfa
└── assets/                           # Cihaz görselleri
```

## 🔧 Temel Bileşenler ve İşleyiş

### 1. DeviceScreen Bileşeni

Bu bileşen, projenin **kalbi** konumundadır ve cihaz ekranlarının doğru boyutlandırılmasından sorumludur.

#### Boyutlandırma Algoritması

```typescript
const calculateDimensions = useCallback(() => {
  const img = imgRef.current;
  if (!img || !img.naturalWidth || !img.naturalHeight) return;

  const ratio = img.naturalWidth / img.naturalHeight;
  
  // Pencere boyutlarına göre ham değerler
  const rawW = isRotated
    ? window.innerHeight * 0.85    // Landscape: Yükseklik bazlı
    : window.innerWidth * 0.85;    // Portrait: Genişlik bazlı
  const rawH = isRotated
    ? window.innerWidth * 0.85     // Landscape: Genişlik bazlı
    : window.innerHeight * 0.69;   // Portrait: Yükseklik bazlı

  // Maksimum kısıtlamalar
  const containerW = Math.min(MAX_WIDTH, rawW);
  const containerH = Math.min(MAX_HEIGHT, rawH);

  // Oran korunarak hesaplama
  const width = Math.min(containerW, containerH * ratio);
  const height = width / ratio;

  setDimensions({ width, height });
}, [isRotated]);
```

#### Boyutlandırma Parametreleri

| Parametre | Değer | Açıklama |
|-----------|-------|----------|
| MAX_WIDTH | 575px | Maksimum genişlik |
| MAX_HEIGHT | 680px | Maksimum yükseklik |
| Portrait Genişlik | %85 | Pencere genişliğinin %85'i |
| Portrait Yükseklik | %69 | Pencere yüksekliğinin %69'u |
| Landscape Genişlik | %85 | Pencere yüksekliğinin %85'i |
| Landscape Yükseklik | %85 | Pencere genişliğinin %85'i |

### 2. Rotasyon Sistemi

#### Döndürme Mantığı

```typescript
// Wrapper boyutları (en-boy takası)
const wrapperStyle = {
  width: isRotated ? dimensions.height : dimensions.width,
  height: isRotated ? dimensions.width : dimensions.height,
};

// Görüntü döndürme
const imgStyle = {
  width: dimensions.width,
  height: dimensions.height,
  transform: isRotated ? "rotate(90deg)" : "none",
  transformOrigin: "center center",
};
```

#### Döndürme Senaryoları

| Durum | Wrapper Genişlik | Wrapper Yükseklik | Görüntü Dönüşü |
|-------|------------------|-------------------|----------------|
| Portrait | dimensions.width | dimensions.height | 0° |
| Landscape | dimensions.height | dimensions.width | 90° |

### 3. Çoklu Cihaz Yerleşimi

#### Yerleşim Stratejileri

| Cihaz Sayısı | Yerleşim | CSS Sınıfları |
|---------------|----------|---------------|
| 1 | Tekli + Sağ Panel | `grid-cols-1 xl:grid-cols-[auto_1fr]` |
| 2 | Yan Yana | `flex-1 basis-1/2` |
| 3 | Üçlü Dizilim | `flex-1 basis-1/3` |
| 2+ (Döndürülmüş) | Özel Boşluk | `gap-24` veya `gap-20` |

## 🎯 Tıklama Algılama ve Koordinat Sistemi

### ✅ Teknik Analiz: Tıklama Algılama Sistemi SAĞLIKLI ÇALIŞACAK

Bu proje şu anda **sadece görsel iletim üzerine çalışılmıştır**, ancak tıklanan ekrandaki doğru yer tespit edilmesi konusunda **sağlıklı çalışacaktır**.

#### 🔧 Mevcut Altyapının Güçlü Yanları

| Özellik | Durum | Açıklama |
|---------|-------|----------|
| **Boyutlandırma Sistemi** | ✅ Hazır | `dimensions` state ile gerçek zamanlı takip |
| **Rotasyon Desteği** | ✅ Hazır | `isRotated` prop ile durum kontrolü |
| **DOM Erişimi** | ✅ Hazır | `imgRef` ile doğrudan element erişimi |
| **Responsive Tasarım** | ✅ Hazır | Pencere boyutu değişikliklerinde otomatik güncelleme |
| **State Yönetimi** | ✅ Hazır | React state sistemi ile veri yönetimi |

#### 📐 Matematiksel Koordinat Dönüşümü

**Koordinat dönüşümü için gerekli matematiksel formül**:

```typescript
const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
  const img = imgRef.current;
  if (!img) return;

  // 1. Mouse'un görüntü üzerindeki pozisyonu
  const rect = img.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  // 2. Göreli koordinatlar (0-1 arası)
  const relativeX = clickX / dimensions.width;
  const relativeY = clickY / dimensions.height;

  // 3. Rotasyon düzeltmesi
  let deviceX, deviceY;
  
  if (isRotated) {
    // 90° döndürülmüş durumda koordinat dönüşümü
    deviceX = relativeY;           // Y koordinatı X'e dönüşür
    deviceY = 1 - relativeX;      // X koordinatı Y'ye dönüşür (ters çevrilir)
  } else {
    deviceX = relativeX;
    deviceY = relativeY;
  }

  return { deviceX, deviceY, relativeX, relativeY };
};
```

#### ⚡ Minimum Gerekli Eklemeler

| Eksik Bileşen | Eklenmesi Gereken | Durum |
|---------------|-------------------|-------|
| Click Event Handler | `onClick={handleClick}` | ❌ Eksik |
| Koordinat Dönüşüm Fonksiyonu | `handleClick` fonksiyonu | ❌ Eksik |

```typescript
// DeviceScreenProps'a ekle
interface DeviceScreenProps {
  // ... mevcut props
  onScreenClick?: (coordinates: {
    deviceX: number;
    deviceY: number;
    relativeX: number;
    relativeY: number;
  }) => void;
}

// img elementine ekle
<img
  // ... mevcut props
  onClick={handleClick}
  className="transition-transform duration-300 object-contain cursor-pointer"
/>
```

#### 🎯 Sonuç

**EVET, mevcut proje tıklama algılama sistemi için teknik olarak sağlıklı çalışacak şekilde kurgulanmıştır.** Sadece gerekli koordinat hesaplama olayını matematiksel olarak ele alıp eklerseniz, kendi projenizde sağlıklı çalışacaktır.

## 📊 Responsive Tasarım Stratejileri

### Breakpoint Sistemi

| Breakpoint | Genişlik | Kullanım Alanı |
|------------|----------|----------------|
| xs | < 640px | Mobil cihazlar |
| sm | 640px+ | Küçük tabletler |
| md | 768px+ | Tabletler |
| lg | 1024px+ | Büyük tabletler |
| xl | 1280px+ | Masaüstü |
| 2xl | 1536px+ | Geniş ekranlar |

### Dinamik Boyutlandırma

```typescript
// Pencere boyutuna göre dinamik hesaplama
const calculateResponsiveDimensions = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Farklı ekran boyutları için farklı oranlar
  const ratios = {
    mobile: { width: 0.95, height: 0.6 },
    tablet: { width: 0.85, height: 0.69 },
    desktop: { width: 0.75, height: 0.8 }
  };
  
  // Ekran boyutuna göre oran seçimi
  const currentRatio = viewportWidth < 768 ? ratios.mobile :
                      viewportWidth < 1024 ? ratios.tablet :
                      ratios.desktop;
  
  return {
    width: viewportWidth * currentRatio.width,
    height: viewportHeight * currentRatio.height
  };
};
```

## 🔄 State Yönetimi

### Ana State Yapısı

```typescript
interface AppState {
  deviceType: "phone" | "tablet";
  selectedDevices: string[];
  rotatedMap: { [src: string]: boolean };
  singleIsRotated: boolean;
}
```

### State Güncelleme Stratejileri

| State | Güncelleme Yöntemi | Kullanım Alanı |
|-------|-------------------|----------------|
| deviceType | setDeviceType | Cihaz türü değişimi |
| selectedDevices | setSelectedDevices | Cihaz seçimi |
| rotatedMap | setRotatedMap | Çoklu cihaz rotasyonu |
| singleIsRotated | setSingleIsRotated | Tekli cihaz rotasyonu |

## 🎨 Tailwind CSS Kullanımı

### Özel Grid Sistemi

```css
/* Dinamik grid yapıları */
.grid-rows-[auto_1fr_auto]     /* Rotated layout */
.grid-cols-[auto_1fr]          /* Single device layout */
.grid-cols-[auto_auto]         /* Default layout */
```

### Responsive Utility Sınıfları

```css
/* Breakpoint bazlı görünürlük */
.hidden md:block               /* Mobilde gizli, tablet+ görünür */
.flex-1 basis-1/2             /* 2 cihaz için eşit genişlik */
.flex-1 basis-1/3             /* 3 cihaz için eşit genişlik */
```

## 🚀 Performans Optimizasyonları

### 1. useCallback Kullanımı
```typescript
const calculateDimensions = useCallback(() => {
  // Boyut hesaplama mantığı
}, [isRotated]); // Sadece isRotated değiştiğinde yeniden hesapla
```

### 2. useEffect Optimizasyonu
```typescript
useEffect(() => {
  calculateDimensions();
  window.addEventListener("resize", calculateDimensions);
  return () => window.removeEventListener("resize", calculateDimensions);
}, [calculateDimensions, src, isRotated]);
```

### 3. Conditional Rendering
```typescript
{selectedDevices.length === 1 ? (
  <SingleDeviceLayout />
) : selectedDevices.length > 1 ? (
  <MultiDeviceLayout />
) : null}
```

## 📈 Gelecek Geliştirmeler

### Planlanan Özellikler

| Özellik | Açıklama | Öncelik |
|---------|----------|---------|
| **Gesture Desteği** | Dokunmatik hareketler için destek | Yüksek |
| **Cihaz Fiziksel Özellikleri** | Gerçek cihaz boyutları ve ağırlık simülasyonu | Orta |
| **Network Simülasyonu** | Farklı bağlantı hızlarında test | Orta |
| **Otomatik Test Senaryoları** | Belirli kullanıcı senaryolarının otomatik testi | Düşük |
| **Export Özelliği** | Test sonuçlarının dışa aktarılması | Düşük |

### Teknik İyileştirmeler

| İyileştirme | Açıklama | Fayda |
|-------------|----------|-------|
| **Web Workers** | Ağır hesaplamalar için background thread kullanımı | Performans |
| **Virtual Scrolling** | Çok sayıda cihaz için performans optimizasyonu | Performans |
| **Service Worker** | Offline çalışma desteği | Kullanılabilirlik |
| **PWA Desteği** | Progressive Web App özellikleri | Kullanılabilirlik |

## 🛠️ Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 16+
- npm veya yarn

### Kurulum
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Lint kontrolü
npm run lint
```

### Çalıştırma
```bash
npm run dev
```
Uygulama `http://localhost:5173` adresinde çalışacaktır.

## 📝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**Not**: Bu proje, responsive tasarım ve cihaz yönetimi alanlarında çalışan geliştiriciler için eğitim ve test amaçlı geliştirilmiştir. Gerçek cihaz testlerinin yerini tutmaz, ancak hızlı prototipleme ve ön test için değerli bir araçtır.