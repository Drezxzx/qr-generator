import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { saveAs } from "file-saver";
import { IconX } from "@tabler/icons-react";

export function GenerateQr({ url, setUrl }: { url: string, setUrl : React.Dispatch<React.SetStateAction<string>> }) {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    
    const generateQRCode = async () => {
      if (qrCanvasRef.current) {
        try {
          await QRCode.toCanvas(qrCanvasRef.current, url, { width: 256 });
        } catch (error) {
          console.error("Error al generar el código QR:", error);
        }
      }
    };

    generateQRCode();
  }, [url]);

  const handleClick = ()=>{
    setUrl("")
  }

  useEffect(() => {
    document.addEventListener("click", (e)=>{
        const element = e.target as HTMLElement

        if (element.id !== ""){
            setUrl("")
        }
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
    <div id="qr" className={`fixed top-0 left-0 w-full h-full animate-blurred-fade-in animate-duration-250 flex items-center justify-center bg-slate-800/50 backdrop-blur-lg`}>
        <IconX onClick={handleClick} className="absolute top-0 text-white size-10 right-0  hover:scale-110 transition-all cursor-pointer"></IconX>
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
