export default function Input({ label, icon, className = '', ...props }) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div className="input-wrapper">
        {icon}
        <input className={className} {...props} />
      </div>
    </div>
  );
}
