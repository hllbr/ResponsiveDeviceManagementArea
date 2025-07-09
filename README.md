# Responsive Device Management

## 📋 Proje Özeti
Bu proje, mobil cihaz yönetimi için responsive bir web uygulamasıdır. React, TypeScript ve Tailwind CSS kullanılarak geliştirilmiştir. Modern responsive tasarım prensipleri ve esnek layout yapısı ile farklı ekran boyutlarında optimal kullanıcı deneyimi sunar.

## 🏗️ Mimari Yapı

### Ana Layout Organizasyonu
Uygulama, **4 ana bölümden** oluşan temiz ve organize bir yapıya sahiptir:

```
┌─────────────────────────────────────────────────────┐
│ SIDEBAR │        ANA ALAN                           │
│         │ ┌─────────────────────────────────────────┐ │
│         │ │     DEVICE DETAILS (Header)             │ │
│         │ └─────────────────────────────────────────┘ │
│         │ ┌──────────────────┬──────────────────────┐ │
│         │ │   DEVICE AREA    │    RIGHT PANEL       │ │
│         │ │  (Sol Panel)     │   (Sağ Panel)        │ │
│         │ │                  │                      │ │
│         │ └──────────────────┴──────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## 🎯 Bileşen Yapısı

### 1. **Sidebar** (`src/features/sidebar/components/Sidebar.tsx`)
- **Desktop**: Sol tarafta sabit dikey panel (4vw genişlik)
- **Mobile**: Üstte yatay panel (full genişlik)
- **Responsive Özellikler**:
  - `lg:w-[4vw]` - Desktop'ta viewport genişliğinin %4'ü
  - `lg:min-w-[44px]` - Minimum genişlik garantisi
  - `lg:max-w-[56px]` - Maksimum genişlik sınırı

### 2. **Ana Alan Container**
Ana içerik alanı esnek yapı ile tasarlanmıştır:
```tsx
<div className="flex-1 flex flex-col px-4 lg:px-8 py-4 lg:py-8 gap-4 min-w-0">
```

### 3. **Device Details** (`src/features/deviceDetails/components/DeviceDetails.tsx`)
- Ana alanın üst kısmında header benzeri bölüm
- **Sabit yükseklik**: `min-h-[48px] h-12 lg:h-14`
- Responsive padding ve font boyutları

### 4. **Main Content** (İki Panelli Alan)
İki ana panel yan yana konumlandırılmıştır:

#### a) **Device Area** (Sol Panel)
- Cihaz simülasyon alanı
- **Responsive genişlik**: `max-w-[90vw] lg:max-w-[600px]`
- **Minimum yükseklik**: `min-h-[50vh] lg:min-h-[220px]`

#### b) **Right Panel** (Sağ Panel)  
- Kontrol ve bilgi paneli
- **Minimum yükseklik**: `min-h-[300px] lg:min-h-[400px]`

## 🎭 Aspect Ratio Sistemi

### 📖 Aspect Ratio Nedir ve Ne İşe Yarar?

**Aspect Ratio (En/Boy Oranı)**, bir elementin genişliğinin yüksekliğine oranını ifade eder. Modern web geliştirmede kritik bir CSS özelliğidir.

#### 🔍 **Temel Kavram**
```
Aspect Ratio = Genişlik : Yükseklik
```

**Yaygın Oranlar:**
- `16:9` → Geniş ekran TV, laptop ekranları (1.78:1)
- `9:16` → Dikey telefon ekranı (0.56:1)  
- `4:3` → Eski TV ekranları (1.33:1)
- `1:1` → Kare format (Instagram post)

#### ⚡ **Ne İşe Yarar?**

1. **Responsive Tasarım Garantisi**
   ```css
   aspect-[16/9]  /* Genişlik ne olursa olsun, yükseklik otomatik hesaplanır */
   ```
   - Ekran boyutu değişse bile oran korunur
   - Manuel height hesaplaması gerekmez

2. **Layout Shift Önleme**
   - İçerik yüklenmeden önce alan rezerve edilir
   - Sayfa "zıplaması" (CLS) önlenir
   - Kullanıcı deneyimi iyileşir

3. **Cross-Device Uyumluluk**
   - Telefon, tablet, desktop'ta aynı görünüm
   - Responsive breakpoint'ler arası tutarlılık

#### 🛠️ **CSS Aspect Ratio Nasıl Çalışır?**

**Geleneksel Yöntem (Eski)**:
```css
/* Karmaşık padding hack */
.container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 = 9/16 * 100% */
}
.content {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}
```

**Modern CSS Aspect Ratio (Yeni)**:
```css
/* Basit ve direkt */
.container {
  aspect-ratio: 16 / 9;
  width: 100%;
  /* height otomatik hesaplanır! */
}
```

#### 📱 **Projemizdeki Kullanım Örneği**

**DeviceScreen Component'inde:**
```tsx
className={`${isRotated 
  ? 'aspect-[16/9]'  // Telefon yatay tutulduğunda
  : 'aspect-[9/16]'   // Telefon dikey tutulduğunda  
}`}
```

**Gerçek Hayatta Ne Olur?**
- Kullanıcı "Döndür" butonuna tıklar
- `isRotated` state değişir  
- CSS class değişir: `aspect-[9/16]` → `aspect-[16/9]`
- Ekran otomatik olarak oran değiştirir
- Width sabit kalır, height yeniden hesaplanır

#### 🎯 **Avantajları**

1. **Otomatik Hesaplama**
   ```css
   /* Width: 300px ise */
   aspect-[16/9]  /* Height: 300 × (9/16) = 168.75px */
   aspect-[9/16]  /* Height: 300 × (16/9) = 533.33px */
   ```

2. **Performans**
   - Browser engine seviyesinde optimize
   - JavaScript hesaplama gerekmez
   - GPU hızlandırması destekli

3. **Maintainability**
   - Tek satır CSS ile kontrol
   - Responsive behavior otomatik
   - Cross-browser uyumlu

#### ⚠️ **Dikkat Edilmesi Gerekenler**

1. **Min/Max Constraints ile Kombine Kullanım**
   ```css
   aspect-[16/9] min-h-[180px] max-h-[250px]
   ```
   - Aspect ratio uygulanır
   - Ama min/max limitler içinde kalır

2. **Flexbox ile Etkileşim**
   ```css
   flex-1 aspect-[16/9]  /* Flex büyümesi + oran korunması */
   ```

3. **Content Overflow**
   - İçerik aspect ratio'dan büyükse taşma olabilir
   - `overflow: hidden` gerekebilir

## 📐 Width, Height ve Aspect Ratio Sistemi

### 🎯 Aspect Ratio (En/Boy Oranı) Kullanımı
Projede modern CSS aspect-ratio özelliği kullanılarak cihaz ekranı oranları kontrol edilir:

**DeviceScreen Component'inde:**
```tsx
className={`${isRotated 
  ? 'aspect-[16/9] min-h-[180px] max-h-[250px]'  // Yatay mod: 16:9 oran
  : 'aspect-[9/16] min-h-[400px] max-h-[600px]'   // Dikey mod: 9:16 oran
}`}
```

**Neden Kullanılır?**
- **Responsive Oran Korunması**: Ekran boyutu değişse de cihaz oranı sabit kalır
- **Gerçekçi Simülasyon**: Gerçek telefon oranlarını (16:9, 9:16) taklit eder
- **Otomatik Boyutlandırma**: Width belirlendiğinde height otomatik hesaplanır

### 📏 Width Constraint Stratejileri

#### 1. **Viewport Tabanlı Genişlik**
```css
w-[4vw]        /* Viewport genişliğinin %4'ü */
max-w-[90vw]   /* Maksimum viewport genişliğinin %90'ı */
```
**Kullanım Amacı**: Farklı ekran boyutlarında orantılı ölçeklendirme

#### 2. **Fractional Width (Kesirli Genişlik)**
```css
w-4/5          /* Parent'ın %80'i (4/5) */
```
**Sidebar'da Kullanımı**: İç content'in parent'a oranı

#### 3. **Fixed + Constraint Kombinasyonu**
```css
w-full lg:w-48 min-w-[200px] max-w-[300px] lg:max-w-[250px]
```
**DeviceActionButtonGroup'ta:**
- Mobile: `w-full` (tam genişlik)
- Desktop: `lg:w-48` (192px sabit)
- Minimum: `min-w-[200px]` (200px altına düşmez)
- Maksimum: `max-w-[300px]` mobile, `lg:max-w-[250px]` desktop

### 📐 Height Control Sistemleri

#### 1. **Min-Height (min-h) Katmanlı Yaklaşım**
```css
min-h-screen     /* Ana container - tam ekran garantisi */
min-h-[48px]     /* Header'lar - minimum yükseklik */
min-h-[50vh]     /* Ana content - viewport yüksekliğinin %50'si */
min-h-0          /* Flexbox children - shrinking kontrolü */
```

#### 2. **Max-Height (max-h) Sınırlamaları**
```css
max-h-[250px]    /* Yatay ekran maksimum yükseklik */
max-h-[600px]    /* Dikey ekran maksimum yükseklik */
```
**Amacı**: Çok büyük ekranlarda component'lerin aşırı büyümesini önler

#### 3. **Sabit Height + Responsive**
```css
h-12 lg:h-14     /* Mobile: 48px, Desktop: 56px */
h-20             /* Sabit 80px (PhysicallyButtons) */
```

### 🔧 Arbitrary Values (Özel Değerler)

Tailwind'in `[değer]` syntaxı ile özel CSS değerleri kullanılır:

```css
w-[4vw]          /* Custom viewport width */
min-w-[44px]     /* Custom minimum genişlik */
min-h-[48px]     /* Custom minimum yükseklik */
max-w-[600px]    /* Custom maksimum genişlik */
aspect-[16/9]    /* Custom aspect ratio */
```

**Neden Arbitrary Values?**
- Tasarım sistemi dışında spesifik değerler gerektiğinde
- Viewport units (vw, vh) için
- Aspect ratio gibi modern CSS özellikler için

### 🌊 Responsive Scaling Mantığı

#### Mobile → Desktop Geçiş Stratejisi:

1. **Container Scaling**:
   ```css
   /* Mobile: Tam genişlik, minimum padding */
   w-full px-4 py-4
   
   /* Desktop: Sabit boyutlar, büyük padding */
   lg:w-[600px] lg:px-8 lg:py-8
   ```

2. **Content Adaptation**:
   ```css
   /* Mobile: Dikey stack */
   flex-col gap-4
   
   /* Desktop: Yatay layout */
   lg:flex-row lg:gap-8
   ```

3. **Proportional Scaling**:
   ```css
   /* Ekran boyutuna göre orantılı büyüme */
   min-h-[50vh] lg:min-h-[220px]
   max-w-[90vw] lg:max-w-[600px]
   ```

### 🎛️ Width/Height Öncelik Sıralaması

1. **min-width/min-height** - En yüksek öncelik
2. **max-width/max-height** - Orta öncelik  
3. **width/height** - En düşük öncelik

Bu sistem sayesinde responsive ve esnek layout garantilenir.

## 🔄 Responsive Ölçeklendirme ve Component Visibility Sistemi

### 📊 Breakpoint Stratejisi ve Component Görünürlüğü

Uygulama **Progressive Enhancement** prensibiyle tasarlanmıştır - ekran boyutu arttıkça daha fazla özellik devreye girer:

| Ekran Boyutu | Breakpoint | Sidebar | DeviceArea | Right Panel | ActionGroup | Layout |
|--------------|------------|---------|------------|-------------|-------------|--------|
| **Çok Küçük** | `< 768px` | ✅ Dikey | ✅ Tek panel | ❌ Gizli | ❌ Gizli | Minimal |
| **Orta** | `768px - 1024px` | ✅ Dikey | ✅ Ana panel | ✅ Alta iner | ❌ Gizli | İki panel |
| **Büyük** | `1024px - 1280px` | ✅ Dikey | ✅ Sol panel | ✅ Alta iner | ✅ İçerde | Desktop |
| **Çok Büyük** | `≥ 1280px` | ✅ Dikey | ✅ Sol panel | ✅ Sağ panel | ✅ İçerde | Full desktop |

### 🎯 Component Visibility Rules

#### **DeviceActionButtonGroup** (`Cihaz Eylemleri`)
```css
hidden lg:flex          /* Sadece 1024px+ ekranlarda görünür */
```
- **Rationale**: Küçük ekranlarda döndürme işlevi gerekli değil
- **UX Impact**: Mobile'da daha temiz, odaklı deneyim

#### **Right Panel**  
```css
hidden md:flex          /* Sadece 768px+ ekranlarda görünür */
```
- **Rationale**: Çok küçük ekranlarda ikincil panel gereksiz
- **UX Impact**: Ana işlevselliğe odaklanma

### 📐 Responsive Layout Transformation

#### **Çok Küçük Ekranlar (< 768px)**
```
┌─────────────────────────────────┐
│ S │ ┌─────────────────────────┐ │
│ I │ │    DEVICE DETAILS       │ │
│ D │ └─────────────────────────┘ │
│ E │ ┌─────────────────────────┐ │
│ B │ │    DEVICE HEADER        │ │
│ A │ ├─────────────────────────┤ │
│ R │ │                         │ │
│   │ │    DEVICE SCREEN        │ │
│   │ │                         │ │
│   │ ├─────────────────────────┤ │
│   │ │  PHYSICALLY BUTTONS     │ │
│   │ └─────────────────────────┘ │
└─────────────────────────────────┘
```

#### **Orta Ekranlar (768px - 1024px)**
```
┌─────────────────────────────────┐
│ S │ ┌─────────────────────────┐ │
│ I │ │    DEVICE DETAILS       │ │
│ D │ └─────────────────────────┘ │
│ E │ ┌─────────────────────────┐ │
│ B │ │    DEVICE AREA          │ │
│ A │ │                         │ │
│ R │ └─────────────────────────┘ │
│   │ ┌─────────────────────────┐ │
│   │ │    RIGHT PANEL          │ │
│   │ └─────────────────────────┘ │
└─────────────────────────────────┘
```

#### **Büyük Ekranlar (≥ 1024px)**
```
┌─────────────────────────────────────────────┐
│ S │ ┌─────────────────────────────────────┐ │
│ I │ │        DEVICE DETAILS               │ │
│ D │ └─────────────────────────────────────┘ │
│ E │ ┌──────────────────┬──────────────────┐ │
│ B │ │  DEVICE AREA     │   RIGHT PANEL    │ │
│ A │ │ ┌──────┬───────┐ │                  │ │
│ R │ │ │SCREEN│ACTION │ │                  │ │
│   │ │ │      │GROUP  │ │                  │ │
│   │ │ └──────┴───────┘ │                  │ │
│   │ └──────────────────┴──────────────────┘ │
└─────────────────────────────────────────────┘
```

### 🔄 Rotation System (Cihaz Döndürme)

#### **Normal Durum** (Dikey Telefon)
- **DeviceArea**: `xl:flex-[5]` → ~45.5% genişlik
- **Right Panel**: `xl:flex-[6]` → ~54.5% genişlik
- **DeviceScreen**: `aspect-[9/16]` → Dikey oran
- **Container**: `max-w-[450px]`

#### **Rotation Durumu** (Yatay Telefon)  
- **DeviceArea**: `xl:flex-[6]` → ~54.5% genişlik ⬆️
- **Right Panel**: `xl:flex-[5]` → ~45.5% genişlik ⬇️  
- **DeviceScreen**: `aspect-[16/9]` → Yatay oran
- **Container**: `max-w-[700px]` → Daha geniş

### 🎨 Responsive Height Management

#### **DeviceScreen Height Strategy**
```css
/* Dikey Mod */
aspect-[9/16] min-h-[320px] max-h-[600px]

/* Yatay Mod */  
aspect-[16/9] min-h-[180px] max-h-[280px]
```

#### **PhysicallyButtons Harmony**
```css
/* Dikey Mod */
h-20 min-h-[60px] max-h-[80px]

/* Yatay Mod */
h-16 min-h-[50px] max-h-[60px]    /* Proportional scaling */
```

#### **Right Panel Adaptive Height**
```css
min-h-[400px] xl:min-h-0          /* Mobile'da sabit, desktop'ta uyumlu */
```

### 📱 Sidebar Behavior

#### **Position Strategy**
```css
/* Sabit yan pozisyon */
w-[12vw] min-w-[48px] max-w-[72px]     /* Mobile: 12% viewport */
lg:w-[4vw] lg:min-w-[44px] lg:max-w-[56px]  /* Desktop: 4% viewport */

/* Sticky positioning */
min-h-screen sticky top-0               /* Scroll'da üstte kalır */
```

### 🌊 Scroll Behavior

#### **Global Page Scroll**
```css
/* Ana container */
min-h-screen                      /* Natural height, scroll allowed */

/* Sidebar */  
sticky top-0                      /* Scroll'da sabit kalır */

/* Content */
natural flow                      /* Normal document flow */
```

**Rationale**: Desktop uygulaması yerine web-native scroll davranışı

## 🛠️ Teknoloji Stack'i

- **React 18.2.0** - Modern hooks ve concurrent features
- **TypeScript** - Type safety ve developer experience
- **Tailwind CSS 3.4.4** - Utility-first CSS framework
- **React Router DOM** - Routing yönetimi  
- **Vite** - Hızlı build tool ve dev server

## 📁 Dosya Organizasyonu

```
src/
├── features/               # Feature-based organization
│   ├── device/            # Cihaz yönetimi bileşenleri
│   │   └── components/
│   ├── deviceDetails/     # Cihaz detay bileşenleri  
│   │   └── components/
│   └── sidebar/           # Sidebar bileşenleri
│       └── components/
├── pages/                 # Sayfa bileşenleri
│   └── Home/
└── assets/               # Statik dosyalar
```

## 🚀 Çalıştırma Talimatları

```bash
# Bağımlılıkları yükle
npm install

# Development server başlat
npm run dev

# Production build
npm run build

# Linting
npm run lint
```

## 🎨 Tasarım Prensipleri

1. **Mobile First**: Önce mobil tasarım, sonra desktop adaptasyonu
2. **Flexbox Layout**: Esnek ve responsive düzen
3. **Consistent Spacing**: 4px grid sistemi (gap-4, p-4, etc.)
4. **Color Coded Sections**: Her bölüm farklı renk teması
5. **Shadow & Rounded Corners**: Modern görsel tasarım

## 💡 Geliştirici Notları ve Best Practices

### 🏗️ **Architecture Decisions**

#### **State Management**
```tsx
// Rotation state Home component'inde centralized
const [isRotated, setIsRotated] = useState(false);

// Props drilling yerine context kullanılabilir (future enhancement)
<DeviceArea isRotated={isRotated} onRotate={handleRotate} />
```

#### **Component Composition**
```tsx
// Conditional rendering for responsive behavior
<div className="hidden lg:flex">          // DeviceActionButtonGroup
<div className="hidden md:flex">          // Right Panel  
```

### ⚡ **Performance Optimizations**

#### **CSS-Only Responsive Design**
- **Zero JavaScript** breakpoint detection
- **GPU-accelerated** transforms and animations
- **Single-pass** layout calculations

#### **Component Rendering Strategy**
| Ekran Boyutu | Rendered Components | Performance Impact |
|--------------|-------------------|-------------------|
| Mobile | 4 components | ⚡ Fastest |
| Tablet | 5 components | ⚡ Fast |
| Desktop | 6 components | ⚡ Optimized |

#### **Memory Management**
```css
/* Efficient flex calculations */
flex-[5] vs flex-[6]              /* Minimal recalculation */

/* Optimized aspect ratios */
aspect-[16/9]                     /* Native CSS, no JS */
```

### 🎯 **UX Design Principles**

#### **Progressive Disclosure**
1. **Mobile**: Sadece core functionality (DeviceScreen)
2. **Tablet**: + Right Panel (extended features)  
3. **Desktop**: + ActionGroup (full control)

#### **Visual Hierarchy**
```css
/* Z-index management */
Sidebar: sticky top-0             /* Always visible */
DeviceDetails: flex-shrink-0      /* Fixed header */
Main content: flex-1              /* Flexible body */
```

### 🔧 **Development Workflow**

#### **Adding New Breakpoints**
```css
/* Example: Adding 2XL support */
2xl:w-[3vw]                      /* Sidebar */
2xl:max-w-[800px]                /* DeviceArea */
2xl:flex-[7]                     /* Custom ratios */
```

#### **Component Extension Pattern**
```tsx
// Future component additions
interface ComponentProps {
  isRotated?: boolean;           // Standard rotation prop
  screenSize?: 'sm' | 'md' | 'lg';  // Responsive prop
}
```

### 📊 **Responsive Testing Strategy**

#### **Critical Breakpoints**
- **320px**: Minimum mobile
- **768px**: Right Panel threshold  
- **1024px**: ActionGroup threshold
- **1280px**: Rotation ratio threshold

#### **Test Matrix**
| Device Type | Width Range | Components Visible | Key Features |
|-------------|-------------|-------------------|--------------|
| Phone | 320-767px | DeviceArea only | Core functionality |
| Tablet | 768-1023px | DeviceArea + Right Panel | Extended features |
| Laptop | 1024-1279px | + ActionGroup | Full control |
| Desktop | 1280px+ | + Optimized ratios | Premium experience |

### 🚀 **Deployment Considerations**

#### **Bundle Size Optimization**
- **Tailwind CSS**: Only used classes included
- **Tree Shaking**: Unused components excluded
- **Component Lazy Loading**: Ready for code splitting

#### **Browser Support**
- **CSS Grid/Flexbox**: Modern browsers
- **Aspect Ratio**: Chrome 88+, Firefox 89+, Safari 15+
- **Sticky Positioning**: IE 11+ fallback available

### 🔮 **Future Enhancements**

#### **Planned Features**
1. **Animation System**: Smooth transitions between states
2. **Theme Support**: Dark/light mode integration  
3. **Accessibility**: Enhanced ARIA support
4. **PWA Features**: Offline capability

#### **Scalability Roadmap**
```tsx
// Context API integration
<ResponsiveProvider>
  <DeviceManagement />
</ResponsiveProvider>

// Advanced breakpoint system
const { isMobile, isTablet, isDesktop } = useResponsive();
```

## 🔧 Yapılandırma Dosyaları

- `tailwind.config.js` - Tailwind özelleştirmeleri
- `tsconfig.json` - TypeScript ayarları  
- `vite.config.js` - Build tool konfigürasyonu
- `eslint.config.js` - Code quality kuralları

## 📋 Team Guidelines ve İş Akışı

### 👥 **Takım için Hızlı Referans**

#### **Responsive Development Checklist**
- [ ] Component mobile-first tasarlandı mı?
- [ ] Tüm breakpoint'lerde test edildi mi? (320px, 768px, 1024px, 1280px)
- [ ] Component visibility kuralları uygulandı mı?
- [ ] Aspect ratio ve height harmony korunuyor mu?

#### **Code Review Points**
```tsx
// ✅ Good: Progressive enhancement
<div className="hidden md:flex lg:block">

// ❌ Bad: Desktop-first approach  
<div className="block lg:hidden">
```

#### **Performance Guidelines**
- **CSS-first**: JavaScript'ten önce CSS çözümlerini tercih et
- **Lazy loading**: Büyük component'leri lazy load et
- **Bundle optimization**: Sadece kullanılan CSS class'ları include et

### 🎯 **Business Value Summary**

#### **Kullanıcı Deneyimi**
- **Mobile-first**: %70+ mobil kullanıcı için optimize
- **Progressive Enhancement**: Her cihazda optimal deneyim
- **Performance**: Hızlı yükleme ve smooth etkileşim

#### **Geliştirici Deneyimi**  
- **Type Safety**: TypeScript ile güvenli geliştirme
- **Component Reusability**: Modüler yapı
- **Easy Maintenance**: Clear separation of concerns

#### **İş Değeri**
- **Cross-platform compatibility**: Tek codebase, tüm cihazlar
- **Future-proof architecture**: Yeni özellikler kolayca eklenebilir
- **Modern tech stack**: Güncel teknolojiler ve best practices

## 🏆 Conclusion

Bu **Responsive Device Management** uygulaması, modern web geliştirmede best practice'lerin bir örneğidir:

### ✨ **Temel Başarılar:**
1. **🎯 Progressive Enhancement** - Ekran boyutuna göre özellik artışı
2. **📱 Mobile-First Design** - Önce mobil, sonra desktop yaklaşımı  
3. **⚡ Performance Optimized** - CSS-only responsive, minimal JavaScript
4. **🔧 Developer Friendly** - Type-safe, modular, maintainable kod
5. **🎨 Visual Consistency** - Tüm breakpoint'lerde harmony

### 🚀 **Teknik Mükemmellik:**
- **Modern CSS**: Aspect ratio, flexbox, grid kombinasyonu
- **Smart State Management**: Centralized rotation state
- **Responsive Architecture**: Component visibility stratejisi
- **Clean Code**: SOLID principles ve separation of concerns

Bu yapı, farklı ekran boyutlarında tutarlı kullanıcı deneyimi sağlayarak, **modern web uygulaması standartlarını** karşılar ve takımın gelecekteki projelerinde **referans alınabilecek** kalitede bir foundation sunar.

---
**💡 Not**: Bu dokümantasyon projenin technical evolution'ını yansıtır ve yeni team member'ların onboarding sürecini hızlandırmak için tasarlanmıştır.
