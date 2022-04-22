import React from "react";
import { InfoComedor } from "../api";

export function InfoGeneal({ info }: { info: InfoComedor }) {
    return <header className="Info-General">
        
        <h1>Comedor: {info.nombre}</h1>
        <p>Código: <a href="?">{info.codigo}</a></p>
        <img src={info.logoCliente.src} height="40" className="Logo-Empresa"/>
    </header>
}