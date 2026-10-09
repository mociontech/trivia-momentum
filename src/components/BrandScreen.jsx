export default function BrandScreen({ children, compact = false, className = '' }) {
  return (
    <div className={`portrait-stage brand-screen ${compact ? 'is-compact' : ''} ${className}`}>
      <div className="network network-top" aria-hidden="true" />
      <div className="network network-bottom" aria-hidden="true" />
      <div className="orange-wave" aria-hidden="true" />
      <img className="brand-logo" src="/assets/enruta-logo-combo.png" alt="EnRuta Empresarial" />
      <div className="brand-screen-content">{children}</div>
    </div>
  );
}
