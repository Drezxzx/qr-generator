import FormUrl from "./components/FormUrl";

export default function Home() {
  return (
    <main className="flex min-h-screen anime animate-fade-down animate-once transition-all flex-col items-center  p-3">
      <div className="w-[60%] p-20 flex gap-3 justify-center items-center flex-col">
        <h1 className="inline-flex text-[4.5rem] bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent">Generador de Qr</h1>
          <p className=" text-center  text-lg leading-6 text-gray-600">Generador de QR completamente gratis. Genera todos los Codigos QR que quieras, completamente gratis.</p>   
          <FormUrl></FormUrl>
        </div>
        
        
    </main>
  );
}
