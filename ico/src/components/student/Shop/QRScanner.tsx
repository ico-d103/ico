
import React, { useEffect, useRef } from 'react';
import { BrowserQRCodeReader, Result } from '@zxing/library';
import { NotFoundException } from '@zxing/library';

const QRScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();

    const showCamera = async () => {
        if( videoRef.current) {
      try {
        const videoElement = videoRef.current;

        const constraints: MediaStreamConstraints = {
          video: { facingMode: 'environment' },
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        videoElement.srcObject = stream;
        videoElement.play();

        codeReader.decodeOnceFromVideoDevice(undefined, videoElement).then((res) => handleQrCodeScan(res)).catch(console.error);
      } catch (error) {
        console.error(error);
      }
    }
    };

    const handleQrCodeScan = (result: Result | null, error?: any) => {
      if (result) {
        console.log('QR code detected:', result.getText());
      }
      if (error && !(error instanceof NotFoundException)) {
        console.error(error);
      }
    };

    showCamera();

    return () => {
      codeReader.reset();
    };
  }, []);

  return <video ref={videoRef} />;
};

export default QRScanner;





