export default function ConnectionBadge({ connected }) {
  return (
    <div className={`connection-badge ${connected ? 'is-online' : 'is-offline'}`}>
      <span /> {connected ? 'Sincronizado' : 'Sin conexión'}
    </div>
  );
}
