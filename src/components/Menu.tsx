import React from "react";
import { Menu } from "../api";
import DiaComponent from "./Dia";

type MenuProps = { menu: Menu }

export default function MenuComponent({ menu }: MenuProps) {
    return <div className="Menu">
        <p className="Nombre-Menu">{menu.nombre}</p>
        <p className="Nombre-Plato">{menu.plato_principal}</p>
        {menu.acompañamiento && <p className="Nombre-Plato"> {menu.acompañamiento}</p>}
    </div>
}