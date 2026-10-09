export default function ReferenceScreen({ src, alt, ratio, className = '', children }) {
  const style = ratio ? { '--reference-ratio': ratio } : undefined;

  return (
    <div className={`portrait-stage reference-stage ${className}`} style={style}>
      <img className="reference-image" src={src} alt={alt} draggable="false" />
      {children}
    </div>
  );
}
