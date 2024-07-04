import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { saveAs } from "file-saver";

export function GenerateQr({ url }: { url: string }) {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const [hidden, setHidden] = useState<boolean>(false)
  
  useEffect(() => {
    setHidden(false)
    const generateQRCode = async () => {
      if (qrCanvasRef.current) {
        try {
          // Generar el código QR en un canvas
          await QRCode.toCanvas(qrCanvasRef.current, url, { width: 256 });
        } catch (error) {
          console.error("Error al generar el código QR:", error);
        }
      }
    };

    generateQRCode();
  }, [url]);

  useEffect(() => {
    document.addEventListener("click", (e)=>{
        const elemnet = e.target as HTMLElement
        if (elemnet.id !== "") {
            setHidden(true)
        }
        console.log(elemnet.id)
    })
  
  }, [])
  
  const handleDownload = () => {
    if (qrCanvasRef.current) {
      // Obtener el contexto del canvas
      const canvas = qrCanvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Convertir el canvas a un blob de imagen PNG
        canvas.toBlob((blob) => {
          if (blob) {
            // Descargar el archivo usando file-saver
            saveAs(blob, "qrcode.png");
          } else {
            console.error("Error al generar el blob de imagen.");
          }
        }, "image/png");
      }
    }
  };

  return (
    <div id="qr" className={`${hidden ? "hidden" : ""} fixed top-0 left-0 w-full h-full animate-blurred-fade-in animate-duration-250 flex items-center justify-center bg-slate-800/50 backdrop-blur-lg`}>
      <div className="bg-white p-4 rounded-lg flex flex-col items-center shadow-lg">
        <canvas ref={qrCanvasRef} width={256} height={256} />
        <button
          onClick={handleDownload}
          className="mt-2 px-5 py-3 bg-black hover:bg-black/65 text-white font-semibold rounded-2xl flex items-center transition-all hover:scale-105"
        >
          Descargar QR
        </button>
      </div>
    </div>
  );
}
