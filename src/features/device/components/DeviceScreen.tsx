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
  const [imageSize, setImageSize] = React.useState<{ width: number; height: number } | null>(null);

  // Görsel yüklendiğinde oranı kontrol et
  const handleImageLoad = () => {
    if (imgRef.current) {
      const img = imgRef.current;
      const ratio = img.naturalWidth / img.naturalHeight;
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
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

  // Aspect-ratio'yu görsel boyutlarına ve rotasyona göre ayarla
  let aspectRatio;
  if (imageSize) {
    aspectRatio = isRotated
      ? `${imageSize.height}/${imageSize.width}`
      : `${imageSize.width}/${imageSize.height}`;
  } else if (deviceType === "tablet") {
    aspectRatio = isRotated ? "16/9" : "4/3";
  } else {
    aspectRatio = isRotated ? "10/9" : "9/16";
  }

  return (
    <div className={`flex flex-col items-center ${deviceType === 'tablet' && isRotated ? 'w-full h-full' : 'w-auto h-full'}`}>
      {/* rotate ve dik oarlak sınırlandıralabilir. max ve min değerleri değiştirilebilir. 
      
      birden fazla cihaz olduğ senaryoda cihazların max ve minle stoplamış olucaz.
      */}
      <img
        ref={imgRef}
        src={src}
        alt="Telefon"
        className={`block object-contain rounded-lg transition-transform duration-300 ${deviceType === 'tablet' && isRotated ? 'w-full h-full' : 'max-w-full max-h-full'} ${
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
