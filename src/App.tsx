import './App.css';
import React, { useEffect, useState } from 'react';
import { ApiError, DatosApi, InfoComedor, obtenerDatos, Semana, Semanas } from './api';
import SemanaComponent from './components/Semana';
import { InfoGeneal } from './components/InfoGeneral';
import InsertarCodigoPage from './InsertarCodigoPage';
import ErrorComponent from './components/Error';



function App() {
  const url = new URL(window.location.href)
  const codigo = url.searchParams.get('codigo')

  const [datos, setDatos] = useState<DatosApi | null>(null)
  const [error, setError] = useState<ApiError | null>(null)

  useEffect(() => {
    if (!codigo) return
    obtenerDatos(codigo).then(setDatos).catch(e => setError(e))
  }, [])


  if (!codigo) {
    return <InsertarCodigoPage />
  }

  if (error?.incorretCode) {
    return <ErrorComponent>Codigo incorrecto</ErrorComponent>
  }
  if (error?.networkFailure) {
    return <ErrorComponent>Error de red</ErrorComponent>
  }
  if (datos == null) {
    return <div className="App">
      Cargando...
    </div>
  }

  const semanas: Semanas = datos.semanas
  const info: InfoComedor = datos.info

  const semenasList: Array<Semana> = Object.values(semanas)

  return (
    <div className="App">
      <InfoGeneal info={info} />
      {semenasList.map(semana => <SemanaComponent semana={semana} key={semana.nombre} />)}
      <footer>
        <p>Datos obtenidos de: <a href='https://eurest.com.ar/' target='_blank'>https://eurest.com.ar/</a></p>
        <p><a href='?'>Cambiar código para ver otro comedor de Eurest</a></p>
        <p>Esta web no es oficial. Eurest no tiene ninguna relacion con esta interfáz.</p>
      </footer>
    </div>
  );
}

export default App;