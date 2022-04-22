import axios from 'axios';

type RawPlatoData = {
    id: number
    nombre: string
    descripcion: string
    semana: string
    uri: string
    menu: RawMenuData
    dia: string
    calificacion: number
    calificacionCantidad: number
}

type RawMenuData = {
    id: number
    nombre: string
    color?: string
    semana: string
    uri: string
    platos: Array<RawPlatoData>
}

type RawEurestData = {
    id: number,
    nombre: string,
    codigo: string,
    direccion: string,
    logoCliente: { src: string }
    menus: Array<RawMenuData>
}

async function fetchApi(code: string) {
    return (await axios.get('https://eurest.com.ar/api/dto/ComedorHome/comedor_codigo/' + encodeURIComponent(code) + '?sin_redoneo=true')).data as RawEurestData
}

export type Menu = {
    nombre: string
    plato_principal: string
    acompañamiento?: string
    calificacion: number
}

export type Dia = {
    nombre: string
    menus: Array<Menu>
}

export type Semana = {
    nombre: string
    dias: {
        [key: string]: Dia
    }
}

export type Semanas = {
    [key: string]: Semana
}

export type InfoComedor = {
    nombre: string,
    codigo: string,
    direccion: string,
    logoCliente: { src: string }
}

export type DatosApi = {
    semanas: Semanas
    info: InfoComedor
}

export class ApiError extends TypeError {
    constructor(data: { networkFailure?: boolean, incorretCode?: boolean }) {
        super("Api Fetch Error")
        this.networkFailure = data.networkFailure ?? false
        this.incorretCode = data.incorretCode ?? false
    }
    networkFailure?: boolean
    incorretCode?: boolean
}

async function obtenerDatos(code: string) {
    let datos: RawEurestData

    try {
        datos = await fetchApi(code)
    } catch (error) {
        throw new ApiError({ networkFailure: true })
    }

    const badCode = Object.keys(datos).length === 0 || datos.id === undefined
    if (badCode) {
        const error = new ApiError({ incorretCode: true })
        throw error
    }

    const semanas: Semanas = {}
    for (const menu of datos.menus) {
        for (const plato of menu.platos) {
            const menu = plato.menu
            if (!semanas[menu.semana]) semanas[menu.semana] = { dias: {}, nombre: menu.semana }
            if (!semanas[menu.semana].dias[plato.dia]) semanas[menu.semana].dias[plato.dia] = { menus: [], nombre: plato.dia }
            semanas[menu.semana].dias[plato.dia].menus.push({
                nombre: menu.nombre,
                plato_principal: plato.nombre,
                acompañamiento: plato.descripcion,
                calificacion: plato.calificacion,
            })
        }
    }
    return {
        semanas,
        info: {
            codigo: datos.codigo,
            direccion: datos.direccion,
            logoCliente: datos.logoCliente,
            nombre: datos.nombre,
        }
    } as DatosApi
}


export { obtenerDatos }


