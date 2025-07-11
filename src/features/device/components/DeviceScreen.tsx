import React from "react";
import PhysicallyButtons from "./PhysicallyButtons";

interface DeviceScreenProps {
  isRotated: boolean;
  src?: string;
}

const DeviceScreen: React.FC<DeviceScreenProps> = ({ isRotated, src = "/src/assets/phone.jpg" }) => {
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [imgWidth, setImgWidth] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    const handleWidth = () => {
      if (imgRef.current) {
        setImgWidth(imgRef.current.clientWidth);
      }
    };
    handleWidth();
    window.addEventListener('resize', handleWidth);
    return () => window.removeEventListener('resize', handleWidth);
  }, [isRotated, src]);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <img
        ref={imgRef}
        src={src}
        alt="Telefon"
        className={`object-contain rounded-lg transition-transform duration-300 max-w-full max-h-full ${
          isRotated ? 'rotate-90' : ''
        }`}
        style={{ aspectRatio: isRotated ? '3/6' : '9/16' }}
        onLoad={() => {
          if (imgRef.current) {
            setImgWidth(imgRef.current.clientWidth);
          }
        }}
      />
      <PhysicallyButtons isRotated={isRotated} width={imgWidth} />
    </div>
  );
};

export default DeviceScreen;