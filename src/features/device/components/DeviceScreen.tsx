import React from "react";
import PhysicallyButtons from "./PhysicallyButtons";

interface DeviceScreenProps {
  isRotated: boolean;
  src?: string;
  onDeviceTypeChange?: (type: "phone" | "tablet") => void;
}

const DeviceScreen: React.FC<DeviceScreenProps> = ({
  isRotated,
  src = "/src/assets/diktel.jpg",
  onDeviceTypeChange,
}) => {
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [deviceType, setDeviceType] = React.useState<"phone" | "tablet">(
    "phone"
  );

  // Görsel yüklendiğinde oranı kontrol et
  const handleImageLoad = () => {
    if (imgRef.current) {
      const img = imgRef.current;
      const ratio = img.naturalWidth / img.naturalHeight;
      let type: "phone" | "tablet" = "phone";
      // Eğer src'de 'diktel' geçiyorsa tablet olarak işaretle
      if (src && src.toLowerCase().includes("diktel")) {
        type = "tablet";
        setDeviceType("tablet");
      } else if (ratio > 0.9) {
        type = "tablet";
        setDeviceType("tablet");
      } else {
        type = "phone";
        setDeviceType("phone");
      }
      if (onDeviceTypeChange) {
        onDeviceTypeChange(type);
      }
    }
  };

  // Aspect-ratio'yu cihaz tipine ve rotasyona göre ayarla
  let aspectRatio;
  if (deviceType === "tablet") {
    aspectRatio = isRotated ? "16/9" : "4/3";
  } else {
    aspectRatio = isRotated ? "10/9" : "9/16";
  }

  return (
    <div className={`flex flex-col items-center ${deviceType === 'tablet' && isRotated ? 'w-full h-full' : 'w-auto h-full'}`}>
      {/* rotate ve dik oarlak sınırlandıralabilir. max ve min değerleri değiştirilebilir. 
      
      birden fazla cihaz olduğ senaryoda cihazların max ve minle stoplamış olucaz.
      */}
        {/* yükseklik genişlik oluyor genişlik ise yükseklik olarka uygulanıyor tablet totate  olunca imgiçerisinde       */}  
      <img
        ref={imgRef}
        src={src}
        alt="Telefon"
        className={`object-contain rounded-lg transition-transform duration-300 ${deviceType === 'tablet' && isRotated ? 'h-[100vh] w-[90vh] item-start  object-fill' : 'max-w-full max-h-full'} ${
          isRotated ? "rotate-90" : ""
        }`}
        style={{ aspectRatio }}
        onLoad={handleImageLoad}
      />
      <PhysicallyButtons />
    </div>
  );
};

export default DeviceScreen;
