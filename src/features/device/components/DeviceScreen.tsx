import React, { useCallback, useEffect, useRef, useState } from "react";

interface DeviceScreenProps {
  /** true ise yatay (landscape), false ise dikey (portrait) */
  isRotated: boolean;
  /** Her boyutta ve herhangi bir kaynaktan gelebilecek cihaz resmi */
  src: string;
  onWidthChange?: (width: number) => void;
}

const DeviceScreen: React.FC<DeviceScreenProps> = ({
  isRotated,
  src,
  onWidthChange,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const MAX_WIDTH = 575;
  const MAX_HEIGHT = 680;

  // Görüntünün doğal en-boy oranını bozmadan,
  // pencere ve MAX kısıtlarına göre hesaplar
  const calculateDimensions = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth || !img.naturalHeight) return;

    const ratio = img.naturalWidth / img.naturalHeight;
    // portrait için window.innerWidth*0.85, landscape için innerHeight*0.85
    const rawW = isRotated
      ? window.innerHeight * 0.85
      : window.innerWidth * 0.85;
    const rawH = isRotated
      ? window.innerWidth * 0.85
      : window.innerHeight * 0.85;

    const containerW = Math.min(MAX_WIDTH, rawW);
    const containerH = Math.min(MAX_HEIGHT, rawH);

    const width = Math.min(containerW, containerH * ratio);
    const height = width / ratio;

    setDimensions({ width, height });
  }, [isRotated]);

  useEffect(() => {
    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, [calculateDimensions, src, isRotated]);

  useEffect(() => {
    if (onWidthChange) {
      onWidthChange(isRotated ? dimensions.height : dimensions.width);
    }
  }, [dimensions, isRotated, onWidthChange]);

  // Wrapper’da döndürme durumuna göre en-boy takası
  const wrapperStyle = {
    width: isRotated ? dimensions.height : dimensions.width,
    height: isRotated ? dimensions.width : dimensions.height,
  };

  // <img> kendi ölçüsünde çizilir ve merkezden döndürülür
  const imgStyle = {
    width: dimensions.width,
    height: dimensions.height,
    transform: isRotated ? "rotate(90deg)" : "none",
    transformOrigin: "center center" as const,
  };

  return (
    <div
      ref={wrapperRef}
      className="flex items-center justify-center overflow-hidden"
      style={wrapperStyle}
    >
      <img
        ref={imgRef}
        src={src}
        alt="Cihaz Ekranı"
        onLoad={calculateDimensions}
        className="transition-transform duration-300 object-contain"
        style={imgStyle}
      />
    </div>
  );
};

export default DeviceScreen;
