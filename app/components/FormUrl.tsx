"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react"
import { GenerateQr } from "../services/generateQr"

export default function FormUrl() {
    const [url, setUrl] = useState<string>("")
    const [qr, setQr] = useState<string>("")
    const [disable, setDisable] = useState<boolean>(true)

    useEffect(() => {
        if (url.includes("/")) {
            setDisable(false) 
        }else{
            setDisable(true)
        }
      
    }, [url])
    

    const handleClick = (e : React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        setQr(url)
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        setUrl(e.target.value)
    }

    return(
        <article className="mt-2 flex justify-center flex-col gap-6 items-center w-full">
            <form className="w-[97%] flex justify-center gap-2 items-center flex-col">
                <input className="text-black focus:outline-none focus:border-black focus:shadow-md transition-all shadow-black border-2 p-2 w-full rounded-md border-black/30" onChange={handleChange}  placeholder="Introduce tu url" type="text" />
                {!disable && <button disabled={disable} className="bg-blackad animate-blurred-fade-in animate-duration-250 mt-2 transition-all hover:scale-110 bg-black hover:bg-black/65 text-white font-semibold p-2 rounded-2xl" onClick={handleClick}>Generar Qr</button> }
            </form>
               {qr && <GenerateQr url={qr}></GenerateQr>}
        </article>
        

        
    )
}