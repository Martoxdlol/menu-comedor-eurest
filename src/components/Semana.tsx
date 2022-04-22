import React from "react";
import { Semana } from "../api";
import DiaComponent from "./Dia";

type SemanaProps = { semana: Semana }

export default function SemanaComponent({ semana }: SemanaProps) {
    return <div className="Semana">
        <div className="Semana-Header">
            <p>Semana del: {semana.nombre}</p>
        </div>
        <div className="Dias">
            {Object.values(semana.dias).map(dia => <DiaComponent dia={dia} key={dia.nombre} />)}
        </div>
    </div>
}