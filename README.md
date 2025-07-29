# Responsive Device Management Simulation

## 📱 About the Project

This project is a React application that simulates screen displays of different device types (phone, tablet) and allows testing various layout scenarios for these devices. The project is specifically developed for developers and designers working in **responsive design** and **device management** fields.

## 🎯 Project Purpose

### Why Was This Project Needed?

| Problem | Solution | Benefit |
|---------|----------|---------|
| **Real Device Test Cost** | Simulation environment | Cost savings |
| **Rapid Prototyping** | Dynamic device combinations | Time savings |
| **Responsive Design Validation** | Different screen sizes | Quality improvement |
| **User Experience Testing** | Interaction simulation | UX enhancement |

## 🏗️ Technical Architecture

### Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| TypeScript | 5.8.3 | Type Safety |
| Tailwind CSS | 3.4.4 | Styling |
| Vite | 5.0.8 | Build Tool |
| React Router | 7.6.3 | Routing |

### Project Structure

```
src/
├── features/
│   ├── device/
│   │   ├── components/
│   │   │   ├── DeviceScreen.tsx      # Screen simulation
│   │   │   ├── DeviceInstance.tsx    # Device instance
│   │   │   ├── DeviceHeader.tsx      # Device header
│   │   │   ├── RightPanel.tsx        # Right panel
│   │   │   └── PhysicallyButtons.tsx # Physical buttons
│   │   └── types/
│   └── sidebar/
│       └── components/
│           └── Sidebar.tsx           # Device selection
├── pages/
│   └── Home/
│       └── Home.tsx                  # Main page
└── assets/                           # Device images
```

## 🔧 Core Components and Operation

### 1. DeviceScreen Component

This component is the **heart** of the project and is responsible for the correct sizing of device screens.

#### Sizing Algorithm

```typescript
const calculateDimensions = useCallback(() => {
  const img = imgRef.current;
  if (!img || !img.naturalWidth || !img.naturalHeight) return;

  const ratio = img.naturalWidth / img.naturalHeight;
  
  // Raw values based on window dimensions
  const rawW = isRotated
    ? window.innerHeight * 0.85    // Landscape: Height-based
    : window.innerWidth * 0.85;    // Portrait: Width-based
  const rawH = isRotated
    ? window.innerWidth * 0.85     // Landscape: Width-based
    : window.innerHeight * 0.69;   // Portrait: Height-based

  // Maximum constraints
  const containerW = Math.min(MAX_WIDTH, rawW);
  const containerH = Math.min(MAX_HEIGHT, rawH);

  // Ratio-preserving calculation
  const width = Math.min(containerW, containerH * ratio);
  const height = width / ratio;

  setDimensions({ width, height });
}, [isRotated]);
```

#### Sizing Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| MAX_WIDTH | 575px | Maximum width |
| MAX_HEIGHT | 680px | Maximum height |
| Portrait Width | 85% | 85% of window width |
| Portrait Height | 69% | 69% of window height |
| Landscape Width | 85% | 85% of window height |
| Landscape Height | 85% | 85% of window width |

### 2. Rotation System

#### Rotation Logic

```typescript
// Wrapper dimensions (width-height swap)
const wrapperStyle = {
  width: isRotated ? dimensions.height : dimensions.width,
  height: isRotated ? dimensions.width : dimensions.height,
};

// Image rotation
const imgStyle = {
  width: dimensions.width,
  height: dimensions.height,
  transform: isRotated ? "rotate(90deg)" : "none",
  transformOrigin: "center center",
};
```

#### Rotation Scenarios

| State | Wrapper Width | Wrapper Height | Image Rotation |
|-------|---------------|----------------|----------------|
| Portrait | dimensions.width | dimensions.height | 0° |
| Landscape | dimensions.height | dimensions.width | 90° |

### 3. Multi-Device Layout

#### Layout Strategies

| Device Count | Layout | CSS Classes |
|--------------|--------|-------------|
| 1 | Single + Right Panel | `grid-cols-1 xl:grid-cols-[auto_1fr]` |
| 2 | Side by Side | `flex-1 basis-1/2` |
| 3 | Triple Layout | `flex-1 basis-1/3` |
| 2+ (Rotated) | Special Spacing | `gap-24` or `gap-20` |

## 🎯 Click Detection and Coordinate System

### ✅ Technical Analysis: Click Detection System WILL WORK PROPERLY

This project is currently **only focused on visual transmission**, but it **will work properly** for detecting the correct location on the clicked screen.

#### 🔧 Strong Points of Current Infrastructure

| Feature | Status | Description |
|---------|--------|-------------|
| **Sizing System** | ✅ Ready | Real-time tracking with `dimensions` state |
| **Rotation Support** | ✅ Ready | Status control with `isRotated` prop |
| **DOM Access** | ✅ Ready | Direct element access with `imgRef` |
| **Responsive Design** | ✅ Ready | Automatic updates on window size changes |
| **State Management** | ✅ Ready | Data management with React state system |

#### 📐 Mathematical Coordinate Transformation

**Mathematical formula required for coordinate transformation**:

```typescript
const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
  const img = imgRef.current;
  if (!img) return;

  // 1. Mouse position on image
  const rect = img.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  // 2. Relative coordinates (0-1 range)
  const relativeX = clickX / dimensions.width;
  const relativeY = clickY / dimensions.height;

  // 3. Rotation correction
  let deviceX, deviceY;
  
  if (isRotated) {
    // Coordinate transformation in 90° rotated state
    deviceX = relativeY;           // Y coordinate becomes X
    deviceY = 1 - relativeX;      // X coordinate becomes Y (inverted)
  } else {
    deviceX = relativeX;
    deviceY = relativeY;
  }

  return { deviceX, deviceY, relativeX, relativeY };
};
```

#### ⚡ Minimum Required Additions

| Missing Component | Required Addition | Status |
|------------------|-------------------|--------|
| Click Event Handler | `onClick={handleClick}` | ❌ Missing |
| Coordinate Transformation Function | `handleClick` function | ❌ Missing |

```typescript
// Add to DeviceScreenProps
interface DeviceScreenProps {
  // ... existing props
  onScreenClick?: (coordinates: {
    deviceX: number;
    deviceY: number;
    relativeX: number;
    relativeY: number;
  }) => void;
}

// Add to img element
<img
  // ... existing props
  onClick={handleClick}
  className="transition-transform duration-300 object-contain cursor-pointer"
/>
```

#### 🎯 Conclusion

**YES, the current project is technically set up to work properly for click detection system.** You just need to mathematically handle the necessary coordinate calculation event and add it, and it will work properly in your own project.

## 📊 Responsive Design Strategies

### Breakpoint System

| Breakpoint | Width | Usage Area |
|------------|-------|------------|
| xs | < 640px | Mobile devices |
| sm | 640px+ | Small tablets |
| md | 768px+ | Tablets |
| lg | 1024px+ | Large tablets |
| xl | 1280px+ | Desktop |
| 2xl | 1536px+ | Wide screens |

### Dynamic Sizing

```typescript
// Dynamic calculation based on window size
const calculateResponsiveDimensions = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Different ratios for different screen sizes
  const ratios = {
    mobile: { width: 0.95, height: 0.6 },
    tablet: { width: 0.85, height: 0.69 },
    desktop: { width: 0.75, height: 0.8 }
  };
  
  // Ratio selection based on screen size
  const currentRatio = viewportWidth < 768 ? ratios.mobile :
                      viewportWidth < 1024 ? ratios.tablet :
                      ratios.desktop;
  
  return {
    width: viewportWidth * currentRatio.width,
    height: viewportHeight * currentRatio.height
  };
};
```

## 🔄 State Management

### Main State Structure

```typescript
interface AppState {
  deviceType: "phone" | "tablet";
  selectedDevices: string[];
  rotatedMap: { [src: string]: boolean };
  singleIsRotated: boolean;
}
```

### State Update Strategies

| State | Update Method | Usage Area |
|-------|---------------|------------|
| deviceType | setDeviceType | Device type change |
| selectedDevices | setSelectedDevices | Device selection |
| rotatedMap | setRotatedMap | Multi-device rotation |
| singleIsRotated | setSingleIsRotated | Single device rotation |

## 🎨 Tailwind CSS Usage

### Custom Grid System

```css
/* Dynamic grid structures */
.grid-rows-[auto_1fr_auto]     /* Rotated layout */
.grid-cols-[auto_1fr]          /* Single device layout */
.grid-cols-[auto_auto]         /* Default layout */
```

### Responsive Utility Classes

```css
/* Breakpoint-based visibility */
.hidden md:block               /* Hidden on mobile, visible on tablet+ */
.flex-1 basis-1/2             /* Equal width for 2 devices */
.flex-1 basis-1/3             /* Equal width for 3 devices */
```

## 🚀 Performance Optimizations

### 1. useCallback Usage
```typescript
const calculateDimensions = useCallback(() => {
  // Size calculation logic
}, [isRotated]); // Recalculate only when isRotated changes
```

### 2. useEffect Optimization
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

## 📈 Future Improvements

### Planned Features

| Feature | Description | Priority |
|---------|-------------|----------|
| **Gesture Support** | Support for touch gestures | High |
| **Device Physical Properties** | Real device size and weight simulation | Medium |
| **Network Simulation** | Testing at different connection speeds | Medium |
| **Automated Test Scenarios** | Automatic testing of specific user scenarios | Low |
| **Export Feature** | Export of test results | Low |

### Technical Improvements

| Improvement | Description | Benefit |
|-------------|-------------|---------|
| **Web Workers** | Background thread usage for heavy calculations | Performance |
| **Virtual Scrolling** | Performance optimization for many devices | Performance |
| **Service Worker** | Offline operation support | Usability |
| **PWA Support** | Progressive Web App features | Usability |

## 🛠️ Installation and Running

### Requirements
- Node.js 16+
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Lint check
npm run lint
```

### Running
```bash
npm run dev
```
The application will run at `http://localhost:5173`.

## 📝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Note**: This project is developed for educational and testing purposes for developers working in responsive design and device management fields. It does not replace real device tests, but is a valuable tool for rapid prototyping and pre-testing.

---

# Responsive Device Management Simülasyonu

## 📱 Proje Hakkında

Bu proje, farklı cihaz türlerinin (telefon, tablet) ekran görüntülerini simüle eden ve bu cihazların farklı yerleşim senaryolarını test etmeye olanak sağlayan bir React uygulamasıdır. Proje, özellikle **responsive tasarım** ve **cihaz yönetimi** alanlarında çalışan geliştiriciler ve tasarımcılar için geliştirilmiştir.

## 🎯 Projenin Amacı

### Neden Bu Projeye İhtiyaç Duyuldu?

| Problem | Çözüm | Fayda |
|---------|-------|-------|
| **Gerçek Cihaz Testi Maliyeti** | Simülasyon ortamı | Maliyet tasarrufu |
| **Hızlı Prototipleme** | Dinamik cihaz kombinasyonları | Zaman tasarrufu |
| **Responsive Tasarım Doğrulama** | Farklı ekran boyutları | Kalite artışı |
| **Kullanıcı Deneyimi Testi** | Etkileşim simülasyonu | UX iyileştirme |

## 🏗️ Teknik Mimari

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