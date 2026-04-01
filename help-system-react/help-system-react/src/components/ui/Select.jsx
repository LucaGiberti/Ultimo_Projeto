export default function Select({ label, children, className = 'input-field', ...props }) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <select className={className} {...props}>
        {children}
      </select>
    </div>
  );
}
