import Loader from "../Molecules/Loader"

const OfflinePage = () => (
  <div className="offline-page">
    <div>
      <h1>No estamos en vivo</h1>
      <h2>¿Hoy toca servicio? Espera aquí hasta que la transmisión comience</h2>
    </div>
    <div className="offline-page__loading">
      <Loader />
      <p>Esperando señal</p>
    </div>
  </div>
)
export default OfflinePage
