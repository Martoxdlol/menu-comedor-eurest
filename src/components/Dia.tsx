import React from "react";
import { Dia } from "../api";
import MenuComponent from "./Menu";

type DiaProps = { dia: Dia }

export default function DiaComponent({ dia }: DiaProps) {
    return <div className="Dia">
        <h2>{dia.nombre.charAt(0).toUpperCase() + dia.nombre.slice(1)}</h2>
        {dia.menus.map((menu, i) => <MenuComponent menu={menu} key={i} />)}
    </div>
}