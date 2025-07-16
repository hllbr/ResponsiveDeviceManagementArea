import React, { useCallback, useEffect, useRef, useState } from "react";

interface DeviceScreenProps {
  /** true ise yatay (landscape), false ise dikey (portrait) */
  isRotated: boolean;
  /** Her boyutta ve herhangi bir kaynaktan gelebilecek cihaz resmi */
  src: string;
  /**
   * Kullanıcının tıkladığı/noktaya bastığı yeri
   * [0,1] aralığında normalize edilmiş { x, y } ile bildirir
   */
  onPointerClick?: (coords: { x: number; y: number }) => void;
}

const DeviceScreen: React.FC<DeviceScreenProps> = ({
  isRotated,
  src,
  onPointerClick,
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

  // Tıklamayı wrapper boyutuna göre [0,1] normalize eder
  const normalizePointer = useCallback((evt: React.MouseEvent) => {
    const wrap = wrapperRef.current;
    if (!wrap) return { x: -1, y: -1 };
    const rect = wrap.getBoundingClientRect();
    const x = (evt.clientX - rect.left) / rect.width;
    const y = (evt.clientY - rect.top) / rect.height;
    return { x: Math.min(Math.max(x, 0), 1), y: Math.min(Math.max(y, 0), 1) };
  }, []);

  const handleClick = (evt: React.MouseEvent) => {
    if (onPointerClick) onPointerClick(normalizePointer(evt));
  };

  useEffect(() => {
    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, [calculateDimensions, src, isRotated]);

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
      onClick={handleClick}
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
