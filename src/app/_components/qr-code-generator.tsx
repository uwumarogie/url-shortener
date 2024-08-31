import React, { useRef } from "react";
import { toPng } from "html-to-image";
import QRCode from "react-qr-code";

export default function QRCodeGenerator({ shortUrl }: { shortUrl: string }) {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = async () => {
    if (qrRef.current) {
      try {
        const dataUrl = await toPng(qrRef.current);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Failed to download QR code", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div ref={qrRef} className="bg-white p-4">
        <QRCode value={shortUrl} size={256} />
      </div>
      <button onClick={downloadQRCode} className="text-black hover:bg-gray-200 focus:bg-gray-200 p-3 rounded-xl">Download QR Code</button>
    </div>
  );
}
