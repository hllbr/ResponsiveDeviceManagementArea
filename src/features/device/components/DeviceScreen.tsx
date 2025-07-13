import React from "react";
import PhysicallyButtons from "./PhysicallyButtons";

interface DeviceScreenProps {
  isRotated: boolean;
  src?: string;
  onDeviceTypeChange?: (type: "phone" | "tablet") => void;
}

const DeviceScreen: React.FC<DeviceScreenProps> = ({
  isRotated,
  src = "/src/assets/halil.jpg",
  onDeviceTypeChange,
}) => {
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [imgWidth, setImgWidth] = React.useState<number | undefined>(undefined);
  const [deviceType, setDeviceType] = React.useState<"phone" | "tablet">(
    "phone"
  );

  React.useEffect(() => {
    const handleWidth = () => {
      if (imgRef.current) {
        setImgWidth(imgRef.current.clientWidth);
      }
    };
    handleWidth();
    window.addEventListener("resize", handleWidth);
    return () => window.removeEventListener("resize", handleWidth);
  }, [isRotated, src]);

  // Görsel yüklendiğinde oranı kontrol et
  const handleImageLoad = () => {
    if (imgRef.current) {
      setImgWidth(imgRef.current.clientWidth);
      const img = imgRef.current;
      const ratio = img.naturalWidth / img.naturalHeight;
      let type: "phone" | "tablet" = "phone";
      if (ratio > 0.9) {
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
    aspectRatio = isRotated ? "4/3" : "4/3";
  } else {
    aspectRatio = isRotated ? "10/9" : "9/16";
  }

  return (
    <div className="flex flex-col items-center w-auto h-full">
      {/* rotate ve dik oarlak sınırlandıralabilir. max ve min değerleri değiştirilebilir. 
      
      birden fazla cihaz olduğ senaryoda cihazların max ve minle stoplamış olucaz.
      */}
      <img
        ref={imgRef}
        src={src}
        alt="Telefon"
        className={`object-contain rounded-lg transition-transform duration-300 max-w-full max-h-full ${
          isRotated ? "rotate-90" : ""
        }`}
        style={{ aspectRatio }}
        onLoad={handleImageLoad}
      />
      <PhysicallyButtons isRotated={isRotated} width={imgWidth} />
    </div>
  );
};

export default DeviceScreen;
